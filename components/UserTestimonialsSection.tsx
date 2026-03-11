
import React from 'react';
import { User } from 'lucide-react';

const testimonials = [
  { name: "Mustafa Bey", vimeoId: "1172714417" },
  { name: "Elxan Bey", vimeoId: "1172717816" },
  { name: "Tarık Bey", vimeoId: "1172718490" }
];

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-zinc-500/20 text-zinc-500 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            <User size={12} className="text-blue-500" />
            TOPLULUK SESİ — KULLANICI DENEYİMLERİ
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter italic uppercase text-white">
            Kullananlar Ne Diyor?
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 font-medium max-w-2xl mx-auto">
            RoaSell ile mağaza kuran girişimcilerden sistem hakkındaki gerçek yorumlar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, i) => (
            <div key={i} className="group">
              {/* Vimeo Video */}
              <div className="aspect-video rounded-xl border border-white/10 overflow-hidden relative bg-zinc-900/30">
                <iframe
                  src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  className="w-full h-full"
                  title={`${item.name} - RoaSell Deneyimi`}
                />
              </div>

              {/* Label */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">{item.name}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-zinc-500 mt-0.5 italic">RoaSell Kullanıcısı</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-zinc-600 text-[10px] sm:text-[11px] font-medium italic max-w-lg mx-auto leading-relaxed">
            Bu videolar, platformumuzu aktif olarak kullanan girişimcilerin kendi rızaları ile paylaştıkları samimi deneyimleridir. RoaSell, kullanıcılarını birer rakam olarak değil, birer sistem operatörü olarak görür.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonialsSection;
