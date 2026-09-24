/**
 * Shared vocabulary for the ASCII renderers.
 *
 * A ramp is an ordered string of increasingly dense glyphs. Mapping a 0..1
 * value through a ramp is the one operation every effect here shares, so the
 * ramps and the index helper live in a single place.
 */

/** donut.c's luminance ramp: dim -> bright. */
export const RAMP_DONUT = '.,-~:;=!*#$@';

/** Generic density ramp for smooth scalar fields. */
export const RAMP_PLAIN = ' .:-=+*#%@';

/** Block ramp, for meters and coarse fields. */
export const RAMP_BLOCKS = ' ░▒▓█';

/**
 * Index form of {@link rampChar}. Equivalent, but skips the string
 * indirection, which matters inside a per-cell loop.
 */
export function rampIndex(v: number, len: number): number {
  if (v <= 0) return 0;
  if (v >= 1) return len - 1;
  return Math.round(v * (len - 1));
}

/** Map `v` in 0..1 onto `ramp`, clamped at both ends. */
export function rampChar(ramp: string, v: number): string {
  return ramp[rampIndex(v, ramp.length)];
}

/** A renderer produces one whole frame: `rows` strings of `cols` characters. */
export type AsciiRenderer = (t: number) => string[];
