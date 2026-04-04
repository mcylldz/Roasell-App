
import React from 'react';
import { Users, UserCheck, Shield, Target, Briefcase } from 'lucide-react';

const TeamSupportSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[9px] sm:text-[10px] font-black mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              <Users size={12} />
              KARAR DESTEK EKİBİ — İNSAN + AI
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9]">
              Yalnız değilsiniz. <br />
              <span className="text-zinc-600 italic">Arkanızda bir ekip var.</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium border-l-4 border-blue-600/50 pl-4 sm:pl-6">
              RoaSell sadece algoritmalarla çalışmaz. Sistem, profesyonel bir <span className="text-white font-bold">karar destek ekibi</span> tarafından denetlenir. Teknik yazılımın ötesinde, e-ticaretin gerçek dinamiklerine hakim uzmanlar sistem çıktılarının doğruluğunu sağlar.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-2">
              {[
                { title: "Pazar Analistleri", desc: "Küresel trendleri ve arbitraj boşluklarını doğrulayan uzmanlar.", icon: <Target className="text-blue-500" /> },
                { title: "Dönüşüm Uzmanları", desc: "Shopify mağazanızın UI/UX performansını denetleyen kadro.", icon: <Shield className="text-emerald-500" /> },
                { title: "Medya Planlama", desc: "Reklam bütçenizi koruyan strateji operatörleri.", icon: <Briefcase className="text-yellow-500" /> },
                { title: "Sistem Rehberliği", desc: "Verileri sizin için anlamlı aksiyonlara dönüştüren ekip.", icon: <UserCheck className="text-zinc-400" /> }
              ].map((item, i) => (
                <div key={i} className="space-y-2 p-4 sm:p-5 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-sm sm:text-base tracking-tight uppercase italic">{item.title}</h4>
                  <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 relative z-10 bg-zinc-950/40 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
                  <Users className="text-blue-500" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase italic">Bütünsel Karar Sistemi</h3>
                <p className="text-sm sm:text-base text-zinc-400 font-medium">
                  "Yazılım veriyi yakalar, ekip ise bu verinin sizin için en güvenli E-ticaret stratejisi olup olmadığını doğrular."
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
                  <div className="px-3 py-1.5 glass rounded-full text-[9px] sm:text-[10px] font-black mono text-emerald-400 tracking-widest uppercase">UZMAN DESTEĞİ AKTİF</div>
                  <div className="px-3 py-1.5 glass rounded-full text-[9px] sm:text-[10px] font-black mono text-blue-400 tracking-widest uppercase">STRATEJİ DENETLENİYOR</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px]" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-600/10 rounded-full blur-[50px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSupportSection;
