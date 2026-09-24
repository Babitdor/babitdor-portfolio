/**
 * A 5x7 dot-matrix font, and the scramble reveal that assembles text from it.
 *
 * A hand-rolled bitmap font rather than a FIGlet import: FIGlet art is
 * proportional per glyph and easy to mangle, whereas a fixed 5x7 grid lets the
 * reveal address every cell by (row, col) and lets a test assert the exact
 * banner. Only the glyphs the site actually spells are defined.
 */

/**
 * Each glyph is 7 rows of 5 bits, MSB = leftmost column.
 *
 * Both cases are defined: the name is set in title case ("Babitdor"), so the
 * banner needs a lowercase set to go with the capitals. Lowercase letters sit on
 * the baseline at row 6 with an x-height from row 2 (5 rows); ascenders (`b`,
 * `d`, `t`) start at row 0 or 1, and `i` gets its dot above a normal x-height
 * stem. Only the glyphs the site actually spells are defined.
 */
const GLYPHS: Record<string, number[]> = {
  // Capitals
  B: [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  I: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b11111],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  K: [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  G: [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01111],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  H: [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],

  // Lowercase
  a: [0b00000, 0b00000, 0b01110, 0b00001, 0b01111, 0b10001, 0b01111],
  b: [0b10000, 0b10000, 0b11110, 0b10001, 0b10001, 0b10001, 0b11110],
  d: [0b00001, 0b00001, 0b01111, 0b10001, 0b10001, 0b10001, 0b01111],
  i: [0b00100, 0b00000, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  o: [0b00000, 0b00000, 0b01110, 0b10001, 0b10001, 0b10001, 0b01110],
  r: [0b00000, 0b00000, 0b01110, 0b10001, 0b10000, 0b10000, 0b10000],
  t: [0b00000, 0b00100, 0b01110, 0b00100, 0b00100, 0b00100, 0b01110],

  ' ': [0, 0, 0, 0, 0, 0, 0],
};

export const GLYPH_W = 5;
export const GLYPH_H = 7;
const GAP = 1;
const ON = '\u2588'; // full block

/**
 * Build the settled banner for `text` as `GLYPH_H` strings.
 *
 * Case is preserved. This deliberately does NOT uppercase: the banner spells the
 * name in title case, and shouting it in caps read as a different word. Unknown
 * characters fall back to a space rather than throwing.
 */
export function buildBanner(text: string): string[] {
  const chars = [...text];
  const rows: string[] = [];

  for (let y = 0; y < GLYPH_H; y++) {
    let line = '';
    chars.forEach((ch, index) => {
      const bits = GLYPHS[ch] ?? GLYPHS[' '];
      const mask = bits[y] ?? 0;
      for (let x = 0; x < GLYPH_W; x++) {
        line += (mask >> (GLYPH_W - 1 - x)) & 1 ? ON : ' ';
      }
      if (index < chars.length - 1) line += ' '.repeat(GAP);
    });
    rows.push(line);
  }
  return rows;
}

/** Charset the reveal scrambles through. ASCII only, so widths stay uniform. */
const NOISE = '!<>-_\\/[]{}=+*^?#01';

export type RevealOptions = {
  /** Seconds after which column `c` settles. */
  colDelay: number;
  /** Extra delay per row within a column, so the wipe travels down. */
  rowDelay: number;
  /** Seconds a column spends scrambling before settling. */
  band: number;
};

/** The text the banner spells, and the reveal timing. Exported so the boot
 *  sequence can size its own schedule from the same numbers the reveal uses
 *  (they were previously duplicated, and the overlay cut the reveal off).
 *
 *  Title case, matching the name as it is written everywhere else on the site. */
export const BANNER_TEXT = 'Babitdor';
export const BANNER_REVEAL: RevealOptions = { colDelay: 0.055, rowDelay: 0.045, band: 0.28 };

/**
 * One frame of the reveal. Returns the same row count as `buildBanner`.
 *
 * Pure in `t`: the scramble characters come from a hash of (row, col, quantum)
 * rather than `Math.random()`, so two calls at the same `t` agree, the frame is
 * reproducible, and React never re-renders two different-looking frames.
 */
export function renderBanner(target: string[], t: number, opts: RevealOptions): string[] {
  const { colDelay, rowDelay, band } = opts;
  const cols = target[0]?.length ?? 0;

  const out: string[] = [];
  for (let y = 0; y < target.length; y++) {
    let line = '';
    for (let x = 0; x < cols; x++) {
      const settledAt = x * colDelay + y * rowDelay;
      const cell = target[y][x];

      if (t >= settledAt + band) {
        line += cell;
      } else if (t >= settledAt - band) {
        // Scrambling: an on-cell flickers toward its final glyph, an off-cell
        // stays blank so the letterforms read as they appear.
        if (cell === ' ') {
          line += ' ';
        } else {
          const q = Math.floor((t + x * 0.13 + y * 0.07) * 24);
          const n = Math.abs(Math.sin((x * 12.9898 + y * 78.233 + q * 41.7) * 1.3));
          line += NOISE[Math.floor(n * NOISE.length) % NOISE.length];
        }
      } else {
        line += ' ';
      }
    }
    out.push(line);
  }
  return out;
}

/** Total seconds `renderBanner` needs to finish. */
export function revealDuration(target: string[], opts: RevealOptions): number {
  const cols = target[0]?.length ?? 0;
  return (cols - 1) * opts.colDelay + (target.length - 1) * opts.rowDelay + opts.band;
}
