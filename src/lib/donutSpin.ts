/**
 * Spin motor for the hero torus.
 *
 * Three sources of rotation, in priority order:
 *
 *   1. a drag, which owns the angle directly while the pointer is down,
 *   2. the fling left over from a drag, which decays away,
 *   3. the idle autorotation that everything settles back into.
 *
 * This is a plain mutable object stepped once per frame, not React state. It
 * changes on every frame and nothing about it should cause a re-render, which is
 * the same reasoning as `scrollState`.
 *
 * All functions are pure with respect to the clock: `now` is passed in, so the
 * behaviour can be tested without a browser.
 */

export type Spin = {
  /** Rotation about x, radians. */
  a: number;
  /** Rotation about z, radians. */
  b: number;
  /** Angular velocity about x, radians per second. */
  va: number;
  /** Angular velocity about z, radians per second. */
  vb: number;
  /** True while a pointer is down on the stage. */
  dragging: boolean;
  /** Timestamp of the last pointer move, for detecting a stale fling. */
  lastMoveAt: number;
};

/** Idle autorotation. Matches the constant-rate tumble the torus had before. */
export const IDLE_VA = 0.9;
export const IDLE_VB = 0.5;

/** Radians of rotation per pixel dragged. A ~500px drag is a little over a turn. */
export const RAD_PER_PX = Math.PI / 240;

/** Velocity cap, so a violent drag cannot make the torus strobe. */
const MAX_V = 8;

/** Seconds for a fling to decay into the idle spin. */
const SETTLE_TAU = 0.45;

/**
 * Time constant for smoothing the measured drag velocity.
 *
 * A single pointermove gives a very noisy instantaneous speed: the deltas are
 * tens of pixels apart and a fast flick computes to well over 100 rad/s, which
 * saturates any sane cap and makes every flick feel identical. Blending toward
 * the instantaneous value makes the fling proportional to how fast the gesture
 * actually was.
 */
const VEL_TAU = 0.045;

/**
 * A move older than this before release is treated as "the pointer was held
 * still", so releasing does not launch a fling that the gesture never earned.
 */
const STALE_MS = 90;

/** Extra rotation from a tap, radians per second. */
const TAP_IMPULSE = 3.2;

/** Movement under this many pixels counts as a tap rather than a drag. */
export const TAP_SLOP = 6;

const TAU = Math.PI * 2;
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

export function createSpin(): Spin {
  return { a: 0, b: 0, va: IDLE_VA, vb: IDLE_VB, dragging: false, lastMoveAt: 0 };
}

/** Ease a velocity toward its idle value, framerate-independently. */
function settle(v: number, idle: number, dt: number): number {
  return v + (idle - v) * (1 - Math.exp(-dt / SETTLE_TAU));
}

/** Advance the spin by `dt` seconds. */
export function stepSpin(s: Spin, dt: number): void {
  if (!(dt > 0)) return;

  // While dragging the pointer sets the angle, so integrating here would
  // double-count the movement.
  if (s.dragging) return;

  s.va = clamp(settle(s.va, IDLE_VA, dt), -MAX_V, MAX_V);
  s.vb = clamp(settle(s.vb, IDLE_VB, dt), -MAX_V, MAX_V);
  s.a += s.va * dt;
  s.b += s.vb * dt;

  // Keep the angles small; cos/sin are periodic so wrapping is invisible, and it
  // stops the values drifting into float ranges where precision drops.
  if (s.a > TAU || s.a < -TAU) s.a %= TAU;
  if (s.b > TAU || s.b < -TAU) s.b %= TAU;
}

export function beginDrag(s: Spin, now: number): void {
  s.dragging = true;
  s.lastMoveAt = now;
}

/**
 * Apply a pointer move. `dx`/`dy` are pixels since the previous move and `dt`
 * the seconds since then, which is what lets the release inherit a fling.
 */
export function dragTo(s: Spin, dx: number, dy: number, dt: number, now: number): void {
  // Vertical drags rotate about x, horizontal about z, matching what the cursor
  // appears to be pushing.
  const da = dy * RAD_PER_PX;
  const db = dx * RAD_PER_PX;

  s.a += da;
  s.b += db;
  s.lastMoveAt = now;

  const seconds = Math.max(dt, 1 / 240);
  const k = 1 - Math.exp(-dt / VEL_TAU);
  s.va = clamp(s.va + (da / seconds - s.va) * k, -MAX_V, MAX_V);
  s.vb = clamp(s.vb + (db / seconds - s.vb) * k, -MAX_V, MAX_V);
}

/**
 * End a drag. A gesture that barely moved is a tap and gets a nudge; a gesture
 * that ended after the pointer sat still releases without a fling.
 */
export function endDrag(s: Spin, now: number, moved: number): void {
  s.dragging = false;

  if (moved <= TAP_SLOP) {
    s.va = 0;
    s.vb = clamp(s.vb + TAP_IMPULSE, -MAX_V, MAX_V);
    return;
  }

  if (now - s.lastMoveAt > STALE_MS) {
    s.va = 0;
    s.vb = 0;
  }
}
