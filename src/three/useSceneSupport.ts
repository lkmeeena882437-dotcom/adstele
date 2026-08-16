import { useEffect, useState } from 'react';

/**
 * Detects whether the full 3D environment should run:
 * - null  → still detecting
 * - true  → WebGL available and user motion is OK
 * - false → no WebGL or prefers-reduced-motion (use CSS fallback)
 */
export default function useSceneSupport(): null | boolean {
  const [support, setSupport] = useState<null | boolean>(null);

  useEffect(() => {
    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setSupport(webgl && !reduced);
  }, []);

  return support;
}
