
import React from 'react';
import { ShieldAlert, Activity, AlertTriangle, ShieldCheck, Shield } from 'lucide-react';

const ScoreSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] relative border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-red-600 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            Araç: AI ANALİZ MOTORU
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[9px] sm:text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            PROFIT_GUARD_SYSTEM // ACTIVE_MONITORING
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-red-500/20 text-red-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Shield size={12} className="text-red-500" />
              DİJİTAL EMNİYET KEMERİ - REKLAM DENETİMİ
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85]">
              Karlılığınızı <br />
              <span className="text-zinc-600 italic">denetim altına alın.</span>
            </h2>

            <div className="space-y-4">
              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium border-l-4 border-red-500/50 pl-4 sm:pl-6">
                En basit haliyle Roasell, 7 yıllık veri havuzuyla beslenmiş tecrübesini kullanarak reklamlarda neye para harcayıp neye harcamayacağınızı söyler. Ölçeklerken Kârlılığınızı gözetir.
              </p>
            </div>

            <div className="grid gap-4 pt-2">
              {[
                { label: "Kreatif Analizi.", sub: "Tıklama alan ama satmayan kreatifleri anında tespit eder.", icon: <Activity className="text-blue-500" /> },
                { label: "Marj Koruması.", sub: "Kar marjı riskli seviyelere düşen setlerde seni uyarır.", icon: <AlertTriangle className="text-red-500" /> },
                { label: "Ölçekleme Sinyali.", sub: "Yüksek tutundurma (Hold) oranına sahip kreatifleri öne çıkarır.", icon: <ShieldCheck className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-zinc-800 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg text-zinc-400 font-medium">
                    <span className="text-white font-black uppercase tracking-tight italic">{item.label}</span> {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Score Dashboard */}
          <div className="relative p-0.5 bg-gradient-to-br from-red-500/20 to-transparent rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="bg-[#0a0a0c] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden group shadow-2xl">

              <div className="flex items-start justify-between mb-8 sm:mb-10">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">3.8</span>
                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-black text-zinc-500 tracking-[0.2em] uppercase">Denetim Skoru</h3>
                      <p className="text-[10px] sm:text-xs text-red-500 font-black uppercase tracking-widest animate-pulse">KORUMA MÜDAHALESİ ÖNERİLİR</p>
                    </div>
                  </div>
                </div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-red-500/5 border border-red-500/20 shadow-inner">
                  <div className="relative">
                    <Shield className="text-red-500/30" size={32} />
                    <AlertTriangle className="text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Card 1 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#111113] border border-white/5 group-hover:border-yellow-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                      <span className="text-sm sm:text-base font-black text-zinc-200 uppercase tracking-tight italic">REKLAM VERİMLİLİĞİ</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black mono text-zinc-600">ROAS 2.1</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-zinc-600 font-black uppercase tracking-widest mt-1.5 ml-4">YÜKSEK MALİYET UYARISI.</p>
                </div>

                {/* Card 2 */}
                <div className="p-4 sm:p-5 rounded-xl bg-red-500/5 border border-red-500/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.05)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span className="text-sm sm:text-base font-black text-white uppercase tracking-tight italic">SEPET KAÇAKLARI</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black mono text-red-500">%12 (DİKKAT)</span>
                  </div>
                  <div className="pl-4 border-l-2 border-red-500/40 space-y-1.5">
                    <p className="text-[11px] sm:text-[12px] text-zinc-400 font-bold">
                      <span className="text-red-500 uppercase tracking-widest mr-1 mono">TESPİT:</span> Kargo ücreti son adımda çıkıyor.
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-zinc-300 font-black">
                      <span className="text-white uppercase tracking-widest mr-1 mono">RISK:</span> Günde ~840 TL Verimsiz Bütçe
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#111113] border border-white/5 group-hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-sm sm:text-base font-black text-zinc-200 uppercase tracking-tight italic">SAYFA HIZI</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black mono text-zinc-600">88/100</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-zinc-600 font-black uppercase tracking-widest mt-1.5 ml-4">DENETİMDEN GEÇTİ.</p>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[80px] -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScoreSection;
