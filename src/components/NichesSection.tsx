import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { NICHES } from '../data/content';

export default function NichesSection() {
  const [activeNiche, setActiveNiche] = useState<number | null>(null);

  return (
    <Section id="niches">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">INDUSTRIES</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          ONE ENGINE.
          <br />
          <span className="gradient-text">MANY INDUSTRIES.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
        {NICHES.map((niche, i) => (
          <button
            key={niche.label}
            onClick={() => setActiveNiche(activeNiche === i ? null : i)}
            className={`group px-4 py-5 rounded-2xl text-center transition-all duration-300 card-hover ${
              activeNiche === i
                ? 'glass-card shadow-lg border-ice-200 scale-[1.03]'
                : 'bg-white/40 hover:bg-white/70 border border-transparent hover:border-slate-200/50'
            }`}
          >
            <span className="text-3xl block mb-2">{niche.icon}</span>
            <span className={`text-sm font-semibold ${
              activeNiche === i ? 'gradient-text-blue' : 'text-slate-700'
            }`}>
              {niche.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeNiche !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{NICHES[activeNiche].icon}</span>
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-800">
                  {NICHES[activeNiche].label}
                </h3>
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-widest mb-1">TYPICAL CHALLENGE</p>
                  <p className="text-sm text-slate-600">{NICHES[activeNiche].challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-widest mb-1">RECOMMENDED SYSTEM</p>
                  <p className="text-sm font-semibold gradient-text-blue">{NICHES[activeNiche].system}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-widest mb-1">AVAILABLE SERVICES</p>
                  <p className="text-sm text-slate-600">{NICHES[activeNiche].services}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
