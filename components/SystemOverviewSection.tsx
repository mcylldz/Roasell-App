
import React from 'react';
import { ShieldCheck, ArrowRight, UserCheck, UserMinus, MonitorPlay, Zap, Activity, Target } from 'lucide-react';

const SystemOverviewSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-900 px-5 py-2 rounded-sm text-[12px] font-black mono text-zinc-500 tracking-[0.3em] uppercase border border-white/5">
            Araç: SYSTEM LOGIC
          </div>
          <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-8 italic uppercase">
            RoaSell sadece bir yazılım değil. <br />
            <span className="text-zinc-600">Bir başlangıç sistemi.</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed font-medium">
            Sadece bir "tool" satmıyoruz. E-ticarete adım atarken karşılaşacağınız belirsizlikleri yöneten, Shopify altyapınızı kuran ve büyümenizi denetleyen bütünsel bir süreç sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* How it works block */}
          <div className="glass rounded-[2.5rem] p-12 border border-white/10 space-y-8 relative overflow-hidden">
            <h3 className="text-2xl font-black italic tracking-tight mb-8 uppercase">Süreç Nasıl İlerler?</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-white/5" />
              {[
                { step: "01", text: "ÜrünHub ile veriye dayalı bir ürün seçersiniz.", icon: <Target className="text-blue-500" /> },
                { step: "02", text: "RoaSell Theme ile Shopify mağazanız kurulur.", icon: <Zap className="text-yellow-500" /> },
                { step: "03", text: "AI Motoru satışlarınızı ve reklamlarınızı izler.", icon: <Activity className="text-red-500" /> },
                { step: "04", text: "Sistem, zarar etmeden önce yapmanız gerekeni söyler.", icon: <ShieldCheck className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative z-10">
                   <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                      {item.icon}
                   </div>
                   <div className="pt-2">
                      <p className="text-lg text-zinc-300 font-bold leading-snug">{item.text}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who this is for block */}
          <div className="space-y-12">
            <div className="space-y-8">
               <h3 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
                 <UserCheck className="text-emerald-500" />
                 Bu Kimin İçin?
               </h3>
               <ul className="space-y-4">
                 {["Shopify'a yeni başlayanlar", "Sermayesini kaybetmekten korkanlar", "Tahmine değil, veriye dayalı ilerlemek isteyenler"].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-zinc-400 font-medium text-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="space-y-8 opacity-50">
               <h3 className="text-2xl font-black italic tracking-tight uppercase flex items-center gap-4">
                 <UserMinus className="text-red-500" />
                 Bu Kimin İçin DEĞİL?
               </h3>
               <ul className="space-y-4">
                 {["Amazon satıcıları", "Pasif gelir peşinde koşanlar", "Hızlı zengin olma hayali kuranlar"].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-zinc-500 font-medium text-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
           <button className="px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] text-xl tracking-tighter active:scale-95 group">
             SİSTEMİ ŞİMDİ AKTİF ET
             <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
           </button>
           <p className="mt-6 text-zinc-600 text-xs font-black mono tracking-widest uppercase italic">Shopify Karar Destek Mekanizması</p>
        </div>
      </div>
    </section>
  );
};

export default SystemOverviewSection;
