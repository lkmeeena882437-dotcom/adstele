import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchFirst = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || touchFirst) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: -92 },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
