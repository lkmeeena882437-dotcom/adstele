import { lazy, Suspense, useEffect, useRef } from 'react';
import useSceneSupport from '../three/useSceneSupport';

// Lazy so three.js never blocks the first paint — the CSS
// starfield shows instantly, then the 3D scene fades in.
const GlobalScene = lazy(() => import('../three/GlobalScene'));

function SceneFallback() {
  return (
    <>
      <div className="stars opacity-70" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-ice-300/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-violet-glow/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-mint-glow/15 blur-3xl" />
    </>
  );
}

/**
 * Fixed full-viewport 3D environment behind the page content.
 * Contains: the dark hero backdrop (fades with scroll), the
 * global WebGL scene, and a pure-CSS fallback for reduced-motion
 * or no-WebGL devices.
 */
export default function BackgroundEnvironment() {
  const support = useSceneSupport();
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const t = Math.min(1, Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.75)));
      if (backdrop.current) backdrop.current.style.opacity = t.toFixed(3);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="bg-environment" aria-hidden="true">
      {/* Dark backdrop for the hero (opacity driven by scroll) */}
      <div ref={backdrop} className="hero-dark-bg" />

      {support === true ? (
        <Suspense fallback={<SceneFallback />}>
          <GlobalScene />
        </Suspense>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}
