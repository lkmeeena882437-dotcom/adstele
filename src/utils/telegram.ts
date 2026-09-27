import { LINKS } from '../data/content';
import { getFirstTouchAttribution } from './analytics';

/**
 * Select a public Telegram invite URL using utm_campaign, then utm_source.
 * VITE_TELEGRAM_INVITE_LINKS is a public JSON map, for example:
 * {"meta-campaign-a":"https://t.me/+...","source:meta":"https://t.me/+...","default":"https://t.me/adstele_agency"}
 */
function campaignKey(value: string | null) {
  return value?.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-') ?? '';
}

function isTelegramUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['t.me', 'telegram.me'].includes(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function getTelegramChannelUrl() {
  if (typeof window === 'undefined') return LINKS.telegramChannel;

  const params = new URLSearchParams(window.location.search);
  const firstTouch = getFirstTouchAttribution();
  const campaign = campaignKey(params.get('utm_campaign') || firstTouch.utm_campaign || null);
  const source = campaignKey(params.get('utm_source') || firstTouch.utm_source || null);
  const keys = [campaign, source ? `source:${source}` : '', 'default'].filter(Boolean);

  try {
    const configured = JSON.parse(import.meta.env.VITE_TELEGRAM_INVITE_LINKS ?? '') as Record<string, unknown>;
    for (const key of keys) {
      const url = configured[key];
      if (isTelegramUrl(url)) return url;
    }
  } catch {
    // Until campaign-specific invite links are configured, use the public channel URL.
  }

  return LINKS.telegramChannel;
}
