import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from './Section';

const WORKFLOW_STEPS = [
  { icon: '💡', label: 'Customer Idea', color: 'bg-amber-50 border-amber-200/50 text-amber-700' },
  { icon: '🤖', label: 'AI Processing', color: 'bg-violet-50 border-violet-200/50 text-violet-700' },
  { icon: '📝', label: 'Content Generation', color: 'bg-ice-50 border-ice-200/50 text-ice-700' },
  { icon: '👁️', label: 'Human Review', color: 'bg-green-50 border-green-200/50 text-green-700' },
  { icon: '📱', label: 'Telegram Publishing', color: 'bg-blue-50 border-blue-200/50 text-blue-700' },
  { icon: '📢', label: 'Campaign', color: 'bg-cyan-50 border-cyan-200/50 text-cyan-700' },
  { icon: '📊', label: 'Data', color: 'bg-indigo-50 border-indigo-200/50 text-indigo-700' },
  { icon: '🎯', label: 'Optimization', color: 'bg-emerald-50 border-emerald-200/50 text-emerald-700' },
];

export default function AutomationWorkflow() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">AUTOMATION</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          FROM IDEA TO
          <br />
          <span className="gradient-text">OPTIMIZED GROWTH</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          See how the AI automation workflow transforms your ideas into optimized Telegram campaigns.
        </p>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ice-300 via-violet-300 to-green-300 hidden md:block" />

          <div className="space-y-4 md:space-y-6">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`flex items-center gap-4 ${
                  i % 2 === 0 ? 'md:flex-row md:justify-end md:pr-[52%]' : 'md:flex-row-reverse md:justify-end md:pl-[52%]'
                }`}
              >
                <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border ${step.color} glass-card`}>
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-sm font-semibold">{step.label}</span>
                </div>

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-ice-400 shadow-sm" />
              </motion.div>
            ))}
          </div>

          {inView && (
            <motion.div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ice-500 shadow-lg shadow-ice-500/50"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
