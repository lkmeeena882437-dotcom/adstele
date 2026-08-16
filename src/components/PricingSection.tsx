import Section from './Section';
import TiltCard from './TiltCard';
import { LINKS, PRICING } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function PricingSection() {
  return (
    <Section id="pricing">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">PRICING</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          SIMPLE PRICING, <span className="gradient-text">SERIOUS RESULTS</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm px-2">
          No hidden fees. Ad spend is billed directly by the platform — you only pay our management fee.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 mt-12 sm:mt-14">
        {PRICING.map(plan => (
          <div key={plan.id} className={`relative ${plan.highlight ? 'lg:-translate-y-2' : ''}`}>
            <TiltCard
              className={`relative flex flex-col rounded-2xl p-6 h-full ${
                plan.highlight ? 'bg-slate-900 text-white shadow-2xl shadow-ice-500/20' : 'glass-card'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-ice-500 to-violet-glow text-white text-[9px] font-bold tracking-widest whitespace-nowrap shadow-lg shadow-ice-500/30">
                  {plan.label}
                </span>
              )}
              {!plan.highlight && (
                <span className="text-[9px] font-bold tracking-widest text-ice-500 mb-2">{plan.label}</span>
              )}

              <h3 className={`font-[var(--font-heading)] text-sm font-bold mt-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-[11px] mt-0.5 ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>{plan.subtitle}</p>

              <div className="mt-4 mb-1">
                <span className="font-[var(--font-heading)] text-3xl font-bold">{plan.price}</span>
                <span className={`text-xs ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>{plan.period}</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                {plan.description}
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    <span className={`mt-0.5 shrink-0 font-bold ${plan.highlight ? 'text-mint-glow' : 'text-ice-500'}`}>✓</span>
                    <span className={plan.highlight ? 'text-slate-200' : 'text-slate-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('pricing_click', { plan: plan.id, price: plan.price })}
                className={`btn-magnetic mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-xs font-bold ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-ice-500 to-violet-glow text-white'
                    : 'border border-slate-200 text-slate-800 hover:border-ice-400 hover:text-ice-600'
                }`}
              >
                {plan.cta}
              </a>
            </TiltCard>
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-slate-400 mt-8">
        💡 Ad spend is paid directly to the platform — our fee covers strategy, setup, daily management & reports.
      </p>
    </Section>
  );
}
