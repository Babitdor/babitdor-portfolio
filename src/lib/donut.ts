/**
 * Rotating ASCII torus, after Andy Sloane's `donut.c`
 * (https://www.a1k0n.net/2011/07/20/donut-math.html).
 *
 * The renderer is a framebuffer plus a z-buffer, not a raycaster. It walks the
 * torus surface at fixed angular steps and projects each sample:
 *
 *   - the point is rotated by `A` (about x) and `B` (about z), plus its own
 *     position around the tube,
 *   - `ooz = 1/z` is the depth key, so initialising the buffer to 0 means
 *     "infinitely far" and the compare is a plain `>`,
 *   - luminance L = dot(surface normal, light dir (0,1,-1)) picks the glyph.
 *
 * Two changes from the C original, both because a browser cell is not a
 * terminal cell:
 *   - `y` is scaled by the measured cell aspect on projection. Without this the
 *     torus looks squashed.
 *   - the buffers are typed arrays reused across frames, not fresh allocs.
 *
 * `RAMP_DONUT` is donut.c's own ramp, so the output reads exactly like the
 * original: dim `.` through to bright `@`.
 */

import { RAMP_DONUT } from './ascii';

const RAMP_LEN = RAMP_DONUT.length - 1; // 11: the C clamps `L*8` to 11
const R1 = 1;
const R2 = 2;
const K2 = 5;

/**
 * Largest `|ooz * x|` the torus produces, measured by sweeping the full
 * rotation. Both axes share this value (the projection is circular in
 * normalised space), so one constant fits K1 on both axes.
 */
const R_MAX = 0.75;

/** Fraction of the panel the torus fills, leaving a margin so it never clips. */
const FILL = 0.82;

/** Reusable buffers, keyed by grid so a resize reallocates once. */
let cellBuf: Int32Array | null = null;
let cellCount = 0;
let zbuf: Float32Array | null = null;

/**
 * The torus's two rotation angles, both in radians: `a` about x, `b` about z.
 *
 * These arrive from outside rather than being derived from a timestamp, because
 * the rotation is now driven by the spin motor (idle autorotation plus whatever
 * the visitor drags), not by elapsed time alone.
 */
export type DonutRotation = { a: number; b: number };

export function renderDonut(
  rot: DonutRotation,
  cols: number,
  rows: number,
  cell: { w: number; h: number },
): string[] {
  const count = cols * rows;
  if (count !== cellCount || !cellBuf || !zbuf) {
    cellBuf = new Int32Array(count);
    zbuf = new Float32Array(count);
    cellCount = count;
  }

  cellBuf.fill(-1); // -1 = empty cell
  zbuf.fill(0); // 0 = infinitely far

  const A = rot.a;
  const B = rot.b;
  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  // A monospace cell is taller than it is wide, so the projected y is squeezed
  // by the cell's own aspect ratio to keep the torus circular on screen.
  const yScale = cell.w / cell.h;
  const halfW = cols / 2;
  const halfH = rows / 2;

  // Fit the projection to whichever axis runs out first.
  const K1 = FILL * Math.min(cols / (2 * R_MAX), rows / (2 * yScale * R_MAX));

  for (let theta = 0; theta < Math.PI * 2; theta += 0.07) {
    const cost = Math.cos(theta);
    const sint = Math.sin(theta);

    for (let phi = 0; phi < Math.PI * 2; phi += 0.02) {
      const cosp = Math.cos(phi);
      const sinp = Math.sin(phi);

      const circleX = R2 + R1 * cost;
      const circleY = R1 * sint;

      // Three chained rotations of the ring point.
      const x = circleX * (cosB * cosp + sinA * sinB * sinp) - circleY * cosA * sinB;
      const y = circleX * (sinB * cosp - sinA * cosB * sinp) + circleY * cosA * cosB;
      const z = K2 + cosA * circleX * sinp + circleY * sinA;
      const ooz = 1 / z;

      // `+ 0.5` before `| 0` is a rounded cast, since `| 0` truncates toward
      // zero and would bias the shape up and left.
      const xp = (halfW + K1 * ooz * x + 0.5) | 0;
      const yp = (halfH - K1 * ooz * y * yScale + 0.5) | 0;

      // Luminance from the surface normal against the light at (0,1,-1).
      const L =
        cosp * cost * sinB -
        cosA * cost * sinp -
        sinA * sint +
        cosB * (cosA * sint - cost * sinA * sinp);

      if (yp >= 0 && yp < rows && xp >= 0 && xp < cols && L > 0) {
        const o = xp + cols * yp;
        if (ooz > zbuf[o]) {
          zbuf[o] = ooz;
          cellBuf[o] = Math.min(RAMP_LEN, (L * 8) | 0);
        }
      }
    }
  }

  const out: string[] = new Array(rows);
  for (let y = 0; y < rows; y++) {
    let line = '';
    const base = y * cols;
    for (let x = 0; x < cols; x++) {
      const cell = cellBuf[base + x];
      line += cell < 0 ? ' ' : RAMP_DONUT[cell];
    }
    out[y] = line;
  }
  return out;
}
