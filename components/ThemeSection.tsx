
import React from 'react';
import { ShoppingCart, CreditCard, CheckCircle2, Zap, Layout, ShieldCheck, Star } from 'lucide-react';

const ThemeSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] overflow-hidden relative border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-emerald-600 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Araç: ROASELL THEME
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[9px] sm:text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            CONVERSION_OPTIMIZED_UI // V4.0
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="relative group">
            {/* Background Flair */}
            <div className="absolute -inset-6 bg-blue-600/5 rounded-full blur-[80px] animate-pulse" />

            {/* Store UI Composite */}
            <div className="glass rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative z-10 bg-[#0a0a0c]">
              {/* Browser Header */}
              <div className="h-8 sm:h-10 bg-zinc-900 border-b border-white/5 flex items-center px-4 sm:px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <div className="flex-1 max-w-sm mx-auto bg-white/5 rounded-md h-4 sm:h-5 flex items-center px-2 sm:px-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50 mr-2" />
                  <div className="text-[7px] sm:text-[8px] mono text-zinc-600 tracking-tighter uppercase font-bold truncate">HTTPS://DOGRULANMIS-MAGAZANIZ.ROASELL.SHOP</div>
                </div>
              </div>

              <div className="p-5 sm:p-7 space-y-6 sm:space-y-8">
                <div className="flex justify-between items-center">
                  <div className="text-lg sm:text-xl font-black tracking-tighter uppercase italic">MARKANIZ</div>
                  <div className="flex gap-3 items-center opacity-60">
                    <Layout size={16} />
                    <ShoppingCart size={16} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                  <div className="w-full md:w-1/2 aspect-square bg-zinc-800/50 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group/img">
                    <Zap className="text-white/10" size={60} />
                    <div className="absolute top-3 left-3 glass px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black text-emerald-400">DENETLENMİŞ ALTYAPI</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <div className="h-6 sm:h-8 w-3/4 bg-white/10 rounded-lg" />
                      <div className="flex gap-1 text-yellow-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={9} fill="currentColor" />)}
                        <span className="text-[9px] sm:text-[10px] text-zinc-500 mono ml-2 font-bold">(VERİYE DAYALI GÜVEN)</span>
                      </div>
                    </div>
                    <div className="h-5 w-1/3 bg-white/5 rounded" />
                    <div className="space-y-2">
                      <div className="h-11 sm:h-12 w-full bg-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm font-black tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer">MAĞAZAYI AKTİF ET</div>
                      <div className="flex justify-center gap-3 py-2 border-y border-white/5">
                        <CreditCard size={12} className="text-zinc-600" />
                        <div className="h-3 w-16 bg-zinc-800 rounded mt-0.5" />
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-2 w-full bg-zinc-900 rounded-full" />
                      <div className="h-2 w-full bg-zinc-900 rounded-full" />
                      <div className="h-2 w-2/3 bg-zinc-900 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Conversion Badges */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass p-3 sm:p-4 rounded-xl border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.2)] z-20 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-500" size={18} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest">ROASELL THEME</div>
                  <div className="text-[9px] sm:text-[10px] text-emerald-500 font-black mono tracking-tighter italic">DÖNÜŞÜM ORANI: %2</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-10 sm:-left-12 -translate-y-1/2 glass p-3 sm:p-4 rounded-xl border border-blue-500/20 shadow-2xl z-20 hidden md:block backdrop-blur-3xl">
              <ShieldCheck className="text-blue-500 mb-2" size={24} />
              <div className="text-[9px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-tight">SHOPIFY<br />GÜVENCESİYLE</div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Zap size={12} className="text-blue-500 fill-blue-500" />
              YÜKSEK DÖNÜŞÜM— ESTETİK TASARIM
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85]">
              Kötü mağaza <br />
              <span className="text-zinc-600 italic">kurmanızı önler.</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium">
              Yeni başlayanların yaptığı hatalarını ortadan kaldırır. RoaSell Theme, Shopify altyapınızda <span className="text-white font-bold underline decoration-blue-500/50">yanlış UI, yanlış kompozisyon yüzünden müşteri kaybetmenizi</span> engellemek için Roasell Hafızası sayesinde hazırlanmıştır.
            </p>

            <div className="space-y-5 sm:space-y-6 pt-2">
              {[
                { title: "Tasarım Hatasını Engeller", desc: "Yeni başlayan hatalarını ortadan kaldırarak profesyonel bir başlangıç sağlar.", icon: <Layout className="text-blue-500" /> },
                { title: "Güven Faktörleri", desc: "Müşterinin sepeti terk etme riskini azaltan denetlenmiş bileşenler.", icon: <Star className="text-yellow-500" /> },
                { title: "Optimize Edilmiş Akış", desc: "Teknik sorunlardan kaynaklanan dönüşüm kayıplarını minimuma indirir.", icon: <CreditCard className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 mt-0.5 shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-lg sm:text-xl tracking-tight uppercase italic">{item.title}</h4>
                    <p className="text-zinc-500 text-sm sm:text-base font-medium leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-white/5 bg-zinc-900/40 italic text-zinc-500 text-sm sm:text-base font-medium">
              "Görsel veya teknik hatalar sermayenizi tüketmesin. Biz sadece doğru kurgulanmış bir Shopify altyapısı sunuyoruz."
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
