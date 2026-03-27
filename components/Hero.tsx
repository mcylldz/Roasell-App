
import React from 'react';
import { Zap, Activity, Target, ShieldCheck, ArrowRight, ShieldAlert, MousePointer2, Shield, Users, Clock } from 'lucide-react';

const HeroBadges = () => (
  <div className="flex flex-wrap items-center gap-4 lg:gap-6">
    {[
      { icon: <Users size={14} />, label: "1250 MAĞAZA KULLANIYOR" },
      { icon: <Clock size={14} />, label: "2 DAKİKADA KURULUM" },
      { icon: <Activity size={14} />, label: "BÜTÇENİZİ VERİMLİ KULLANDIRIR" }
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black mono text-zinc-500 uppercase tracking-[0.15em]">
        <span className="text-emerald-500">{item.icon}</span>
        {item.label}
      </div>
    ))}
  </div>
);

const HeroDescriptions = () => (
  <div className="space-y-3">
    <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed font-medium border-l-2 border-blue-600/50 pl-4 break-words">
      Reklam verimliliğiniz için algoritmamız 48 metriğin hepsini veri havuzunda yorumlayıp size hem basit, hem de uzman analizleri verir. Tüm reklamlarınız için net aksiyon planlarını size sunar.
    </p>
    <div className="flex items-start gap-2 pl-4 text-blue-400 font-bold text-xs sm:text-sm italic">
      <Shield size={14} className="shrink-0 mt-0.5" />
      <span className="break-words">Ajanslara bağımlılığı bitirir. Reklam performansınızı analiz eder, tüm reklamlarınız için size yapılacakları söyler.</span>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-4 overflow-hidden border-b border-white/5 bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[80px] -z-10 -translate-x-1/4 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
        {/* ─── DESKTOP LAYOUT (lg+): full-width header + 2-col grid ─── */}
        <div className="hidden lg:flex lg:flex-col gap-10 mt-12">

          {/* TOP — Badge + H1 (tam genişlik, ortalı) */}
          <div className="flex flex-col items-center gap-5 w-full text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-blue-500/20 text-blue-400 text-[10px] font-bold mono tracking-widest uppercase w-fit">
              <ShieldAlert size={12} className="animate-pulse" />
              1250 Mağaza'nın Kullandığı Reklam Analiz Motoru
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tighter leading-[0.95] text-white text-center">
              Reklamlarının nereye gittiğini bilmiyor musun? <br />
              <span className="text-zinc-600">Artık bilecek ve yöneteceksin.</span>
            </h1>
            <p className="text-base text-zinc-400 max-w-2xl text-center">
              Reklama harcadığın her 1 TL algoritma ile analiz edilir. Kreatifinden reklam yapına kadar tüm aşamalarda kanamalar durdurulur, <strong className="text-white">kârlılık odaklı net aksiyonlar sunar.</strong>
            </p>
          </div>

          {/* BOTTOM — Video+Desc1 | Risk Paneli+Desc2+CTA+Badges */}
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* LEFT — Video + 1. açıklama metni */}
            <div className="flex flex-col gap-5">
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/1173243605?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  className="w-full h-full"
                  title="RoaSell Tanıtım"
                />
              </div>
              {/* 1. Açıklama — videonun altında */}
              <p className="text-base lg:text-lg text-zinc-400 leading-relaxed font-medium border-l-2 border-blue-600/50 pl-4">
                Reklam verimliliğiniz için algoritmamız 48 metriğin hepsini veri havuzunda yorumlayıp size hem basit, hem de uzman analizleri verir. Tüm reklamlarınız için net aksiyon planlarını size sunar.
              </p>
            </div>

            {/* RIGHT — Risk Kontrol Paneli + 2.metin + CTA + Badges */}
            <div className="flex flex-col gap-6 min-w-0">

              {/* Risk Kontrol Paneli */}
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 blur-[40px] rounded-full animate-pulse" />
                <div className="relative glass rounded-2xl p-6 border border-white/10 shadow-2xl bg-[#080808]/40 backdrop-blur-3xl overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                        <span className="text-[10px] font-black mono text-zinc-500 uppercase tracking-widest truncate">2 Dakikada Kurulum;</span>
                      </div>
                      <h3 className="text-lg font-black tracking-tight uppercase italic">Reklam Analiz Paneli</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner shrink-0">
                      <Target className="text-blue-500" size={20} />
                    </div>
                  </div>
                  <div className="space-y-3 relative">
                    <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-zinc-800 to-zinc-900" />
                    {[
                      { step: "01", label: "REKLAM HESABINI BAĞLA", sub: "Reklam verilerini entegre et", status: "KONTROL EDİLDİ", color: "text-emerald-400", active: true },
                      { step: "02", label: "SEKTÖRÜNÜ TANIMLA", sub: "Algoritmaya sektörünü ve reklamlarını tanıt", status: "KORUMALI", color: "text-blue-400", active: true },
                      { step: "03", label: "ANALİZİ BAŞLAT", sub: "2, 7, 30 günlük pencereler analiz ediliyor...", status: "İZLENİYOR", color: "text-zinc-600", active: false }
                    ].map((item, i) => (
                      <div key={i} className={`relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${item.active ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-40'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black mono text-xs z-10 shrink-0 ${item.active ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-zinc-800 text-zinc-600'}`}>
                          {item.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black uppercase tracking-tight truncate">{item.label}</div>
                          <div className="text-[10px] text-zinc-500 font-medium truncate">{item.sub}</div>
                        </div>
                        <div className={`text-[9px] font-black mono shrink-0 ${item.color}`}>{item.status}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap className="text-blue-400 shrink-0" size={12} />
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">NEDEN FARKLI?</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-bold italic break-words">
                      Her yönlendirmesi tecrübeyle eğitilmiş araçlarımız, halka açık verilerle beslenen yapay zeka araçlarının aksine; gerçekten işinize yarayan çıktılar verir.
                    </p>
                    <MousePointer2 className="absolute bottom-2 right-2 text-white/20 rotate-12" size={16} />
                  </div>
                </div>
              </div>

              {/* 2. metin + CTA + Badges */}
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-2 pl-4 text-blue-400 font-bold text-sm italic">
                  <Shield size={14} className="shrink-0 mt-0.5" />
                  <span>Ajanslara bağımlılığı bitirir. Reklam performansınızı analiz eder, tüm reklamlarınız için size yapılacakları söyler.</span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openPaymentModal'))}
                  className="group relative px-8 py-4 bg-white text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 text-base w-full"
                >
                  3 Gün $1 — Reklamlarını Analiz Et
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                <HeroBadges />
              </div>

            </div>
          </div>
        </div>

        {/* ─── MOBILE LAYOUT (< lg): tek kolon, sıralı ─── */}
        <div className="flex flex-col gap-5 lg:hidden mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-bold mono tracking-widest uppercase">
            <ShieldAlert size={12} className="animate-pulse" />
            1250 Mağaza'nın Kullandığı Reklam Analiz Motoru
          </div>

          {/* Video */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://player.vimeo.com/video/1173243605?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              className="w-full h-full"
              title="RoaSell Tanıtım"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter leading-[0.95] text-white break-words">
            Reklamlarının nereye gittiğini bilmiyor musun? <br />
            <span className="text-zinc-600">Artık bilecek ve yöneteceksin.</span>
          </h1>
          <p className="text-sm text-zinc-400">
            Reklama harcadığın her 1 TL algoritma ile analiz edilir. Kreatifinden reklam yapına kadar tüm aşamalarda kanamalar durdurulur, <strong className="text-white">kârlılık odaklı net aksiyonlar sunar.</strong>
          </p>

          <HeroDescriptions />

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openPaymentModal'))}
            className="group relative px-6 sm:px-8 py-4 bg-white text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 text-sm sm:text-base w-full sm:w-auto"
          >
            3 Gün $1 — Reklamlarını Analiz Et
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>

          <HeroBadges />
        </div>
      </div>
    </section>
  );
};

export default Hero;
