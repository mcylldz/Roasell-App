
import React from 'react';
import { ShieldCheck, ArrowRight, UserCheck, UserMinus, MonitorPlay, Zap, Activity, Target } from 'lucide-react';

const SystemOverviewSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="bg-zinc-900 px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-black mono text-zinc-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-white/5">
            Araç: SYSTEM LOGIC
          </div>
          <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-5 sm:mb-6 italic uppercase">
            RoaSell sadece bir yazılım değil. <br />
            <span className="text-zinc-600">Dijital Emniyet Kemeriniz.</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium">
            RoaSell, reklam yönetme sürecinizde sizi kimseye bağlı kalmadan kendi reklamlarınızı yönetebilir hale getirir. 7 yıllık tecrübe ile beslediğimiz algoritmamız sayesinde kampanya düzeyinden reklam düzeyine kadar almanız gereken aksiyonları size sunar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start mb-16 sm:mb-20">
          {/* How it works block */}
          <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5 sm:space-y-6 relative overflow-hidden">
            <h3 className="text-lg sm:text-xl font-black italic tracking-tight mb-4 sm:mb-6 uppercase">Süreç Nasıl İlerler?</h3>
            <div className="space-y-5 sm:space-y-6 relative">
              <div className="absolute left-5 top-5 bottom-5 w-[1px] bg-white/5" />
              {[
                { step: "01", text: "Mağazanı bağla ve verilerini entegre et.", icon: <Target className="text-blue-500" /> },
                { step: "02", text: "Meta reklam hesabını bağla ve algoritmaya kendini tanıt.", icon: <Zap className="text-yellow-500" /> },
                { step: "03", text: "Reklam analizini başlat ve algoritma ile karşılaştır.", icon: <Activity className="text-red-500" /> },
                { step: "04", text: "ROI+ büyüme için hatasız reklam yönetimini sürdür.", icon: <ShieldCheck className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-sm sm:text-base text-zinc-300 font-bold leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who this is for block */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-black italic tracking-tight uppercase flex items-center gap-3">
                <UserCheck className="text-emerald-500" />
                Bu Kimin İçin?
              </h3>
              <ul className="space-y-3">
                {["Shopify'a yeni başlayanlar", "Sermayesini kaybetmekten korkanlar", "Tahmine değil, veriye dayalı ilerlemek isteyenler"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400 font-medium text-sm sm:text-base">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 sm:space-y-6 opacity-50">
              <h3 className="text-lg sm:text-xl font-black italic tracking-tight uppercase flex items-center gap-3">
                <UserMinus className="text-red-500" />
                Bu Kimin İçin DEĞİL?
              </h3>
              <ul className="space-y-3">
                {["Pazaryeri satıcıları", "Offline Tüccarlar", "Paralı trafiğe ihtiyaç duymayanlar"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-500 font-medium text-sm sm:text-base">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] text-base sm:text-lg tracking-tighter active:scale-95 group"
          >
            3 Gün $1 — Reklamlarını Analiz Et
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="mt-4 text-zinc-600 text-[10px] sm:text-xs font-black mono tracking-widest uppercase italic">ROASELL: Dijital Emniyet Kemeri</p>
        </div>
      </div>
    </section>
  );
};

export default SystemOverviewSection;
