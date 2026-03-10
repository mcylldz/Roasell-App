
import React from 'react';
import { Newspaper, ChevronRight, BarChart3, PieChart, LineChart, Zap } from 'lucide-react';

const InsightsSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] border-t border-white/5 relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="bg-emerald-900/30 px-5 py-2 rounded-sm text-[12px] font-black mono text-emerald-400 tracking-[0.3em] uppercase border border-emerald-500/20">
            Araç: GLOBAL INSIGHTS
          </div>
          <div className="h-px bg-white/5 flex-1" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-[10px] font-black mono tracking-[0.3em] uppercase">
              <Newspaper size={12} />
              ROASELL INSIGHTS — CANLI İSTİHBARAT
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              Pazar, ürün ve <br />
              <span className="text-zinc-600 italic">reklam analizleri.</span>
            </h2>
          </div>
          <button className="px-8 py-4 glass text-white font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 tracking-widest uppercase text-xs mono">
            TÜM RAPORLARI GÖR
            <ChevronRight size={16} className="text-zinc-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Ürün Trend Kırılımları", 
              desc: "Küresel platformlarda yükselen ama TR'de henüz doygunluğa ulaşmamış ürünlerin derinlemesine analizi.",
              icon: <BarChart3 className="text-blue-500" />,
              badge: "GÜNCEL" 
            },
            { 
              title: "Pazar Boşluğu Raporları", 
              desc: "Düşük rekabetli nişlerin ve yüksek dönüşüm potansiyeli taşıyan yeni kategorilerin tespiti.",
              icon: <PieChart className="text-emerald-500" />,
              badge: "HAFTALIK" 
            },
            { 
              title: "Shopify Benchmark Verileri", 
              desc: "Gerçek mağaza verilerinden elde edilen sektör ortalamaları ve performans kıyaslamaları.",
              icon: <LineChart className="text-yellow-500" />,
              badge: "SİSTEM VERİSİ" 
            }
          ].map((item, i) => (
            <div key={i} className="glass rounded-[2rem] p-10 border border-white/10 space-y-6 hover:bg-white/5 transition-all group cursor-default">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black mono text-zinc-500 tracking-widest">{item.badge}</span>
              </div>
              <h4 className="text-2xl font-black tracking-tight uppercase italic">{item.title}</h4>
              <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
              <div className="pt-4 flex items-center gap-2 text-blue-500 text-xs font-black mono tracking-widest uppercase cursor-pointer hover:text-white transition-colors">
                İNCELE <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-blue-600/5 border border-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
             <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Zap className="text-white fill-white" size={20} />
             </div>
             <div>
               <h5 className="font-black text-xl tracking-tight uppercase">Canlı Bilgi Akışı</h5>
               <p className="text-zinc-500 font-medium">Kullanıcılarımız sadece yazılımı değil, sürekli güncellenen e-ticaret istihbaratını da satın alır.</p>
             </div>
           </div>
           <div className="text-[10px] font-black mono text-blue-400 tracking-[0.4em] uppercase whitespace-nowrap">
             SİSTEM DURUMU: AKTİF ANALİZ
           </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
