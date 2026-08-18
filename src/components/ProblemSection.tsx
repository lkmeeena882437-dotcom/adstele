import Section from './Section';
import TiltCard from './TiltCard';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { PROBLEMS, STANDARD } from '../data/content';

export default function ProblemSection() {
  return (
    <Section id="platform" scene="problem" ghost="01">
      <header className="section-header">
        <Kicker className="text-rose-500">THE PROBLEM</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">FIX THE LEAK IN YOUR <span className="gradient-text-rose">AD SPEND</span></WordReveal>
        </h2>
        <p>Every day without expert optimization, your budget leaks. Here&apos;s exactly where the money goes:</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {PROBLEMS.map((problem, index) => (
          <TiltCard key={problem.title} className="glass-card glow-border rounded-2xl p-6">
            <Sticker icon={problem.icon} size="lg" tilt={index * 7 - 8} float />
            <h3 className="font-heading text-sm font-bold text-slate-900 mt-5">{problem.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">{problem.description}</p>
          </TiltCard>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 mt-6">
        <div className="text-center mb-7">
          <Kicker className="text-ice-600">THE ADSTELE STANDARD</Kicker>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-3">
            YOUR <span className="gradient-text">UNFAIR ADVANTAGE</span>, DAY ONE
          </h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {STANDARD.map((point, index) => (
            <div key={point.title} className="text-center sm:text-left">
              <Sticker icon={point.icon} size="md" tilt={index * 7 - 6} />
              <p className="text-xs font-bold text-slate-800 mt-4">{point.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
