import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

const OLD_WORKFLOW = ['Ads', 'Manual Content', 'Manual Posting', 'Manual Optimization', 'Lost Time'];
const NEW_WORKFLOW = ['ADS', 'AI', 'CONTENT', 'AUTOMATION', 'TELEGRAM', 'DATA', 'OPTIMIZATION'];

export default function ProblemSection() {
  const [showNew, setShowNew] = useState(false);

  return (
    <Section id="platform">
      <div className="text-center mb-16">
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          TELEGRAM BUSINESS SHOULDN'T BE
          <br />
          <span className="gradient-text">THIS FRAGMENTED.</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Stop juggling disconnected tools. Build one intelligent system.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl glass-card p-1">
            <button
              onClick={() => setShowNew(false)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !showNew ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Old Workflow
            </button>
            <button
              onClick={() => setShowNew(true)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                showNew ? 'bg-gradient-to-r from-ice-500 to-cyan-glow text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Intelligent Workflow
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 min-h-[80px]">
          {!showNew ? (
            OLD_WORKFLOW.map((step, i) => (
              <motion.div
                key={`old-${step}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="px-5 py-3 rounded-xl bg-red-50 border border-red-200/50 text-red-600 text-sm font-semibold">
                  {step}
                </div>
                {i < OLD_WORKFLOW.length - 1 && (
                  <span className="text-red-300 text-lg">↓</span>
                )}
              </motion.div>
            ))
          ) : (
            NEW_WORKFLOW.map((step, i) => (
              <motion.div
                key={`new-${step}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="px-5 py-3 rounded-xl glass-card text-sm font-bold text-ice-600 border border-ice-200/50 shadow-sm">
               {step}
           </div>
                {i < NEW_WORKFLOW.length - 1 && (
                  <span className="text-ice-400 text-lg">→</span>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
