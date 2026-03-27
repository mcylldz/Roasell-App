
import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

const ActionSection: React.FC = () => {
  return (
    <section className="py-4 bg-[#080808] border-y border-white/5 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Zap size={12} className="fill-blue-400" />
              OTONOM KARAR MEKANİZMASI
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85]">
              Analize <span className="text-zinc-600 italic">Başlayın</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium">
              RoaSell motoru sadece veri göstermez; her kreatif için <span className="text-white font-bold italic underline decoration-blue-500/40">matematiksel bir hareket planı</span> çıkarır. Sektör dinamiklerinizi, tüm reklam verilerinizi ve mağaza dinamiklerinizi dikkate alarak hangi reklamın ölçekleneceğini, hangisinin kesilmesi gerektiğini söyler. Gelecek için aksiyon planları çıkartır.
            </p>

            <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-500/20 italic text-blue-300/80 text-sm sm:text-base font-medium">
              "Kreatif tıklama getiriyor fakat dönüşüm oranı diğer reklamlarınızdan düşük (%0.32), reklam kapatılıp kreatif teklifi ve faydayı yedirerek revize edilmeli; bu şekilde ölçeklenemez."
            </div>
          </div>

          {/* CTA — Analizi Başlat */}
          <div className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-28">
            <button
              onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
              className="w-full py-3.5 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-sm tracking-tight uppercase group shadow-2xl"
            >
              <Zap size={14} className="fill-white group-hover:scale-110 transition-transform" />
              3 Gün $1 — Reklamlarını Analiz Et
            </button>
            <p className="text-[10px] text-zinc-600 text-center w-full">
              3 gün sonra aylık $47. İstediğin zaman iptal edebilirsin.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ActionSection;
