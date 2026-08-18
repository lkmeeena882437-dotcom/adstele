import { useId } from 'react';

interface BrandLogoProps {
  className?: string;
  title?: string;
}

/** Reusable live vector brand mark for navigation, loading, footer and promos. */
export default function BrandLogo({ className = '', title }: BrandLogoProps) {
  const reactId = useId();
  const id = reactId.replace(/:/g, '');

  return (
    <span className={`brand-logo ${className}`} aria-hidden={title ? undefined : 'true'}>
      <svg className="brand-logo__svg" viewBox="0 0 100 100" role={title ? 'img' : undefined} aria-label={title}>
        <defs>
          <linearGradient id={`${id}-shell`} x1="14" y1="8" x2="86" y2="91" gradientUnits="userSpaceOnUse">
            <stop stopColor="#172554" />
            <stop offset=".48" stopColor="#070d20" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
          <linearGradient id={`${id}-edge`} x1="19" y1="15" x2="79" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67e8f9" />
            <stop offset=".48" stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id={`${id}-face`} x1="30" y1="20" x2="72" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ecfeff" />
            <stop offset=".42" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <radialGradient id={`${id}-shine`} cx="0" cy="0" r="1" gradientTransform="translate(35 24) rotate(55) scale(57)">
            <stop stopColor="#38bdf8" stopOpacity=".3" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#020617" floodOpacity=".42" />
          </filter>
        </defs>

        <g className="brand-logo__core" filter={`url(#${id}-shadow)`}>
          <rect x="8" y="8" width="84" height="84" rx="27" fill={`url(#${id}-shell)`} />
          <rect x="9" y="9" width="82" height="82" rx="26" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="2" />
          <path d="M19 32c10-17 30-22 47-15 12 5 19 16 21 28-14-15-37-21-68-13Z" fill={`url(#${id}-shine)`} />
          <path d="M23 77 47 23c1.4-3.1 5.8-3.2 7.3-.2L80 77H65.5l-5-11H40l-4.7 11H23Zm22-23h10.3l-5.4-13.2L45 54Z" fill="#071426" stroke={`url(#${id}-face)`} strokeWidth="5.2" strokeLinejoin="round" />
          <path d="m65 25 12-3-3 12" fill="none" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="brand-logo__orbit">
          <circle cx="50" cy="50" r="45.5" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="1" strokeDasharray="2 7" opacity=".66" />
          <circle cx="50" cy="4.5" r="2" fill="#67e8f9" />
        </g>
        <circle className="brand-logo__glint" cx="78" cy="21" r="2.2" fill="#fff" />
      </svg>
    </span>
  );
}
