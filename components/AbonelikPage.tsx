import React, { useState, useRef, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, XCircle, Clock, CreditCard, Calendar, X, Mail, ArrowRight } from 'lucide-react';

interface SubData {
    subscriptionId: string;
    customerName: string;
    customerEmail: string;
    statusLabel: string;
    statusDetail: string;
    isTrialing: boolean;
    isActive: boolean;
    isCanceled: boolean;
    isCancelAtPeriodEnd: boolean;
    trialEnd: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    totalPaidUsd: string;
    invoiceCount: number;
    createdAt: string;
}

const fmt = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Logo = () => (
    <a href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4V36M4 20H36M8.68 8.68L31.32 31.32M31.32 8.68L8.68 31.32" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
        <span className="text-xl font-black tracking-tighter text-[#1d4ed8] uppercase italic">RoaSell</span>
    </a>
);

const StatusBadge = ({ data }: { data: SubData }) => {
    if (data.isCanceled)
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold uppercase"><XCircle className="w-3.5 h-3.5" />İptal Edildi</span>;
    if (data.isTrialing)
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase"><Clock className="w-3.5 h-3.5" />Deneme Süreci</span>;
    if (data.isCancelAtPeriodEnd)
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-bold uppercase"><AlertCircle className="w-3.5 h-3.5" />İptal Bekliyor</span>;
    if (data.isActive)
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase"><CheckCircle2 className="w-3.5 h-3.5" />Aktif</span>;
    return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold uppercase">{data.statusLabel}</span>;
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-2.5 text-zinc-400 text-sm min-w-0">
            {icon}<span className="shrink-0">{label}</span>
        </div>
        <span className="text-white text-sm font-medium text-right">{value}</span>
    </div>
);

const AbonelikPage: React.FC = () => {
    const [step, setStep] = useState<'email' | 'otp' | 'result'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpToken, setOtpToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subData, setSubData] = useState<SubData | null>(null);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [cancelResult, setCancelResult] = useState<string | null>(null);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const sendOtp = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/.netlify/functions/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Kod gönderilemedi.');
            setOtpToken(data.token);
            setStep('otp');
            setOtp(['', '', '', '', '', '']);
            setResendCooldown(60);
            setTimeout(() => otpRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (idx: number, val: string) => {
        if (!/^\d*$/.test(val)) return;
        const next = [...otp];
        next[idx] = val.slice(-1);
        setOtp(next);
        if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    };

    const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (text.length === 6) { setOtp(text.split('')); otpRefs.current[5]?.focus(); }
    };

    const verifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) { setError('6 haneli kodu eksiksiz girin.'); return; }
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/.netlify/functions/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase(), otp: code, token: otpToken }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Doğrulama başarısız.');
            setSubData(data);
            setStep('result');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!subData) return;
        setCanceling(true);
        try {
            const res = await fetch('/.netlify/functions/cancel-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase(), subscriptionId: subData.subscriptionId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'İptal başarısız.');
            setCancelResult(data.message);
            setShowConfirm(false);
            setSubData(prev => prev ? { ...prev, isCanceled: data.immediate, isCancelAtPeriodEnd: !data.immediate } : prev);
        } catch (err: any) {
            setCancelResult('Hata: ' + err.message);
            setShowConfirm(false);
        } finally {
            setCanceling(false);
        }
    };

    const canCancel = subData && !subData.isCanceled && !subData.isCancelAtPeriodEnd;

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] -z-0 pointer-events-none" />
            <header className="relative z-10 border-b border-white/5 py-4 px-6"><Logo /></header>

            <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-16 sm:py-24">
                <div className="w-full max-w-lg">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase italic mb-3">Abonelik Detayları</h1>
                        <p className="text-zinc-400 text-sm">
                            {step === 'email' && 'Abonelik bilgilerinizi öğrenmek için e-posta adresinizi girin.'}
                            {step === 'otp' && <><strong className="text-white">{email}</strong> adresine 6 haneli bir doğrulama kodu gönderdik.</>}
                            {step === 'result' && 'Abonelik bilgileriniz aşağıda görüntüleniyor.'}
                        </p>
                    </div>

                    {/* Step 1 — Email */}
                    {step === 'email' && (
                        <form onSubmit={sendOtp} className="flex gap-2">
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="E-posta adresiniz"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm" />
                            <button type="submit" disabled={loading}
                                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm whitespace-nowrap">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                                Devam
                            </button>
                        </form>
                    )}

                    {/* Step 2 — OTP */}
                    {step === 'otp' && (
                        <form onSubmit={verifyOtp}>
                            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                                {otp.map((digit, idx) => (
                                    <input key={idx} ref={el => { otpRefs.current[idx] = el; }}
                                        type="text" inputMode="numeric" maxLength={1} value={digit}
                                        onChange={e => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={e => handleOtpKeyDown(idx, e)}
                                        onPaste={idx === 0 ? handleOtpPaste : undefined}
                                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all" />
                                ))}
                            </div>
                            <button type="submit" disabled={loading || otp.join('').length !== 6}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm mb-4">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                Doğrula
                            </button>
                            <div className="flex items-center justify-between text-xs text-zinc-500">
                                <button type="button" onClick={() => { setStep('email'); setError(null); }}
                                    className="hover:text-zinc-300 transition-colors flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5" /> E-postayı değiştir
                                </button>
                                <button type="button" disabled={resendCooldown > 0} onClick={() => sendOtp()}
                                    className="hover:text-zinc-300 disabled:cursor-not-allowed transition-colors">
                                    {resendCooldown > 0 ? `Tekrar gönder (${resendCooldown}s)` : 'Kodu tekrar gönder'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mt-4">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{error}
                        </div>
                    )}

                    {/* Cancel result */}
                    {cancelResult && (
                        <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm mt-4">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />{cancelResult}
                        </div>
                    )}

                    {/* Step 3 — Result */}
                    {step === 'result' && subData && (
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-white font-black text-base">{subData.customerName || subData.customerEmail}</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">{subData.customerEmail}</p>
                                </div>
                                <StatusBadge data={subData} />
                            </div>

                            <div className="divide-y divide-white/5">
                                <DetailRow icon={<Clock className="w-4 h-4 text-amber-400" />} label="Durum" value={subData.statusDetail || subData.statusLabel} />

                                {!subData.isCanceled && !subData.isCancelAtPeriodEnd && (
                                    <DetailRow icon={<CreditCard className="w-4 h-4 text-blue-400" />} label="Sonraki Ödeme"
                                        value={subData.isTrialing ? fmt(subData.trialEnd) : fmt(subData.currentPeriodEnd)} />
                                )}

                                {subData.isTrialing && subData.trialEnd && (
                                    <DetailRow icon={<Calendar className="w-4 h-4 text-amber-400" />} label="Deneme Bitiş" value={fmt(subData.trialEnd)} />
                                )}

                                {subData.currentPeriodEnd && !subData.isTrialing && (
                                    <DetailRow icon={<Calendar className="w-4 h-4 text-blue-400" />}
                                        label={subData.isCancelAtPeriodEnd ? 'İptal Tarihi' : 'Yenileme Tarihi'}
                                        value={fmt(subData.currentPeriodEnd)} />
                                )}

                                {subData.currentPeriodStart && !subData.isTrialing && (
                                    <DetailRow icon={<Calendar className="w-4 h-4 text-zinc-500" />} label="Dönem Başlangıç" value={fmt(subData.currentPeriodStart)} />
                                )}

                                <DetailRow icon={<CreditCard className="w-4 h-4 text-emerald-400" />} label="Toplam Ödenen" value={`$${subData.totalPaidUsd}`} />
                                <DetailRow icon={<CheckCircle2 className="w-4 h-4 text-zinc-500" />} label="Üyelik Başlangıç" value={fmt(subData.createdAt)} />
                            </div>

                            {canCancel && (
                                <div className="px-6 py-5 border-t border-white/5">
                                    <button onClick={() => setShowConfirm(true)}
                                        className="w-full py-3 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all">
                                        Aboneliği Sonlandır
                                    </button>
                                </div>
                            )}

                            {subData.isCancelAtPeriodEnd && (
                                <div className="px-6 py-4 border-t border-white/5">
                                    <p className="text-zinc-500 text-xs text-center">
                                        Aboneliğiniz {fmt(subData.currentPeriodEnd)} tarihinde otomatik olarak sonlandırılacak.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Cancel confirmation popup */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl p-6">
                        <button onClick={() => setShowConfirm(false)} className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mb-4">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                        <h2 className="text-white font-black text-lg mb-2 tracking-tight">Aboneliği Sonlandır</h2>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            {subData?.isTrialing
                                ? 'Deneme sürecinde olduğunuz için aboneliğiniz anında iptal edilecek. Bu işlemi geri alamazsınız.'
                                : 'Mevcut döneminiz sona erdiğinde aboneliğiniz otomatik olarak iptal edilecek. Bu süre içinde erişiminiz devam eder.'}
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-zinc-300 hover:bg-white/5 font-bold text-sm transition-all">
                                Vazgeç
                            </button>
                            <button onClick={handleCancel} disabled={canceling}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                                {canceling ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Sonlandır
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AbonelikPage;
