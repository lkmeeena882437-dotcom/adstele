import Section from './Section';
import TiltCard from './TiltCard';
import { SERVICES } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ServicesSection() {
  return (
    <Section id="services" scene="services">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">SERVICES</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          EVERYTHING YOUR ADS <span className="gradient-text">NEED TO WIN</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm px-2">
          Strategy, setup, creatives, daily management and reporting — one team handles your entire paid acquisition.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {SERVICES.map(service => (
          <TiltCard key={service.id} className="glass-card glow-border rounded-2xl p-6 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-500/10 to-violet-glow/10 border border-ice-200/60 flex items-center justify-center text-2xl mb-4">
              {service.icon}
            </div>
            <h3 className="font-[var(--font-heading)] text-sm font-bold text-slate-900">{service.title}</h3>
            <p className="text-[11px] font-semibold text-ice-600 mt-0.5">{service.subtitle}</p>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">{service.description}</p>

            <ul className="mt-4 mb-5 space-y-2 flex-1">
              {service.details.map(detail => (
                <li key={detail} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="mt-0.5 shrink-0 text-mint-glow font-bold">✓</span>
                  {detail}
                </li>
              ))}
            </ul>

            <a
              href="#pricing"
              onClick={() => trackEvent('service_click', { service: service.id, title: service.title })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ice-600 hover:text-ice-500 transition-colors mt-auto"
            >
              SEE PRICING →
            </a>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
