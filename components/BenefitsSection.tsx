
import React from 'react';
import { DollarSign, Clock, Brain, ShieldCheck, ArrowRight } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="text-emerald-400" size={22} />,
      title: 'Para kaybeden reklamı anında gör',
      description:
        'Hangi reklamın zararda olduğunu, hangisinin kâr ettiğini yapay zeka sana her gün söyler. Bütçen boşa gitmeden müdahale edersin.',
      accent: 'emerald',
    },
    {
      icon: <Brain className="text-blue-400" size={22} />,
      title: 'Uzmana gerek kalmadan karar al',
      description:
        'Aç, kapat veya ölçekle — her reklam için net bir aksiyon alırsın. Ajansa veya danışmana bağımlılığın biter.',
      accent: 'blue',
    },
    {
      icon: <Clock className="text-yellow-400" size={22} />,
      title: 'Günde 2 dakika yeter',
      description:
        'Karmaşık panellerde saatler harcamana gerek yok. Sisteme gir, analizini oku, aksiyonunu al. Bu kadar.',
      accent: 'yellow',
    },
    {
      icon: <ShieldCheck className="text-red-400" size={22} />,
      title: 'Sermayeni koru',
      description:
        'Reklam bütçen senin sermayendir. RoaSell, zarar eden reklamları erken tespit ederek paranın boşa akmasını engeller.',
      accent: 'red',
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] -z-10 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <ShieldCheck size={12} />
              NE İŞE YARAR?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
              Reklam verirken <br />
              <span className="text-zinc-600 italic">körlemesine para harcama.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto">
              RoaSell, reklamlarını tüm verileriyle analiz ederek ne yapman gerektiğini söyler. <strong className="text-white">Her bir kuruşun verimli harcanmasını sağlar.</strong>
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="group p-6 sm:p-7 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all space-y-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                    item.accent === 'emerald'
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : item.accent === 'blue'
                      ? 'bg-blue-500/10 border border-blue-500/20'
                      : item.accent === 'yellow'
                      ? 'bg-yellow-500/10 border border-yellow-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 sm:mt-14 text-center">
            <button
              onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
              className="group px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.08)] text-base tracking-tight active:scale-95 inline-flex items-center gap-3"
            >
              3 Gün $1 — Hemen Dene
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
            <p className="mt-3 text-[10px] sm:text-xs text-zinc-600">
              Kredi kartı gerekli. İstediğin zaman iptal edebilirsin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
