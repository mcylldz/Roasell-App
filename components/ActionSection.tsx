
import React, { useState } from 'react';
import { Target, Zap, CheckCircle2, AlertCircle, ArrowRight, ThumbsUp, AlertTriangle } from 'lucide-react';

const ActionSection: React.FC = () => {
  const [mode, setMode] = useState<'basit' | 'uzman'>('basit');

  const actions = [
    { id: 1, type: 'success', title: "En Yüksek Karlılık ve Verim", description: "8.79 Karlılık Endeksi (PI) ve %2.25 CTR ile setin en verimli reklamı. Medyanın üzerindeki tıklama oranı satış başarısını tetikliyor.", buttonLabel: "Bütçeyi %20 Artır", accent: "emerald" },
    { id: 2, type: 'success', title: "Yüksek Hacimli Kar Odağı", description: "1.5M+ net kar ve %5.95 CVR ile en yüksek dönüşüm oranına sahip. Hook oranı (%18.2) düşük olsa da dönüşüm gücüyle ölçeklemeye uygun.", buttonLabel: "Bütçeyi %20 Artır", accent: "emerald" },
    { id: 3, type: 'success', title: "Güçlü Kreatif Tutundurma", description: "%32.5 Hook ve %22.1 Hold oranıyla izleyiciyi en iyi tutan kreatif. 10.17 ROAS ile yüksek karlılık sergiliyor.", buttonLabel: "Bütçeyi %20 Artır", accent: "emerald" },
    { id: 4, type: 'warning', title: "Frekans ve Doygunluk Takibi", description: "3.09 frekans ve %1.21 CTR ile kreatif yorgunluğu sinyalleri veriyor. ROAS (6.73) hala karlı ancak diğer aktif reklamların gerisinde.", buttonLabel: "İzlemeye Al", accent: "yellow" }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-white/10 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-white/20">
            Araç: ACTION ENGINE
          </div>
          <div className="h-px bg-white/5 flex-1" />
          <div className="text-[9px] sm:text-[10px] mono text-zinc-700 font-bold tracking-widest uppercase hidden sm:block">
            DECISION_INTELLIGENCE // V3.2
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Zap size={12} className="fill-blue-400" />
              OTONOM KARAR MEKANİZMASI
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85]">
              Analize <br />
              <span className="text-zinc-600 italic">Başlayın</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium">
              Action Engine sadece veri göstermez; her kreatif için <span className="text-white font-bold italic underline decoration-blue-500/40">matematiksel bir hareket planı</span> çıkarır. Hook, Hold ve CVR metriklerini eşleştirerek hangi reklamın ölçekleneceğini, hangisinin dinlendirilmesi gerektiğini söyler.
            </p>

            <div className="p-5 sm:p-6 rounded-xl bg-blue-600/5 border border-blue-500/20 italic text-blue-300/80 text-sm sm:text-base font-medium">
              "Kreatif tıklama getiriyor fakat dönüşüm oranı düşük (%5.95 CVR), ürün sayfası veya teklif revize edilerek reklam ölçeklenebilir."
            </div>
          </div>

          {/* AI Decision Hub */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-3">
              {/* Toggle Controls */}
              <div className="flex p-1 bg-zinc-950 rounded-lg border border-white/5">
                <button
                  onClick={() => setMode('basit')}
                  className={`flex-1 py-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${mode === 'basit' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  BASİT
                </button>
                <button
                  onClick={() => setMode('uzman')}
                  className={`flex-1 py-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${mode === 'uzman' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  UZMAN
                </button>
              </div>

              {/* Action Button */}
              <button className="w-full py-3.5 bg-[#1a1b21] border border-blue-500/20 text-blue-400 font-black rounded-lg hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase mono group shadow-2xl">
                <Zap size={14} className="fill-blue-500 group-hover:scale-110 transition-transform" />
                REKLAM ANALİNİZİ BAŞLAT
              </button>
            </div>

            {/* Insight Cards */}
            <div className="space-y-3">
              {actions.map((action) => (
                <div key={action.id} className={`relative p-5 sm:p-6 rounded-xl bg-[#0a0a0c] border border-white/5 transition-all hover:border-white/10 ${action.accent === 'emerald' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-yellow-600'}`}>
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${action.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {action.type === 'success' ? <ThumbsUp size={16} /> : <AlertTriangle size={16} />}
                    </div>
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight italic">{action.title}</h4>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-medium">
                          {action.description}
                        </p>
                      </div>
                      <button className={`w-full py-3 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98] ${action.accent === 'emerald' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500' : 'bg-[#1a1b21] text-blue-400 border border-blue-500/20 hover:bg-blue-500/5'}`}>
                        {action.buttonLabel}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-center">
              <p className="text-[9px] sm:text-[10px] font-black mono text-zinc-700 uppercase tracking-[0.3em]">
                Sistem analizi 2.4s içinde tamamlandı // veriler güncel
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ActionSection;
