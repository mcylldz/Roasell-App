import React, { useState, useEffect, useRef } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Loader2, ArrowRight, ArrowLeft, User, CreditCard, CheckCircle2, Shield } from 'lucide-react';

const WEBHOOK_PROXY = '/.netlify/functions/notify-webhook';

// Meta Pixel global type
declare global { interface Window { fbq?: (...args: any[]) => void; } }

interface CustomerData {
    name: string;
    email: string;
    phone: string;
}

interface CheckoutFormProps {
    onSuccess: (data: CustomerData) => void;
}

export const CheckoutForm = ({ onSuccess }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState<1 | 2>(1);

    // Track if potential customer data was sent already
    const potentialSentRef = useRef(false);

    // Prevent double-submit after payment is confirmed
    const paymentCompletedRef = useRef(false);

    // Refs to capture latest values for unmount cleanup
    const nameRef = useRef(name);
    const emailRef = useRef(email);
    const phoneRef = useRef(phone);
    useEffect(() => { nameRef.current = name; }, [name]);
    useEffect(() => { emailRef.current = email; }, [email]);
    useEffect(() => { phoneRef.current = phone; }, [phone]);

    // When component unmounts (modal closed) without success, send potential lead
    useEffect(() => {
        return () => {
            const n = nameRef.current;
            const e = emailRef.current;
            const p = phoneRef.current;
            if (!potentialSentRef.current && (n || e || p)) {
                fetch(WEBHOOK_PROXY, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'potential',
                        customerName: n,
                        customerEmail: e,
                        customerPhone: p.startsWith('0') ? p : `0${p}`,
                        event: 'payment_abandoned',
                        timestamp: new Date().toISOString(),
                    }),
                    keepalive: true,
                }).catch(() => {});
            }
        };
    }, []);

    // Format phone to 05... format
    const formatPhone = (val: string) => {
        const digits = val.replace(/\D/g, '');
        return digits;
    };

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name.trim() || !email.trim() || !phone.trim()) {
            setErrorMessage('Lütfen tüm alanları doldurun.');
            return;
        }

        // Send potential lead data when moving to step 2
        const formattedPhone = phone.startsWith('0') ? phone : `0${phone}`;
        sendPotentialLead({ name, email, phone: formattedPhone, reason: 'step1_completed' });

        // Fire InitiateCheckout pixel event
        if (window.fbq) {
            const nameParts = name.trim().split(/\s+/);
            window.fbq('init', '170135295273206', {
                em: email.toLowerCase().trim(),
                fn: (nameParts[0] || '').toLowerCase(),
                ln: (nameParts.slice(1).join(' ') || '').toLowerCase(),
                ph: formattedPhone.replace(/\D/g, ''),
                country: 'tr',
            });
            window.fbq('track', 'InitiateCheckout', {
                value: 47,
                currency: 'USD',
                content_type: 'product',
                content_ids: ['roasell-app-subscription'],
                content_name: 'Roasell App Subscription',
            });
        }

        setStep(2);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // ── Guard: block if already processing or payment already completed ──
        if (!stripe || !elements || isProcessing || paymentCompletedRef.current) return;

        const formattedPhone = phone.startsWith('0') ? phone : `0${phone}`;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message || 'Ödeme bilgileri eksik.');
            setIsProcessing(false);
            sendPotentialLead({ name, email, phone: formattedPhone, reason: 'submit_error' });
            return;
        }

        try {
            const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
                elements,
                params: {
                    billing_details: {
                        name,
                        email,
                        phone: formattedPhone,
                    },
                },
            });

            if (pmError) {
                setErrorMessage(pmError.message || 'Ödeme yöntemi oluşturulurken hata oluştu.');
                setIsProcessing(false);
                sendPotentialLead({ name, email, phone: formattedPhone, reason: 'payment_method_error' });
                return;
            }

            const res = await fetch('/.netlify/functions/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone: formattedPhone,
                    paymentMethodId: paymentMethod.id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Abonelik oluşturulamadı.');
            }

            // Confirm the $1 payment on the frontend (handles 3DS too)
            const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setErrorMessage(confirmError.message || 'Ödeme onaylanamadı.');
                sendPotentialLead({ name, email, phone: formattedPhone, reason: 'payment_confirm_error' });
                setIsProcessing(false);
                return;
            }

            // ── Payment confirmed — subscription is now 'trialing' ──
            paymentCompletedRef.current = true;
            potentialSentRef.current = true;

            // Send success webhook via server-side proxy (no CORS issues)
            await fetch(WEBHOOK_PROXY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'success',
                    customerName: name,
                    customerEmail: email,
                    customerPhone: formattedPhone,
                    subscriptionId: data.subscriptionId,
                    customerId: data.customerId,
                    event: 'payment_success',
                    timestamp: new Date().toISOString(),
                }),
                keepalive: true,
            }).catch(() => {});

            // Transition to ThankYouPage — pixel fires there (stable, mounted component)
            onSuccess({ name, email, phone: formattedPhone });

        } catch (err: any) {
            setErrorMessage(err.message || 'Beklenmeyen bir hata oluştu.');
            sendPotentialLead({ name, email, phone: formattedPhone, reason: 'unexpected_error' });
        } finally {
            // Only re-enable if payment was NOT completed (pre-payment errors)
            if (!paymentCompletedRef.current) {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Step Indicator */}
            <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${step === 1 ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {step === 1 ? <User size={14} /> : <CheckCircle2 size={14} />}
                    <span>1. Bilgiler</span>
                </div>
                <div className="w-4 h-px bg-white/10" />
                <div className={`flex items-center gap-2 flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${step === 2 ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-zinc-600 border border-white/5'}`}>
                    <CreditCard size={14} />
                    <span>2. Ödeme</span>
                </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
                <form onSubmit={handleStep1} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-zinc-300">Ad Soyad</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tam Adınız"
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-zinc-300">E-posta</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta Adresiniz"
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-zinc-300">Telefon Numarası</label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            placeholder="05xxxxxxxxx"
                            maxLength={11}
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-400 text-sm font-medium p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-1 relative group overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        Devam Et
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-zinc-600 text-[11px]">
                        <Shield size={12} />
                        <span>Bilgilerin güvende — bir sonraki adımda ödeme yapacaksın.</span>
                    </div>
                </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Summary of user info */}
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{name}</p>
                            <p className="text-xs text-zinc-500 truncate">{email}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setStep(1); setErrorMessage(null); }}
                            className="text-[11px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1"
                        >
                            <ArrowLeft size={12} />
                            Düzenle
                        </button>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg shrink-0">
                        <PaymentElement options={{ layout: 'tabs' }} />
                    </div>

                    {errorMessage && (
                        <div className="text-red-400 text-sm font-medium p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        disabled={isProcessing || !stripe || !elements}
                        className="w-full mt-1 relative group overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <span className="relative flex items-center justify-center gap-2">
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    İşleniyor...
                                </>
                            ) : (
                                '3 Gün $1 Denemeyi Başlat'
                            )}
                        </span>
                    </button>

                    <p className="text-xs text-zinc-500 text-center mt-1">
                        Uygulamayı deneyimleyebilmeniz için ilk 3 günlük sınırsız erişimi $1 ile sınırlı tutuyoruz. 3 Günün sonunda aylık $47 üzerinden aboneliğiniz başlayacaktır. Dilediğiniz zaman iptal edebilirsiniz.
                    </p>
                </form>
            )}
        </div>
    );
};

// Helper: send potential lead webhook via server-side proxy
function sendPotentialLead(data: { name: string; email: string; phone: string; reason: string }) {
    if (!data.name && !data.email && !data.phone) return;
    fetch(WEBHOOK_PROXY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'potential',
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: data.phone,
            event: 'payment_failed',
            reason: data.reason,
            timestamp: new Date().toISOString(),
        }),
    }).catch(() => { /* silent fail */ });
}
