import Section from './Section';
import TiltCard from './TiltCard';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { TESTIMONIALS } from '../data/content';

export default function TestimonialsSection() {
  return (
    <Section id="results" scene="testimonials" ghost="06">
      <header className="section-header">
        <Kicker className="text-amber-600">CLIENT RESULTS</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">REAL BUSINESSES, <span className="gradient-text-amber">REAL GROWTH</span></WordReveal>
        </h2>
        <p>Live numbers from client campaigns — not promises. This is what daily optimization does to a budget.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((item, index) => {
          const initials = item.name.split(' ').map(part => part[0]).join('');
          return (
            <TiltCard key={item.name} className={`rounded-2xl p-6 flex flex-col ${item.featured ? 'bg-slate-900 text-white shadow-2xl shadow-amber-400/10' : 'glass-card'} ${index % 3 === 1 ? 'lg:translate-y-6' : ''}`}>
              <p className={`font-heading text-2xl font-bold ${item.featured ? 'text-amber-300' : 'gradient-text-amber'}`}>{item.metric}</p>
              <p className={`font-mono text-[9px] tracking-[.2em] mt-1 ${item.featured ? 'text-amber-200/70' : 'text-amber-700'}`}>{item.metricLabel}</p>
              <p className="text-amber-400 tracking-[.12em] text-xs my-4" aria-label="5 out of 5 stars">★★★★★</p>
              <blockquote className={`text-[13px] leading-relaxed flex-1 ${item.featured ? 'text-slate-300' : 'text-slate-600'}`}>“{item.quote}”</blockquote>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-400/15">
                <span className="w-9 h-9 rounded-full grid place-items-center bg-gradient-to-br from-amber-400 to-rose-500 text-white font-bold text-[10px]">{initials}</span>
                <span><strong className={`block text-xs ${item.featured ? 'text-white' : 'text-slate-800'}`}>{item.name}</strong><small className={item.featured ? 'text-slate-400' : 'text-slate-500'}>{item.niche}</small></span>
              </div>
            </TiltCard>
          );
        })}
      </div>
      <p className="font-mono text-center text-[9px] tracking-wider text-slate-400 mt-12">Results vary by market, offer, budget and campaign conditions. Past performance does not guarantee future outcomes.</p>
    </Section>
  );
}
