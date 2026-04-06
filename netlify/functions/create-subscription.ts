import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

// ─── Allowed origins ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
    'https://www.roasell.com',
    'https://roasell.com',
    'http://localhost:5173',
    'http://localhost:3000',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeStripeQuery(val: string): string {
    return val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// Subscription statuses that mean a trial or subscription was successfully started
const SUCCESSFUL_STATUSES = ['trialing', 'active', 'past_due', 'unpaid'];

function validateInputs(name: unknown, email: unknown, paymentMethodId: unknown): string | null {
    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100)
        return 'Geçersiz ad bilgisi.';
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254)
        return 'Geçersiz e-posta adresi.';
    if (typeof paymentMethodId !== 'string' || !paymentMethodId.startsWith('pm_') || paymentMethodId.length > 100)
        return 'Geçersiz ödeme yöntemi.';
    return null;
}

function friendlyError(err: any): string {
    const code: string = err?.code || '';
    const declineCode: string = err?.decline_code || '';

    if (code === 'card_declined') {
        if (declineCode === 'insufficient_funds') return 'Kartınızda yeterli bakiye yok.';
        if (declineCode === 'lost_card' || declineCode === 'stolen_card') return 'Kartınız kullanılamıyor.';
        return 'Kartınız reddedildi. Lütfen başka bir kart deneyin.';
    }
    if (code === 'expired_card') return 'Kartınızın süresi dolmuş.';
    if (code === 'incorrect_cvc') return 'CVC kodu hatalı.';
    if (code === 'processing_error') return 'Ödeme işlenirken bir hata oluştu. Lütfen tekrar deneyin.';
    return 'Bir hata oluştu. Lütfen tekrar deneyin.';
}

// ─── Check if a customer has a successful subscription ────────────────────────
async function hasSuccessfulSubscription(customerId: string): Promise<boolean> {
    const subs = await stripe.subscriptions.list({
        customer: customerId,
        limit: 10,
    });
    return subs.data.some(s => SUCCESSFUL_STATUSES.includes(s.status));
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export const handler: Handler = async (event) => {
    const origin = event.headers['origin'] || event.headers['Origin'] || '';
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : '';
    const corsHeaders = {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
        console.warn(`[Security] Blocked origin: ${origin}`);
        return { statusCode: 403, body: JSON.stringify({ error: 'Yetkisiz erişim.' }) };
    }

    if ((event.body?.length ?? 0) > 10_240) {
        return { statusCode: 413, headers: corsHeaders, body: JSON.stringify({ error: 'İstek çok büyük.' }) };
    }

    try {
        let parsed: any = {};
        try { parsed = JSON.parse(event.body || '{}'); } catch {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz istek formatı.' }) };
        }

        const { name, email, phone, paymentMethodId } = parsed;
        const validationError = validateInputs(name, email, paymentMethodId);
        if (validationError) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: validationError }) };
        }

        const cleanEmail = (email as string).toLowerCase().trim();
        const cleanName = (name as string).trim();
        const cleanPhone = typeof phone === 'string' ? phone.replace(/\D/g, '').slice(0, 15) : '';
        const safeEmail = escapeStripeQuery(cleanEmail);

        // ── 1) Email check: block if active, reuse if incomplete ──
        const existingByEmail = await stripe.customers.search({
            query: `email:'${safeEmail}'`,
            limit: 5,
        });

        let reuseCustomer: Stripe.Customer | null = null;

        for (const c of existingByEmail.data) {
            if (await hasSuccessfulSubscription(c.id)) {
                console.warn(`[Security] Duplicate trial attempt (email): ${cleanEmail}`);
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Bu e-posta adresiyle daha önce bir deneme kullanılmış.' }),
                };
            }

            // Cancel incomplete subscriptions from previous failed attempts
            const incompleteSubs = await stripe.subscriptions.list({
                customer: c.id,
                status: 'incomplete',
                limit: 10,
            });
            for (const s of incompleteSubs.data) {
                try {
                    await stripe.subscriptions.cancel(s.id);
                    console.log(`[cleanup] Cancelled incomplete sub ${s.id} for ${cleanEmail}`);
                } catch (e) {
                    console.warn(`[cleanup] Failed to cancel sub ${s.id}:`, e);
                }
            }

            if (!reuseCustomer) {
                reuseCustomer = c as Stripe.Customer;
            }
        }

        // ── 2) Card fingerprint check ──
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId as string);
        const cardFingerprint = paymentMethod.card?.fingerprint;

        if (cardFingerprint) {
            const existingByCard = await stripe.customers.search({
                query: `metadata['trial_card_fingerprint']:'${cardFingerprint}'`,
                limit: 5,
            });

            for (const c of existingByCard.data) {
                if (await hasSuccessfulSubscription(c.id)) {
                    console.warn(`[Security] Duplicate trial attempt (fingerprint): ${cardFingerprint}`);
                    return {
                        statusCode: 403,
                        headers: corsHeaders,
                        body: JSON.stringify({ error: 'Bu kart daha önce bir deneme için kullanılmış.' }),
                    };
                }
            }
        }

        // ── 3) Reuse existing customer or create new one ──
        let customer: Stripe.Customer;

        if (reuseCustomer) {
            // Attach new payment method and update customer details
            await stripe.paymentMethods.attach(paymentMethodId as string, {
                customer: reuseCustomer.id,
            });
            customer = await stripe.customers.update(reuseCustomer.id, {
                name: cleanName,
                phone: cleanPhone || undefined,
                invoice_settings: { default_payment_method: paymentMethodId as string },
                metadata: {
                    customerEmail: cleanEmail,
                    customerName: cleanName,
                    customerPhone: cleanPhone,
                    ...(cardFingerprint ? { trial_card_fingerprint: cardFingerprint } : {}),
                },
            });
            console.log(`[create-subscription] Reusing customer ${customer.id} for ${cleanEmail}`);
        } else {
            const idempotencyBase = crypto
                .createHash('sha256')
                .update(`trial_${cleanEmail}_${cardFingerprint || paymentMethodId}`)
                .digest('hex');

            customer = await stripe.customers.create(
                {
                    name: cleanName,
                    email: cleanEmail,
                    phone: cleanPhone || undefined,
                    payment_method: paymentMethodId as string,
                    invoice_settings: { default_payment_method: paymentMethodId as string },
                    metadata: {
                        customerEmail: cleanEmail,
                        customerName: cleanName,
                        customerPhone: cleanPhone,
                        ...(cardFingerprint ? { trial_card_fingerprint: cardFingerprint } : {}),
                    },
                },
                { idempotencyKey: `customer_${idempotencyBase}` },
            );
        }

        // ── 4) Create Subscription with 3-day trial (no upfront charge via subscription) ──
        const subIdempotencyBase = crypto
            .createHash('sha256')
            .update(`sub_${cleanEmail}_${paymentMethodId}`)
            .digest('hex');

        const subscription = await stripe.subscriptions.create(
            {
                customer: customer.id,
                items: [{ price: process.env.STRIPE_PRICE_ID }],
                trial_period_days: 3,
                payment_settings: {
                    payment_method_types: ['card'],
                    save_default_payment_method: 'on_subscription',
                },
                metadata: {
                    customerEmail: cleanEmail,
                    customerName: cleanName,
                },
            },
            { idempotencyKey: `subscription_${subIdempotencyBase}` },
        );

        // ── 5) Create separate $1 PaymentIntent for the trial activation fee ──
        const piIdempotencyBase = crypto
            .createHash('sha256')
            .update(`pi_${cleanEmail}_${paymentMethodId}_${subscription.id}`)
            .digest('hex');

        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: 100, // $1.00
                currency: 'usd',
                customer: customer.id,
                payment_method: paymentMethodId as string,
                setup_future_usage: 'off_session',
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'any',
                    },
                },
                metadata: {
                    subscriptionId: subscription.id,
                    customerEmail: cleanEmail,
                    customerName: cleanName,
                    type: 'trial_activation_fee',
                },
            },
            { idempotencyKey: `pi_trial_${piIdempotencyBase}` },
        );

        console.log(`[create-subscription] customer=${customer.id} sub=${subscription.id} for ${cleanEmail}`);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                clientSecret: paymentIntent.client_secret,
                subscriptionId: subscription.id,
                customerId: customer.id,
            }),
        };
    } catch (error: any) {
        console.error('[Stripe Error]', error?.code, error?.type, error?.message);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: friendlyError(error) }),
        };
    }
};
