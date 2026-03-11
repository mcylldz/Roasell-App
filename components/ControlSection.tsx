
import React from 'react';
import { Target, TrendingUp, Globe, ShieldCheck, Activity, Award, ArrowRight } from 'lucide-react';

const ControlSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0d0d10] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-zinc-700 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-zinc-100 tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            Araç: ROASELL LAB
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[9px] sm:text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            RESEARCH_AND_DEVELOPMENT // SEC-44
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="space-y-6 order-2 lg:order-1">
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 sm:space-y-8 relative overflow-hidden bg-zinc-950/40">
              <div className="flex justify-between items-center text-[9px] sm:text-[10px] mono text-zinc-500 uppercase tracking-[0.3em] font-black">
                <span>Pazar Verisi // LAB_MODU_GELECEK</span>
                <span>Bebek & Çocuk / TR</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none italic">#4</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-emerald-400 font-black text-xl sm:text-2xl italic tracking-tight">HEDEF SEVİYE</span>
                    <span className="text-zinc-600 text-[9px] sm:text-[10px] font-black mono tracking-[0.3em]">POTANSİYEL KONUM</span>
                  </div>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-medium leading-tight">Bu nişteki büyüme hızı <span className="text-white font-black underline decoration-emerald-500/50">verilere göre</span> gelecekteki konumunuzu belirler.</p>

                <div className="relative pt-8 pb-3">
                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-400 w-[95%] h-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                  </div>
                  <div className="flex justify-between mt-3 text-[9px] sm:text-[10px] mono text-zinc-600 font-black tracking-widest">
                    <span>SEKTÖR ORTALAMASI</span>
                    <span>HEDEF LİDERLER</span>
                  </div>
                  <div className="absolute top-4 right-[4%] -translate-y-full flex flex-col items-center">
                    <div className="text-[9px] sm:text-[10px] mono font-black text-white bg-blue-600 px-2 py-0.5 rounded-full mb-1">HEDEF</div>
                    <div className="w-[2px] h-8 bg-gradient-to-t from-blue-600 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-5 sm:p-6 border border-white/10 space-y-3 hover:border-blue-500/30 transition-all cursor-default">
                <Activity className="text-blue-500" size={24} />
                <div>
                  <div className="text-2xl sm:text-3xl font-black italic tracking-tighter">12.4x</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-600 mono font-black uppercase tracking-widest">Pazar Hızı</div>
                </div>
              </div>
              <div className="glass rounded-xl p-5 sm:p-6 border border-white/10 space-y-3 hover:border-emerald-500/30 transition-all cursor-default">
                <TrendingUp className="text-emerald-500" size={24} />
                <div>
                  <div className="text-2xl sm:text-3xl font-black italic tracking-tighter">+%42</div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-600 mono font-black uppercase tracking-widest">Büyüme İvmesi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Award size={12} className="text-emerald-400" />
              GELECEK VİZYONU — GELİŞİM KATMANI
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85]">
                Büyüme <br />
                <span className="text-zinc-600 italic">potansiyelinizi görün.</span>
              </h2>
              <div className="space-y-3">
                <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium border-l-4 border-emerald-500 pl-4 sm:pl-6">
                  RoaSell Lab, işletmenizi küresel verilerle kıyaslar. Bu ekran bugün nerede olduğunuzu değil, yarın nereye gidebileceğinizi gösterir.
                </p>
                <p className="text-sm sm:text-base text-zinc-500 italic pl-4 sm:pl-6">
                  Veriye dayalı adımlar atarak küresel bir oyuncu olma yolunda ilerleyin.
                </p>
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {[
                { title: "Küresel Radar", desc: "Dünya liderlerinin stratejilerini inceleyerek kendi büyüme haritanızı çıkarın.", icon: <Globe className="text-blue-500" /> },
                { title: "Gelişim Analizi", desc: "Pazar açıklarını ve rakiplerinizin göremediği fırsatları verilerle tespit edin.", icon: <ShieldCheck className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-5 group cursor-default">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-lg sm:text-xl tracking-tight uppercase italic">{item.title}</h4>
                    <p className="text-sm sm:text-base text-zinc-500 font-medium leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-6 sm:px-8 py-4 bg-zinc-800 text-white font-black rounded-xl hover:bg-zinc-700 transition-all border border-white/10 flex items-center gap-3 shadow-xl shadow-black uppercase tracking-widest text-xs sm:text-sm">
              Şimdi Katıl
              <ArrowRight size={16} className="text-zinc-500" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ControlSection;
