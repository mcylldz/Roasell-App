
import React from 'react';
import { Target, TrendingUp, Globe, ShieldCheck, Activity, Award, ArrowRight } from 'lucide-react';

const ControlSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#0d0d10] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-700 px-5 py-2 rounded-sm text-[12px] font-black mono text-zinc-100 tracking-[0.3em] uppercase border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            Araç: ROASELL LAB
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            RESEARCH_AND_DEVELOPMENT // SEC-44
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <div className="glass rounded-[3rem] p-12 border border-white/10 space-y-10 relative overflow-hidden bg-zinc-950/40">
              <div className="flex justify-between items-center text-[10px] mono text-zinc-500 uppercase tracking-[0.4em] font-black">
                <span>Pazar Verisi // LAB_MODU_GELECEK</span>
                <span>Bebek & Çocuk / TR</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-baseline gap-6">
                  <span className="text-[120px] font-black text-white tracking-tighter leading-none italic">#4</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-emerald-400 font-black text-3xl italic tracking-tight">HEDEF SEVİYE</span>
                    <span className="text-zinc-600 text-[10px] font-black mono tracking-[0.4em]">POTANSİYEL KONUM</span>
                  </div>
                </div>
                <p className="text-2xl text-zinc-400 font-medium leading-tight">Bu nişteki büyüme hızı <span className="text-white font-black underline decoration-emerald-500/50">verilere göre</span> gelecekteki konumunuzu belirler.</p>
                
                <div className="relative pt-10 pb-4">
                  <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-400 w-[95%] h-full shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] mono text-zinc-600 font-black tracking-widest">
                    <span>SEKTÖR ORTALAMASI</span>
                    <span>HEDEF LİDERLER</span>
                  </div>
                  <div className="absolute top-6 right-[4%] -translate-y-full flex flex-col items-center">
                    <div className="text-[10px] mono font-black text-white bg-blue-600 px-3 py-1 rounded-full mb-2">HEDEF</div>
                    <div className="w-[2px] h-10 bg-gradient-to-t from-blue-600 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Lab Visual Flair */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] " />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass rounded-[2rem] p-8 border border-white/10 space-y-4 hover:border-blue-500/30 transition-all cursor-default">
                 <Activity className="text-blue-500" size={32} />
                 <div>
                   <div className="text-4xl font-black italic tracking-tighter">12.4x</div>
                   <div className="text-[10px] text-zinc-600 mono font-black uppercase tracking-widest">Pazar Hızı</div>
                 </div>
              </div>
              <div className="glass rounded-[2rem] p-8 border border-white/10 space-y-4 hover:border-emerald-500/30 transition-all cursor-default">
                 <TrendingUp className="text-emerald-500" size={32} />
                 <div>
                   <div className="text-4xl font-black italic tracking-tighter">+%42</div>
                   <div className="text-[10px] text-zinc-600 mono font-black uppercase tracking-widest">Büyüme İvmesi</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-[10px] font-black mono tracking-[0.3em] uppercase">
              <Award size={12} className="text-emerald-400" />
              GELECEK VİZYONU — GELİŞİM KATMANI
            </div>

            <div className="space-y-6">
              <h2 className="text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.8">
                Büyüme <br />
                <span className="text-zinc-600 italic">potansiyelinizi görün.</span>
              </h2>
              <div className="space-y-4">
                <p className="text-2xl text-zinc-400 leading-relaxed font-medium border-l-4 border-emerald-500 pl-8">
                  RoaSell Lab, işletmenizi küresel verilerle kıyaslar. Bu ekran bugün nerede olduğunuzu değil, yarın nereye gidebileceğinizi gösterir.
                </p>
                <p className="text-lg text-zinc-500 italic pl-8">
                  Veriye dayalı adımlar atarak küresel bir oyuncu olma yolunda ilerleyin.
                </p>
              </div>
            </div>

            <div className="space-y-8">
               {[
                 { 
                   title: "Küresel Radar", 
                   desc: "Dünya liderlerinin stratejilerini inceleyerek kendi büyüme haritanızı çıkarın.",
                   icon: <Globe className="text-blue-500" />
                 },
                 { 
                   title: "Gelişim Analizi", 
                   desc: "Pazar açıklarını ve rakiplerinizin göremediği fırsatları verilerle tespit edin.",
                   icon: <ShieldCheck className="text-emerald-500" />
                 }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group cursor-default">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                     {item.icon}
                   </div>
                   <div className="space-y-2">
                     <h4 className="font-black text-2xl tracking-tight uppercase italic">{item.title}</h4>
                     <p className="text-lg text-zinc-500 font-medium leading-snug">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>

            <button className="px-10 py-5 bg-zinc-800 text-white font-black rounded-2xl hover:bg-zinc-700 transition-all border border-white/10 flex items-center gap-3 shadow-xl shadow-black uppercase tracking-widest text-sm">
              LAB VİZYONUNU İNCELE
              <ArrowRight size={18} className="text-zinc-500" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ControlSection;
