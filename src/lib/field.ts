/**
 * Ambient character field: the backdrop behind every pane.
 *
 * Three drifting wave fronts, each a narrow crest with empty space between. The
 * tuning that matters, all measured rather than guessed:
 *
 *  - `CREST` sharpens each front. Without it the sines sum to a vague wash that
 *    fills every cell (measured: 0% blank), which reads as noise, not depth.
 *  - `CAP` clips the ramp to its lower half, so the field never reaches the
 *    densest glyphs. It has to sit behind text, not compete with it.
 *  - `FLOOR` blanks everything below it, which is what produces the ~55% empty
 *    cells that make the crests legible as shapes.
 *
 * The field is deterministic in `t`: no `Math.random`, no per-frame state. A
 * resize redraws the same frame, and the reduced-motion still is reproducible.
 */

import { RAMP_PLAIN } from './ascii';

const RAMP_LEN = RAMP_PLAIN.length - 1;

/** Crest sharpness. Higher = narrower front, more empty space. */
const CREST = 14;
/** Highest ramp index the field may use. Kept low so it stays quiet. */
const CAP = 5;
/** Below this value a cell is blank. */
const FLOOR = 0.08;

/** Wave fronts: (angle, speed) in cells-normalised space. */
const FRONTS: ReadonlyArray<readonly [number, number]> = [
  [0.5, 0.12],
  [1.4, 0.17],
  [2.3, 0.22],
];

export function renderField(t: number, cols: number, rows: number): string[] {
  const out: string[] = new Array(rows);

  for (let y = 0; y < rows; y++) {
    let line = '';
    const Y = y / rows;

    for (let x = 0; x < cols; x++) {
      const X = x / cols;

      // Take the strongest of the three fronts at this cell.
      let v = 0;
      for (let i = 0; i < FRONTS.length; i++) {
        const [angle, speed] = FRONTS[i];
        const phase =
          X * Math.cos(angle) * 2.2 + Y * Math.PI * Math.sin(angle) + t * speed;
        const crest = Math.pow(Math.max(0, Math.sin(phase * 2.2)), CREST);
        if (crest > v) v = crest;
      }

      if (v < FLOOR) {
        line += ' ';
      } else {
        const idx = Math.min(CAP, Math.round(v * RAMP_LEN));
        line += RAMP_PLAIN[idx];
      }
    }
    out[y] = line;
  }
  return out;
}
