
import React from 'react';
import { ThumbsUp, AlertTriangle, TrendingUp, ArrowRight, Zap, Eye } from 'lucide-react';

const AnalysisOutputSection: React.FC = () => {
  const cards = [
    {
      status: 'success',
      statusLabel: 'REKLAM ÇALIŞIYOR — ÖLÇEKLE',
      confidence: 80,
      campaignName: 'KADIN MONT KOLEKSİYON / CBO / GENIŞ',
      analysis:
        'Reklam çalışıyor. Satış maliyeti iyi ve ROAS yüksek. Bu yüzden kârlı bir şekilde büyümeye uygun.\n\nKademeli bütçe artışıyla ölçekle; aynı görsel konseptin 2-3 varyasyonunu (ilk kare, başlık, teklif vurgusu) paralel teste al.',
      action: 'Bütçeyi Artır',
      accent: 'emerald',
    },
    {
      status: 'warning',
      statusLabel: 'SATIŞ VAR AMA ROAS ÇOK DÜŞÜK, NET NEGATİF',
      confidence: 72,
      campaignName: 'ERKEK AYAKKABI / RETARGETING / DAR',
      analysis:
        'Reklam zarar yazıyor. Satış geliyor ama maliyeti çok yüksek kaldığı için geri dönüş yetmiyor. Bu yüzden bütçe kaybettiriyor.\n\nReklamı kapat ve bütçeyi daha verimli kreatiflere kaydır; bu kreatifi ancak yeni açı/teklif sunumuyla yeniden test et.',
      action: 'Reklamı Kapat',
      accent: 'red',
    },
    {
      status: 'info',
      statusLabel: 'SEPETE EKLEME VAR AMA SATIŞA DÖNMÜYOR',
      confidence: 65,
      campaignName: 'AKSESUAR SET / LOOKALIKE / %1',
      analysis:
        'Reklam zarar yazıyor. Sepete ekleme ve ödemeye yeltenme var ama satışa yeterince dönmüyor. Bu yüzden bütçe yakıyor.\n\nReklamı kapat ve bütçeyi daha yüksek ROAS üreten kreatiflere kaydır; ayrıca checkout/teklif sürtünmesini (kargo, ödeme, güven) kontrol etmek için ayrı bir inceleme başlat.',
      action: 'İncele ve Kapat',
      accent: 'yellow',
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Eye size={12} />
              GERÇEK ANALİZ ÇIKTILARI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
              Yapay zeka her reklamı <br />
              <span className="text-zinc-600 italic">böyle analiz ediyor.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
              Meta hesabını bağladığın anda tüm kampanyaların taranır. Her reklam için net bir karar alırsın: <strong className="text-white">ölçekle, kapat veya revize et.</strong>
            </p>
          </div>

          {/* Analysis Cards */}
          <div className="space-y-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="relative rounded-xl sm:rounded-2xl bg-[#0a0a0c] border border-white/5 overflow-hidden hover:border-white/10 transition-all"
              >
                {/* Status Bar */}
                <div
                  className={`px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/5 ${
                    card.accent === 'emerald'
                      ? 'bg-emerald-500/5'
                      : card.accent === 'red'
                      ? 'bg-red-500/5'
                      : 'bg-yellow-500/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        card.accent === 'emerald'
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                          : card.accent === 'red'
                          ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                          : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]'
                      }`}
                    />
                    <span
                      className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wide ${
                        card.accent === 'emerald'
                          ? 'text-emerald-400'
                          : card.accent === 'red'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {card.status === 'success' ? '✓' : '⚠'} {card.statusLabel}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-black mono ${
                      card.accent === 'emerald'
                        ? 'text-emerald-500'
                        : card.accent === 'red'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    GÜVEN: %{card.confidence}
                  </span>
                </div>

                {/* Card Body */}
                <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-4">
                  {/* Campaign Name */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                      {card.accent === 'emerald' ? (
                        <TrendingUp size={14} className="text-emerald-500" />
                      ) : card.accent === 'red' ? (
                        <AlertTriangle size={14} className="text-red-500" />
                      ) : (
                        <AlertTriangle size={14} className="text-yellow-500" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-black mono text-zinc-300 uppercase tracking-wide truncate">
                      {card.campaignName}
                    </span>
                  </div>

                  {/* Analysis Text */}
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium pl-10 whitespace-pre-line">
                    {card.analysis}
                  </p>

                  {/* Action Button */}
                  <div className="pl-10">
                    <button
                      className={`px-5 py-2.5 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98] ${
                        card.accent === 'emerald'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500'
                          : card.accent === 'red'
                          ? 'bg-red-600/80 text-white shadow-lg shadow-red-500/20 hover:bg-red-500'
                          : 'bg-yellow-600/80 text-white shadow-lg shadow-yellow-500/20 hover:bg-yellow-500'
                      }`}
                    >
                      {card.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 sm:mt-14 text-center space-y-4">
            <p className="text-sm sm:text-base text-zinc-500 font-medium">
              Bu analizleri <strong className="text-white">kendi reklamların</strong> için görmek ister misin?
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
              className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.25)] text-sm sm:text-base tracking-tight active:scale-95 inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap"
            >
              <Zap size={16} className="fill-white" />
              3 Gün $1 — Reklamlarını Analiz Et
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisOutputSection;
