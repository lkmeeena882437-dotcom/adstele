import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden"
        >
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { location: 'mobile_sticky' })}
            className="btn-magnetic flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-2xl text-sm font-semibold shadow-xl shadow-ice-500/30"
          >
            💬 START YOUR GROWTH SYSTEM
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
