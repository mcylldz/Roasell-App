import React, { useEffect } from 'react';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

interface ThankYouPageProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ customerName, customerEmail, customerPhone }) => {
    useEffect(() => {
        // Guard — React strict mode + aynı session'da çift tetiklenmeyi önle
        if (sessionStorage.getItem('__purchase_pixel_sent')) return;
        sessionStorage.setItem('__purchase_pixel_sent', '1');

        const event_id = uuidv4();
        const nameParts = customerName.trim().split(/\s+/);
        const firstName = (nameParts[0] || '').toLowerCase();
        const lastName = (nameParts.slice(1).join(' ') || '').toLowerCase();
        const cleanPhone = customerPhone.replace(/\D/g, '');
        const cleanEmail = customerEmail.toLowerCase().trim();

        // Read Meta cookies for verification
        const fbp = getCookie('_fbp');
        const fbc = getCookie('_fbc');

        console.log('[Meta Pixel] Advanced Matching data:', {
            em: cleanEmail, fn: firstName, ln: lastName, ph: cleanPhone,
            fbp: fbp || '(auto from cookie)', fbc: fbc || '(no fbclid click)',
            ua: 'auto from browser', ip: 'auto from request',
        });

        // Re-init pixel with Advanced Matching — kullanıcı verilerini Meta'ya bağla
        // fbp, fbc, user_agent, ip_address pixel tarafından otomatik gönderilir
        const updatePixelAndSend = () => {
            if (window.fbq) {
                window.fbq('init', '170135295273206', {
                    em: cleanEmail,
                    fn: firstName,
                    ln: lastName,
                    ph: cleanPhone,
                    country: 'tr',
                    external_id: cleanEmail,
                });

                window.fbq('track', 'Purchase', {
                    value: 47,
                    currency: 'USD',
                    content_type: 'product',
                    content_ids: ['roasell-app-subscription'],
                    content_name: 'Roasell App Subscription',
                }, {
                    eventID: event_id,
                });
                return true;
            }
            return false;
        };

        // fbq yüklüyse hemen gönder, yoksa max 3sn retry yap
        if (!updatePixelAndSend()) {
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (updatePixelAndSend() || attempts >= 15) {
                    clearInterval(interval);
                }
            }, 200);
        }
    }, [customerName, customerEmail, customerPhone]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-40" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 opacity-30" />

            <div className="relative w-full max-w-lg text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase italic mb-3">
                    Ödeme Başarılı! 🎉
                </h1>
                <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-8">
                    Roasell App'e Hoş Geldiniz
                </p>

                {/* Info Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 text-left space-y-5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                            <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-black text-base uppercase tracking-tight mb-1">
                                Giriş Bilgileriniz Yolda
                            </h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Hesabınız oluşturuluyor. Giriş bilgileriniz <span className="text-white font-bold">birkaç dakika içinde</span> kayıtlı e-posta adresinize iletilecektir.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-5">
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            📬 Lütfen spam/gereksiz klasörünüzü de kontrol edin. E-posta 5 dakika içinde gelmezse destek ekibimizle iletişime geçin.
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 text-left mb-8">
                    {[
                        { step: '01', text: 'E-postanızı kontrol edin' },
                        { step: '02', text: 'Giriş bilgilerinizle panele giriş yapın' },
                        { step: '03', text: 'Algoritmayı entegre etmeye başlayın' },
                    ].map((item) => (
                        <div key={item.step} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0">
                                {item.step}
                            </div>
                            <span className="text-zinc-300 text-sm font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>


                <p className="text-zinc-600 text-xs mt-6">
                    © 2025 Roasell Marketing Science Engine
                </p>
            </div>
        </div>
    );
};

export default ThankYouPage;
