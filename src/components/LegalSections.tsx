import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS, REFUND_POLICY, DISCLAIMER } from '../data/content';

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-700 pr-4">{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 shrink-0 text-sm"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-slate-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LegalSections() {
  return (
    <div id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      
      {/* FAQ */}
      <div className="glass-card rounded-2xl p-5 sm:p-8 mb-4">
        <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-2">FREQUENTLY ASKED QUESTIONS</h3>
        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, i) => (
            <Accordion key={i} title={faq.q}>
              {faq.a}
            </Accordion>
          ))}
        </div>
      </div>

      {/* Refund Policy */}
      <div id="refund" className="glass-card rounded-2xl p-5 sm:p-8 mb-4">
        <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-3">{REFUND_POLICY.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{REFUND_POLICY.content}</p>
      </div>

      {/* Disclaimer */}
      <div id="disclaimer" className="glass-card rounded-2xl p-5 sm:p-8 mb-4">
        <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-3">DISCLAIMER</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">{DISCLAIMER.marketing}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{DISCLAIMER.financial}</p>
      </div>

      {/* Terms */}
      <div id="terms" className="glass-card rounded-2xl p-5 sm:p-8 mb-4">
        <Accordion title="TERMS OF SERVICE">
          We provide paid advertising management and web development services. By engaging Adstele Agency, you agree to the selected service scope and deliverables. Campaign outcomes are not guaranteed. Payments are non-refundable once work has commenced per our Refund Policy.
        </Accordion>
      </div>

      {/* Privacy */}
      <div id="privacy" className="glass-card rounded-2xl p-5 sm:p-8">
        <Accordion title="PRIVACY POLICY">
          We collect only the information needed to provide our services: name, contact details, and project requirements. We do not sell personal data. You may request deletion of your data at any time via Telegram.
        </Accordion>
      </div>
    </div>
  );
}
