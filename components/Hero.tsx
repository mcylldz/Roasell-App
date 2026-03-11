
import React from 'react';
import { Zap, Activity, Target, ShieldCheck, ArrowRight, ShieldAlert, ChevronRight, MousePointer2, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-28 overflow-hidden border-b border-white/5 bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[80px] -z-10 -translate-x-1/4 opacity-40" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-6 sm:space-y-8 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-bold mono tracking-widest uppercase">
              <ShieldAlert size={12} className="animate-pulse" />
              Dijital Emniyet Kemeri: ROASELL APP
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-[70px] font-extrabold tracking-tighter leading-[0.95] text-white">
                Ticaretinizi Doğru Yönetin. <br />
                <span className="text-zinc-600">Sermayenizi Koruyun.</span>
              </h1>

              <div className="space-y-3">
                <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium border-l-2 border-blue-600/50 pl-4 sm:pl-6 max-w-xl">
                  RoaSell, reklam yönetme sürecinizde sizi kimseye bağlı kalmadan kendi reklamlarınızı yönetebilir hale getirir. 7 yıllık tecrübe ile beslediğimiz algoritmamız sayesinde kampanya düzeyinden en ufak reklam düzeyine kadar almanız gereken aksiyonları size söyler.
                </p>
                <div className="flex items-center gap-2 pl-4 sm:pl-6 text-blue-400 font-bold text-xs sm:text-sm italic">
                  <Shield size={14} />
                  <span>Roasell, online ticaretinizde hatasız bir reklam yönetim süreci sürdürmek için tasarlanmıştır.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="group relative px-6 sm:px-8 py-4 bg-white text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 text-sm sm:text-base">
                ALGORİTMAYI ŞİMDİ ENTEGRE ET
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              <button className="px-6 sm:px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-white/10 group text-xs sm:text-sm tracking-widest uppercase mono">
                SİSTEM NASIL KORUR?
                <ChevronRight size={16} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
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
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />

            <div className="relative glass rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-white/10 shadow-2xl bg-[#080808]/40 backdrop-blur-3xl overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span className="text-[9px] sm:text-[10px] font-black mono text-zinc-500 uppercase tracking-widest">Hızlı Başlangıç Planı;</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase italic">Risk Kontrol Paneli</h3>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
                  <Target className="text-blue-500" size={22} />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-800 to-zinc-900" />

                {[
                  { step: "01", label: "MAĞAZANI BAĞLA", sub: "Mağaza verilerini entegre et (opsiyonel)", status: "KONTROL EDİLDİ", color: "text-emerald-400", active: true },
                  { step: "02", label: "META REKLAM HESABINI BAĞLA", sub: "Algoritmaya kendini tanıt", status: "KORUMALI", color: "text-blue-400", active: true },
                  { step: "03", label: "REKLAM ANALİNİZİ BAŞLAT", sub: "Reklam verilerin algoritma ile karşılaştırılıyor...", status: "İZLENİYOR", color: "text-zinc-600", active: false }
                ].map((item, i) => (
                  <div key={i} className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all duration-500 ${item.active ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-40'}`}>
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black mono text-xs z-10 shrink-0 ${item.active ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-zinc-800 text-zinc-600'}`}>
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-black uppercase tracking-tight truncate">{item.label}</div>
                      <div className="text-[10px] sm:text-[11px] text-zinc-500 font-medium truncate">{item.sub}</div>
                    </div>
                    <div className={`text-[9px] sm:text-[10px] font-black mono shrink-0 ${item.color}`}>{item.status}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-lg bg-blue-500/10 border border-blue-500/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-blue-400" size={14} />
                  <span className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-widest">İPUCU;</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-bold italic">
                  Roasell açık kaynaklı bir reklam analiz aracı değildir. 7 Yıllık E-Ticaret verileriyle eğitilmiş gerçek sektörel hafızaya sahip sürekli güncellenen, veri ağını büyüten bir ekosistemdir. Halka açık akış verileyle beslenen yapay zeka araçlarıyla benzer sonuçları göstermemektedir.
                </p>
                <MousePointer2 className="absolute bottom-3 right-3 text-white/20 rotate-12" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
