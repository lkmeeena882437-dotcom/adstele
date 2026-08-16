import Section from './Section';
import { WORKFLOW } from '../data/content';

export default function AutomationWorkflow() {
  return (
    <Section id="workflow" scene="workflow">
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-xs font-semibold text-violet-500 tracking-widest mb-3">OUR PROCESS</p>
        <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          AUTOMATED WORKFLOW, <span className="gradient-text-violet">HUMAN PRECISION</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm px-2">
          A proven four-step system that takes your campaign from strategy to profit — with zero effort from your side.
        </p>
      </div>

      <div className="relative">
        {/* Animated dashed connector line (desktop) */}
        <svg
          className="hidden md:block absolute top-[4.7rem] left-[12.5%] w-[75%] h-4"
          preserveAspectRatio="none"
          viewBox="0 0 100 4"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="workflow-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="2"
            x2="100"
            y2="2"
            stroke="url(#workflow-line)"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="dash-animate"
            opacity="0.5"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
          {WORKFLOW.map(step => (
            <div key={step.step} className="text-center">
              <p className="text-[10px] font-bold tracking-[0.25em] text-violet-500 mb-4">STEP {step.step}</p>
              {/* CSS 3D cube — rotates on its Y axis, zero WebGL cost */}
              <div className="cube-scene w-16 h-16 mx-auto">
                <div className="cube">
                  <div className="cube-face cube-front">{step.icon}</div>
                  <div className="cube-face cube-back">{step.icon}</div>
                  <div className="cube-face cube-right">{step.icon}</div>
                  <div className="cube-face cube-left">{step.icon}</div>
                </div>
              </div>
              <h3 className="font-[var(--font-heading)] text-sm font-bold text-slate-900 mt-4">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-[260px] mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
