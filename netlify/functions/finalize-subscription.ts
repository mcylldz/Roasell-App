import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

const ALLOWED_ORIGINS = [
    'https://www.roasell.com',
    'https://roasell.com',
    'http://localhost:5173',
    'http://localhost:3000',
];

/**
 * Called by the frontend AFTER stripe.confirmCardPayment succeeds.
 * Verifies PaymentIntent is truly 'succeeded' in Stripe,
 * then creates the Customer and Subscription.
 *
 * This guarantees: no customer or subscription is ever created
 * unless the $1 payment was actually completed successfully.
 */
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
        return { statusCode: 403, body: JSON.stringify({ error: 'Yetkisiz erişim.' }) };
    }

    try {
        let parsed: any = {};
        try { parsed = JSON.parse(event.body || '{}'); } catch {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz istek.' }) };
        }

        const { paymentIntentId } = parsed;

        if (!paymentIntentId || typeof paymentIntentId !== 'string' || !paymentIntentId.startsWith('pi_')) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz işlem kimliği.' }) };
        }

        // ── Retrieve PaymentIntent from Stripe and verify it actually succeeded ──
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            console.warn(`[finalize-subscription] PI not succeeded: ${paymentIntentId} status: ${paymentIntent.status}`);
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Ödeme henüz tamamlanmamış.' }),
            };
        }

        // ── Idempotency check: if this PI was already finalized, return existing data ──
        const meta = paymentIntent.metadata || {};

        if (meta.finalized === 'true' && meta.finalizedCustomerId && meta.finalizedSubscriptionId) {
            console.log(`[finalize-subscription] Already finalized PI: ${paymentIntentId} → cus: ${meta.finalizedCustomerId}, sub: ${meta.finalizedSubscriptionId}`);
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    subscriptionId: meta.finalizedSubscriptionId,
                    customerId: meta.finalizedCustomerId,
                }),
            };
        }

        // ── Read metadata stored in the PaymentIntent ──
        const cleanEmail = meta.customerEmail;
        const cleanName = meta.customerName;
        const cleanPhone = meta.customerPhone;
        const paymentMethodId = meta.paymentMethodId;
        const cardFingerprint = meta.trial_card_fingerprint;

        if (!cleanEmail || !cleanName || !paymentMethodId) {
            console.error('[finalize-subscription] Missing metadata on PI:', paymentIntentId);
            return {
                statusCode: 500,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'İşlem bilgileri eksik. Lütfen destek ile iletişime geçin.' }),
            };
        }

        // ── Create Customer (idempotency key prevents duplicates on parallel retries) ──
        const customer = await stripe.customers.create(
            {
                name: cleanName,
                email: cleanEmail,
                phone: cleanPhone || undefined,
                payment_method: paymentMethodId,
                invoice_settings: { default_payment_method: paymentMethodId },
                metadata: {
                    customerEmail: cleanEmail,
                    customerName: cleanName,
                    customerPhone: cleanPhone || '',
                    ...(cardFingerprint ? { trial_card_fingerprint: cardFingerprint } : {}),
                },
            },
            { idempotencyKey: `customer_${paymentIntentId}` },
        );

        // ── Link the PaymentIntent to the new customer ──
        await stripe.paymentIntents.update(paymentIntentId, { customer: customer.id });

        // ── Create Subscription with 3-day trial ──
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
            { idempotencyKey: `subscription_${paymentIntentId}` },
        );

        // ── Mark PI as finalized so duplicate calls are idempotent ──
        await stripe.paymentIntents.update(paymentIntentId, {
            metadata: {
                ...meta,
                finalized: 'true',
                finalizedCustomerId: customer.id,
                finalizedSubscriptionId: subscription.id,
            },
        });

        console.log(`[finalize-subscription] Created customer ${customer.id} and sub ${subscription.id} for ${cleanEmail}`);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                subscriptionId: subscription.id,
                customerId: customer.id,
            }),
        };
    } catch (error: any) {
        console.error('[finalize-subscription error]', error?.message);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Abonelik oluşturulurken bir hata oluştu. Ödemeniz alındı, destek ile iletişime geçin.' }),
        };
    }
};
