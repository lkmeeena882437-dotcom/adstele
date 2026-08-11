import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from './Section';
import { PRICING, LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function PricingSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="pricing">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">PRICING</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          CLEAR PACKAGES.
          <br />
          <span className="gradient-text">TRANSPARENT PRICING.</span>
        </h2>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-16 flex-wrap">
        {[
          { label: 'START', price: '$150', icon: '🚀', desc: 'Telegram Ad Campaign' },
          { label: 'BUILD', price: '$300', icon: '⚡', desc: 'Ads + Content System' },
          { label: 'SCALE', price: '$700/mo', icon: '🔮', desc: 'AI Growth & Automation' },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-3 sm:gap-6">
            <div className="text-center glass-card rounded-2xl px-6 py-4 card-hover">
              <span className="text-2xl block mb-1">{item.icon}</span>
              <p className="text-[10px] font-semibold text-slate-400 tracking-widest mb-1">{item.label}</p>
              <p className="font-[var(--font-heading)] text-xl font-bold gradient-text-blue">{item.price}</p>
              <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
            </div>
            {i < 2 && (
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-ice-300 text-2xl">→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRICING.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`relative rounded-3xl p-8 card-hover ${
              plan.highlight
                ? 'glass-card border-2 border-ice-300 shadow-xl shadow-ice-500/10'
                : 'glass-card'
            }`}
          >
            {plan.label && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                plan.highlight
                  ? 'bg-gradient-to-r from-ice-500 to-cyan-glow text-white'
                  : plan.id === 'ai-growth'
                    ? 'bg-gradient-to-r from-violet-glow to-pink-accent text-white'
                    : 'bg-slate-100 text-slate-600'
              }`}>
                {plan.label}
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{plan.subtitle}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`font-[var(--font-heading)] text-4xl font-bold ${
                  plan.highlight ? 'gradient-text' : 'gradient-text-blue'
                }`}>
                  {plan.price}
                </span>
                {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
              </div>
              <p className="text-xs text-slate-500 mt-2">{plan.description}</p>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-ice-400 shrink-0"></span>
                  {f}
                </div>
              ))}
            </div>

            <a
              href={LINKS.telegramSupport}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('pricing_select', { package: plan.name, price: plan.price })}
              className={`btn-magnetic w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold ${
                plan.highlight
                  ? 'bg-gradient-to-r from-ice-500 to-cyan-glow text-white shadow-lg shadow-ice-500/20'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-ice-300 hover:text-ice-600'
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
