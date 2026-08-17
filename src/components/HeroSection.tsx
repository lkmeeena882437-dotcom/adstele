import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BRAND, HERO_STATS, LINKS, NICHES } from '../data/content';
import { platformLabels } from '../three/platformLabels';
import { trackEvent } from '../utils/analytics';
import CountUp from './CountUp';
import { RevealLine } from './Reveal';
import Sticker from './Sticker';

const PLATFORMS = [
  { key: 'meta', icon: '📘', label: 'META ADS', ring: 'rgba(10,132,255,.5)' },
  { key: 'google', icon: '🔍', label: 'GOOGLE ADS', ring: 'rgba(52,168,83,.5)' },
  { key: 'telegram', icon: '📢', label: 'TELEGRAM ADS', ring: 'rgba(42,171,238,.5)' },
] as const;

const ROTATING = ['META', 'TELEGRAM', 'GOOGLE'] as const;

function BrandWord({ word }: { word: typeof ROTATING[number] }) {
  if (word === 'GOOGLE') {
    return <span className="brand-google" aria-label="Google">{'GOOGLE'.split('').map((letter, i) => <span key={`${letter}-${i}`}>{letter}</span>)}</span>;
  }
  return <span className={word === 'META' ? 'brand-meta' : 'brand-telegram'}>{word}</span>;
}

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex(value => (value + 1) % ROTATING.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  const word = ROTATING[index];
  return (
    <span className="rw-wrap" style={{ minWidth: '5.1em' }}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={word}
          className="rw-word"
          initial={{ y: '115%', rotateX: 42, opacity: 0 }}
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          exit={{ y: '-115%', rotateX: -42, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandWord word={word} />
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function InteractivePlatformTags() {
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const heroProgress = Math.max(0, Math.min(1, 1 - window.scrollY / (window.innerHeight * 0.75)));
      PLATFORMS.forEach(platform => {
        const anchor = refs.current[platform.key];
        const label = platformLabels[platform.key];
        if (!anchor) return;
        const opacity = label.o * heroProgress;
        anchor.style.transform = `translate3d(${label.x}px,${label.y}px,0) translate(-50%,-50%)`;
        anchor.style.opacity = `${opacity}`;
        anchor.style.pointerEvents = opacity > 0.45 ? 'auto' : 'none';
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="platform-tags" aria-label="Advertising platforms">
      {PLATFORMS.map((platform, index) => (
        <a
          key={platform.key}
          ref={node => { refs.current[platform.key] = node; }}
          href="#services"
          className="platform-tag chip-dark"
          data-cursor="EXPLORE"
        >
          <Sticker emoji={platform.icon} size="sm" tilt={index * 6 - 5} />
          {platform.label.replace(' ADS', '')}
        </a>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.current?.style.setProperty('--bx', `${(event.clientX / window.innerWidth) * 100}%`);
        hero.current?.style.setProperty('--by', `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={hero} id="top" data-scene="hero" className="hero-dark relative min-h-[760px] pt-28 sm:pt-36 pb-28 px-4 overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-beam" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="hidden lg:block absolute left-10 top-44 z-10">
        <div className="chip-dark rounded-2xl px-4 py-3 flex items-center gap-3 float">
          <Sticker emoji="📈" size="md" tilt={-8} />
          <div><p className="font-heading font-bold text-white text-sm">4.8x ROAS</p><p className="text-[10px] text-slate-300">Avg. across accounts</p></div>
        </div>
      </div>
      <div className="hidden lg:block absolute right-10 top-72 z-10">
        <div className="chip-dark rounded-2xl px-4 py-3 flex items-center gap-3 float-slow">
          <Sticker emoji="🎯" size="md" tilt={7} />
          <div><p className="font-heading font-bold text-white text-sm">120+ Campaigns</p><p className="text-[10px] text-slate-300">Launched & scaled</p></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.7 }}
          className="inline-flex items-center gap-2 chip-dark rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-mint-glow pulse-dot" />
          <span className="text-[9px] sm:text-[11px] font-semibold tracking-[.18em] text-slate-100">PREMIUM PERFORMANCE MARKETING AGENCY</span>
        </m.div>

        <h1 className="h-hero font-heading text-white tracking-[-.035em]">
          <RevealLine innerClassName="hero-3d" delay={0.15}>ADS THAT PRINT</RevealLine>
          <RevealLine innerClassName="hero-3d flex flex-wrap justify-center items-baseline gap-x-[.22em]" delay={0.3}>
            <span>PROFIT ON</span><RotatingWord />
          </RevealLine>
        </h1>

        <m.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 leading-relaxed"
        >
          {BRAND.statement}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" data-cursor="START"
            onClick={() => trackEvent('telegram_click', { location: 'hero' })}
            className="btn-3d btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ice-500 via-cyan-glow to-violet-glow text-white text-sm font-bold shadow-lg shadow-ice-500/40 w-full sm:w-auto justify-center"
          >
            <Sticker emoji="🚀" size="sm" tilt={-8} /> START SCALING NOW
          </a>
          <a href="#pricing" className="btn-3d btn-conic inline-flex items-center justify-center px-7 py-3.5 rounded-2xl chip-dark text-sm font-bold text-white w-full sm:w-auto">
            VIEW PRICING →
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {PLATFORMS.map((platform, index) => (
            <div key={platform.key} className="platform-pill chip-dark" style={{ boxShadow: `0 0 0 1px ${platform.ring}, 0 10px 26px -15px ${platform.ring}` }}>
              <Sticker emoji={platform.icon} size="sm" tilt={index * 6 - 5} />
              <span>{platform.label}</span>
            </div>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-12 sm:mt-16"
        >
          {HERO_STATS.map(stat => (
            <div key={stat.label} className="chip-dark card-hover rounded-2xl px-4 py-5">
              <p className="font-heading gradient-text text-2xl sm:text-3xl font-bold"><CountUp {...stat} to={stat.value} /></p>
              <p className="font-mono text-[9px] tracking-widest text-slate-300 font-semibold mt-1.5">{stat.label}</p>
            </div>
          ))}
        </m.div>
      </div>

      <div className="marquee marquee-mask relative z-10 mt-14 sm:mt-16 border-y border-white/10 bg-slate-950/40 py-4">
        <div className="marquee-track">
          {[...NICHES, ...NICHES].map((niche, index) => (
            <span key={`${niche}-${index}`} className="flex items-center gap-3 px-6 text-[10px] font-mono font-bold tracking-[.2em] text-slate-300 whitespace-nowrap">
              <i className="w-1 h-1 rounded-full bg-ice-400" /> {niche}
            </span>
          ))}
        </div>
      </div>

      <InteractivePlatformTags />
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 62C220 112 430 13 715 60c264 43 477-35 725-4v64H0Z" fill="rgba(186,230,253,.3)" />
          <path d="M0 80c278-37 463 48 734 7 273-42 488 28 706-5v38H0Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
