
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const ControlSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-2xl mx-auto text-center space-y-8">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={12} />
            Başlamak için 2 dakika yeterli
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[0.9] text-white">
            Reklamların için <br />
            <span className="text-zinc-600">hâlâ tahmin mi yürütüyorsun?</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-lg mx-auto">
            Mağazanı bağla, Meta hesabını bağla, yapay zeka reklamlarını analiz etsin.
            <strong className="text-white"> 3 gün boyunca sadece $1.</strong>
          </p>

          <button
            onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
            className="group px-6 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all shadow-[0_15px_40px_rgba(37,99,235,0.3)] text-sm sm:text-lg tracking-tight active:scale-95 inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap"
          >
            3 Gün $1 — Reklamlarını Analiz Et
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>

          <p className="text-xs text-zinc-600">
            3 gün sonra aylık $47. İstediğin zaman iptal edebilirsin.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ControlSection;
