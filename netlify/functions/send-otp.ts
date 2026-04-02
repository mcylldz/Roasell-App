import { Handler } from '@netlify/functions';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const OTP_SECRET = process.env.OTP_SECRET || 'roasell-otp-secret-change-in-prod';
const FROM_EMAIL = 'noreply@roasell.com';
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

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

        const { email } = parsed;
        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Geçerli bir e-posta adresi girin.' }) };
        }

        const cleanEmail = email.toLowerCase().trim();

        // Generate 6-digit OTP and expiry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + OTP_TTL_MS;

        // HMAC sign: HMAC(email:otp:expiresAt) — OTP is NOT stored in token
        const payload = `${cleanEmail}:${otp}:${expiresAt}`;
        const signature = crypto.createHmac('sha256', OTP_SECRET).update(payload).digest('hex');

        // Token contains email, expiry, signature — but NOT the OTP
        const token = Buffer.from(JSON.stringify({ email: cleanEmail, expiresAt, signature })).toString('base64');

        // Send OTP email via Resend
        await resend.emails.send({
            from: FROM_EMAIL,
            to: cleanEmail,
            subject: 'Roasell — Doğrulama Kodunuz',
            html: `
                <div style="font-family: Inter, sans-serif; background: #050505; color: #fff; max-width: 480px; margin: 0 auto; padding: 40px 24px; border-radius: 16px;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-size: 22px; font-weight: 900; text-transform: uppercase; font-style: italic; color: #1d4ed8; letter-spacing: -0.5px;">RoaSell</span>
                    </div>
                    <h1 style="font-size: 20px; font-weight: 900; color: #fff; margin: 0 0 8px;">Doğrulama Kodunuz</h1>
                    <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 32px; line-height: 1.6;">Abonelik bilgilerinize erişmek için aşağıdaki kodu kullanın.</p>
                    <div style="background: #111; border: 1px solid #27272a; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
                        <span style="font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #fff; font-family: monospace;">${otp}</span>
                    </div>
                    <p style="color: #71717a; font-size: 12px; margin: 0; line-height: 1.6;">Bu kod <strong style="color: #a1a1aa;">10 dakika</strong> geçerlidir. Kodu kimseyle paylaşmayın.</p>
                    <p style="color: #3f3f46; font-size: 11px; margin: 24px 0 0;">Bu isteği siz yapmadıysanız bu e-postayı görmezden gelebilirsiniz.</p>
                </div>`,
        });

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ success: true, token, message: 'Doğrulama kodu e-posta adresinize gönderildi.' }),
        };
    } catch (error: any) {
        console.error('[send-otp error]', error?.message, error?.stack);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.' }),
        };
    }
};
