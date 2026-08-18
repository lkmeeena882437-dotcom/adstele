import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { LINKS } from '../data/content';
import Sticker from './Sticker';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible((current) => {
        const next = window.scrollY > 400;
        return current === next ? current : next;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <AnimatePresence>{visible && <m.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 inset-x-0 z-50 p-3 md:hidden"><a href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" className="btn-3d btn-shine flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-ice-500 to-violet-glow text-white rounded-2xl text-sm font-semibold shadow-xl"><Sticker icon="chat" size="sm" tilt={-6} /> TALK TO OUR TEAM</a></m.div>}</AnimatePresence>
  );
}
