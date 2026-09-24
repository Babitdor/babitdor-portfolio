'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { measureStages, setLenis, updateFromScroll } from '@/lib/scroll';
import { usePrefersReducedMotion } from '@/lib/useClient';

type SmoothScrollContextValue = { reducedMotion: boolean };

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ reducedMotion: false });

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;

    const syncScroll = () => updateFromScroll(window.scrollY);

    if (reducedMotion) {
      // No smoothing: read native scroll directly.
      window.addEventListener('scroll', syncScroll, { passive: true });
    } else {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      setLenis(lenis);
      lenis.on('scroll', syncScroll);

      // Lenis drives itself from one shared rAF loop. We read `window.scrollY`
      // in the callback so the 3D layer and the fallback share one code path.
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    measureStages();
    syncScroll();

    const onResize = () => {
      measureStages();
      syncScroll();
    };
    window.addEventListener('resize', onResize);

    // Section heights change when fonts land and when the canvas mounts.
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', syncScroll);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      setLenis(null);
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return (
    <SmoothScrollContext.Provider value={{ reducedMotion }}>{children}</SmoothScrollContext.Provider>
  );
}
