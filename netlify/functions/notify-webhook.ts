import { Handler } from '@netlify/functions';

const WEBHOOK_SUCCESS = 'https://dtt1z7t3.rcsrv.com/webhook/roasellapp';
const WEBHOOK_POTENTIAL = 'https://dtt1z7t3.rcsrv.com/webhook/potansiyelapp';

const ALLOWED_ORIGINS = [
    'https://www.roasell.com',
    'https://roasell.com',
    'http://localhost:5173',
    'http://localhost:3000',
];

/**
 * Server-side webhook proxy.
 * Frontend calls this function; this function calls the external webhook.
 * Eliminates CORS issues (server-to-server has no CORS restrictions).
 *
 * Body: { type: 'success' | 'potential', ...payload }
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
        return { statusCode: 405, headers: corsHeaders, body: '' };
    }

    try {
        const parsed = JSON.parse(event.body || '{}');
        const { type, ...payload } = parsed;

        const url = type === 'potential' ? WEBHOOK_POTENTIAL : WEBHOOK_SUCCESS;

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        console.log(`[notify-webhook] ${type} → ${res.status}`);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ success: true }),
        };
    } catch (error: any) {
        console.error('[notify-webhook error]', error?.message);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Webhook gönderilemedi.' }),
        };
    }
};
