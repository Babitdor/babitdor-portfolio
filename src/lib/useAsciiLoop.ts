'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { usePrefersReducedMotion } from './useClient';

/**
 * Drives an ASCII effect.
 *
 * Three decisions here are what keep this cheap, and they are the reason there
 * is no canvas involved:
 *
 * 1. One `<pre>`, one `textContent` write per frame. Building a 100x30 grid as
 *    DOM nodes is 3,000 layout participants mutated 15x/second; writing a single
 *    string lets the browser lay out one text run.
 * 2. Throttled to `fps` via a time accumulator. ASCII at 60fps does not look
 *    better than at 18fps, it looks *less* like a terminal, and it costs 3x.
 *    Note the accumulator (rather than a timer) so a long frame does not cause
 *    a burst of catch-up frames.
 * 3. The loop stops when the element is off-screen or the tab is hidden.
 *
 * Under `prefers-reduced-motion` the renderer is called exactly once with a
 * fixed time and the loop never starts, so the element shows a still frame
 * instead of animating.
 */
export type AsciiLoop = {
  /** Stable across renders; call from the renderer to know the grid it must fill. */
  size: { cols: number; rows: number };
  /** Recompute the grid. Call from a resize observer. */
  measure: () => void;
};

type Options = {
  /**
   * Element that defines the grid's size. This must be an element whose box is
   * decided by layout, NOT the `<pre>` being written to: a `<pre>` sizes itself
   * from its content, so measuring it is circular (the content depends on the
   * measurement). Defaults to the `<pre>`'s parent.
   */
  boxRef?: RefObject<HTMLElement | null>;
  /** Target frames per second. */
  fps?: number;
  /**
   * Renderer: given a time in seconds, the grid to fill, and the measured
   * character cell, return `rows` strings of `cols` chars.
   *
   * The cell is measured from the real font rather than assumed, because the
   * ASCII effects that correct for cell aspect (the torus) are visibly wrong if
   * the advance width guess is off, and the guess differs per font and per
   * platform fallback.
   */
  render: (t: number, cols: number, rows: number, cell: CharCell) => string[];
  /**
   * Optional per-frame step, called once before each render with the seconds
   * since the previous rendered frame.
   *
   * This exists so an effect can carry mutable state between frames without
   * making `render` impure. The torus uses it to integrate its rotation from the
   * spin motor, which is what lets a drag feed into the animation.
   *
   * Not called while the loop is paused, so off-screen time does not advance it,
   * and `dt` is clamped so resuming after a pause cannot jump.
   */
  advance?: (dt: number) => void;
  /** Fraction of the box the grid should cover. */
  fill?: { w: number; h: number };
  /** Time (seconds) frozen frames are rendered at under reduced motion. */
  stillTime?: number;
};

export type CharCell = { w: number; h: number };

/**
 * Measure a real character cell for `el`'s computed font.
 *
 * Uses a two-point difference (100 vs 200 glyphs) so it cancels any padding or
 * border and returns the pure advance width.
 */
function measureCell(el: HTMLElement): CharCell | null {
  const cs = getComputedStyle(el);
  const h = parseFloat(cs.lineHeight);
  const probe = document.createElement('pre');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText =
    'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;margin:0;' +
    `font-family:${cs.fontFamily};font-size:${cs.fontSize};` +
    `font-weight:${cs.fontWeight};letter-spacing:${cs.letterSpacing}`;
  probe.textContent = 'M'.repeat(100);
  document.body.appendChild(probe);
  const w100 = probe.getBoundingClientRect().width;
  probe.textContent = 'M'.repeat(200);
  const w200 = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);

  const advance = (w200 - w100) / 100;
  if (!(advance > 0) || !Number.isFinite(h) || !(h > 0)) return null;
  return { w: advance, h };
}

export function useAsciiLoop(
  ref: RefObject<HTMLElement | null>,
  { boxRef, fps = 18, render, advance, fill = { w: 1, h: 1 }, stillTime = 0 }: Options,
): AsciiLoop {
  const reduced = usePrefersReducedMotion();
  const sizeRef = useRef({ cols: 0, rows: 0 });
  const cellRef = useRef<CharCell | null>(null);
  const [, force] = useState(0);
  const renderRef = useRef(render);
  const advanceRef = useRef(advance);
  const drawRef = useRef<(t: number) => void>(() => {});

  // Keep the latest callbacks without writing a ref during render.
  useEffect(() => {
    renderRef.current = render;
    advanceRef.current = advance;
  });

  const box = () => boxRef?.current ?? ref.current?.parentElement ?? ref.current ?? null;

  const measure = () => {
    const el = box();
    if (!el || !ref.current) return;

    // Re-measure the cell too: a webfont swapping in changes the metrics.
    const cell = measureCell(ref.current);
    if (cell) cellRef.current = cell;
    const c = cellRef.current;
    if (!c) return;

    const rect = el.getBoundingClientRect();
    const cols = Math.max(8, Math.floor((rect.width * fill.w) / c.w));
    const rows = Math.max(4, Math.floor((rect.height * fill.h) / c.h));
    if (cols !== sizeRef.current.cols || rows !== sizeRef.current.rows) {
      sizeRef.current = { cols, rows };
      force((n) => n + 1);
    }
  };

  const draw = (t: number) => {
    const el = ref.current;
    if (!el) return;
    const { cols, rows } = sizeRef.current;
    const cell = cellRef.current;
    if (!cols || !rows || !cell) return;
    el.textContent = renderRef.current(t, cols, rows, cell).join('\n');
  };
  drawRef.current = draw;

  // Measure on mount and on resize, then paint (once, or on a loop).
  useEffect(() => {
    const boxEl = box();
    if (!boxEl || !ref.current) return;

    measure();
    draw(reduced ? stillTime : 0);

    let paused = document.hidden;

    // Observe the box, not the <pre>: the <pre> resizes as its own content
    // changes, which would feed back into the next measurement.
    const ro = new ResizeObserver(() => {
      measure();
      drawRef.current(reduced ? stillTime : 0);
    });
    ro.observe(boxEl);

    if (reduced) {
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;

    const FRAME_MS = 1000 / fps;
    const start = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (paused) return;
      const delta = now - last;
      if (delta < FRAME_MS) return;
      // Do not accumulate debt: a slow frame should skip, not burst.
      last = now - (delta % FRAME_MS);
      // Clamped so a long first frame, or the frame that resumes after a pause,
      // cannot advance the state by a huge step.
      advanceRef.current?.(Math.min(delta / 1000, 0.1));
      drawRef.current((now - start) / 1000);
    };
    raf = requestAnimationFrame(tick);

    // Stop when scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        // Repaint a settled frame so it is not left mid-motion.
        if (paused) drawRef.current(reduced ? stillTime : 0);
      },
      { threshold: 0 },
    );
    io.observe(boxEl);

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
    // `render` is read through a ref; only the structural options should restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, fps, fill.w, fill.h, stillTime]);

  return { size: sizeRef.current, measure };
}
