import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="preloader-mark">
            <span className="preloader-ring" />
            <span className="preloader-a">A</span>
          </div>
          <p>ADSTELE</p>
          <span className="preloader-bar"><span /></span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
