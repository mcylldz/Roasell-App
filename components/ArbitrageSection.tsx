
import React from 'react';
import { Globe, ArrowRight, Zap } from 'lucide-react';

const ArbitrageSection: React.FC = () => {
  return (
    <section className="py-4 bg-[#050505] border-b border-white/5 relative">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-blue-600 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Araç: ÜRÜNHUB
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[9px] sm:text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            ARBITRAGE_DETECTION_ENGINE // V1.0
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-zinc-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              <Globe size={12} className="text-blue-500" />
              DETAYLI PAZAR ANALİZİ
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9]">
              Ne satmalıyım? <br />
              <span className="text-zinc-600">Belirsizliğini bitirin.</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-lg font-medium">
              Tarihin en maliyetli tavsiyesi: <span className="text-white italic">'Her ürün iyi pazarlama ile satar'.</span><br /><br />
              Bu fiyaskoyu verilerle tarihe karıştırır. Globalde satılan ürünlerin hacimlerini ve Türkiye'deki pazar hacmini önünüze serer. <span className="text-white underline decoration-blue-500/50">Piyasalardaki boşlukları</span> keşfetmenizi sağlar.<br /><br />
              Ne satılıyor? cevabını verir, ne satmalıyım belirsizliğini bitirir.
            </p>

            <button className="group inline-flex items-center gap-3 text-blue-500 font-black uppercase text-sm tracking-widest hover:text-white transition-all">
              ŞİMDİ BAŞLA
              <div className="w-9 h-9 rounded-full border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>

          <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-white/10 space-y-5 sm:space-y-6 bg-[#0a0a0c]">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-xs sm:text-sm font-black mono text-zinc-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Pazar Tespit Radarı</h3>
              <span className="text-[9px] sm:text-[10px] mono text-blue-400 animate-pulse font-black">Pazar Dinleniyor</span>
            </div>

            {/* Opportunity Card 1 */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 space-y-5 group hover:bg-white/[0.08] transition-all cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center shadow-xl">
                    <Zap className="text-yellow-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg sm:text-xl tracking-tight">Taşınabilir Boyun Fanı</h4>
                    <p className="text-[10px] sm:text-xs text-zinc-500 mono font-bold uppercase tracking-widest mt-0.5">AYLIK HACİM: $124k+</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 p-3 sm:p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                  <div className="text-[9px] sm:text-[10px] text-zinc-600 font-black uppercase mb-1 tracking-widest">Kaynak 🇺🇸</div>
                  <div className="text-base sm:text-lg font-black italic">ABD Pazarı</div>
                  <div className="text-[9px] sm:text-[10px] text-emerald-500 mt-1 font-black mono">YÜKSEK TALEP</div>
                </div>
                <div className="text-blue-500 animate-pulse shrink-0">
                  <ArrowRight size={22} />
                </div>
                <div className="flex-1 p-3 sm:p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="text-[9px] sm:text-[10px] text-blue-500 font-black uppercase mb-1 tracking-widest">Hedef 🇹🇷</div>
                  <div className="text-base sm:text-lg font-black italic">TR Pazarı</div>
                  <div className="text-[9px] sm:text-[10px] text-blue-400 mt-1 font-black mono">DOYGUNLUK DÜŞÜK</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <Globe className="text-white" size={20} />
              </div>
              <div className="space-y-1">
                <h5 className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest">İPUCU:</h5>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bold">
                  ABD ve Avrupa pazarında yüksek rekabette olan, fakat henüz Türkiye'de satışına başlanmamış binlerce ürün satıcısını beklerken trendi geçiyor.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArbitrageSection;
