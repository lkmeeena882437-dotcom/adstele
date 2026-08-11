import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from './Section';
import { WHY_US, TRUST_ITEMS, DISCLAIMER } from '../data/content';

export default function WhyUsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">WHY ADSTELE</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          BUILT AROUND
          <br />
          <span className="gradient-text">SYSTEMS</span>
        </h2>
      </div>

      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-20">
        {WHY_US.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass-card rounded-2xl p-6 text-center card-hover"
          >
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h3 className="font-[var(--font-heading)] text-sm font-bold text-slate-800 mb-1">{item.title}</h3>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <div className="text-center mb-8">
          <h3 className="font-[var(--font-heading)] text-2xl font-bold text-slate-900 mb-2">
            TRANSPARENT BY DESIGN
          </h3>
          <p className="text-sm text-slate-500">We believe in honest business practices.</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="grid gap-3">
            {TRUST_ITEMS.map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-green-500 shrink-0">{item.slice(0, 1)}</span>
                <span>{item.slice(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <h4 className="font-[var(--font-heading)] text-sm font-bold text-slate-600 mb-3 tracking-wider">RESPONSIBLE MARKETING</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            {DISCLAIMER.marketing}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {DISCLAIMER.financial}
          </p>
        </div>
      </div>
    </Section>
  );
}
