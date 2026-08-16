import Section from './Section';
import TiltCard from './TiltCard';
import { PROBLEMS, STANDARD } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ProblemSection() {
  return (
    <Section id="platform" scene="problem">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-rose-500 tracking-widest mb-3">THE PROBLEM</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          RUNNING ADS ALONE IS <span className="gradient-text-rose">SLOW & EXPENSIVE</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm px-2">
          Most businesses lose money on ads not because the platform is bad — but because no one is optimizing daily. Here's what is actually draining your budget:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {PROBLEMS.map(problem => (
          <TiltCard key={problem.title} className="glass-card glow-border rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 border border-rose-200/70 flex items-center justify-center text-2xl mb-4">
              {problem.icon}
            </div>
            <h3 className="font-[var(--font-heading)] text-sm font-bold text-slate-900">{problem.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">{problem.description}</p>
          </TiltCard>
        ))}
      </div>

      {/* The Adstele Standard — trust band */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 mt-6">
        <div className="text-center mb-6">
          <p className="text-[10px] font-bold tracking-[0.25em] text-ice-500">THE ADSTELE STANDARD</p>
          <h3 className="font-[var(--font-heading)] text-lg sm:text-xl font-bold text-slate-900 mt-2">
            WHAT YOU GET ON DAY ONE
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {STANDARD.map(point => (
            <div key={point.title} className="text-center sm:text-left">
              <div className="w-10 h-10 mx-auto sm:mx-0 rounded-xl bg-gradient-to-br from-ice-500/10 to-violet-glow/10 border border-ice-200/60 flex items-center justify-center text-lg mb-3">
                {point.icon}
              </div>
              <p className="text-xs font-bold text-slate-800">{point.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-7">
          <a
            href="#services"
            onClick={() => trackEvent('cta_click', { location: 'problem_section' })}
            className="btn-magnetic btn-3d inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            SEE HOW WE WORK →
          </a>
        </div>
      </div>
    </Section>
  );
}
