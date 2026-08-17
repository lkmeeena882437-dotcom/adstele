import { useState, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { DISCLAIMER, FAQS, REFUND_POLICY } from '../data/content';
import TiltCard from './TiltCard';
import Kicker from './Kicker';

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setOpen(value => !value)} className="w-full flex items-center justify-between py-4 text-left" aria-expanded={open}>
        <span className="text-sm font-semibold text-slate-700 pr-4">{title}</span>
        <m.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-ice-600 shrink-0 text-xl font-light">+</m.span>
      </button>
      <AnimatePresence initial={false}>
        {open && <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-4 text-sm text-slate-500 leading-relaxed">{children}</div></m.div>}
      </AnimatePresence>
    </div>
  );
}

export default function LegalSections() {
  return (
    <section id="faq" className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <Kicker className="text-slate-500 mb-6">SUPPORT &amp; POLICIES</Kicker>
      <div className="space-y-4">
        <TiltCard max={3} className="glass-card rounded-2xl p-5 sm:p-8"><h3 className="font-heading text-lg font-bold text-slate-800 mb-2">FREQUENTLY ASKED QUESTIONS</h3>{FAQS.map(faq => <Accordion key={faq.q} title={faq.q}>{faq.a}</Accordion>)}</TiltCard>
        <TiltCard max={3} className="glass-card rounded-2xl p-5 sm:p-8"><div id="refund"><h3 className="font-heading text-lg font-bold text-slate-800 mb-3">{REFUND_POLICY.title}</h3><p className="text-sm text-slate-500 leading-relaxed">{REFUND_POLICY.content}</p></div></TiltCard>
        <TiltCard max={3} className="glass-card rounded-2xl p-5 sm:p-8"><div id="disclaimer"><h3 className="font-heading text-lg font-bold text-slate-800 mb-3">DISCLAIMER</h3><p className="text-sm text-slate-500 leading-relaxed mb-3">{DISCLAIMER.marketing}</p><p className="text-sm text-slate-500 leading-relaxed">{DISCLAIMER.financial}</p></div></TiltCard>
        <TiltCard max={3} className="glass-card rounded-2xl px-5 sm:px-8"><div id="terms"><Accordion title="TERMS OF SERVICE">We provide paid advertising management and web development services. By engaging Adstele Agency, you agree to the selected service scope and deliverables. Campaign outcomes are not guaranteed. Payments are non-refundable once work has commenced per our Refund Policy.</Accordion></div></TiltCard>
        <TiltCard max={3} className="glass-card rounded-2xl px-5 sm:px-8"><div id="privacy"><Accordion title="PRIVACY POLICY">We collect only the information needed to provide our services: name, contact details, and project requirements. We do not sell personal data. You may request deletion of your data at any time via Telegram.</Accordion></div></TiltCard>
      </div>
    </section>
  );
}
