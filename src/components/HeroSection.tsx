import { motion, type Variants } from 'framer-motion';
import { BRAND, HERO_STATS, LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

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
  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 px-4">
      {/* Floating decorative cards (desktop) */}
      <div className="hidden lg:flex absolute left-10 top-44 glass-card rounded-2xl px-4 py-3 items-center gap-3 float">
        <span className="text-2xl">📈</span>
        <div>
          <p className="font-[var(--font-heading)] font-bold text-slate-900 text-sm">4.8x ROAS</p>
          <p className="text-[10px] text-slate-400">Avg. across accounts</p>
        </div>
      </div>
      <div className="hidden lg:flex absolute right-10 top-72 glass-card rounded-2xl px-4 py-3 items-center gap-3 float-slow float-delay-2">
        <span className="text-2xl">🎯</span>
        <div>
          <p className="font-[var(--font-heading)] font-bold text-slate-900 text-sm">120+ Campaigns</p>
          <p className="text-[10px] text-slate-400">Launched & scaled</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-mint-glow pulse-dot" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-slate-600">
            PREMIUM PERFORMANCE MARKETING AGENCY
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight"
        >
          WE SCALE BRANDS
          <br />
          <span className="gradient-text">WITH PRECISION ADS</span>
        </motion.h1>

        {/* Statement */}
        <motion.p variants={item} className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed">
          {BRAND.statement}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { location: 'hero' })}
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ice-500 via-cyan-glow to-violet-glow text-white text-sm font-bold shadow-lg shadow-ice-500/30 w-full sm:w-auto justify-center"
          >
            🚀 START YOUR CAMPAIGN
          </a>
          <a
            href="#pricing"
            onClick={() => trackEvent('nav_click', { item: 'pricing' })}
            className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass-card text-sm font-bold text-slate-800 w-full sm:w-auto justify-center"
          >
            VIEW PRICING →
          </a>
        </motion.div>

        {/* Platforms */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mt-8">
          {PLATFORMS.map(platform => (
            <div key={platform.label} className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
              <span className="text-base">{platform.icon}</span>
              <span className="text-xs font-bold text-slate-700 tracking-wide">{platform.label.toUpperCase()}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-12 sm:mt-16">
          {HERO_STATS.map(stat => (
            <div key={stat.label} className="glass-card card-hover rounded-2xl px-4 py-5">
              <p className="font-[var(--font-heading)] gradient-text text-2xl sm:text-3xl font-bold">{stat.value}</p>
              <p className="text-[10px] tracking-widest text-slate-400 font-semibold mt-1.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
