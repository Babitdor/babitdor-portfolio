import { BOARD_WIDTH, KEY_ROWS, type KeyDef } from '@/lib/keyboard-layout';

/**
 * Per-key RGB backlight.
 *
 * The board gets a spectrum baked from each key's POSITION, so the rainbow is
 * stable no matter where the camera is: `b` on row 4 always has the same hue.
 * On top of that, a wave phase shifts the whole spectrum as the page scrolls.
 *
 * The wave is a pure function of `scrollState.progress`, never wall-clock, for
 * the same reason the press choreography is: scrolling back up has to play it
 * in reverse and land on exactly the pose it had on the way down.
 */

/** How many full spectrum sweeps happen across one page scroll. */
export const WAVE_TURNS = 1.6;

/** Diagonal tilt of the baked gradient, so the board is not banded by row. */
const DIAGONAL = 0.28;

export const fract = (value: number): number => value - Math.floor(value);

/**
 * Baked hue for a key, in 0..1.
 *
 * Uses the key's layout-space position rather than its scene position so the
 * gradient is independent of the camera and of `keyToScenePosition`.
 */
export function hueForKey(key: KeyDef): number {
  const centreX = (key.x + key.w / 2) / BOARD_WIDTH;
  const downY = key.y / Math.max(1, KEY_ROWS.length - 1);

  // A slight diagonal reads as a spectrum sweeping across the whole board;
  // a pure X ramp reads as vertical bands.
  return fract(centreX * 0.92 + downY * DIAGONAL);
}

/** The hue a baked key shows once the scroll wave has shifted it. */
export function shiftedHue(baseHue: number, progress: number): number {
  return fract(baseHue + progress * WAVE_TURNS);
}
