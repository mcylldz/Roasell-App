
import React from 'react';
import { Zap, Activity, Target, ShieldCheck, ArrowRight, ShieldAlert, MousePointer2, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-4 overflow-hidden border-b border-white/5 bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[80px] -z-10 -translate-x-1/4 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-5 sm:space-y-6 relative z-10 min-w-0 overflow-hidden mt-8 sm:mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-bold mono tracking-widest uppercase">
              <ShieldAlert size={12} className="animate-pulse" />
              Dijital Emniyet Kemeri: ROASELL APP
            </div>

            {/* Hero Vimeo Video */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://player.vimeo.com/video/1172700670?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                className="w-full h-full"
                title="RoaSell Tanıtım"
              />
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extrabold tracking-tighter leading-[0.95] text-white break-words">
                Ticaretinizi algoritma desteği ile yönetin. <br />
                <span className="text-zinc-600">Sermayeniz verimli kullanılsın.</span>
              </h1>

              <div className="space-y-3">
                <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed font-medium border-l-2 border-blue-600/50 pl-4 break-words">
                  RoaSell, reklam yönetme sürecinizde sizi kimseye bağlı kalmadan kendi reklamlarınızı yönetebilir hale getirir. 7 yıllık tecrübe ile beslediğimiz algoritmamız sayesinde kampanya düzeyinden en ufak reklam düzeyine kadar almanız gereken aksiyonları size söyler.
                </p>
                <div className="flex items-start gap-2 pl-4 text-blue-400 font-bold text-xs sm:text-sm italic">
                  <Shield size={14} className="shrink-0 mt-0.5" />
                  <span className="break-words">RoaSell, reklam yönetiminde dışa ve insana bağımlılığı bitirir; size ne yapmanız gerektiğini 7/24 söyler.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button className="group relative px-6 sm:px-8 py-4 bg-white text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 text-sm sm:text-base w-full sm:w-auto">
                ALGORİTMAYI ŞİMDİ ENTEGRE ET
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {[
                { icon: <ShieldCheck size={14} />, label: "7 YILLIK VERİ" },
                { icon: <Zap size={14} />, label: "HIZLI AKSİYON" },
                { icon: <Activity size={14} />, label: "ROI+ BÜYÜME" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black mono text-zinc-500 uppercase tracking-[0.15em]">
                  <span className="text-emerald-500">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative min-w-0 overflow-hidden">
            <div className="absolute -inset-4 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />

            <div className="relative glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl bg-[#080808]/40 backdrop-blur-3xl overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-black mono text-zinc-500 uppercase tracking-widest truncate">Hızlı Başlangıç Planı;</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight uppercase italic">Risk Kontrol Paneli</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner shrink-0">
                  <Target className="text-blue-500" size={20} />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 relative">
                {/* Connecting Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-800 to-zinc-900" />

                {[
                  { step: "01", label: "MAĞAZANI BAĞLA", sub: "Mağaza verilerini entegre et", status: "KONTROL EDİLDİ", color: "text-emerald-400", active: true },
                  { step: "02", label: "META HESABINI BAĞLA", sub: "Algoritmaya kendini tanıt", status: "KORUMALI", color: "text-blue-400", active: true },
                  { step: "03", label: "ANALİZİ BAŞLAT", sub: "Veriler karşılaştırılıyor...", status: "İZLENİYOR", color: "text-zinc-600", active: false }
                ].map((item, i) => (
                  <div key={i} className={`relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-500 ${item.active ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-40'}`}>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black mono text-[10px] sm:text-xs z-10 shrink-0 ${item.active ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-zinc-800 text-zinc-600'}`}>
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] sm:text-xs font-black uppercase tracking-tight truncate">{item.label}</div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-500 font-medium truncate">{item.sub}</div>
                    </div>
                    <div className={`text-[8px] sm:text-[9px] font-black mono shrink-0 ${item.color}`}>{item.status}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-5 p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="text-blue-400 shrink-0" size={12} />
                  <span className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest">İPUCU;</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-bold italic break-words">
                  Her yönlendirmesi tecrübeyle eğitilmiş araçlarımız, halka açık verilerle beslenen yapay zeka araçlarının aksine; gerçekten işinize yarayan çıktılar verir.
                </p>
                <MousePointer2 className="absolute bottom-2 right-2 text-white/20 rotate-12" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
