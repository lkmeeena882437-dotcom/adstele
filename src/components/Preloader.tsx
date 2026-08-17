import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem('adstele-preloader') === 'seen';
      window.sessionStorage.setItem('adstele-preloader', 'seen');
    } catch {
      // Storage can be unavailable in strict privacy modes; the loader still works.
    }
    if (reduced || seen) {
      setVisible(false);
      return;
    }
    const mobile = window.matchMedia('(pointer: coarse)').matches;
    const timer = window.setTimeout(() => setVisible(false), mobile ? 700 : 1100);
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
            <BrandLogo className="w-14 h-14" />
          </div>
          <p>ADSTELE</p>
          <span className="preloader-bar"><span /></span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
