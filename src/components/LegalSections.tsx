import { useState, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { DISCLAIMER, FAQS, REFUND_POLICY } from '../data/content';
import TiltCard from './TiltCard';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';

function Accordion({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className="legal-row border-b border-slate-200/70 last:border-0">
      <button onClick={() => setOpen(value => !value)} className="w-full flex items-center justify-between py-3.5 text-left" aria-expanded={open}>
        <span className="text-xs sm:text-sm font-semibold text-slate-700 pr-4">{title}</span>
        <m.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-ice-600 shrink-0 text-lg font-light" aria-hidden="true">+</m.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-4 text-xs sm:text-sm text-slate-500 leading-relaxed">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LegalSections() {
  return (
    <section id="faq" className="legal-compact relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="section-header mb-7 sm:mb-9">
        <Kicker className="text-slate-500">QUICK ANSWERS</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">CLEAR ANSWERS. <span className="gradient-text">SIMPLE TERMS.</span></WordReveal>
        </h2>
        <p>Everything important is here. Open only what you need.</p>
      </header>

      <div className="grid lg:grid-cols-[1.35fr_.85fr] gap-4 items-start">
        <TiltCard max={2} className="glass-card legal-card rounded-2xl px-5 sm:px-6">
          <div className="legal-card-label">FREQUENTLY ASKED</div>
          {FAQS.map(faq => <Accordion key={faq.q} title={faq.q}>{faq.a}</Accordion>)}
        </TiltCard>

        <TiltCard max={2} className="glass-card legal-card rounded-2xl px-5 sm:px-6">
          <div className="legal-card-label">POLICIES</div>
          <Accordion id="refund" title={REFUND_POLICY.title}>{REFUND_POLICY.content}</Accordion>
          <Accordion id="disclaimer" title="DISCLAIMER"><p>{DISCLAIMER.marketing}</p><p className="mt-2">{DISCLAIMER.financial}</p></Accordion>
          <Accordion id="terms" title="TERMS OF SERVICE">You agree to the selected service scope and deliverables when you engage Adstele Agency. Campaign outcomes vary, and payments are non-refundable once work begins.</Accordion>
          <Accordion id="privacy" title="PRIVACY POLICY">We use your name, contact details and project requirements only to provide our services. We never sell personal data. Message us to request deletion.</Accordion>
        </TiltCard>
      </div>
    </section>
  );
}
