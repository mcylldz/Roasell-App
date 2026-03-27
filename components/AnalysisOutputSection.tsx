
import React from 'react';
import { ThumbsUp, AlertTriangle, TrendingUp, ArrowRight, Zap, Eye, ExternalLink } from 'lucide-react';

const AnalysisOutputSection: React.FC = () => {
  const cards = [
    {
      status: 'success',
      statusLabel: 'YÜKSEK ROAS + GÜÇLÜ NİYET: ÖLÇEK ADAYI',
      confidence: 80,
      campaignName: 'KADIN MONT CBO / 1000 / 1',
      analysis:
        '117.58 harcamada 5 sipariş ve ROAS 4.76; sipariş başı maliyet 23.52 ile verim çok iyi. Doğrudan sitenize giden tıklamalar ucuz (0.14) ve ödemeye yeltenme (11) sayısı siparişle uyumlu; bu, sadece ilgi değil güçlü satın alma niyeti taşındığını gösterir.',
      action: 'Kademeli bütçe artışıyla ölçekle; aynı hedefleme/mesajı koruyup kreatif varyasyonlarını paralel ekle.',
      accent: 'emerald',
    },
    {
      status: 'danger',
      statusLabel: 'UCUZ TRAFİK VAR, SATIŞ ZAYIF: İKNA/DÖNÜŞÜM KIRILIYOR',
      confidence: 58,
      campaignName: 'ERKEK AKSESUAR / RETARGETING / DAR HEDEFLİ',
      analysis:
        '110.26 harcamada 1 sipariş ve ROAS 1.03 ile zarar yazıyor. En baskın sinyal: çok ucuz doğrudan sitenize giden tıklamaya (0.09) rağmen dönüşüm oranının düşük kalması (0.08) ve ödemeye yeltenmenin 1\'de kalması; reklamdan gelen kitle ucuz ama satın almıyor. Ürün sayfası diğer reklamlarda daha stabil (%3) sonuç veriyor, bu yüzden bu reklam içeriğinin çektiği kitle kalitesiz.',
      action: 'Reklamı kapat, kreatifin hook\'unu ve içeriğini analiz et ve elementleri değiştir. (Reklam viral olmuş, fakat getirdiği kitle yanlış)',
      accent: 'red',
    },
    {
      status: 'warning',
      statusLabel: 'AŞIRI YÜKSEK ROAS AMA ÖRNEKLEM KÜÇÜK: SPİKE RİSKİ',
      confidence: 45,
      campaignName: 'KIŞ KOLEKSİYON CBO / 1200 / 1',
      analysis:
        '50.26 harcamada 4 sipariş ve ROAS 20.63 gibi olağanüstü bir değer var; sipariş başı maliyet 12.57. En baskın sinyal bu kadar düşük harcamada bu kadar yüksek ROAS\'ın "spike/tesadüfi dağılım" olma ihtimali. Düşük harcama hacmi, performansın tekrarlanabilirliğini kanıtlamıyor.',
      action: 'Devam ettir ve izlemeye al; bütçeyi sabit tut, veri birikmesini bekle. Buradaki veriler olgunlaştıktan sonra ölçeklenme kararına tekrar bakacağız.',
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
              GERÇEK ANALİZ SONUÇLARINA GÖZ ATIN
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
              Sistemin nasıl çalıştığını <br />
              <span className="text-zinc-600 italic">görün:</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
              Reklam hesabını bağlarsın. Tüm reklamların analiz edilir. 2 gün, 7 gün, 30 günlük reklam sonuçları baz alınır ve sana her reklam için yapılacaklar net olarak söylenir. Kapatman gereken reklamlar araya kaynamaz, kâr eden reklamlar kenarda oturmaz; performansı bozulmak üzere olan reklamlar için yapılacaklar önüne serilir.
            </p>
            <p className="text-sm text-blue-400 font-bold italic">
              Ajansa ve uzmana bağlılığı bitirir, kontrolü size verir.
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
                  {/* Campaign Name + View Button */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
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
                    <button className="shrink-0 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-zinc-500 hover:text-blue-400 transition-colors">
                      <ExternalLink size={11} />
                      <span className="hidden sm:inline">Reklamı Görüntüle</span>
                    </button>
                  </div>

                  {/* Analysis Text */}
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium pl-10 whitespace-pre-line">
                    {card.analysis}
                  </p>

                  {/* Action Button */}
                  <div className="pl-10">
                    <button
                      className={`px-5 py-2.5 rounded-lg font-black text-xs sm:text-sm tracking-wider transition-all active:scale-[0.98] text-left ${
                        card.accent === 'emerald'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500'
                          : card.accent === 'red'
                          ? 'bg-red-600 text-white shadow-lg shadow-red-500/20 hover:bg-red-500'
                          : 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/20 hover:bg-yellow-500'
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
