
import React from 'react';
import { PlayCircle, BarChart3, Globe2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

const CaseStudiesSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-800 px-5 py-2 rounded-sm text-[12px] font-black mono text-zinc-400 tracking-[0.3em] uppercase border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            Araç: OPERATIONS LIBRARY
          </div>
          <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-zinc-500/20 text-zinc-500 text-[10px] font-black mono tracking-[0.3em] uppercase mb-8">
            <PlayCircle size={12} className="text-blue-500" />
            OPERASYON KÜTÜPHANESİ — KAYITLI VAKALAR
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-8 italic uppercase">
            Gerçek mağazalar. <br />
            <span className="text-zinc-600">Gerçek kararlar. Gerçek sonuçlar.</span>
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-xl text-zinc-400 leading-relaxed font-medium">
              RoaSell kullanıcıları sadece bir sistem kullanmaz. Aynı zamanda <span className="text-white">Türkiye, Avrupa ve ABD</span> pazarlarında kurulmuş 10'dan fazla gerçek Shopify markasının tüm operasyonel süreçlerine erişir.
            </p>
            <p className="text-zinc-500 font-medium">
              Ürün seçiminden reklam lansmanına, kâr-zarar tablolarından ölçekleme hatalarına kadar saatlerce kaydedilmiş gerçek iş süreçlerini adım adım izleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {[
            {
              market: "TR Shopify Mağazası",
              title: "Ürün Yanılgısı & Pivot",
              focus: "Yanlış ürün seçimi verilerle nasıl fark edildi ve sermaye tükenmeden nasıl pivot edildi?",
              details: ["Pazar Analizi", "Pivot Kararı", "Gerçek P&L"],
              icon: <Globe2 className="text-blue-500" />
            },
            {
              market: "ABD Pazarı — Reklam Kriz Yönetimi",
              title: "ROAS Çöküşü ve Kurtarma",
              focus: "Reklam maliyetleri neden aniden yükseldi? Hangi metrik sistemi uyardı ve kampanya nasıl kurtarıldı?",
              details: ["Ad Account Kayıtları", "Metrik Analizi", "Kriz Yönetimi"],
              icon: <BarChart3 className="text-red-500" />
            },
            {
              market: "Avrupa Niş Mağaza",
              title: "Kargo & Marj Problemi",
              focus: "Lojistik maliyetleri kârı nasıl eritti? Finansal tablo ve fiyatlandırma kurgusu nasıl yeniden kuruldu?",
              details: ["Lojistik Kurgusu", "Fiyatlandırma", "Ölçekleme Süreci"],
              icon: <FileText className="text-emerald-500" />
            }
          ].map((item, i) => (
            <div key={i} className="glass rounded-[2.5rem] p-10 border border-white/10 space-y-8 flex flex-col justify-between hover:border-blue-500/30 transition-all group cursor-default">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mono">{item.market}</span>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black italic tracking-tight uppercase text-white">{item.title}</h4>
                  <p className="text-zinc-400 text-sm font-medium leading-relaxed">{item.focus}</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.details.map((detail, idx) => (
                    <span key={idx} className="text-[9px] font-black mono text-zinc-600 border border-white/5 px-2 py-1 rounded">
                      {detail}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-500 text-xs font-black mono tracking-widest uppercase group-hover:text-white transition-colors">
                  KAYDI İZLE <PlayCircle size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center border-t border-white/5 pt-12">
           <div className="flex items-center justify-center gap-3 mb-4">
             <ShieldCheck className="text-emerald-500" size={20} />
             <span className="text-[10px] font-black mono text-emerald-500 tracking-[0.3em] uppercase">Şeffaflık Protokolü</span>
           </div>
           <p className="text-zinc-500 text-sm font-medium italic">
             "Bu içerikler, RoaSell platformunda yer alan gerçek mağaza panelleri ve kayıtlı analiz oturumlarından alınmıştır. Hiçbir veri kurgusal veya simülasyon değildir."
           </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
