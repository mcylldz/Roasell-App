
import React, { useState } from 'react';
import { Play, Globe, CheckCircle } from 'lucide-react';

const SuccessStoriesSection: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      title: "Türkiye Pazarı Başarı Hikayesi",
      description: "Ürün seçimi ve yerel pazar penetrasyonu.",
      location: "TR Market",
      vimeoId: "1154667146",
    },
    {
      id: 2,
      title: "Avrupa Niş Mağaza Ölçekleme",
      description: "Dönüşüm odaklı tema ve reklam yönetimi süreci.",
      location: "EU Market",
      vimeoId: "1144415597",
    },
    {
      id: 3,
      title: "ABD Global Satış Operasyonu",
      description: "Idea -> Store -> Sales -> Scale tam döngüsü.",
      location: "US Market",
      vimeoId: null, // Placeholder if needed in future
    }
  ];

  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] -z-10" />

      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-zinc-800 px-5 py-2 rounded-sm text-[12px] font-black mono text-zinc-300 tracking-[0.3em] uppercase border border-white/10">
            Araç: KANIT KATMANI
          </div>
          <div className="h-px bg-white/5 flex-1" />
          <div className="text-[10px] mono text-zinc-700 font-bold tracking-widest uppercase hidden sm:block">
            REAL_WORLD_RESULTS // VERIFIED_STORES
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] mb-4 mono">
            Başarı Hikayeleri – Gerçek Mağazalar
          </h2>
          <h3 className="text-5xl lg:text-6xl font-black tracking-tighter mb-8 italic uppercase text-white">
            RoaSell kullanan gerçek <br />
            <span className="text-zinc-600">Shopify mağazaları.</span>
          </h3>
          <p className="text-xl text-zinc-400 leading-relaxed font-medium max-w-2xl border-l-4 border-zinc-800 pl-8">
            Bu videolar, ürün seçimi, mağaza kurulumu, reklam ve kâr süreçlerini gerçek mağazalar üzerinden gösterir. Türkiye, Avrupa ve ABD pazarlarındaki somut deneyimlere tanık olun.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="group relative">
              {/* Video Container */}
              <div className="aspect-video glass rounded-3xl border border-white/10 overflow-hidden relative group-hover:border-blue-500/30 transition-all duration-500 bg-zinc-900/50 shadow-2xl">
                {playingId === story.id && story.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${story.vimeoId}?autoplay=1&color=1d4ed8&title=0&byline=0&portrait=0`}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={story.title}
                  ></iframe>
                ) : (
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center space-y-4 cursor-pointer overflow-hidden"
                    onClick={() => story.vimeoId && setPlayingId(story.id)}
                  >
                    {/* Thumbnail Image using vumbnail service */}
                    {story.vimeoId && (
                      <img 
                        src={`https://vumbnail.com/${story.vimeoId}.jpg`} 
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      />
                    )}

                    <div className="relative z-10 w-16 h-16 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-500">
                      <Play className="text-white fill-white group-hover:fill-transparent" size={24} />
                    </div>
                    
                    <span className="relative z-10 text-[10px] font-black mono text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                      {story.vimeoId ? "OYNATMAK İÇİN TIKLAYIN" : "VIMEO VIDEO PLACEHOLDER"}
                    </span>
                  </div>
                )}
                
                {playingId !== story.id && (
                  <>
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[9px] font-black text-white/70 mono flex items-center gap-2 pointer-events-none border-white/10">
                      <Globe size={10} className="text-blue-500" />
                      {story.location}
                    </div>
                  </>
                )}
              </div>

              {/* Story Details */}
              <div className="mt-8 space-y-3 px-2">
                <h4 className="text-2xl font-black italic tracking-tight uppercase text-white group-hover:text-blue-400 transition-colors">
                  {story.title}
                </h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {story.description}
                </p>
                <div className="flex items-center gap-2 pt-2">
                   <CheckCircle size={14} className="text-emerald-500" />
                   <span className="text-[10px] font-black mono text-zinc-600 uppercase tracking-widest">SİSTEM ONAYLI</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documentary style disclaimer */}
        <div className="mt-24 p-8 rounded-3xl border border-white/5 bg-zinc-900/20 text-center max-w-3xl mx-auto">
          <p className="text-zinc-600 text-sm font-medium italic">
            "RoaSell kullanan satıcılar fikir aşamasından satış ve ölçekleme evresine ÜrünHub, Theme ve AI Engine araçlarını kullanarak geçmiştir. Bu kayıtlar kurgusal değildir ve sistemi kullanan gerçek kişilerin operasyonel adımlarını belgeler."
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
