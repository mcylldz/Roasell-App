
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import ArbitrageSection from './components/ArbitrageSection';
import ScoreSection from './components/ScoreSection';
import ActionSection from './components/ActionSection';
import ControlSection from './components/ControlSection';
import ThemeSection from './components/ThemeSection';
import SystemOverviewSection from './components/SystemOverviewSection';
import TeamSupportSection from './components/TeamSupportSection';
import UserTestimonialsSection from './components/UserTestimonialsSection';
import PaymentModal from './components/PaymentModal';
import ThankYouPage from './components/ThankYouPage';
import AbonelikPage from './components/AbonelikPage';
import { Menu, X } from 'lucide-react';

const Logo: React.FC<{ className?: string; iconOnly?: boolean }> = ({ className, iconOnly }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4V36M4 20H36M8.68 8.68L31.32 31.32M31.32 8.68L8.68 31.32"
          stroke="#1d4ed8"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
    {!iconOnly && (
      <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#1d4ed8] uppercase italic">
        RoaSell
      </span>
    )}
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Simple pathname-based routing
  const pathname = window.location.pathname;
  if (pathname === '/abonelik') return <AbonelikPage />;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsPaymentModalOpen(true);
    window.addEventListener('openPaymentModal', handleOpenModal);
    return () => window.removeEventListener('openPaymentModal', handleOpenModal);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show thank you page after successful payment
  if (showThankYou) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-5 text-[12px] font-bold text-zinc-400 uppercase tracking-wider mono">
            <button onClick={() => scrollToSection('analiz')} className="hover:text-white transition-colors">Reklam Analizi</button>
            <button onClick={() => scrollToSection('katil')} className="hover:text-white transition-colors">Nasıl Çalışır</button>
            <button onClick={() => scrollToSection('ek-ozellikler')} className="hover:text-white transition-colors">Ek Araçlar</button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://app.roasell.com"
              className="text-[11px] sm:text-[12px] font-bold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors"
            >
              Giriş Yap
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
              className="px-4 py-2 rounded-lg bg-white text-black text-[11px] sm:text-sm font-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-tighter"
            >
              3 Gün $1 Dene
            </button>
          </div>
        </div>
      </nav>

      <Hero />

      <main className="relative overflow-x-hidden">
        {/* ANA ÜRÜN: Reklam Analizi — En üstte */}
        <div id="analiz">
          <ScoreSection />
          <ActionSection />
        </div>

        {/* Sosyal Kanıt — Reklam analizinin hemen altında */}
        <UserTestimonialsSection />

        {/* Nasıl Çalışır + Kimler İçin */}
        <div id="katil">
          <SystemOverviewSection />
        </div>

        {/* Destek Ekibi */}
        <TeamSupportSection />

        {/* Ek Özellikler — Tek sütunda kompakt */}
        <div id="ek-ozellikler">
          <div className="py-16 sm:py-20 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  Ekosistem Araçları
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white">
                  Reklam Analizinin Yanında <br />
                  <span className="text-zinc-600">Ek Araçlarınız</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* ÜrünHub */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight mb-2">Pazar Analizi</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Globalde satılan ürünlerin hacimlerini ve Türkiye'deki pazar boşluklarını keşfedin. Ne satmalıyım belirsizliğini bitirin.</p>
                </div>
                {/* RoaSell Theme */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight mb-2">RoaSell Theme</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">Dönüşüm odaklı Shopify teması. Amatör tasarım hatalarını ortadan kaldırır, güven psikolojisiyle satın almayı hızlandırır.</p>
                </div>
                {/* RoaSell Lab */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight mb-2">RoaSell Lab</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">İşletmenizi küresel verilerle kıyaslayın. Büyüme potansiyelinizi görün, pazar açıklarını ve fırsatları tespit edin.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Son CTA */}
        <ControlSection />
      </main>

      <footer className="py-12 sm:py-16 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 opacity-90 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="scale-75" />
          </div>
          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-6">
            <button onClick={() => scrollToSection('analiz')} className="text-zinc-500 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors">Reklam Analizi</button>
            <button onClick={() => scrollToSection('katil')} className="text-zinc-500 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors">Nasıl Çalışır</button>
            <button onClick={() => scrollToSection('ek-ozellikler')} className="text-zinc-500 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors">Ek Araçlar</button>
            <a href="/abonelik" className="text-blue-500 hover:text-blue-400 text-xs uppercase tracking-wider font-bold transition-colors">Abonelik Detayları</a>
          </nav>
          <p className="text-zinc-600 text-xs text-center mono uppercase">© 2026 Roasell — Tüm Hakları Saklıdır.</p>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      {scrolled && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/90 backdrop-blur-md border-t border-white/10 py-3 px-4 sm:px-6">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-white">Reklamlarını AI ile analiz et</span>
              <span className="text-[10px] text-zinc-500">3 günlük deneme — sadece $1</span>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event('openPaymentModal'))}
              className="px-6 py-2.5 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-500 transition-all text-sm tracking-tight active:scale-95 w-full sm:w-auto"
            >
              3 Gün $1 — Hemen Başla
            </button>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          setShowThankYou(true);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    </div>
  );
};

export default App;
