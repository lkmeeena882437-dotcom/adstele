import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import {
  getMetaTrackingChoice,
  initializeMetaPixel,
  isMetaPixelConfigured,
  setMetaTrackingChoice,
} from '../utils/analytics';

type Choice = 'accepted' | 'rejected';
const OPEN_PREFERENCES_EVENT = 'adstele:open-tracking-preferences';

export default function TrackingConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!isMetaPixelConfigured()) return;

    const savedChoice = getMetaTrackingChoice();
    setChoice(savedChoice);
    if (savedChoice === 'accepted') initializeMetaPixel();
    else if (!savedChoice) setShowPrompt(true);

    const openPreferences = () => setShowPrompt(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  if (!isMetaPixelConfigured()) return null;

  const choose = (nextChoice: Choice) => {
    setMetaTrackingChoice(nextChoice);
    setChoice(nextChoice);
    setShowPrompt(false);
  };

  const openPreferences = () => {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
  };

  return (
    <>
      {showPrompt ? (
        <m.aside
          role="dialog"
          aria-labelledby="tracking-consent-title"
          aria-describedby="tracking-consent-description"
          className="fixed bottom-20 left-4 right-4 z-[70] max-w-md rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-slate-800 shadow-2xl shadow-slate-950/20 backdrop-blur-xl md:bottom-4 md:left-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
        >
          <h2 id="tracking-consent-title" className="font-heading text-sm font-bold text-slate-900">
            Your privacy choices
          </h2>
          <p id="tracking-consent-description" className="mt-2 text-xs leading-relaxed text-slate-600">
            With your permission, Meta Pixel helps us measure advertising and enquiries. It may share browser and website activity with Meta. Your enquiry form works either way. Read our{' '}
            <a href="#privacy" className="font-semibold text-sky-700 underline underline-offset-2">Privacy Policy</a>.
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => choose('rejected')}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Accept tracking
            </button>
          </div>
        </m.aside>
      ) : choice ? (
        <button
          type="button"
          onClick={openPreferences}
          className="fixed bottom-20 left-4 z-[60] rounded-full border border-slate-300 bg-white/95 px-3 py-2 text-[10px] font-semibold text-slate-700 shadow-lg backdrop-blur transition-colors hover:bg-slate-100 md:bottom-4"
          aria-label="Reopen tracking privacy choices"
        >
          Privacy choices
        </button>
      ) : null}
    </>
  );
}
