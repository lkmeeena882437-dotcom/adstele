import Section from './Section';
import Sticker from './Sticker';
import Kicker from './Kicker';
import { WordReveal } from './Reveal';
import { WORKFLOW } from '../data/content';

export default function AutomationWorkflow() {
  return (
    <Section id="workflow" scene="workflow" ghost="03">
      <header className="section-header">
        <Kicker className="text-violet-600">OUR PROCESS</Kicker>
        <h2 className="h-section font-heading text-slate-900">
          <WordReveal solidClassName="headline-3d">FROM STRATEGY TO SCALE, <span className="gradient-text-violet">MADE SIMPLE</span></WordReveal>
        </h2>
        <p>Four clear steps take your campaign from first audit to daily optimization and responsible scaling.</p>
      </header>

      <div className="relative">
        <svg className="hidden md:block absolute top-[4.7rem] left-[12.5%] w-[75%] h-4" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="workflow-line"><stop stopColor="#0ea5e9" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          <line x1="0" y1="2" x2="100" y2="2" stroke="url(#workflow-line)" strokeWidth="2" strokeDasharray="6 6" className="dash-animate" opacity=".5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
          {WORKFLOW.map((step, index) => (
            <div key={step.step} className="text-center">
              <p className="font-mono text-[9px] font-bold tracking-[.25em] text-violet-500 mb-4">STEP {step.step}</p>
              <div className="cube-scene w-16 h-16 mx-auto">
                <div className="cube">
                  {['front', 'back', 'right', 'left'].map(face => (
                    <div key={face} className={`cube-face cube-${face}`}><Sticker icon={step.icon} size="md" tilt={index * 4 - 5} /></div>
                  ))}
                </div>
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 mt-5">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 max-w-[260px] mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
