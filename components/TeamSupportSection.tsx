
import React from 'react';
import { Users, UserCheck, Shield, Target, Briefcase } from 'lucide-react';

const TeamSupportSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-blue-900/40 px-5 py-2 rounded-sm text-[12px] font-black mono text-blue-300 tracking-[0.3em] uppercase border border-blue-500/20">
            Araç: INTELLIGENCE LAYER
          </div>
          <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-blue-500/20 text-blue-400 text-[10px] font-black mono tracking-[0.3em] uppercase">
              <Users size={12} />
              KARAR DESTEK EKİBİ — İNSAN + AI
            </div>

            <h2 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              Yalnız değilsiniz. <br />
              <span className="text-zinc-600 italic">Arkanızda bir ekip var.</span>
            </h2>

            <p className="text-2xl text-zinc-400 leading-relaxed font-medium border-l-4 border-blue-600/50 pl-8">
              RoaSell sadece algoritmalarla çalışmaz. Sistem, profesyonel bir <span className="text-white font-bold">karar destek ekibi</span> tarafından denetlenir. Teknik yazılımın ötesinde, e-ticaretin gerçek dinamiklerine hakim uzmanlar sistem çıktılarının doğruluğunu sağlar.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              {[
                { title: "Pazar Analistleri", desc: "Küresel trendleri ve arbitraj boşluklarını doğrulayan uzmanlar.", icon: <Target className="text-blue-500" /> },
                { title: "Dönüşüm Uzmanları", desc: "Shopify mağazanızın UI/UX performansını denetleyen kadro.", icon: <Shield className="text-emerald-500" /> },
                { title: "Medya Planlama", desc: "Reklam bütçenizi koruyan strateji operatörleri.", icon: <Briefcase className="text-yellow-500" /> },
                { title: "Sistem Rehberliği", desc: "Verileri sizin için anlamlı aksiyonlara dönüştüren ekip.", icon: <UserCheck className="text-zinc-400" /> }
              ].map((item, i) => (
                <div key={i} className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-black text-xl tracking-tight uppercase italic">{item.title}</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-[3rem] p-12 border border-white/10 relative z-10 bg-zinc-950/40 overflow-hidden">
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '30px 30px' }} />
               <div className="flex flex-col items-center text-center space-y-6">
                 <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center">
                    <Users className="text-blue-500" size={40} />
                 </div>
                 <h3 className="text-3xl font-black tracking-tight uppercase italic">Bütünsel Karar Sistemi</h3>
                 <p className="text-zinc-400 font-medium">
                   "Yazılım veriyi yakalar, ekip ise bu verinin sizin için en güvenli Shopify stratejisi olup olmadığını doğrular."
                 </p>
                 <div className="flex gap-4 pt-4">
                    <div className="px-4 py-2 glass rounded-full text-[10px] font-black mono text-emerald-400 tracking-widest uppercase">UZMAN DESTEĞİ AKTİF</div>
                    <div className="px-4 py-2 glass rounded-full text-[10px] font-black mono text-blue-400 tracking-widest uppercase">STRATEJİ DENETLENİYOR</div>
                 </div>
               </div>
            </div>
            {/* Visual Flair Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-600/10 rounded-full blur-[60px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSupportSection;
