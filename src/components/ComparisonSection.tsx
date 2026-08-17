import Section from './Section';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { COMPARISON } from '../data/content';

export default function ComparisonSection() {
  return (
    <Section id="compare" scene="compare" ghost="04">
      <header className="section-header">
        <Kicker className="text-indigo-600">WHY ADSTELE</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">SMART MONEY PICKS <span className="gradient-text-blue">ADSTELE</span></WordReveal>
        </h2>
        <p>What your ad budget actually buys — us versus the alternatives.</p>
      </header>

      <div className="glass-card rounded-3xl overflow-hidden comparison-grid">
        <div className="cc-head cc-label-head">WHAT YOU GET</div>
        {COMPARISON.columns.map((column, index) => (
          <div key={column.id} className={`cc-head ${column.highlight ? 'cc-adstele text-white' : ''}`}>
            <Sticker emoji={column.icon} size="md" tilt={index * 7 - 7} />
            <span className="font-heading font-bold text-xs mt-2">{column.name}</span>
            <span className={`text-[10px] mt-1 ${column.highlight ? 'text-slate-300' : 'text-slate-400'}`}>{column.tagline}</span>
          </div>
        ))}
        {COMPARISON.rows.map(row => (
          <div key={row.label} className="contents comparison-row">
            <div className="cc-cell cc-row-label">{row.label}</div>
            <div className="cc-cell" data-label="IN-HOUSE TEAM">{row.inhouse}</div>
            <div className="cc-cell" data-label="FREELANCER">{row.freelance}</div>
            <div className="cc-cell cc-adstele cc-winner" data-label="ADSTELE"><span>✓</span><strong>{row.adstele}</strong></div>
          </div>
        ))}
      </div>
      <div className="text-center mt-7">
        <a href="#pricing" className="btn-3d inline-flex px-7 py-3.5 rounded-xl bg-slate-900 text-white text-xs font-bold" data-cursor="PRICING">SEE EXACT PRICING →</a>
      </div>
    </Section>
  );
}
