
import React from 'react';
import { ShoppingCart, CreditCard, CheckCircle2, Zap, Layout, ShieldCheck, Star } from 'lucide-react';

const ThemeSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] overflow-hidden relative border-b border-white/5">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-emerald-600 px-5 py-2 rounded-sm text-[12px] font-black mono text-white tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Araç: ROASELL THEME
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            CONVERSION_OPTIMIZED_UI // V4.0
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          <div className="relative group">
            {/* Background Flair */}
            <div className="absolute -inset-10 bg-blue-600/5 rounded-full blur-[100px] animate-pulse" />

            {/* Store UI Composite */}
            <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 bg-[#0a0a0c]">
              {/* Browser Header */}
              <div className="h-10 bg-zinc-900 border-b border-white/5 flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                </div>
                <div className="flex-1 max-w-sm mx-auto bg-white/5 rounded-md h-5 flex items-center px-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50 mr-2" />
                  <div className="text-[8px] mono text-zinc-600 tracking-tighter uppercase font-bold">HTTPS://DOGRULANMIS-MAGAZANIZ.ROASELL.SHOP</div>
                </div>
              </div>

              <div className="p-10 space-y-10">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-black tracking-tighter uppercase italic">MARKANIZ</div>
                  <div className="flex gap-4 items-center opacity-60">
                    <Layout size={18} />
                    <ShoppingCart size={18} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-1/2 aspect-square bg-zinc-800/50 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group/img">
                    <Zap className="text-white/10" size={100} />
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-black text-emerald-400">DENETLENMİŞ ALTYAPI</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="h-8 w-3/4 bg-white/10 rounded-lg" />
                      <div className="flex gap-1 text-yellow-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        <span className="text-[10px] text-zinc-500 mono ml-2 font-bold">(VERİYE DAYALI GÜVEN)</span>
                      </div>
                    </div>
                    <div className="h-6 w-1/3 bg-white/5 rounded" />
                    <div className="space-y-3">
                      <div className="h-14 w-full bg-blue-600 rounded-xl flex items-center justify-center text-sm font-black tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer">MAĞAZAYI AKTİF ET</div>
                      <div className="flex justify-center gap-4 py-2 border-y border-white/5">
                        <CreditCard size={14} className="text-zinc-600" />
                        <div className="h-3 w-20 bg-zinc-800 rounded mt-0.5" />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="h-2 w-full bg-zinc-900 rounded-full" />
                      <div className="h-2 w-full bg-zinc-900 rounded-full" />
                      <div className="h-2 w-2/3 bg-zinc-900 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Conversion Badges */}
            <div className="absolute -bottom-8 -right-8 glass p-6 rounded-3xl border border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.2)] z-20 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-white uppercase tracking-widest">ROASELL THEME</div>
                  <div className="text-[10px] text-emerald-500 font-black mono tracking-tighter italic">DÖNÜŞÜM ORANI: %2</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-16 -translate-y-1/2 glass p-5 rounded-2xl border border-blue-500/20 shadow-2xl z-20 hidden md:block backdrop-blur-3xl">
              <ShieldCheck className="text-blue-500 mb-3" size={32} />
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] leading-tight">SHOPIFY<br />GÜVENCESİYLE</div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[10px] font-black mono tracking-[0.3em] uppercase">
              <Zap size={12} className="text-blue-500 fill-blue-500" />
              YÜKSEK DÖNÜŞÜM— ESTETİK TASARIM
            </div>

            <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Kötü mağaza <br />
              <span className="text-zinc-600 italic">kurmanızı önler.</span>
            </h2>

            <p className="text-2xl text-zinc-400 leading-relaxed font-medium">
              Yeni başlayanların yaptığı hatalarını ortadan kaldırır. RoaSell Theme, Shopify altyapınızda <span className="text-white font-bold underline decoration-blue-500/50">yanlış UI, yanlış kompozisyon yüzünden müşteri kaybetmenizi</span> engellemek için Roasell Hafızası sayesinde hazırlanmıştır.
            </p>

            <div className="space-y-8 pt-4">
              {[
                { title: "Tasarım Hatasını Engeller", desc: "Yeni başlayan hatalarını ortadan kaldırarak profesyonel bir başlangıç sağlar.", icon: <Layout className="text-blue-500" /> },
                { title: "Güven Faktörleri", desc: "Müşterinin sepeti terk etme riskini azaltan denetlenmiş bileşenler.", icon: <Star className="text-yellow-500" /> },
                { title: "Optimize Edilmiş Akış", desc: "Teknik sorunlardan kaynaklanan dönüşüm kayıplarını minimuma indirir.", icon: <CreditCard className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-2xl tracking-tight uppercase italic">{item.title}</h4>
                    <p className="text-zinc-500 text-lg font-medium leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40 italic text-zinc-500 text-lg font-medium">
              "Görsel veya teknik hatalar sermayenizi tüketmesin. Biz sadece doğru kurgulanmış bir Shopify altyapısı sunuyoruz."
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
