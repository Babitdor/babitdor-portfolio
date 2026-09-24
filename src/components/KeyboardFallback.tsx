'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { KEYS } from '@/lib/keyboard-layout';
import { PRESS_WORD, scrollState } from '@/lib/scroll';
import { useIsClient } from '@/lib/useClient';
import { isWebGLAvailable } from '@/lib/webgl';
import { hueForKey } from './scene/rgb';

/**
 * Shown when WebGL is unavailable (or when `?nogl=1` is set).
 *
 * A CSS keyboard that lights the same keys the 3D scene would, so the scroll
 * choreography and the word still read.
 *
 * The keys carry the same baked spectrum as the 3D board, but deliberately
 * without the scroll wave: animating 30 DOM nodes every frame costs more than
 * the entire WebGL scene, and this is the degraded path.
 */
export default function KeyboardFallback() {
  const isClient = useIsClient();
  const [stage, setStage] = useState(0);

  const enabled = isClient && !isWebGLAvailable();

  const subset = useMemo(
    () => KEYS.filter((key) => key.label.length === 1).slice(0, 30),
    [],
  );

  /** Baked spectrum, matching `hueForKey` in the 3D board. */
  const hues = useMemo(() => subset.map((key) => hueForKey(key)), [subset]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const read = () => {
      setStage((current) => (current === scrollState.stage ? current : scrollState.stage));
      frame = requestAnimationFrame(read);
    };
    frame = requestAnimationFrame(read);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  if (!enabled) return null;

  const activeLetter = PRESS_WORD[stage]?.toLowerCase();

  return (
    <div className="keyboardFallback" aria-hidden="true">
      <span className="keyboardFallback__word">{PRESS_WORD.slice(0, stage + 1)}</span>
      {subset.map((key, index) => (
        <span
          key={`${key.id}-${index}`}
          className={`keyboardFallback__key${
            key.label === activeLetter ? ' is-lit' : ''
          }`}
          style={{ '--key-hue': Math.round(hues[index] * 360) } as CSSProperties}
        >
          {key.label}
        </span>
      ))}
    </div>
  );
}
