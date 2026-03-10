
import React from 'react';
import { ShieldAlert, Activity, AlertTriangle, ShieldCheck, Shield } from 'lucide-react';

const ScoreSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative border-b border-white/5">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-red-600 px-5 py-2 rounded-sm text-[12px] font-black mono text-white tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            Araç: AI ANALİZ MOTORU
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            PROFIT_GUARD_SYSTEM // ACTIVE_MONITORING
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-red-500/20 text-red-400 text-[10px] font-black mono tracking-[0.3em] uppercase">
              <Shield size={12} className="text-red-500" />
              SİSTEM MUHAFIZI — REKLAM DENETİMİ
            </div>

            <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Karlılığınızı <br />
              <span className="text-zinc-600 italic">denetim altına alın.</span>
            </h2>

            <div className="space-y-6">
              <p className="text-2xl text-zinc-400 leading-relaxed font-medium border-l-4 border-red-500/50 pl-8">
                RoaSell, reklam harcamalarınızı ve Shopify sepet hareketlerini <span className="text-white font-bold italic underline decoration-red-500/50">reklam odaklı</span> bir bakış açısıyla analiz eder. Hangi kreatifin parayı yaktığını, hangisinin ölçeklenebilir olduğunu matematiksel olarak raporlar.
              </p>
            </div>

            <div className="grid gap-6 pt-4">
               {[
                { label: "Kreatif Analizi.", sub: "Tıklama alan ama satmayan kreatifleri anında tespit eder.", icon: <Activity className="text-blue-500" /> },
                { label: "Marj Koruması.", sub: "Kar marjı %50'nin altına düşen setlerde sistemi uyarır.", icon: <AlertTriangle className="text-red-500" /> },
                { label: "Ölçekleme Sinyali.", sub: "Yüksek tutundurma (Hold) oranına sahip kreatifleri öne çıkarır.", icon: <ShieldCheck className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-zinc-800 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xl text-zinc-400 font-medium">
                    <span className="text-white font-black uppercase tracking-tight italic">{item.label}</span> {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Score Dashboard - Redesigned per Screenshot 1 */}
          <div className="relative p-1 bg-gradient-to-br from-red-500/20 to-transparent rounded-[3rem] overflow-hidden">
            <div className="bg-[#0a0a0c] rounded-[2.9rem] p-12 border border-white/5 relative overflow-hidden group shadow-2xl">
              
              <div className="flex items-start justify-between mb-12">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-6">
                    <span className="text-[130px] font-black tracking-tighter leading-none text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">3.8</span>
                    <div className="space-y-1">
                       <h3 className="text-sm font-black text-zinc-500 tracking-[0.3em] uppercase">Denetim Skoru</h3>
                       <p className="text-xs text-red-500 font-black uppercase tracking-widest animate-pulse">KORUMA MÜDAHALESİ ÖNERİLİR</p>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 flex items-center justify-center rounded-3xl bg-red-500/5 border border-red-500/20 shadow-inner">
                  <div className="relative">
                    <Shield className="text-red-500/30" size={44} />
                    <AlertTriangle className="text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={20} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 {/* Card 1: Advertising Efficiency */}
                 <div className="p-6 rounded-2xl bg-[#111113] border border-white/5 group-hover:border-yellow-500/20 transition-all">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                       <span className="text-lg font-black text-zinc-200 uppercase tracking-tight italic">REKLAM VERİMLİLİĞİ</span>
                     </div>
                     <span className="text-xs font-black mono text-zinc-600">ROAS 2.1</span>
                   </div>
                   <p className="text-[11px] text-zinc-600 font-black uppercase tracking-widest mt-2 ml-5.5 pl-0.5">YÜKSEK MALİYET UYARISI.</p>
                 </div>

                 {/* Card 2: Basket Leaks (Active Alert) */}
                 <div className="p-7 rounded-3xl bg-red-500/5 border border-red-500/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                       <span className="text-lg font-black text-white uppercase tracking-tight italic">SEPET KAÇAKLARI</span>
                     </div>
                     <span className="text-xs font-black mono text-red-500">%12 (DİKKAT)</span>
                   </div>
                   <div className="pl-6 border-l-2 border-red-500/40 space-y-2">
                     <p className="text-[12px] text-zinc-400 font-bold">
                       <span className="text-red-500 uppercase tracking-widest mr-2 mono">TESPİT:</span> Kargo ücreti son adımda çıkıyor.
                     </p>
                     <p className="text-[12px] text-zinc-300 font-black">
                       <span className="text-white uppercase tracking-widest mr-2 mono">RISK:</span> Günde ~840 TL Verimsiz Bütçe
                     </p>
                   </div>
                 </div>

                 {/* Card 3: Page Speed */}
                 <div className="p-6 rounded-2xl bg-[#111113] border border-white/5 group-hover:border-emerald-500/20 transition-all">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       <span className="text-lg font-black text-zinc-200 uppercase tracking-tight italic">SAYFA HIZI</span>
                     </div>
                     <span className="text-xs font-black mono text-zinc-600">88/100</span>
                   </div>
                   <p className="text-[11px] text-zinc-600 font-black uppercase tracking-widest mt-2 ml-5.5 pl-0.5">DENETİMDEN GEÇTİ.</p>
                 </div>
              </div>

              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScoreSection;
