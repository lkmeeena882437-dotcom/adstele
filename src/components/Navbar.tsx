import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BRAND, LINKS, NAV_ITEMS } from '../data/content';
import { trackEvent } from '../utils/analytics';
import Sticker from './Sticker';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-slate-950/20' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group" onClick={() => trackEvent('nav_click', { item: 'brand' })}>
          <BrandLogo className="w-9 h-9 group-hover:scale-105 transition-transform" />
          <span className="leading-tight"><strong className="font-heading block text-sm sm:text-base text-white tracking-tight">{BRAND.name.toUpperCase()}</strong><small className="font-mono block text-[7px] text-slate-400 tracking-[.17em]">{BRAND.tagline.toUpperCase()}</small></span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => <a key={item.href} href={item.href} className="nav-link px-3 py-2 text-[10px] font-mono font-semibold text-slate-300 hover:text-white" onClick={() => trackEvent('nav_click', { item: item.label })}>{item.label.toUpperCase()}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" data-cursor="CHAT" className="btn-3d btn-shine hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-ice-500 to-violet-glow text-white text-xs font-bold" onClick={() => trackEvent('telegram_click', { location: 'navbar' })}><Sticker icon="chat" size="sm" tilt={-6} /> TALK TO US</a>
          <button onClick={() => setOpen(value => !value)} aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="mobile-navigation" className="md:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <m.nav id="mobile-navigation" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden bg-slate-950/95 border-b border-white/5">
            <div className="px-4 pb-4 space-y-1">{NAV_ITEMS.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5">{item.label}</a>)}</div>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
