
import React from 'react';
import { Zap, Activity, Target, ShieldCheck, ArrowRight, ShieldAlert, ChevronRight, MousePointer2, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden border-b border-white/5 bg-[#050505]">
      {/* Background Ambience - Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 opacity-40" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Emotional Narrative for Beginners */}
          <div className="space-y-10 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[10px] font-bold mono tracking-widest uppercase">
              <ShieldAlert size={12} className="animate-pulse" />
              SİSTEM DURUMU: KARAR KORUMA VE DENETİM MODU AKTİF
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-[80px] font-extrabold tracking-tighter leading-[0.95] text-white">
                Shopify'a doğru başlayın. <br />
                <span className="text-zinc-600">Sermayenizi koruyun.</span>
              </h1>

              <div className="space-y-4">
                <p className="text-xl text-zinc-400 leading-relaxed font-medium border-l-2 border-blue-600/50 pl-8 max-w-xl">
                  RoaSell, karar vermeden önce sizi koruyan bir başlangıç sistemidir. Yanlış ürün seçerek bütçenizi yakmanızı önlemek için <span className="text-white font-bold underline decoration-blue-500/50">veriye dayalı yönlendirme</span> yapar, Shopify altyapınızdaki teknik hataları engeller ve kontrollü büyümenizi sağlar.
                </p>
                <div className="flex items-center gap-2 pl-8 text-blue-400 font-bold text-sm italic">
                  <Shield size={16} />
                  <span>RoaSell, başlamadan önce hata yapmanızı engellemek için tasarlanmıştır.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button className="group relative px-10 py-5 bg-white text-black font-black rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
                VERİYE DAYALI ADIM ATIN
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </button>
              
              <button className="px-10 py-5 glass text-white font-bold rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-white/10 group text-sm tracking-widest uppercase mono">
                SİSTEM NASIL KORUR?
                <ChevronRight size={18} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4">
               {[
                 { icon: <ShieldCheck size={16} />, label: "DOĞRULANMIŞ SEÇİM" },
                 { icon: <Zap size={16} />, label: "DENETİMLİ ALTYAPI" },
                 { icon: <Activity size={16} />, label: "KADEMELİ BÜYÜME" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] font-black mono text-zinc-500 uppercase tracking-[0.2em]">
                   <span className="text-emerald-500">{item.icon}</span>
                   {item.label}
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT SIDE: Visual Anchor - Profit Roadmap Command Center */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-[60px] rounded-full animate-pulse" />
            
            <div className="relative glass rounded-[2.5rem] p-10 border border-white/10 shadow-2xl bg-[#080808]/40 backdrop-blur-3xl overflow-hidden">
               {/* Grid Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
               
               <div className="flex justify-between items-center mb-10">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                     <span className="text-[10px] font-black mono text-zinc-500 uppercase tracking-widest">Shopify Denetim Terminali // v2.5</span>
                   </div>
                   <h3 className="text-2xl font-black tracking-tight uppercase italic">Risk Kontrol Paneli</h3>
                 </div>
                 <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
                    <Target className="text-blue-500" size={28} />
                 </div>
               </div>

               <div className="space-y-6 relative">
                 {/* Connecting Line */}
                 <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-800 to-zinc-900" />

                 {[
                   { step: "01", label: "Ürün Doğrulama", sub: "Tahmin değil, pazar verisi", status: "KONTROL EDİLDİ", color: "text-emerald-400", active: true },
                   { step: "02", label: "Shopify Denetimi", sub: "Altyapı hataları engellendi", status: "KORUMALI", color: "text-blue-400", active: true },
                   { step: "03", label: "Satış Analizi", sub: "Verimsiz bütçe taranıyor...", status: "İZLENİYOR", color: "text-zinc-600", active: false }
                 ].map((item, i) => (
                   <div key={i} className={`relative flex items-center gap-6 p-5 rounded-2xl border transition-all duration-500 ${item.active ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-40'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black mono text-sm z-10 ${item.active ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-zinc-800 text-zinc-600'}`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-black uppercase tracking-tight">{item.label}</div>
                        <div className="text-[11px] text-zinc-500 font-medium">{item.sub}</div>
                      </div>
                      <div className={`text-[10px] font-black mono ${item.color}`}>{item.status}</div>
                   </div>
                 ))}
               </div>

               <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="text-blue-400" size={16} />
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Sistem Analizi</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-bold italic">
                    "Şu an ABD pazarında <span className="text-white">Isıtmalı Göz Maskesi</span> talebi yüksek ve <span className="text-emerald-400 font-black">dönüşüm oranı %2</span>. TR pazarında veriler <span className="text-blue-400 font-bold underline">henüz doygunluğa ulaşılmadığını</span> gösteriyor. Shopify mağazanız için mantıklı bir başlangıç noktası."
                  </p>
                  <MousePointer2 className="absolute bottom-4 right-4 text-white/20 rotate-12" size={24} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
