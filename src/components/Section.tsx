import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClass?: string;
}

export default function Section({ id, children, className = '', containerClass = '' }: SectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id={id} ref={ref} className={`relative py-20 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
