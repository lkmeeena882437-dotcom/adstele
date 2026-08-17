import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import LeadForm from './LeadForm';
import { WordReveal } from './Reveal';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

const CONTACTS = [
  { icon: '💬', title: 'TALK TO OUR TEAM', detail: '@Adstele_support', href: LINKS.telegramSupport, cursor: 'CHAT', event: 'telegram_click' },
  { icon: '📅', title: 'BOOK A FREE STRATEGY CALL', detail: '15 minutes — no pitch, just a plan', href: LINKS.calendly, cursor: 'BOOK', event: 'calendly_click' },
  { icon: '📢', title: 'OUR CHANNEL', detail: '@adstele_agency', href: LINKS.telegramChannel, cursor: 'OPEN', event: 'channel_click' },
] as const;

export default function ContactSection() {
  return (
    <Section id="contact" scene="contact" ghost="07">
      <header className="section-header">
        <Kicker className="text-cyan-600">CONTACT</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">READY TO WIN? <span className="gradient-text-violet">LET&apos;S TALK</span></WordReveal>
        </h2>
        <p>Pick the fastest way to reach us, or send a brief and we&apos;ll come back with a clear next step.</p>
      </header>

      <div className="max-w-2xl mx-auto space-y-3">
        {CONTACTS.map((item, index) => (
          <TiltCard key={item.title} max={5} className="rounded-2xl">
            <a
              href={item.href} target="_blank" rel="noopener noreferrer" data-cursor={item.cursor}
              onClick={() => trackEvent(item.event, { location: 'contact' })}
              className="btn-3d flex items-center gap-5 p-5 glass-card rounded-2xl group"
            >
              <Sticker emoji={item.icon} size="xl" tilt={index * 7 - 7} float />
              <span><strong className="block font-heading text-sm text-slate-900 group-hover:text-ice-600 transition-colors">{item.title}</strong><small className="text-xs text-slate-500">{item.detail}</small></span>
              <span className="ml-auto text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </TiltCard>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-8"><LeadForm /></div>
    </Section>
  );
}
