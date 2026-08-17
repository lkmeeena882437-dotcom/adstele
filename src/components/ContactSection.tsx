import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import LeadForm from './LeadForm';
import { WordReveal } from './Reveal';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';
import ArrowRightIcon from './ArrowRightIcon';

const CONTACTS = [
  { icon: 'chat', title: 'TALK TO OUR TEAM', detail: '@Adstele_support', href: LINKS.telegramSupport, cursor: 'CHAT', event: 'telegram_click' },
  { icon: 'calendar', title: 'BOOK A FREE STRATEGY CALL', detail: '15 minutes — no pitch, just a plan', href: LINKS.calendly, cursor: 'BOOK', event: 'calendly_click' },
  { icon: 'broadcast', title: 'OUR CHANNEL', detail: '@adstele_agency', href: LINKS.telegramChannel, cursor: 'OPEN', event: 'channel_click' },
] as const;

export default function ContactSection() {
  return (
    <Section id="contact" scene="contact" ghost="07">
      <header className="section-header">
        <Kicker className="text-cyan-600">CONTACT</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">READY TO GROW? <span className="gradient-text-violet">LET&apos;S TALK</span></WordReveal>
        </h2>
        <p>Choose how you want to connect, or send a short brief. We&apos;ll reply with a clear next step.</p>
      </header>

      <div className="max-w-2xl mx-auto space-y-3">
        {CONTACTS.map((item, index) => (
          <TiltCard key={item.title} max={5} className="rounded-2xl">
            <a
              href={item.href} target="_blank" rel="noopener noreferrer" data-cursor={item.cursor}
              onClick={() => trackEvent(item.event, { location: 'contact' })}
              className="btn-3d flex items-center gap-5 p-5 glass-card rounded-2xl group"
            >
              <Sticker icon={item.icon} size="xl" tilt={index * 7 - 7} float />
              <span><strong className="block font-heading text-sm text-slate-900 group-hover:text-ice-600 transition-colors">{item.title}</strong><small className="text-xs text-slate-500">{item.detail}</small></span>
              <ArrowRightIcon className="ml-auto h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </TiltCard>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-8"><LeadForm /></div>
    </Section>
  );
}
