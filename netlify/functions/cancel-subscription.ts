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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

        const { email, subscriptionId } = parsed;

        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçerli bir e-posta adresi girin.' }) };
        }
        if (!subscriptionId || typeof subscriptionId !== 'string' || !subscriptionId.startsWith('sub_')) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz abonelik ID.' }) };
        }

        const cleanEmail = email.toLowerCase().trim();

        // Retrieve subscription first, then verify the owning customer's email matches
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;

        if (customer.deleted) {
            return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: 'Müşteri bulunamadı.' }) };
        }

        if ((customer.email || '').toLowerCase() !== cleanEmail) {
            console.warn(`[Security] Cancel attempt mismatch: email ${cleanEmail}, customer email ${customer.email}`);
            return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: 'Bu abonelik bu hesaba ait değil.' }) };
        }

        if (subscription.status === 'canceled') {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Abonelik zaten iptal edilmiş.' }) };
        }

        // Smart cancellation logic:
        // - If still in trial → cancel immediately
        // - If paid (active) → cancel at period end
        const isTrialing = subscription.status === 'trialing';
        const now = Math.floor(Date.now() / 1000);
        const trialStillActive = isTrialing && (subscription.trial_end || 0) > now;

        let canceledSub;
        if (trialStillActive) {
            // Immediate cancellation during trial
            canceledSub = await stripe.subscriptions.cancel(subscriptionId);
        } else {
            // Cancel at end of current period
            canceledSub = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: true,
            });
        }

        const periodEnd = canceledSub.current_period_end || canceledSub.trial_end;
        const canceledAt = periodEnd ? new Date(periodEnd * 1000).toISOString() : null;

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                immediate: trialStillActive,
                canceledAt,
                message: trialStillActive
                    ? 'Aboneliğiniz iptal edildi.'
                    : `Aboneliğiniz dönem sonunda (${canceledAt ? new Date(canceledAt).toLocaleDateString('tr-TR') : '?'}) sonlandırılacak.`,
            }),
        };
    } catch (error: any) {
        console.error('[cancel-subscription error]', error?.message);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'İptal işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' }),
        };
    }
};
