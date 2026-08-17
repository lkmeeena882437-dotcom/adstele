import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add('has-custom-cursor');
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;

    const render = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${current.x}px,${current.y}px,0)`;
      frame = requestAnimationFrame(render);
    };
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = (event.target as Element | null)?.closest<HTMLElement>('a,button,input,textarea,select,[data-cursor]');
      const text = el?.dataset.cursor ?? '';
      ring.current?.classList.toggle('cc-ring-active', Boolean(el));
      ring.current?.classList.toggle('cc-ring-label', Boolean(text));
      if (label.current) label.current.textContent = text;
    };
    const onOut = () => {
      target.x = -100;
      target.y = -100;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onOut);
    frame = requestAnimationFrame(render);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cc-dot" aria-hidden="true" />
      <div ref={ring} className="cc-ring" aria-hidden="true"><span ref={label} className="cc-label" /></div>
    </>
  );
}
