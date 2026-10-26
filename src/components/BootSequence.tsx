'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/lib/useClient';
import { BANNER_REVEAL, BANNER_TEXT, buildBanner, revealDuration } from '@/lib/banner';
import AsciiBanner from './AsciiBanner';

const BOOT_LINES = [
  'babit-os 2.7  /  production',
  'loading profile ......... ok',
  'mounting 8 case files ... ok',
  'starting agent runtime .. ok',
  'ready.',
];

const STEP_MS = 80;
/** Time the boot log holds after the last line, before the banner appears. */
const HOLD_MS = 240;
/** How long the settled banner holds before the overlay lifts. */
const BANNER_HOLD_MS = 380;
/** Must match the exit transition in globals.css. */
const EXIT_MS = 320;

/**
 * The reveal's own length, derived from the same numbers the reveal uses, so the
 * overlay cannot unmount mid-scramble.
 */
const BANNER_MS = revealDuration(buildBanner(BANNER_TEXT), BANNER_REVEAL) * 1000;

/**
 * Boot sequence. Plays once per browser tab on the home page, and is skipped
 * entirely when the visitor prefers reduced motion (unless `?boot=1` forces it).
 *
 * Order: log types out, log clears, the ASCII name banner scrambles into place,
 * the overlay lifts, and the hero is already there underneath. Total run is
 * under 2.4 s, below the 2.6 s loader budget. A direct visit to a case file
 * skips it: the record is the reason that visitor is here.
 */
export default function BootSequence() {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'off' | 'log' | 'banner' | 'exit'>('off');
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  /*
   * Hand the page over from the server-rendered guard (see layout.tsx).
   *
   * Keyed on `phase`, not on mount: the guard goes away in the same frame the
   * overlay arrives. Hides rather than removes, because removing a React-owned
   * node desyncs the tree and React re-inserts it on a later render.
   */
  useLayoutEffect(() => {
    if (phase === 'off') return;
    const guard = document.getElementById('tuiBootGuard');
    if (guard) guard.style.display = 'none';
  }, [phase]);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('boot');
    if (pathname !== '/') return;
    if (reducedMotion && !forced) return;
    if (!forced && sessionStorage.getItem('tui-booted') === '1') return;

    const schedule = (callback: () => void, delay: number) => {
      timers.current.push(window.setTimeout(callback, delay));
    };

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
        setPhase('exit');
      }, logEndsAt + BANNER_MS + BANNER_HOLD_MS);
      schedule(() => setPhase('off'), logEndsAt + BANNER_MS + BANNER_HOLD_MS + EXIT_MS);
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
  }, [pathname, reducedMotion]);

  if (phase === 'off') return null;

  const filled = Math.round((progress / 100) * 12);

  return (
    <div
      className={`tuiBoot${phase === 'exit' ? ' is-exiting' : ''}`}
      role="status"
      aria-live="polite"
    >
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
            entering portfolio
          </p>
        </>
      )}
    </div>
  );
}
