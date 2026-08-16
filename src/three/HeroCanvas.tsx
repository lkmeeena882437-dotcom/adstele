import { lazy, Suspense, useEffect, useState } from 'react';
import StarsFallback from './StarsFallback';

// Lazy-loaded so three.js ships in its own chunk and never
// blocks the initial paint of the page.
const ConstellationCanvas = lazy(() => import('./Constellation'));

export default function HeroCanvas() {
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReady(!reduced && webgl);
  }, []);

  if (ready === null || ready === false) return <StarsFallback />;

  return (
    <Suspense fallback={<StarsFallback />}>
      <ConstellationCanvas />
    </Suspense>
  );
}
