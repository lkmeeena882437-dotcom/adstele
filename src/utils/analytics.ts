// Meta Pixel is opt-in: no third-party Pixel script is requested until the
// visitor accepts tracking. The Pixel ID is a public browser ID, configured
// through VITE_META_PIXEL_ID at build/deploy time.

type TrackingChoice = 'accepted' | 'rejected';
type EventParams = Record<string, string | number | boolean>;
type AttributionParams = Record<string, string>;

const CONSENT_KEY = 'adstele-meta-tracking-consent';
const ATTRIBUTION_KEY = 'adstele-first-touch-attribution';
const ATTRIBUTION_MAX_AGE = 90 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
let memoryChoice: TrackingChoice | null = null;
let initializedPixelId = '';
let activeConsent = false;
let pageViewPixelId = '';

interface MetaPixelStub {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
}

interface StoredAttribution {
  capturedAt: number;
  values: AttributionParams;
}

declare global {
  interface Window {
    fbq?: MetaPixelStub;
    _fbq?: MetaPixelStub;
  }
}

function configuredPixelId() {
  return import.meta.env.VITE_META_PIXEL_ID?.trim() ?? '';
}

export function isMetaPixelConfigured() {
  return configuredPixelId().length > 0;
}

export function getMetaTrackingChoice(): TrackingChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === 'accepted' || saved === 'rejected') return saved;
  } catch {
    // Fall back to the in-memory choice for this page view.
  }
  return memoryChoice;
}

function cleanUtm(value: string) {
  return value.trim().replace(/[<>"']/g, '').slice(0, 100);
}

export function getFirstTouchAttribution(): AttributionParams {
  if (typeof window === 'undefined' || getMetaTrackingChoice() !== 'accepted') return {};

  try {
    const saved = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as StoredAttribution;
      if (Date.now() - parsed.capturedAt < ATTRIBUTION_MAX_AGE && parsed.values && Object.keys(parsed.values).length) {
        return parsed.values;
      }
      window.localStorage.removeItem(ATTRIBUTION_KEY);
    }

    const query = new URLSearchParams(window.location.search);
    const values: AttributionParams = {};
    UTM_KEYS.forEach(key => {
      const value = query.get(key);
      if (value) values[key] = cleanUtm(value);
    });
    if (Object.keys(values).length) {
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ capturedAt: Date.now(), values } satisfies StoredAttribution));
    }
    return values;
  } catch {
    return {};
  }
}

function createPixelStub(): MetaPixelStub {
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as MetaPixelStub;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  return fbq;
}

export function initializeMetaPixel() {
  const pixelId = configuredPixelId();
  if (typeof window === 'undefined' || !pixelId || getMetaTrackingChoice() !== 'accepted') return;

  const fbq = window.fbq ?? createPixelStub();
  if (initializedPixelId !== pixelId) {
    fbq('init', pixelId);
    initializedPixelId = pixelId;
    pageViewPixelId = '';
  }
  if (!activeConsent) {
    fbq('consent', 'grant');
    activeConsent = true;
  }
  if (pageViewPixelId !== pixelId) {
    fbq('track', 'PageView', getFirstTouchAttribution());
    pageViewPixelId = pixelId;
  }
}

export function setMetaTrackingChoice(choice: TrackingChoice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
    if (choice === 'rejected') window.localStorage.removeItem(ATTRIBUTION_KEY);
  } catch {
    // This choice remains active in memory until the page is closed.
  }

  if (choice === 'accepted') {
    initializeMetaPixel();
  } else if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'revoke');
    activeConsent = false;
  }
}

// Only the channel-link click is a campaign conversion signal for this funnel.
// Support, form, pricing and calendar actions are deliberately not sent to Meta.
const META_CUSTOM_EVENTS: Record<string, string> = {
  channel_click: 'TelegramChannelClick',
};

export function trackEvent(eventName: string, params?: EventParams) {
  if (import.meta.env.DEV) console.debug(`[Analytics] ${eventName}`, params ?? {});
  if (typeof window === 'undefined' || getMetaTrackingChoice() !== 'accepted') return;

  initializeMetaPixel();
  const fbq = window.fbq;
  if (!fbq) return;

  const customEvent = META_CUSTOM_EVENTS[eventName];
  if (!customEvent) return;
  const eventParams = { ...getFirstTouchAttribution(), ...(params ?? {}) };
  fbq('trackCustom', customEvent, eventParams);
}
