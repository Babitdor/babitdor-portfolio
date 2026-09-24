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
    const settled = target.join('\n');

    /**
     * Scale the art down to fit its container.
     *
     * This cannot be expressed in CSS reliably. The block glyphs are not the
     * font's Latin metrics: measured on this machine a Latin character advances
     * 0.6em while `U+2588` advances a different amount, and that depends on the
     * face the platform falls back to for block elements. So no fixed
     * `font-size` can guarantee that 47 columns fit, and on a 375px viewport the
     * art overflowed and caused a horizontal scroll.
     *
     * Measuring the element's own rendered width sidesteps the metrics entirely:
     * whatever the font does, the result is scaled to the space available.
     */
    const fit = () => {
      el.style.fontSize = '';
      el.textContent = settled; // measure the widest the art will ever be
      const natural = el.scrollWidth;
      const avail = (el.parentElement?.clientWidth ?? window.innerWidth) - 8;
      if (natural > avail && natural > 0) {
        const base = parseFloat(getComputedStyle(el).fontSize);
        const next = Math.max(7, (base * avail) / natural);
        el.style.fontSize = `${next.toFixed(2)}px`;
      }
    };

    fit();
    // Start from the first reveal frame, so the settled art is never painted.
    el.textContent = renderBanner(target, 0, BANNER_REVEAL).join('\n');

    const onResize = () => {
      fit();
      el.textContent = renderBanner(target, 0, BANNER_REVEAL).join('\n');
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= duration) {
        el.textContent = settled;
        return;
      }
      el.textContent = renderBanner(target, t, BANNER_REVEAL).join('\n');
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <pre ref={ref} className="tuiBoot__banner" aria-hidden="true" />
  );
}
