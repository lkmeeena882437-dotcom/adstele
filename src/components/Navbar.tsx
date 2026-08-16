import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, LINKS, NAV_ITEMS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-slate-950/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a href="#top" onClick={() => trackEvent('nav_click', { item: 'brand' })} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ice-500 via-cyan-glow to-violet-glow flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-ice-500/40 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="leading-tight">
              <p className="font-[var(--font-heading)] font-bold text-sm sm:text-base text-white tracking-tight">
                {BRAND.name.toUpperCase()}
              </p>
              <p className="text-[9px] text-slate-400 tracking-[0.18em] font-semibold">
                {BRAND.tagline.toUpperCase()}
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => trackEvent('nav_click', { item: item.label })}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={LINKS.telegramSupport}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('telegram_click', { location: 'navbar' })}
              className="btn-magnetic btn-3d btn-shine hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-ice-500 via-cyan-glow to-violet-glow text-white text-xs font-bold shadow-lg shadow-ice-500/30"
            >
              💬 TALK TO US
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-slate-950/90 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 pb-4 pt-1 space-y-1">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    trackEvent('nav_click', { item: item.label });
                  }}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setOpen(false);
                  trackEvent('telegram_click', { location: 'mobile_menu' });
                }}
                className="btn-magnetic btn-3d btn-shine mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-ice-500 via-cyan-glow to-violet-glow text-white text-sm font-bold"
              >
                💬 TALK TO US ON TELEGRAM
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
