import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

const OTP_SECRET = process.env.OTP_SECRET || 'roasell-otp-secret-change-in-prod';

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

        const { email, otp, token } = parsed;

        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçerli bir e-posta adresi girin.' }) };
        }
        if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp)) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçerli bir doğrulama kodu girin.' }) };
        }
        if (!token || typeof token !== 'string') {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz token.' }) };
        }

        const cleanEmail = email.toLowerCase().trim();

        // Decode and verify token
        let decoded: { email: string; expiresAt: number; signature: string };
        try {
            decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        } catch {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçersiz token formatı.' }) };
        }

        const { email: tokenEmail, expiresAt, signature } = decoded;

        // Check token belongs to this email
        if (tokenEmail !== cleanEmail) {
            return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: 'Token bu e-posta adresiyle eşleşmiyor.' }) };
        }

        // Check expiry
        if (Date.now() > expiresAt) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Doğrulama kodunun süresi dolmuş. Lütfen yeni kod isteyin.' }) };
        }

        // Verify HMAC: reconstruct expected signature using user-provided OTP
        const payload = `${cleanEmail}:${otp}:${expiresAt}`;
        const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('hex');

        // Constant-time comparison to prevent timing attacks
        const sigBuffer = Buffer.from(signature, 'hex');
        const expBuffer = Buffer.from(expectedSig, 'hex');
        const sigMatch = sigBuffer.length === expBuffer.length &&
            crypto.timingSafeEqual(sigBuffer, expBuffer);

        if (!sigMatch) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Doğrulama kodu hatalı. Lütfen tekrar deneyin.' }) };
        }

        // OTP verified — fetch Stripe subscription data
        const customers = await stripe.customers.search({
            query: `email:'${escapeStripeQuery(cleanEmail)}'`,
            limit: 1,
        });

        if (customers.data.length === 0) {
            return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: 'Bu e-posta adresiyle kayıtlı bir abonelik bulunamadı.' }) };
        }

        const customer = customers.data[0];

        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            limit: 5,
        });

        if (subscriptions.data.length === 0) {
            return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: 'Bu hesaba ait aktif bir abonelik bulunamadı.' }) };
        }

        const sub = subscriptions.data[0];
        const invoices = await stripe.invoices.list({ customer: customer.id, status: 'paid', limit: 100 });
        const totalPaid = invoices.data.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0);

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
        console.error('[verify-otp error]', error?.message, error?.stack);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' }),
        };
    }
};
