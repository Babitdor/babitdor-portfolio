'use client';

import { useEffect, useRef } from 'react';
import { BANNER_REVEAL, BANNER_TEXT, buildBanner, renderBanner, revealDuration } from '@/lib/banner';

/**
 * The scramble reveal: the banner assembles out of noise, column by column,
 * travelling down each column.
 *
 * Driven by rAF with `performance.now()`, not a chain of timers, so the reveal
 * is a pure function of elapsed time: it cannot drift, and a slow frame skips
 * ahead instead of queueing up. The frame is stateless (see `renderBanner`), so
 * there is nothing to keep in sync between the timer and the DOM.
 *
 * No `setState`: the whole animation writes `textContent` directly. React state
 * would re-render this subtree on every frame for no benefit.
 */
export default function AsciiBanner() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = buildBanner(BANNER_TEXT);
    const duration = revealDuration(target, BANNER_REVEAL);

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= duration) {
        el.textContent = target.join('\n');
        return;
      }
      el.textContent = renderBanner(target, t, BANNER_REVEAL).join('\n');
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={ref}
      className="tuiBoot__banner"
      aria-hidden="true"
      style={{ fontSize: 11, lineHeight: '12px' }}
    />
  );
}
