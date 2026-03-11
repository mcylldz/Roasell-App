
import React, { useEffect, useState } from 'react';
import {
  Menu,
  X
} from 'lucide-react';
import Hero from './components/Hero';
import ArbitrageSection from './components/ArbitrageSection';
import ScoreSection from './components/ScoreSection';
import ActionSection from './components/ActionSection';
import ControlSection from './components/ControlSection';
import ThemeSection from './components/ThemeSection';
import SystemOverviewSection from './components/SystemOverviewSection';
import TeamSupportSection from './components/TeamSupportSection';
import UserTestimonialsSection from './components/UserTestimonialsSection';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-5 text-[12px] font-bold text-zinc-400 uppercase tracking-wider mono">
            <button onClick={() => scrollToSection('pazar')} className="hover:text-white transition-colors">Pazar Analizi</button>
            <button onClick={() => scrollToSection('theme')} className="hover:text-white transition-colors">RoaSell Theme</button>
            <button onClick={() => scrollToSection('analiz')} className="hover:text-white transition-colors">AI Analiz Motoru</button>
            <button onClick={() => scrollToSection('katil')} className="hover:text-white transition-colors">Şimdi Katıl</button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://app.roasell.com"
              className="text-[11px] sm:text-[12px] font-bold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors"
            >
              Giriş Yap
            </a>
            <button className="px-4 py-2 rounded-lg bg-white text-black text-[11px] sm:text-sm font-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 uppercase tracking-tighter">
              Şimdi Başla
            </button>
          </div>
        </div>
      </nav>

      <Hero />

      <main className="relative overflow-x-hidden">
        <div id="pazar">
          <ArbitrageSection />
        </div>

        <div id="theme">
          <ThemeSection />
        </div>

        <div id="analiz">
          <ScoreSection />
          <ActionSection />
        </div>

        <div id="katil">
          <ControlSection />
        </div>

        {/* Proof Layer after Core Modules */}
        <UserTestimonialsSection />

        <SystemOverviewSection />
        <TeamSupportSection />
      </main>

      <footer className="py-12 sm:py-16 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center mb-6 opacity-90 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="scale-75" />
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mono uppercase">© 2025 ROASELL MARKETING SCIENCE ENGINE. BEGINNER-FIRST PROFIT PATH.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
