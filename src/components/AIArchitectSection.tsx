import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

const DEMO_ANALYSES: Record<string, { businessType: string; platform: string; objective: string; system: string; package: string; price: string }> = {
  trading: { businessType: 'Trading', platform: 'Telegram', objective: 'Audience Growth', system: 'Ads Engine + AI Content', package: 'STARTER', price: '$150' },
  crypto: { businessType: 'Crypto', platform: 'Telegram', objective: 'Community Building', system: 'Ads Engine + Automation', package: 'GROWTH', price: '$300' },
  gaming: { businessType: 'Gaming', platform: 'Telegram', objective: 'Engagement Growth', system: 'Ads + AI Content + Automation', package: 'STARTER', price: '$150' },
  education: { businessType: 'Education', platform: 'Telegram', objective: 'Student Acquisition', system: 'AI Content + Automation', package: 'GROWTH', price: '$300' },
  default: { businessType: 'Business', platform: 'Telegram', objective: 'Audience Growth', system: 'Ads Engine + AI Content', package: 'STARTER', price: '$150' },
};

function analyzeInput(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes('trad') || lower.includes('stock') || lower.includes('forex')) return DEMO_ANALYSES.trading;
  if (lower.includes('crypto') || lower.includes('bitcoin') || lower.includes('defi')) return DEMO_ANALYSES.crypto;
  if (lower.includes('game') || lower.includes('gaming') || lower.includes('esport')) return DEMO_ANALYSES.gaming;
  if (lower.includes('edu') || lower.includes('course') || lower.includes('learn') || lower.includes('teach')) return DEMO_ANALYSES.education;
  return DEMO_ANALYSES.default;
}

export default function AIArchitectSection() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof analyzeInput> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!input.trim()) return;
    trackEvent('configurator_start', { type: 'architect' });
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeInput(input));
      setAnalyzing(false);
    }, 1500);
  }, [input]);

  return (
    <Section id="growth-system" className="bg-gradient-to-b from-transparent via-ice-50/30 to-transparent">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-violet-glow tracking-widest mb-3">AI-POWERED</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          MEET YOUR
          <br />
          <span className="gradient-text-violet">GROWTH ARCHITECT</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Tell us what you're trying to build. The system maps a suitable growth workflow.
        </p>
        <p className="text-xs text-slate-400 mt-2 italic">
          Demo — Frontend simulation. Architecture ready for future AI API integration.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-8">
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-400 tracking-widest mb-2 block">
              DESCRIBE YOUR TELEGRAM BUSINESS
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                placeholder="e.g. I have a stock market Telegram channel and want to grow..."
                className="flex-1 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
              />
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !input.trim()}
                className="btn-magnetic px-6 py-3 bg-gradient-to-r from-violet-glow to-ice-500 text-white rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? '...' : 'Analyze'}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-ice-300 border-t-ice-500 rounded-full animate-spin" />
                  <span className="text-sm text-slate-500">Analyzing your business...</span>
                </div>
              </motion.div>
            )}

            {result && !analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'BUSINESS TYPE', value: result.businessType },
                    { label: 'PLATFORM', value: result.platform },
                    { label: 'OBJECTIVE', value: result.objective },
                  ].map(item => (
                    <div key={item.label} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-semibold text-slate-400 tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-ice-50 to-violet-50 border border-ice-200/30 mb-6">
                  <p className="text-xs font-semibold text-ice-600 tracking-widest mb-2">RECOMMENDED SYSTEM</p>
                  <p className="text-lg font-bold gradient-text mb-3">{result.system}</p>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-white border border-ice-200/50">
                      <p className="text-xs text-slate-500">Package</p>
                      <p className="text-sm font-bold text-slate-800">{result.package}</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white border border-ice-200/50">
                      <p className="text-xs text-slate-500">Starting at</p>
                      <p className="text-sm font-bold gradient-text-blue">{result.price}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={LINKS.telegramSupport}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('configurator_complete', { package: result.package })}
                  className="btn-magnetic w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-ice-500 to-violet-glow text-white rounded-2xl text-sm font-semibold shadow-lg"
                >
                  🚀 BUILD THIS SYSTEM
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
