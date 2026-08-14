import Section from './Section';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ContactSection() {
  return (
    <Section id="contact">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">CONTACT</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          LET'S <span className="gradient-text">WORK TOGETHER</span>
        </h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm px-2">
          Message us on Telegram. Tell us your business and goals — we'll handle the rest.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <a
          href={LINKS.telegramSupport}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('telegram_click', { type: 'support' })}
          className="btn-magnetic flex items-center gap-4 p-5 glass-card rounded-2xl group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ice-500 to-cyan-glow flex items-center justify-center text-xl shrink-0">
            💬
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 group-hover:text-ice-600 transition-colors">TALK TO OUR TEAM</p>
            <p className="text-xs text-slate-500">@Adstele_support</p>
          </div>
        </a>

        <a
          href={LINKS.telegramChannel}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('channel_click')}
          className="btn-magnetic flex items-center gap-4 p-5 glass-card rounded-2xl group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-glow to-pink-accent flex items-center justify-center text-xl shrink-0">
            📢
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 group-hover:text-violet-600 transition-colors">OUR CHANNEL</p>
            <p className="text-xs text-slate-500">@adstele_agency</p>
          </div>
        </a>
      </div>
    </Section>
  );
}
