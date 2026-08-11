import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from './Section';

const DASHBOARD_ITEMS = [
  { icon: '📢', label: 'Campaign Status', status: '—', color: 'from-ice-50 to-ice-100/50' },
  { icon: '📝', label: 'Content Queue', status: '—', color: 'from-violet-50 to-violet-100/50' },
  { icon: '⚙️', label: 'Automation Status', status: '—', color: 'from-green-50 to-green-100/50' },
  { icon: '🎨', label: 'Creative Library', status: '—', color: 'from-amber-50 to-amber-100/50' },
  { icon: '📊', label: 'Campaign Overview', status: '—', color: 'from-cyan-50 to-cyan-100/50' },
  { icon: '✅', label: 'Tasks', status: '—', color: 'from-pink-50 to-pink-100/50' },
];

export default function CommandCenter() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">DASHBOARD</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          YOUR GROWTH
          <br />
          <span className="gradient-text">COMMAND CENTER</span>
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/50 text-xs font-semibold text-amber-700">
          DEMO INTERFACE
        </div>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-6 md:p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ice-500 to-violet-glow flex items-center justify-center text-white text-xs font-bold">A</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Growth Dashboard</p>
                <p className="text-xs text-slate-400">Adstele Agency</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs text-slate-500">Connected</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DASHBOARD_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} border border-white/50`}
              >
                <span className="text-xl mb-2 block">{item.icon}</span>
                <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                <div className="mt-2 h-8 rounded-lg bg-white/40 flex items-center justify-center">
                  <span className="text-xs text-slate-400">{item.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-xs font-semibold text-slate-700">Support</p>
                <p className="text-xs text-slate-400">Direct Telegram support available</p>
              </div>
            </div>
            <div className="h-6 w-16 rounded bg-slate-100"></div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Architecture prepared for future authenticated customer dashboards.
          </p>
        </div>
      </div>
    </Section>
  );
}
