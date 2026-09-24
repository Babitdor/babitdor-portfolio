'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useClient';
import { BANNER_REVEAL, BANNER_TEXT, buildBanner, revealDuration } from '@/lib/banner';
import AsciiBanner from './AsciiBanner';

const BOOT_LINES = [
  'babit-os v2.6.1 (build 2026.01)',
  'initialising display ......... ok',
  'mounting ~/portfolio ......... ok',
  'starting ascii renderer ...... 2 layers',
  'linking scroll daemon ........ ok',
  '',
  'ready.',
];

const STEP_MS = 190;
/** Time the boot log holds after the last line, before the banner appears. */
const HOLD_MS = 620;
/** How long the settled banner holds before the whole overlay drops. */
const BANNER_HOLD_MS = 900;

/**
 * The reveal's own length, derived from the same numbers the reveal uses. This
 * was previously a duplicated literal and was shorter than the animation, so
 * the overlay unmounted mid-scramble.
 */
const BANNER_MS = revealDuration(buildBanner(BANNER_TEXT), BANNER_REVEAL) * 1000;

/**
 * Boot sequence. Plays once per browser tab, and is skipped entirely when the
 * visitor prefers reduced motion (unless `?boot=1` forces it).
 *
 * Order: log types out, log clears, the ASCII name banner scrambles into place,
 * then the whole overlay drops. The banner is its own component so its rAF loop
 * owns one element and unmounts with it.
 */
export default function BootSequence() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'off' | 'log' | 'banner'>('off');
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('boot');
    if (reducedMotion && !forced) return;
    if (!forced && sessionStorage.getItem('tui-booted') === '1') return;

    const schedule = (callback: () => void, delay: number) => {
      timers.current.push(window.setTimeout(callback, delay));
    };

    // Deferred by a tick so the state write is not a synchronous effect write.
    schedule(() => {
      setPhase('log');

      BOOT_LINES.forEach((_, index) => {
        schedule(() => {
          setLineCount(index + 1);
          setProgress(Math.round(((index + 1) / BOOT_LINES.length) * 100));
        }, index * STEP_MS);
      });

      const logEndsAt = BOOT_LINES.length * STEP_MS + HOLD_MS;

      schedule(() => setPhase('banner'), logEndsAt);
      schedule(() => {
        sessionStorage.setItem('tui-booted', '1');
        setPhase('off');
      }, logEndsAt + BANNER_MS + BANNER_HOLD_MS);
    }, 0);

    const skip = () => {
      sessionStorage.setItem('tui-booted', '1');
      setPhase('off');
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [reducedMotion]);

  if (phase === 'off') return null;

  const filled = Math.round((progress / 100) * 12);

  return (
    <div className="tuiBoot" role="status" aria-live="polite">
      {phase === 'log' ? (
        <>
          <pre className="tuiBoot__log">{BOOT_LINES.slice(0, lineCount).join('\n')}</pre>
          <div className="tuiBoot__bar" aria-hidden="true">
            [{'\u2588'.repeat(filled)}
            {'\u2591'.repeat(12 - filled)}] {progress}%
          </div>
        </>
      ) : (
        <>
          <AsciiBanner />
          <p className="tuiBoot__hint" aria-hidden="true">
            scroll to continue
          </p>
        </>
      )}
    </div>
  );
}
