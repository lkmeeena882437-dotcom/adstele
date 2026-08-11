import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, LINKS, BRAND } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 px-4'
            : 'py-4 px-6'
        }`}
      >
        <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg py-3 px-6'
            : 'bg-transparent py-2 px-4'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group" aria-label="Adstele Agency Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ice-500 to-violet-glow flex items-center justify-center text-white font-bold text-sm font-[var(--font-heading)]">
                A
              </div>
              <span className="font-[var(--font-heading)] font-bold text-base tracking-tight text-slate-800 hidden sm:block">
                {BRAND.name.toUpperCase()}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-ice-600 transition-colors rounded-lg hover:bg-white/50"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('hero_cta_click', { location: 'navbar' })}
                className="btn-magnetic hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-xl text-sm font-semibold shadow-lg shadow-ice-500/20"
              >
                🚀 Build My Growth System
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1">
                  <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 pt-20 px-4"
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <div className="relative glass rounded-2xl shadow-xl p-6 max-w-md mx-auto">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-slate-700 hover:text-ice-600 hover:bg-ice-50 rounded-xl transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <hr className="my-2 border-slate-200/50" />
                <a
                  href={LINKS.telegramSupport}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { trackEvent('hero_cta_click', { location: 'mobile_nav' }); setMobileOpen(false); }}
                  className="btn-magnetic flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-xl text-sm font-semibold"
                >
                  🚀 Build My Growth System
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
