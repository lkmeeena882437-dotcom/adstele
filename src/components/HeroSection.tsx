import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { BRAND, HERO_STATS, LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';
import HeroCanvas from '../three/HeroCanvas';

const PLATFORMS = [
  { icon: '📘', label: 'Meta Ads' },
  { icon: '🔍', label: 'Google Ads' },
  { icon: '📢', label: 'Telegram Ads' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
  const canvasWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll-linked canvas fade + drift
    let rafScroll = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        const el = canvasWrap.current;
        if (!el) return;
        const p = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
        el.style.opacity = String(1 - p * 0.7);
        el.style.transform = `translateY(${(p * 48).toFixed(1)}px)`;
      });
    };

    // Depth parallax for floating DOM chips
    let rafPointer = 0;
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const onPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafPointer);
      rafPointer = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        parallaxEls.forEach(el => {
          const depth = Number(el.dataset.parallax ?? 0);
          el.style.transform = `translate3d(${(x * depth).toFixed(1)}px, ${(y * depth).toFixed(1)}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafScroll);
      cancelAnimationFrame(rafPointer);
    };
  }, []);

  return (
    <section id="top" className="hero-dark relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 overflow-hidden">
      {/* 3D constellation layer */}
      <div ref={canvasWrap} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        <HeroCanvas />
      </div>

      {/* Floating stat chips with depth parallax */}
      <div data-parallax="18" className="hidden lg:block absolute left-10 top-44 z-10 will-change-transform">
        <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 float">
          <span className="text-2xl">📈</span>
          <div>
            <p className="font-[var(--font-heading)] font-bold text-white text-sm">4.8x ROAS</p>
            <p className="text-[10px] text-slate-400">Avg. across accounts</p>
          </div>
        </div>
      </div>
      <div data-parallax="-14" className="hidden lg:block absolute right-10 top-72 z-10 will-change-transform">
        <div className="glass-dark rounded-2xl px-4 py-3 flex items-center gap-3 float-slow float-delay-2">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="font-[var(--font-heading)] font-bold text-white text-sm">120+ Campaigns</p>
            <p className="text-[10px] text-slate-400">Launched & scaled</p>
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-mint-glow pulse-dot" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-slate-200">
            PREMIUM PERFORMANCE MARKETING AGENCY
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          WE SCALE BRANDS
          <br />
          <span className="gradient-text">WITH PRECISION ADS</span>
        </motion.h1>

        {/* Statement */}
        <motion.p variants={item} className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
          {BRAND.statement}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { location: 'hero' })}
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ice-500 via-cyan-glow to-violet-glow text-white text-sm font-bold shadow-lg shadow-ice-500/40 w-full sm:w-auto justify-center"
          >
            🚀 START YOUR CAMPAIGN
          </a>
          <a
            href="#pricing"
            onClick={() => trackEvent('nav_click', { item: 'pricing' })}
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass-dark text-sm font-bold text-white w-full sm:w-auto justify-center"
          >
            VIEW PRICING →
          </a>
        </motion.div>

        {/* Platforms */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mt-8">
          {PLATFORMS.map(platform => (
            <div key={platform.label} className="flex items-center gap-2 glass-dark rounded-full px-4 py-2">
              <span className="text-base">{platform.icon}</span>
              <span className="text-xs font-bold text-slate-200 tracking-wide">{platform.label.toUpperCase()}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-12 sm:mt-16">
          {HERO_STATS.map(stat => (
            <div key={stat.label} className="glass-dark card-hover rounded-2xl px-4 py-5">
              <p className="font-[var(--font-heading)] gradient-text text-2xl sm:text-3xl font-bold">{stat.value}</p>
              <p className="text-[10px] tracking-widest text-slate-400 font-semibold mt-1.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] tracking-[0.3em] text-slate-500 font-semibold">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-400 text-xs"
        >
          ▾
        </motion.span>
      </motion.div>

      {/* Fade into light sections */}
      <div className="hero-fade absolute left-0 right-0 bottom-0 h-24 z-[5]" />
    </section>
  );
}
