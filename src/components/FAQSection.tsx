import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { FAQS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
    trackEvent('faq_open', { question: FAQS[i].q });
  };

  return (
    <Section id="faq">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">FAQ</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          FREQUENTLY ASKED
          <br />
          <span className="gradient-text">QUESTIONS</span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="glass-card rounded-2xl overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-semibold text-slate-800 pr-4">{faq.q}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400 shrink-0"
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
