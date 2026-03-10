
import React from 'react';
import { Globe, ArrowRight, Zap } from 'lucide-react';

const ArbitrageSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] border-b border-white/5 relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-blue-600 px-5 py-2 rounded-sm text-[12px] font-black mono text-white tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Araç: ÜRÜNHUB
          </div>
          <div className="h-px bg-white/10 flex-1" />
          <div className="text-[10px] mono text-zinc-600 font-bold tracking-widest uppercase hidden sm:block">
            ARBITRAGE_DETECTION_ENGINE // V1.0
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              <Globe size={12} className="text-blue-500" />
              Veriye Dayalı Pazar Analizi
            </div>

            <h2 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              "Ne satmalıyım?" <br />
              <span className="text-zinc-600">belirsizliğini azaltın.</span>
            </h2>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg font-medium">
              Sistem, küresel pazarlar arasındaki <span className="text-white">veri boşluklarını</span> saniyeler içinde yakalar. Shopify mağazanız için neyin çalıştığını ve Türkiye'de henüz <span className="text-white underline decoration-blue-500/50">doygunluğa ulaşmamış</span> noktaları tahmine değil veriye göre belirlersiniz.
            </p>

            <button className="group inline-flex items-center gap-4 text-blue-500 font-black uppercase text-sm tracking-widest hover:text-white transition-all">
              VERİLERİ İNCELE 
              <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>

          <div className="glass rounded-3xl p-10 border border-white/10 space-y-8 bg-[#0a0a0c]">
             <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-sm font-black mono text-zinc-500 uppercase tracking-[0.2em]">Pazar Tespit Radarı</h3>
              <span className="text-[10px] mono text-blue-400 animate-pulse font-black">ANALİZ EDİLİYOR</span>
            </div>

            {/* Opportunity Card 1 */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-8 group hover:bg-white/[0.08] transition-all cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center shadow-xl">
                    <Zap className="text-yellow-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-2xl tracking-tight">Taşınabilir Boyun Fanı</h4>
                    <p className="text-xs text-zinc-500 mono font-bold uppercase tracking-widest mt-1">AYLIK HACİM: $124k+</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 p-5 rounded-2xl bg-zinc-950/50 border border-white/5">
                  <div className="text-[10px] text-zinc-600 font-black uppercase mb-2 tracking-widest">Kaynak 🇺🇸</div>
                  <div className="text-lg font-black italic">ABD Pazarı</div>
                  <div className="text-[10px] text-emerald-500 mt-2 font-black mono">YÜKSEK TALEP</div>
                </div>
                <div className="text-blue-500 animate-pulse">
                  <ArrowRight size={28} />
                </div>
                <div className="flex-1 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <div className="text-[10px] text-blue-500 font-black uppercase mb-2 tracking-widest">Hedef 🇹🇷</div>
                  <div className="text-lg font-black italic">TR Pazarı</div>
                  <div className="text-[10px] text-blue-400 mt-2 font-black mono">DOYGUNLUK DÜŞÜK</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-5">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <Globe className="text-white" size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Veri Analizi</h5>
                <p className="text-sm text-zinc-300 leading-relaxed font-bold">
                  "Boyun Fanı" globalde kanıtlanmış bir satış grafiği çizerken, Türkiye'de arama hacmi <span className="text-white">+%42</span> yükseliyor. Kontrollü bir giriş noktası.
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
