import type { CSSProperties, ReactNode } from 'react';

export type StickerIcon =
  | 'meta' | 'search' | 'broadcast' | 'monitor' | 'creative'
  | 'trend-down' | 'wallet' | 'clock' | 'user' | 'shield' | 'report'
  | 'target' | 'rocket' | 'settings' | 'trend-up' | 'office' | 'laptop'
  | 'bolt' | 'chat' | 'calendar' | 'idea' | 'check' | 'note';

interface StickerProps {
  icon: StickerIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tilt?: number;
  float?: boolean;
  className?: string;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Icon({ name }: { name: StickerIcon }) {
  let artwork: ReactNode;
  switch (name) {
    case 'meta':
      artwork = <><path {...stroke} d="M3.2 15.4c2.2-7.7 4.7-9.9 7.1-4.3l1.7 3.8 1.7-3.8c2.4-5.6 4.9-3.4 7.1 4.3 1.1 3.8-1.1 4.8-3 1.4L12 7.4l-5.7 9.4c-2 3.4-4.2 2.4-3.1-1.4Z" /></>;
      break;
    case 'search':
      artwork = <><circle {...stroke} cx="10.5" cy="10.5" r="6.2" /><path {...stroke} d="m15.1 15.1 4.6 4.6" /><path className="sticker-accent" {...stroke} d="M7.4 10.5a3.1 3.1 0 0 1 3.1-3.1" /></>;
      break;
    case 'broadcast':
      artwork = <><path {...stroke} d="m3.5 11.8 16.8-7-4.2 14.5-4.5-4-3.2 2.5.7-5.4 7.2-4.1-8.8 3.5Z" /><path className="sticker-accent" {...stroke} d="m9.1 12.4 7.2-4.1" /></>;
      break;
    case 'monitor':
      artwork = <><rect {...stroke} x="3.2" y="4.3" width="17.6" height="12.2" rx="2" /><path {...stroke} d="M8.2 20h7.6M12 16.5V20" /><path className="sticker-accent" {...stroke} d="m7 12 2.5-2.4 2.1 1.8 4.8-4" /></>;
      break;
    case 'creative':
      artwork = <><path {...stroke} d="M12 3.2a7.7 7.7 0 0 0-3.8 14.4c1.3.7 2.5-.1 2.3-1.4-.2-1.4.8-2.4 2.1-2.1l1.7.4c3.7.7 6.5-1.7 6.5-5.1 0-3.8-3.9-6.2-8.8-6.2Z" /><circle cx="7.2" cy="9" r="1.1" fill="currentColor" /><circle cx="10.2" cy="6.8" r="1.1" fill="currentColor" /><circle className="sticker-accent-fill" cx="14" cy="6.7" r="1.1" /><circle cx="16.8" cy="9.2" r="1.1" fill="currentColor" /></>;
      break;
    case 'trend-down':
      artwork = <><path {...stroke} d="M4 6.5 9 11l3.1-3.1L20 16" /><path className="sticker-accent" {...stroke} d="M14.7 16H20v-5.3" /></>;
      break;
    case 'wallet':
      artwork = <><path {...stroke} d="M4 6.5h14.5a2 2 0 0 1 2 2v9.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.3a2 2 0 0 1 1.5-2L16 2.3v4.2" /><path className="sticker-accent" {...stroke} d="M15.4 11h5.1v4h-5.1a2 2 0 1 1 0-4Z" /></>;
      break;
    case 'clock':
      artwork = <><circle {...stroke} cx="12" cy="12" r="9" /><path {...stroke} d="M12 7v5l3.6 2.1" /><path className="sticker-accent" {...stroke} d="M7 3.8 5.5 2.5M17 3.8l1.5-1.3" /></>;
      break;
    case 'user':
      artwork = <><circle {...stroke} cx="12" cy="8" r="4" /><path {...stroke} d="M4.5 20c.6-4 3.1-6 7.5-6s6.9 2 7.5 6" /><path className="sticker-accent" {...stroke} d="m17.5 5.3 1.2 1.2 2.2-2.4" /></>;
      break;
    case 'shield':
      artwork = <><path {...stroke} d="M12 2.7c2.3 1.7 4.7 2.6 7.4 2.8v5.2c0 4.7-2.5 8.2-7.4 10.6-4.9-2.4-7.4-5.9-7.4-10.6V5.5c2.7-.2 5.1-1.1 7.4-2.8Z" /><path className="sticker-accent" {...stroke} d="m8.2 12 2.5 2.5 5.2-5.3" /></>;
      break;
    case 'report':
      artwork = <><path {...stroke} d="M6 3h9l3 3v15H6z" /><path {...stroke} d="M15 3v4h3" /><path className="sticker-accent" {...stroke} d="M9 16v-3m3 3V9m3 7v-5" /></>;
      break;
    case 'target':
      artwork = <><circle {...stroke} cx="12" cy="12" r="8.5" /><circle {...stroke} cx="12" cy="12" r="4.5" /><circle className="sticker-accent-fill" cx="12" cy="12" r="1.6" /><path className="sticker-accent" {...stroke} d="m15.2 8.8 4.5-4.5m0 0v3.2m0-3.2h-3.2" /></>;
      break;
    case 'rocket':
      artwork = <><path {...stroke} d="M9 15c-1-4.8.4-8.7 5.8-11.7 2.1-1.2 4.5-1 5.9-.1.8 1.5 1 3.9-.2 6-3 5.4-6.9 6.8-11.5 5.8Z" /><path {...stroke} d="m13.4 14.1-3.8 5.2-1-3.9-3.9-1 5.2-3.8" /><circle className="sticker-accent" {...stroke} cx="16.4" cy="7.5" r="2" /><path className="sticker-accent" {...stroke} d="M7.2 18.2 4 21" /></>;
      break;
    case 'settings':
      artwork = <><path {...stroke} d="m9.7 3 .7 2.1c.5-.1 1.1-.1 1.6-.1s1.1 0 1.6.1l.7-2.1 3 1.7-1.4 1.8c.7.8 1.2 1.7 1.6 2.7l2.2-.3v3.5l-2.2-.3c-.4 1-.9 1.9-1.6 2.7l1.4 1.8-3 1.7-.7-2.1a7 7 0 0 1-3.2 0l-.7 2.1-3-1.7 1.4-1.8a8.8 8.8 0 0 1-1.6-2.7l-2.2.3V8.9l2.2.3c.4-1 .9-1.9 1.6-2.7L6.7 4.7 9.7 3Z" /><circle className="sticker-accent" {...stroke} cx="12" cy="10.7" r="2.7" /></>;
      break;
    case 'trend-up':
      artwork = <><path {...stroke} d="m4 17 5-5 3.2 3.2L20 7.4" /><path className="sticker-accent" {...stroke} d="M14.7 7.4H20v5.3" /></>;
      break;
    case 'office':
      artwork = <><path {...stroke} d="M5 21V4h10v17M15 9h4v12M3 21h18" /><path className="sticker-accent" {...stroke} d="M8 7h4M8 11h4M8 15h4" /></>;
      break;
    case 'laptop':
      artwork = <><rect {...stroke} x="4.2" y="4" width="15.6" height="12" rx="1.5" /><path {...stroke} d="M2.8 19h18.4" /><path className="sticker-accent" {...stroke} d="m9.2 12 2-2 1.6 1.6 2.5-2.6" /></>;
      break;
    case 'bolt':
      artwork = <><path {...stroke} d="M13.6 2.8 5.7 13h5.8l-1 8.2L18.3 11h-5.8l1.1-8.2Z" /></>;
      break;
    case 'chat':
      artwork = <><path {...stroke} d="M4 4.5h16v11H9l-5 4v-15Z" /><path className="sticker-accent" {...stroke} d="M8 9.5h8m-8 3h5" /></>;
      break;
    case 'calendar':
      artwork = <><rect {...stroke} x="3.5" y="5" width="17" height="16" rx="2" /><path {...stroke} d="M7.5 3v4M16.5 3v4M3.5 9h17" /><path className="sticker-accent" {...stroke} d="m8.5 15 2.2 2.2 4.8-4.7" /></>;
      break;
    case 'idea':
      artwork = <><path {...stroke} d="M8.3 15.4A7 7 0 1 1 15.7 15c-1.2.9-1.5 1.8-1.5 3H9.8c0-1.2-.3-1.8-1.5-2.6Z" /><path {...stroke} d="M9.5 21h5" /><path className="sticker-accent" {...stroke} d="M12 2V.8M4.8 5 3.5 3.7M19.2 5l1.3-1.3" /></>;
      break;
    case 'check':
      artwork = <><circle {...stroke} cx="12" cy="12" r="9" /><path className="sticker-accent" {...stroke} d="m7.5 12.2 3 3 6.2-6.4" /></>;
      break;
    case 'note':
      artwork = <><path {...stroke} d="M5 3h14v18H5z" /><path {...stroke} d="M8 3V1.8M16 3V1.8" /><path className="sticker-accent" {...stroke} d="M8.5 9h7m-7 4h7m-7 4H13" /></>;
      break;
  }
  return <svg className="sticker-art" viewBox="0 0 24 24" aria-hidden="true">{artwork}</svg>;
}

export default function Sticker({ icon, size = 'md', tilt = -6, float = false, className = '' }: StickerProps) {
  return (
    <span
      className={`sticker-3d sticker-${size}${float ? ' sticker-float' : ''} sticker-tone-${icon} ${className}`}
      style={{ '--tilt': `${tilt}deg` } as CSSProperties}
      aria-hidden="true"
    >
      <span className="sticker-shell"><Icon name={icon} /><i className="sticker-spark" /></span>
    </span>
  );
}
