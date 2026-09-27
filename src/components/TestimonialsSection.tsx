import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { trackEvent } from '../utils/analytics';
import { getTelegramChannelUrl } from '../utils/telegram';
import ArrowRightIcon from './ArrowRightIcon';

export default function TestimonialsSection() {
  return (
    <Section id="results" scene="testimonials" ghost="06">
      <header className="section-header">
        <Kicker className="text-amber-600">OUR WORK &amp; REVIEWS</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">DON&apos;T JUST TAKE OUR WORD FOR IT. <span className="gradient-text-amber">SEE OUR WORK.</span></WordReveal>
        </h2>
        <p>Browse the campaign work and client feedback we share in our Telegram channel. Review it first, then decide whether you&apos;d like to talk.</p>
      </header>

      <div className="max-w-3xl mx-auto">
        <TiltCard className="glass-card rounded-3xl p-7 sm:p-10 text-center">
          <div className="flex justify-center"><Sticker icon="broadcast" size="xl" tilt={-6} float /></div>
          <h3 className="mt-5 font-heading text-xl sm:text-2xl font-bold text-slate-900">REAL WORK. SHARED DIRECTLY.</h3>
          <p className="max-w-xl mx-auto mt-3 text-sm leading-relaxed text-slate-600">See the examples and reviews available in the channel. When you&apos;re ready, message our support account from Telegram to discuss your goals and the right plan.</p>
          <a
            href={getTelegramChannelUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('channel_click', { location: 'results' })}
            className="btn-3d btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ice-500 to-violet-glow px-6 py-3 text-xs font-bold text-white"
          >
            OPEN TELEGRAM CHANNEL <ArrowRightIcon className="h-4 w-4" />
          </a>
        </TiltCard>
      </div>
    </Section>
  );
}
