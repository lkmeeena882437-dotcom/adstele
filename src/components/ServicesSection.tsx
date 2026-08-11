import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { SERVICES } from '../data/content';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(SERVICES[0].id);
  const active = SERVICES.find(s => s.id === activeService) || SERVICES[0];

  return (
    <Section id="services">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">SERVICES</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          ONE SYSTEM.
          <br />
          <span className="gradient-text">MULTIPLE GROWTH LAYERS.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {SERVICES.map(service => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-300 min-w-[200px] lg:min-w-0 ${
                activeService === service.id
                  ? 'glass-card shadow-lg border-ice-200 scale-[1.02]'
                  : 'hover:bg-white/40 border border-transparent'
              }`}
            >
              <span className="text-2xl">{service.icon}</span>
              <div>
                <p className={`text-sm font-bold tracking-wide ${
                  activeService === service.id ? 'gradient-text-blue' : 'text-slate-700'
                }`}>
                  {service.title}
                </p>
                <p className="text-xs text-slate-500">{service.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice-100 to-ice-50 flex items-center justify-center text-3xl">
                  {active.icon}
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] text-2xl font-bold gradient-text-blue">
                    {active.title}
                  </h3>
                  <p className="text-sm text-slate-500">{active.subtitle}</p>
                </div>
              </div>

              <p className="text-slate-600 mb-8 text-base leading-relaxed">
                {active.description}
              </p>

              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {active.id === 'ads' && (
                    <>
                      {['Strategy', 'Targeting', 'Creative', 'Campaign', 'Delivery'].map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-4 py-2 rounded-xl bg-ice-50 border border-ice-200/50 text-xs font-semibold text-ice-700">
                            {step}
                          </div>
                          {i < 4 && <span className="text-ice-300">→</span>}
                        </motion.div>
                      ))}
                    </>
                  )}
                  {active.id === 'ai-content' && (
                    <>
                      {['Raw Idea', 'AI Processing', 'Enhancement', 'Human Review', 'Polished Content'].map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-4 py-2 rounded-xl bg-violet-50 border border-violet-200/50 text-xs font-semibold text-violet-700">
                            {step}
                          </div>
                          {i < 4 && <span className="text-violet-300">→</span>}
                        </motion.div>
                      ))}
                    </>
                  )}
                  {active.id === 'automation' && (
                    <>
                      {['Trigger', 'AI Process', 'Content', 'Schedule', 'Telegram'].map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-4 py-2 rounded-xl bg-green-50 border border-green-200/50 text-xs font-semibold text-green-700">
                            {step}
                          </div>
                          {i < 4 && <span className="text-green-300">→</span>}
                        </motion.div>
                      ))}
                    </>
                  )}
                  {active.id === 'growth' && (
                    <>
                      {['Data', 'Analysis', 'Insights', 'Strategy', 'Optimization'].map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200/50 text-xs font-semibold text-amber-700">
                            {step}
                          </div>
                          {i < 4 && <span className="text-amber-300">→</span>}
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.details.map((detail, i) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ice-400"></span>
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
