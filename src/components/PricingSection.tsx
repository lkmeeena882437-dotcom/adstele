import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { LINKS, PRICING } from '../data/content';
import { trackEvent } from '../utils/analytics';
import CheckIcon from './CheckIcon';

export default function PricingSection() {
  return (
    <Section id="pricing" scene="pricing" ghost="05">
      <header className="section-header">
        <Kicker className="text-emerald-600">PRICING</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">CLEAR PRICING. <span className="gradient-text-green">EXPERT MANAGEMENT.</span></WordReveal>
        </h2>
        <p>No hidden fees. Your ad spend goes to the platform; your fee puts experts on the campaign every day.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 mt-12 sm:mt-14">
        {PRICING.map(plan => (
          <div key={plan.id} className={`relative ${plan.highlight ? 'lg:-translate-y-2' : ''}`}>
            <TiltCard className={`relative flex flex-col rounded-2xl p-6 h-full ${plan.highlight ? 'conic-card card-glow bg-slate-900 text-white shadow-2xl shadow-ice-500/20' : 'glass-card'}`}>
              <span className={`font-mono text-[8px] font-bold tracking-widest mb-2 ${plan.highlight ? 'text-ice-300' : 'text-ice-600'}`}>{plan.label}</span>
              <h3 className={`font-heading text-sm font-bold mt-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <p className={`text-[11px] mt-0.5 ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>{plan.subtitle}</p>
              <div className="mt-4 mb-1"><span className="font-heading text-3xl font-bold">{plan.price}</span><span className={`font-mono text-[10px] ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>{plan.period}</span></div>
              <p className={`text-xs leading-relaxed mb-4 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.description}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(feature => <li key={feature} className="flex items-start gap-2 text-xs"><CheckIcon className={plan.highlight ? 'text-mint-glow' : 'text-ice-500'} /><span className={plan.highlight ? 'text-slate-200' : 'text-slate-600'}>{feature}</span></li>)}
              </ul>
              <a
                href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" data-cursor="START"
                onClick={() => trackEvent('pricing_click', { plan: plan.id, price: plan.price })}
                className={`btn-3d ${plan.highlight ? 'btn-shine bg-gradient-to-r from-ice-500 to-violet-glow' : 'bg-slate-900'} mt-auto inline-flex items-center justify-center w-full px-4 py-3 rounded-xl text-xs font-bold text-white`}
              >{plan.cta}</a>
            </TiltCard>
          </div>
        ))}
      </div>
      <p className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 mt-8"><Sticker icon="idea" size="sm" tilt={-7} /> Ad spend is paid directly to the platform — our fee covers strategy, setup, daily management & reports.</p>
    </Section>
  );
}
