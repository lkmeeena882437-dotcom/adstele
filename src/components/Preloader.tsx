import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
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
    const duration = mobile ? 250 : 350;
    const startedAt = performance.now();
    let frame = 0;
    let hideTimer = 0;
    const updateProgress = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = window.requestAnimationFrame(updateProgress);
      } else {
        hideTimer = window.setTimeout(() => setVisible(false), 90);
      }
    };
    frame = window.requestAnimationFrame(updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="preloader-mark">
            <span className="preloader-ring" />
            <BrandLogo className="w-14 h-14" />
          </div>
          <p>ADSTELE</p>
          <span className="preloader-bar"><span style={{ width: `${progress}%` }} /></span>
          <span className="preloader-percent" aria-live="polite">{progress}%</span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
