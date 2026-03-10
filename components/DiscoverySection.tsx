
import React from 'react';
import { Search, CheckCircle2, TrendingUp } from 'lucide-react';

const DiscoverySection: React.FC = () => {
  return (
    <section className="py-32 bg-[#080808] border-b border-white/5">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-800 px-5 py-2 rounded-sm text-[12px] font-black mono text-zinc-300 tracking-[0.3em] uppercase border border-white/10">
            Araç: MARKET DISCOVERY
          </div>
          <div className="h-px bg-white/5 flex-1" />
          <div className="text-[10px] mono text-zinc-700 font-bold tracking-widest uppercase hidden sm:block">
            TREND_VALIDATION_STREAM // ID: DCV-99
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <div className="order-2 lg:order-1 glass rounded-[2.5rem] p-12 border border-white/10 space-y-10 relative bg-zinc-900/20">
            <div className="flex justify-between items-center text-[10px] mono text-zinc-500 uppercase tracking-[0.3em] font-black">
              <span>Veri Doğrulama Akışı // Güven Skoru: %98</span>
            </div>

            <div className="flex gap-8 items-center border-b border-white/5 pb-8">
              <div className="w-24 h-24 rounded-[2rem] bg-zinc-800 border border-white/10 flex items-center justify-center shadow-2xl">
                <TrendingUp className="text-emerald-500" size={32} />
              </div>
              <div>
                <h4 className="text-3xl font-black tracking-tighter">Bebek Kalça Taşıyıcı Pro</h4>
                <div className="flex items-center gap-4 mt-2">
                   <span className="text-xs text-zinc-500 font-bold uppercase mono tracking-widest">Niş: Anne & Bebek</span>
                   <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black mono tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     KÜRESEL TREND
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-zinc-950 border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <img src="https://flagcdn.com/us.svg" className="w-8 rounded-sm opacity-60 grayscale hover:grayscale-0 transition-all" />
                  <span className="text-emerald-500 font-black mono text-xl">$2.4M</span>
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-zinc-400">ABD PAZARI</div>
                <div className="text-[10px] text-zinc-600 font-black uppercase mono">VERİ KANITI</div>
              </div>

              <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/20 space-y-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/[0.02] group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start relative z-10">
                  <img src="https://flagcdn.com/tr.svg" className="w-8 rounded-sm shadow-lg" />
                  <span className="text-blue-400 font-black uppercase text-[10px] mono tracking-[0.3em]">MANTIKLI GİRİŞ</span>
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-white relative z-10">TR PAZARI</div>
                <div className="text-[10px] text-blue-500 font-black uppercase mono relative z-10">REKABET SEVİYESİ: DÜŞÜK</div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 shadow-inner">
              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Sistem Öngörüsü</h5>
              <p className="text-lg text-zinc-300 leading-relaxed font-medium italic">
                "Bu ürün Q4'te globalde <span className="text-white font-bold">$2.4M</span> ciro yakaladı. TR pazarında veriler <span className="text-blue-400 font-bold">henüz doygunluğa ulaşılmadığını</span> gösteriyor."
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mono">
              <Search size={12} />
              ANALİZ KATMANI — KONTROLLÜ SEÇİM
            </div>

            <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Tahmine değil, <br />
              <span className="text-zinc-600 italic">veriye güvenin.</span>
            </h2>

            <p className="text-2xl text-zinc-400 leading-relaxed font-medium border-l-4 border-blue-600 pl-8">
              ProductHub, küresel e-ticaret trafiğini 7/24 tarar. Amerika'da başarısı kanıtlanmış ama Türkiye'de <span className="text-white underline decoration-blue-500/40 font-bold">henüz yeterli satıcıya ulaşmamış</span> fırsatları önünüze getirir.
            </p>

            <ul className="space-y-6 pt-4">
              {[
                { label: "Tahmin değil,", highlight: "kanıtlanmış veri akışı." },
                { label: "Şans değil,", highlight: "matematiksel netlik." },
                { label: "Bilinmezlik değil,", highlight: "kontrollü büyüme." }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-2xl group cursor-default">
                  <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-zinc-500 font-medium tracking-tight">
                    {item.label} <span className="text-white font-black">{item.highlight}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;
