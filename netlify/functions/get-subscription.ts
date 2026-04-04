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

function escapeStripeQuery(val: string): string {
    return val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

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

        const { email } = parsed;
        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçerli bir e-posta adresi girin.' }) };
        }

        const cleanEmail = email.toLowerCase().trim();

        // Find customer by email
        const customers = await stripe.customers.search({
            query: `email:'${escapeStripeQuery(cleanEmail)}'`,
            limit: 1,
        });

        if (customers.data.length === 0) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Bu e-posta adresiyle kayıtlı bir abonelik bulunamadı.' }),
            };
        }

        const customer = customers.data[0];

        // Get subscriptions for this customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            limit: 5,
            expand: ['data.latest_invoice'],
        });

        if (subscriptions.data.length === 0) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Bu hesaba ait aktif bir abonelik bulunamadı.' }),
            };
        }

        const sub = subscriptions.data[0];

        // Calculate total paid (all paid invoices)
        const invoices = await stripe.invoices.list({
            customer: customer.id,
            status: 'paid',
            limit: 100,
        });
        const totalPaid = invoices.data.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0);

        // Determine status details
        const now = Math.floor(Date.now() / 1000);
        const isTrialing = sub.status === 'trialing';
        const isActive = sub.status === 'active';
        const isCanceled = sub.status === 'canceled';
        const isCancelAtPeriodEnd = sub.cancel_at_period_end;

        const trialEnd = sub.trial_end;
        const subAny = sub as any;
        const currentPeriodEnd = subAny.current_period_end as number | null ?? null;
        const currentPeriodStart = subAny.current_period_start as number | null ?? null;

        let statusLabel = '';
        let statusDetail = '';

        if (isCanceled) {
            statusLabel = 'İptal Edildi';
            statusDetail = 'Aboneliğiniz sonlandırılmış.';
        } else if (isTrialing) {
            statusLabel = 'Deneme Süreci';
            const daysLeft = Math.ceil(((trialEnd || 0) - now) / 86400);
            statusDetail = `${daysLeft > 0 ? daysLeft : 0} gün deneme süreniz kaldı.`;
        } else if (isActive && isCancelAtPeriodEnd) {
            statusLabel = 'İptal Bekliyor';
            statusDetail = 'Aboneliğiniz dönem sonunda iptal edilecek.';
        } else if (isActive) {
            statusLabel = 'Aktif';
            statusDetail = 'Aboneliğiniz aktif.';
        } else {
            statusLabel = sub.status;
            statusDetail = '';
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                customerId: customer.id,
                subscriptionId: sub.id,
                customerName: customer.name,
                customerEmail: customer.email,
                status: sub.status,
                statusLabel,
                statusDetail,
                isTrialing,
                isActive,
                isCanceled,
                isCancelAtPeriodEnd,
                trialEnd: trialEnd ? new Date(trialEnd * 1000).toISOString() : null,
                currentPeriodStart: currentPeriodStart ? new Date(currentPeriodStart * 1000).toISOString() : null,
                currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
                totalPaidCents: totalPaid,
                totalPaidUsd: (totalPaid / 100).toFixed(2),
                invoiceCount: invoices.data.length,
                createdAt: new Date(customer.created * 1000).toISOString(),
            }),
        };
    } catch (error: any) {
        console.error('[get-subscription error]', error?.message);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' }),
        };
    }
};
