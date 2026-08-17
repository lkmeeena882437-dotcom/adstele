import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { SERVICES } from '../data/content';
import { trackEvent } from '../utils/analytics';
import CheckIcon from './CheckIcon';

export default function ServicesSection() {
  return (
    <Section id="services" scene="services" ghost="02">
      <header className="section-header">
        <Kicker className="text-ice-600">SERVICES</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">ONE TEAM FOR EVERY <span className="gradient-text">GROWTH CHANNEL</span></WordReveal>
        </h2>
        <p>Strategy, creative direction, tracking and daily campaign management — handled by one focused team.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {SERVICES.map((service, index) => (
          <TiltCard key={service.id} className={`glass-card glow-border rounded-2xl p-6 flex flex-col ${index % 3 === 1 ? 'lg:translate-y-6' : ''}`}>
            <Sticker icon={service.icon} size="lg" tilt={index % 2 ? 7 : -7} />
            <h3 className="font-heading text-sm font-bold text-slate-900 mt-5">{service.title}</h3>
            <p className="text-[11px] font-semibold text-ice-600 mt-0.5">{service.subtitle}</p>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">{service.description}</p>
            <ul className="mt-4 mb-5 space-y-2 flex-1">
              {service.details.map(detail => <li key={detail} className="flex items-start gap-2 text-xs text-slate-600"><CheckIcon className="text-emerald-500" />{detail}</li>)}
            </ul>
            <a href="#pricing" onClick={() => trackEvent('service_click', { service: service.id })} className="service-link mt-auto text-xs font-bold text-ice-600">
              SEE PRICING <span className="service-arrow">→</span>
            </a>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
