'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/useClient';
import CurtainReveal from './CurtainReveal';

const BOOT_LINES = [
  'babit-os v2.6.1 (build 2026.01)',
  'initialising display ......... ok',
  'mounting ~/portfolio ......... ok',
  'loading keyboard layout ...... 60 keys',
  'linking scroll daemon ........ ok',
  '',
  'ready.',
];

const STEP_MS = 190;
const HOLD_MS = 620;
/** Crossfade from the boot log to the curtain once the log has landed. */
const CURTAIN_IN_MS = 280;
/**
 * Total curtain animation time. Must stay in step with `--curtain-dur` plus
 * `--curtain-delay` on `.tuiCurtain` in globals.css: this is only how long the
 * element is kept mounted, not how long it animates.
 */
const CURTAIN_DURATION_MS = 1500;

/**
 * Boot sequence. Plays once per browser tab, and is skipped entirely when the
 * visitor prefers reduced motion (unless `?boot=1` forces it).
 *
 * When the log finishes it hands off to `CurtainReveal`, which parts the page
 * open. The two phases are separate elements rather than one, so the curtain's
 * CSS animation timeline starts from a clean slate.
 */
export default function BootSequence() {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [curtain, setCurtain] = useState(false);
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
      setVisible(true);

      BOOT_LINES.forEach((_, index) => {
        schedule(() => {
          setLineCount(index + 1);
          setProgress(Math.round(((index + 1) / BOOT_LINES.length) * 100));
        }, index * STEP_MS);
      });

      const logEndsAt = BOOT_LINES.length * STEP_MS + HOLD_MS;

      // Hand off to the curtain: fade the log out, then part the fabric.
      schedule(() => setVisible(false), logEndsAt);
      schedule(() => setCurtain(true), logEndsAt + CURTAIN_IN_MS);

      const finish = () => {
        sessionStorage.setItem('tui-booted', '1');
        setCurtain(false);
      };

      schedule(finish, logEndsAt + CURTAIN_IN_MS + CURTAIN_DURATION_MS);
    }, 0);

    const skip = () => {
      sessionStorage.setItem('tui-booted', '1');
      setVisible(false);
      setCurtain(false);
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

  if (!visible && !curtain) return null;

  const filled = Math.round((progress / 100) * 12);

  return (
    <>
      {visible ? (
        <div className="tuiBoot" role="status" aria-live="polite">
          <pre className="tuiBoot__log">{BOOT_LINES.slice(0, lineCount).join('\n')}</pre>
          <div className="tuiBoot__bar" aria-hidden="true">
            [{'\u2588'.repeat(filled)}
            {'\u2591'.repeat(12 - filled)}] {progress}%
          </div>
        </div>
      ) : null}

      {curtain ? <CurtainReveal /> : null}
    </>
  );
}
