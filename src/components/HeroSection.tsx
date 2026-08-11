import { useState } from 'react';
import { motion } from 'framer-motion';
import { LINKS, NICHES } from '../data/content';
import { trackEvent } from '../utils/analytics';

const HERO_NODES = [
  { id: 'ads', label: 'ADS', color: '#0ea5e9', angle: -60, desc: 'Telegram advertising campaigns' },
  { id: 'ai', label: 'AI', color: '#8b5cf6', angle: 0, desc: 'AI-powered content generation' },
  { id: 'content', label: 'CONTENT', color: '#06b6d4', angle: 60, desc: 'Professional content creation' },
  { id: 'auto', label: 'AUTOMATION', color: '#34d399', angle: 120, desc: 'Marketing workflow automation' },
  { id: 'analytics', label: 'ANALYTICS', color: '#a78bfa', angle: 180, desc: 'Campaign data & optimization' },
  { id: 'telegram', label: 'TELEGRAM', color: '#38bdf8', angle: 240, desc: 'Telegram-native growth' },
];

export default function HeroSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-ice-600 mb-6 tracking-wider"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          AI-POWERED TELEGRAM GROWTH
        </motion.div>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.3em] text-slate-400 mb-4"
        >
          ADS × AI × CONTENT × AUTOMATION
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-6"
        >
          BUILD YOUR TELEGRAM
          <br />
          <span className="gradient-text">GROWTH SYSTEM</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Advertising, AI-powered content and automation combined into one intelligent growth workflow.
        </motion.p>

        {/* Commercial entry point */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-ice-50 to-cyan-50 border border-ice-200/50 text-sm font-semibold text-ice-700">
            📢 Buy Telegram Channel Ads For Your Business Growth — Starting at $150
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('hero_cta_click', { type: 'primary' })}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ice-500 via-cyan-glow to-ice-500 text-white rounded-2xl text-base font-semibold shadow-xl shadow-ice-500/25 hover:shadow-ice-500/40"
          >
            🚀 BUILD MY GROWTH SYSTEM
          </a>
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { location: 'hero' })}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 glass-card rounded-2xl text-base font-semibold text-slate-700 hover:text-ice-600"
          >
            💬 TALK TO US
          </a>
        </motion.div>

        {/* Mobile node badges (visible on mobile only) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6 md:hidden"
        >
          {HERO_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="px-3 py-2 rounded-xl bg-white/70 backdrop-blur-sm border shadow-sm text-[10px] font-bold tracking-wider"
              style={{ borderColor: node.color + '30', color: node.color }}
            >
              {node.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Node System (desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative w-full max-w-lg mx-auto aspect-square mb-8 hidden md:block"
        >
          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-28 h-28 rounded-full bg-white/80 backdrop-blur-xl border border-ice-200 shadow-xl shadow-ice-500/10 flex flex-col items-center justify-center node-glow">
              <span className="text-xs font-semibold text-ice-500 tracking-wider">TELEGRAM</span>
              <span className="text-[10px] font-bold gradient-text tracking-widest">GROWTH ENGINE</span>
            </div>
          </div>

          {/* Orbiting nodes */}
          {HERO_NODES.map((node, i) => {
            const radius = 170;
            const angleRad = (node.angle * Math.PI) / 180;
            const x = 50 + Math.cos(angleRad) * (radius / 2.5);
            const y = 50 + Math.sin(angleRad) * (radius / 2.5);

            return (
              <motion.div
                key={node.id}
                className="absolute z-10"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                animate={{
                  x: [0, Math.cos(i) * 5, 0],
                  y: [0, Math.sin(i) * 5, 0],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`relative cursor-pointer transition-all duration-300 ${
                    hoveredNode === node.id ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-xl bg-white/70 backdrop-blur-lg border shadow-lg flex flex-col items-center justify-center gap-0.5"
                    style={{ borderColor: node.color + '30', boxShadow: `0 4px 20px ${node.color}15` }}
                  >
                    <span className="text-[9px] font-bold tracking-wider" style={{ color: node.color }}>
                      {node.label}
                    </span>
                  </div>
                  {/* Tooltip */}
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-white rounded-lg shadow-lg text-xs text-slate-600 whitespace-nowrap z-30 border border-slate-100"
                    >
                      {node.desc}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            {HERO_NODES.map((node) => {
              const radius = 170;
              const angleRad = (node.angle * Math.PI) / 180;
              const x = 50 + Math.cos(angleRad) * (radius / 2.5);
              const y = 50 + Math.sin(angleRad) * (radius / 2.5);
              return (
                <line
                  key={node.id}
                  x1="50" y1="50"
                  x2={x} y2={y}
                  stroke={node.color}
                  strokeOpacity="0.15"
                  strokeWidth="0.3"
                  strokeDasharray="1 2"
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/50 mb-8"
        >
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          <span className="text-xs font-semibold text-green-700 tracking-wider">GROWTH SYSTEMS ONLINE</span>
          <span className="text-xs text-green-600">— Accepting new projects</span>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-slate-400 tracking-widest mb-3">BUILT FOR</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {NICHES.map(niche => (
              <span
                key={niche.label}
                className="px-3 py-1.5 rounded-full glass-card text-xs font-medium text-slate-600 hover:text-ice-600 hover:border-ice-300 transition-all cursor-default"
              >
                {niche.icon} {niche.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
