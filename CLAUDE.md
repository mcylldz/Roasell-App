# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Roasell is a Turkish-market SaaS landing funnel for an AI-driven ad performance and profit optimization platform. It combines a marketing landing page with a Stripe subscription payment system, deployed on Netlify.

## Commands

- `npm run dev` — Start Vite dev server on port 3000
- `npm run build` — Production build to `/dist`
- `npm run preview` — Preview production build locally
- No test runner or linter is configured.

## Architecture

**Frontend:** React 19 + TypeScript, built with Vite. Tailwind CSS loaded via CDN (not PostCSS). Fonts: Inter + JetBrains Mono.

**Backend:** Netlify Functions (serverless) in `/netlify/functions/`. Six functions handle the payment lifecycle:
- `create-subscription` — Creates Stripe PaymentIntent with email/card deduplication
- `finalize-subscription` — Creates Stripe Customer + Subscription (3-day trial) after payment confirmation
- `send-otp` / `verify-otp` — Email OTP flow (HMAC-SHA256 signed, 10min TTL) via Resend
- `get-subscription` / `cancel-subscription` — Subscription management

**Routing:** Pathname-based in `App.tsx` (no router library). `/` = landing page, `/abonelik` = subscription management.

**State:** Local React state only — no external state library.

## Payment Flow

1. Frontend calls `create-subscription` → gets `clientSecret`
2. Stripe Elements `confirmCardPayment()` on client
3. Frontend calls `finalize-subscription` → creates Customer + Subscription with 3-day trial at $1, then $47/month
4. Success/failure webhooks fire to external CRM (`dtt1z7t3.rcsrv.com`)

## Key Integrations

- **Stripe** (API v2026-02-25.clover) — payments, subscriptions, customers
- **Resend** — OTP email delivery
- **Netlify Blobs** — serverless storage
- **Meta Pixel** (ID: 170135295273206) — `PageView` + `Purchase` conversion events, deduped via sessionStorage
- **Yandex Metrika** (ID: 107704412) — regional analytics

## Environment Variables

Frontend (prefixed `VITE_`): `VITE_STRIPE_PUBLIC_KEY`

Backend (Netlify env): `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `RESEND_API_KEY`, `OTP_SECRET`, `GEMINI_API_KEY`

## Important Patterns

- **CORS whitelist** in every Netlify function: `roasell.com`, `www.roasell.com`, `localhost:5173`, `localhost:3000`
- **Idempotency**: PaymentIntent creation uses SHA256 hash of email+paymentMethodId as idempotency key
- **Webhook reliability**: Uses `fetch()` with `keepalive: true` to survive component unmount; refs track whether webhooks have already fired to prevent duplicates
- **Purchase pixel deduplication**: sessionStorage flag `__purchase_pixel_sent` prevents double-firing Meta Pixel Purchase events
- **Path alias**: `@/*` maps to project root in both Vite and TypeScript configs
- All UI text is in Turkish
