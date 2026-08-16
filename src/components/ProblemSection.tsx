import Section from './Section';
import { PROBLEMS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ProblemSection() {
  return (
    <Section id="platform">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">THE PROBLEM</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          RUNNING ADS ALONE IS <span className="gradient-text">SLOW & EXPENSIVE</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm px-2">
          Most businesses lose money on ads not because the platform is bad — but because no one is optimizing daily. Here's what is actually draining your budget:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {PROBLEMS.map(problem => (
          <div key={problem.title} className="glass-card card-hover glow-border rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-500/10 to-violet-glow/10 border border-ice-200/60 flex items-center justify-center text-2xl mb-4">
              {problem.icon}
            </div>
            <h3 className="font-[var(--font-heading)] text-sm font-bold text-slate-900">{problem.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 mt-6 text-center">
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <span className="font-bold text-slate-900">The fix?</span> A dedicated media buyer managing your{' '}
          <span className="font-semibold text-ice-600">Meta</span>, <span className="font-semibold text-ice-600">Google</span> and{' '}
          <span className="font-semibold text-ice-600">Telegram</span> campaigns end-to-end — so you focus on your business,
          not your ads dashboard.
        </p>
        <a
          href="#services"
          onClick={() => trackEvent('cta_click', { location: 'problem_section' })}
          className="btn-magnetic inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          SEE HOW WE WORK →
        </a>
      </div>
    </Section>
  );
}
