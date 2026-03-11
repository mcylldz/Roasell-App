
import React from 'react';
import { Play, User, Quote } from 'lucide-react';

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Cinematic Ambience */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-zinc-500/20 text-zinc-500 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
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
          {[1, 2, 3].map((id) => (
            <div key={id} className="group">
              {/* Video Placeholder */}
              <div className="aspect-video glass rounded-xl border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all duration-700 bg-zinc-900/30 flex items-center justify-center cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-500">
                    <Play className="text-white fill-white group-hover:fill-transparent translate-x-0.5" size={18} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black mono text-zinc-600 uppercase tracking-[0.15em] group-hover:text-blue-400 transition-colors">Vimeo Placeholder</span>
                </div>

                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Quote size={16} className="text-blue-500" />
                </div>
              </div>

              {/* Label */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-widest mono">Kullanıcı Görüşü // 0{id}</span>
                  <span className="text-xs sm:text-sm font-bold text-white/40 mt-0.5 italic">İncelemek için oynatın</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors" />
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
