import { m } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  scene?: string;
  ghost?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
}

export default function Section({ id, scene, ghost, children, className = '', containerClass = '' }: SectionProps) {
  return (
    <section id={id} data-scene={scene} className={`premium-section relative py-14 sm:py-20 md:py-24 ${className}`}>
      {scene && scene !== 'hero' && (
        <div className="section-atmosphere" aria-hidden="true">
          <span className="aura-orb" />
          <span className="aura-ring" />
          <span className="aura-streak" />
        </div>
      )}
      {ghost && <span className="section-ghost" aria-hidden="true">{ghost}</span>}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}
      >
        {children}
      </m.div>
    </section>
  );
}
