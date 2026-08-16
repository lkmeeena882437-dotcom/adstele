import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  /** id for the global 3D scene (data-scene) */
  scene?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
}

export default function Section({ id, scene, children, className = '', containerClass = '' }: SectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id={id}
      data-scene={scene}
      ref={ref}
      className={`relative py-10 sm:py-14 md:py-18 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
