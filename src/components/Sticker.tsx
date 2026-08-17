import type { CSSProperties } from 'react';

interface StickerProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tilt?: number;
  float?: boolean;
  className?: string;
}

export default function Sticker({ emoji, size = 'md', tilt = -6, float = false, className = '' }: StickerProps) {
  return (
    <span
      className={`sticker-3d sticker-${size}${float ? ' sticker-float' : ''} ${className}`}
      style={{ '--tilt': `${tilt}deg` } as CSSProperties}
      aria-hidden="true"
    >
      <span>{emoji}</span>
    </span>
  );
}
