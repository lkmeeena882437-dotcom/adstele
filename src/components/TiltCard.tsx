import { useEffect, useRef, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export default function TiltCard({ children, className = '', max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !canTilt) return;
    let settleTimer = 0;
    const onEnter = () => {
      window.clearTimeout(settleTimer);
      el.style.willChange = 'transform';
    };
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.transition = 'transform 80ms ease-out';
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-3px)`;
    };
    const onLeave = () => {
      el.style.transition = 'transform 600ms cubic-bezier(0.22,1,0.36,1)';
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
      settleTimer = window.setTimeout(() => { el.style.willChange = 'auto'; }, 650);
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.clearTimeout(settleTimer);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`spotlight-card ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}
