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

// ─── Check if email already has a succeeded $1 PI in the last 24h ─────────────
async function hasRecentSucceededPayment(email: string): Promise<boolean> {
    const oneDayAgo = Math.floor(Date.now() / 1000) - 86_400;

    const paymentIntents = await stripe.paymentIntents.search({
        query: `status:'succeeded' AND metadata['customerEmail']:'${email}'`,
        limit: 10,
    });

    return paymentIntents.data.some(pi => (pi.created ?? 0) >= oneDayAgo);
}

// ─── Check if card fingerprint already has a succeeded PI in the last 24h ─────
async function hasRecentSucceededPaymentByCard(fingerprint: string): Promise<boolean> {
    const oneDayAgo = Math.floor(Date.now() / 1000) - 86_400;

    const paymentIntents = await stripe.paymentIntents.search({
        query: `status:'succeeded' AND metadata['trial_card_fingerprint']:'${fingerprint}'`,
        limit: 10,
    });

    return paymentIntents.data.some(pi => (pi.created ?? 0) >= oneDayAgo);
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
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
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

        // ── 1) Email check: block if an existing customer has a SUCCESSFUL subscription ──
        const existingByEmail = await stripe.customers.search({
            query: `email:'${cleanEmail}'`,
            limit: 5,
        });

        for (const c of existingByEmail.data) {
            if (await hasSuccessfulSubscription(c.id)) {
                console.warn(`[Security] Duplicate trial attempt (email subscription): ${cleanEmail}`);
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Bu e-posta adresiyle daha önce bir deneme kullanılmış.' }),
                };
            }
        }

        // ── 2) Email check: block if a succeeded $1 PI exists in the last 24h ──
        if (await hasRecentSucceededPayment(cleanEmail)) {
            console.warn(`[Security] Duplicate trial attempt (email recent PI): ${cleanEmail}`);
            return {
                statusCode: 403,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Bu e-posta adresiyle son 24 saat içinde zaten bir deneme başlatılmış.' }),
            };
        }

        // ── 3) Card fingerprint checks ──
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId as string);
        const cardFingerprint = paymentMethod.card?.fingerprint;

        if (cardFingerprint) {
            // 3a) Block on existing subscription
            const existingByCard = await stripe.customers.search({
                query: `metadata['trial_card_fingerprint']:'${cardFingerprint}'`,
                limit: 5,
            });

            for (const c of existingByCard.data) {
                if (await hasSuccessfulSubscription(c.id)) {
                    console.warn(`[Security] Duplicate trial attempt (fingerprint subscription): ${cardFingerprint}`);
                    return {
                        statusCode: 403,
                        headers: corsHeaders,
                        body: JSON.stringify({ error: 'Bu kart daha önce bir deneme için kullanılmış.' }),
                    };
                }
            }

            // 3b) Block on recent succeeded PI
            if (await hasRecentSucceededPaymentByCard(cardFingerprint)) {
                console.warn(`[Security] Duplicate trial attempt (fingerprint recent PI): ${cardFingerprint}`);
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Bu kart ile son 24 saat içinde zaten bir deneme başlatılmış.' }),
                };
            }
        }

        // ── 4) Create PaymentIntent with idempotency key ──
        // Using email + paymentMethodId hash ensures the same user+card combo
        // always returns the same PI instead of creating duplicates.
        const idempotencyKey = crypto
            .createHash('sha256')
            .update(`trial_${cleanEmail}_${paymentMethodId}`)
            .digest('hex');

        const trialPaymentIntent = await stripe.paymentIntents.create(
            {
                amount: 100, // $1.00 in cents
                currency: 'usd',
                payment_method: paymentMethodId as string,
                description: '3 Günlük Deneme Ücreti',
                statement_descriptor_suffix: 'ROASELL DENEME',
                metadata: {
                    customerEmail: cleanEmail,
                    customerName: (name as string).trim(),
                    customerPhone: typeof phone === 'string' ? phone.replace(/\D/g, '').slice(0, 15) : '',
                    paymentMethodId: paymentMethodId as string,
                    ...(cardFingerprint ? { trial_card_fingerprint: cardFingerprint } : {}),
                },
            },
            {
                idempotencyKey,
            }
        );

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                clientSecret: trialPaymentIntent.client_secret,
                paymentIntentId: trialPaymentIntent.id,
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
