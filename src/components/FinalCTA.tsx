import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

const CONVERGE_NODES = [
  { label: 'ADS', color: '#0ea5e9' },
  { label: 'AI', color: '#8b5cf6' },
  { label: 'CONTENT', color: '#06b6d4' },
  { label: 'AUTOMATION', color: '#34d399' },
  { label: 'TELEGRAM', color: '#38bdf8' },
];

export default function FinalCTA() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ice-50/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ice-200/20 via-violet-200/10 to-cyan-200/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {CONVERGE_NODES.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.5, x: (i - 2) * 40, y: -20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              className="flex items-center gap-3"
            >
              <div
                className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border shadow-sm text-xs font-bold tracking-wider"
                style={{ borderColor: node.color + '30', color: node.color }}
              >
                {node.label}
              </div>
              {i < CONVERGE_NODES.length - 1 && (
                <span className="text-slate-300 hidden sm:block">+</span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block">
            <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-xl border border-ice-200 shadow-2xl shadow-ice-500/20 flex items-center justify-center mx-auto mb-6 node-glow">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
        >
          BUILD YOUR
          <br />
          <span className="gradient-text">GROWTH SYSTEM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-lg text-slate-500 mb-10 max-w-lg mx-auto"
        >
          Your Telegram business. One intelligent growth workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('hero_cta_click', { location: 'final_cta', type: 'start' })}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ice-500 via-cyan-glow to-ice-500 text-white rounded-2xl text-base font-semibold shadow-xl shadow-ice-500/25"
          >
            🚀 START WITH $150
          </a>
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { location: 'final_cta' })}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 glass-card rounded-2xl text-base font-semibold text-slate-700 hover:text-ice-600"
          >
            💬 TALK TO US
          </a>
        </motion.div>
      </div>
    </section>
  );
}
