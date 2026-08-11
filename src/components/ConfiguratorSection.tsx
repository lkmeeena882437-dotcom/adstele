import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { CONFIGURATOR_OPTIONS, PRICING, LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ConfiguratorSection() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState('');
  const [industry, setIndustry] = useState('');
  const [stage, setStage] = useState('');

  const getRecommendation = () => {
    if (need === 'Complete Growth System' || stage === 'Scaling') return PRICING[2];
    if (need === 'Automation' || need === 'Content') return PRICING[1];
    return PRICING[0];
  };

  const handleSelect = (s: number, value: string) => {
    if (s === 0) setNeed(value);
    if (s === 1) setIndustry(value);
    if (s === 2) setStage(value);
    trackEvent('configurator_start', { step: s, value });
    if (s < 2) {
      setTimeout(() => setStep(s + 1), 300);
    } else {
      setTimeout(() => setStep(3), 300);
    }
  };

  const recommendation = getRecommendation();

  return (
    <Section>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">CONFIGURATOR</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          BUILD YOUR
          <br />
          <span className="gradient-text">CUSTOM SYSTEM</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i <= step
                  ? 'bg-gradient-to-r from-ice-500 to-cyan-glow text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {i < 3 ? i + 1 : '✓'}
              </div>
              {i < 3 && <div className={`w-8 h-0.5 rounded ${i < step ? 'bg-ice-400' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-8"
            >
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-800 mb-6 text-center">
                {step === 0 && 'WHAT DO YOU NEED?'}
                {step === 1 && 'WHAT IS YOUR INDUSTRY?'}
                {step === 2 && 'WHAT IS YOUR CURRENT STAGE?'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {step === 0 && CONFIGURATOR_OPTIONS.needs.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(0, opt)}
                    className={`p-4 rounded-2xl text-sm font-semibold transition-all card-hover ${
                      need === opt
                        ? 'bg-ice-50 border-2 border-ice-400 text-ice-700'
                        : 'bg-white/60 border-2 border-transparent hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                {step === 1 && CONFIGURATOR_OPTIONS.industries.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(1, opt)}
                    className={`p-4 rounded-2xl text-sm font-semibold transition-all card-hover ${
                      industry === opt
                        ? 'bg-ice-50 border-2 border-ice-400 text-ice-700'
                        : 'bg-white/60 border-2 border-transparent hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                {step === 2 && CONFIGURATOR_OPTIONS.stages.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(2, opt)}
                    className={`p-4 rounded-2xl text-sm font-semibold transition-all card-hover ${
                      stage === opt
                        ? 'bg-ice-50 border-2 border-ice-400 text-ice-700'
                        : 'bg-white/60 border-2 border-transparent hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ← Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8"
            >
              <div className="text-center mb-6">
                <p className="text-xs font-semibold text-ice-500 tracking-widest mb-2">YOUR RECOMMENDED SYSTEM</p>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold gradient-text mb-2">
                  {recommendation.name}
                </h3>
                <p className="text-sm text-slate-500">{recommendation.subtitle}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-ice-50 border border-ice-200/50 text-xs font-semibold text-ice-700">{need}</span>
                <span className="px-3 py-1 rounded-full bg-violet-50 border border-violet-200/50 text-xs font-semibold text-violet-700">{industry}</span>
                <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200/50 text-xs font-semibold text-green-700">{stage}</span>
              </div>

              <div className="text-center mb-6">
                <span className="font-[var(--font-heading)] text-4xl font-bold gradient-text">{recommendation.price}</span>
                {recommendation.period && <span className="text-slate-500 text-lg">{recommendation.period}</span>}
              </div>

              <div className="grid gap-2 mb-8">
                {recommendation.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-ice-400"></span>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('configurator_complete', { package: recommendation.name, need, industry, stage })}
                className="btn-magnetic w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-2xl text-base font-semibold shadow-lg"
              >
                🚀 START THIS SYSTEM
              </a>

              <button
                onClick={() => { setStep(0); setNeed(''); setIndustry(''); setStage(''); }}
                className="w-full mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
