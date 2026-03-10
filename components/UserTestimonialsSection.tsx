
import React from 'react';
import { Play, User, Quote } from 'lucide-react';

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Cinematic Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-zinc-500/20 text-zinc-500 text-[10px] font-black mono tracking-[0.3em] uppercase">
            <User size={12} className="text-blue-500" />
            TOPLULUK SESİ — KULLANICI DENEYİMLERİ
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black tracking-tighter italic uppercase text-white">
            Kullananlar Ne Diyor?
          </h2>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto">
            RoaSell ile mağaza kuran girişimcilerden sistem hakkındaki gerçek yorumlar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((id) => (
            <div key={id} className="group">
              {/* Video Placeholder Container */}
              <div className="aspect-video glass rounded-[2rem] border border-white/10 overflow-hidden relative group-hover:border-blue-500/40 transition-all duration-700 bg-zinc-900/30 flex items-center justify-center cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500">
                    <Play className="text-white fill-white group-hover:fill-transparent translate-x-0.5" size={20} />
                  </div>
                  <span className="text-[10px] font-black mono text-zinc-600 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">Vimeo Placeholder</span>
                </div>

                {/* Corner Decorative Element */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Quote size={20} className="text-blue-500" />
                </div>
              </div>

              {/* Minimalist Label */}
              <div className="mt-6 flex items-center justify-between px-4">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest mono">Kullanıcı Görüşü // 0{id}</span>
                  <span className="text-sm font-bold text-white/40 mt-1 italic italic">İncelemek için oynatın</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-600 text-[11px] font-medium italic max-w-lg mx-auto leading-relaxed">
            Bu videolar, platformumuzu aktif olarak kullanan girişimcilerin kendi rızaları ile paylaştıkları samimi deneyimleridir. RoaSell, kullanıcılarını birer rakam olarak değil, birer sistem operatörü olarak görür.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonialsSection;
