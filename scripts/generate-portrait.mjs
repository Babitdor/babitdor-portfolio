/**
 * Generate the ASCII portrait used in the About section.
 *
 * Run: node scripts/generate-portrait.mjs
 *
 * WHY THIS IS A CHECKED-IN SCRIPT AND NOT A RUNTIME EFFECT
 * The output is a committed module, not something rendered on load. That keeps
 * the art reproducible (re-running gives the same file) and keeps the parameters
 * on the record instead of leaving an unexplained blob of characters. Decoding a
 * JPEG and running CLAHE in the browser would also cost far more than the art
 * does: the portrait is ~16 KB of text, which gzips to much less than a decode
 * plus a few hundred milliseconds of main-thread work.
 *
 * THE PROCESSING, AND WHY EACH STEP IS NEEDED
 * The source photo is softly and frontally lit, which is the hard case for ASCII:
 *
 *   1. The face occupies a narrow tonal band (about 110-170 of 255) while the
 *      wall behind it sits near 197. A global linear ramp spends most of its
 *      levels on tones that barely occur, and renders the face as one flat
 *      mid-tone blob.
 *   2. CLAHE (contrast-limited adaptive histogram equalisation) equalises over
 *      small tiles rather than globally, so each region gets the full range. That
 *      is what separates the eyes, nostrils and mouth from the surrounding skin.
 *      The clip limit is what stops it amplifying JPEG noise into speckle.
 *   3. Cells brighter than a percentile of the ORIGINAL (pre-CLAHE) luminance are
 *      forced blank. Without this the flat wall is equalised into a mush of
 *      mid-tones and the silhouette is lost.
 *   4. Tone below `BLANK_ABOVE` is mapped through a short glyph ramp; everything
 *      above is left blank. This is the step that decides the look. With the ramp
 *      spanning the full tonal range about 88% of cells are drawn and the portrait
 *      reads as a slab of dashes; leaving roughly half the cells blank is what lets
 *      the features and the shirt stripes separate.
 *
 * Crop and grid are measured, not guessed. The source is 1540x1653 and the head
 * spans x 664-1144, y 72-400, so a 700px square crop centred on the head holds
 * head, neck and shoulders with the head filling 69% of the frame. The grid comes
 * out square: a character cell is about 0.6 as wide as the line box is tall
 * (0.6em advance at line-height 1.073), so for a square crop and no distortion the
 * grid needs cols * 0.6 / rows = 1, i.e. rows = cols * 0.6.
 *
 * The pixel work is delegated to a PowerShell script, because .NET's
 * System.Drawing is the one image decoder guaranteed present on this Windows host
 * and it does the crop and box filter in native code. A pure-JS decoder would mean
 * adding a dependency for a script that runs once per photo change.
 *
 * NOTE: `Me.jpg` is deliberately gitignored. The site shows the ASCII art, not the
 * photograph, so the photo is not published; only this script's output is
 * committed. That means this script needs the photo present locally to run, but the
 * app and the build do not need it at all.
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

export const SOURCE = join(root, 'Me.jpg');
export const OUTPUT = join(root, 'src', 'content', 'portrait.ts');
export const EXTRACTOR = join(root, 'scripts', 'portrait-extract.ps1');

/** Crop of the source photo, in pixels. Head spans x 664-1144; at 700px wide the
 *  head is 69% of the frame, which fills the column without cropping the hair. */
export const CROP = { x: 554, y: 0, size: 700 };

/**
 * Output grid, in character cells.
 *
 * Chosen by rendering several sizes at the real display width and comparing:
 * at 96 columns the features read clearly, while 128 and above merge into a grey
 * mass. `rows` is derived rather than picked, so the cell grid is exactly square
 * (see the aspect note below) and the square crop is not distorted.
 */
export const GRID = { cols: 96, rows: 54 };

/** Original-luminance percentile at or above which a cell is background. */
export const WALL_PERCENTILE = 0.88;

/** CLAHE tile grid and clip limit. */
export const TILES = { y: 6, x: 7 };
export const CLIP = 3.0;

/**
 * The glyph mapping is expressed as the point at which a cell goes blank,
 * `BLANK_ABOVE`, with a 4-step ramp compressed below it.
 *
 * That single number is what decides the look, and it matters more than the ramp
 * itself. CLAHE spreads tones across the full range, so with the mapping spanning
 * everything, ~88% of cells are drawn and the portrait reads as a slab of dashes
 * (measured: 12% blank). Cutting the mapping off at 0.24 leaves ~51% of cells
 * blank, which is what lets the hair, brows, eyes, nose, mouth, beard and the
 * shirt stripes all separate. Verified by rendering the threshold at 0.20, 0.24,
 * 0.28 and 0.32 at the real display width; 0.24 was clearly the cleanest.
 *
 * `BANDS` fractions are relative to `BLANK_ABOVE`, so the ramp keeps its shape if
 * the cut-off is retuned.
 */
export const BLANK_ABOVE = 0.24;

/** Ramp glyphs, darkest first, spread over the range below `BLANK_ABOVE`. */
export const RAMP = ['@', '%', '*', ':'];

/** Map normalised tone (0-1) to the character that represents it. */
export function glyphFor(tone) {
  if (tone >= BLANK_ABOVE) return ' ';
  const step = BLANK_ABOVE / RAMP.length;
  return RAMP[Math.min(RAMP.length - 1, Math.floor(tone / step))];
}

/** Render a grid of 0-255 tones into rows of characters. */
export function render(tones) {
  return tones.map((row) => Array.from(row, (v) => glyphFor(v / 255)).join(''));
}

function extract() {
  const out = execFileSync(
    'powershell',
    [
      '-NoProfile',
      '-ExecutionPolicy', 'Bypass',
      '-File', EXTRACTOR,
      '-Path', SOURCE,
      '-Cols', String(GRID.cols),
      '-Rows', String(GRID.rows),
      '-CropX', String(CROP.x),
      '-CropY', String(CROP.y),
      '-CropSize', String(CROP.size),
      '-WallPct', String(WALL_PERCENTILE * 100),
      '-TilesY', String(TILES.y),
      '-TilesX', String(TILES.x),
      '-Clip', String(CLIP),
    ],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(out);
}

function main() {
  const art = render(extract());
  const body = art.join('\n');
  const blankPct = ((art.join('').split(' ').length - 1) / (GRID.cols * GRID.rows)) * 100;

  const content = `/**
 * ASCII portrait. GENERATED - do not edit by hand.
 *
 * Regenerate with:  node scripts/generate-portrait.mjs
 * Source photo:     Me.jpg
 * Crop:             ${CROP.size}x${CROP.size} at (${CROP.x}, ${CROP.y})
 * Grid:             ${GRID.cols}x${GRID.rows} characters
 * Processing:       CLAHE (tiles ${TILES.y}x${TILES.x}, clip ${CLIP}), background blanked
 *                   above the p${Math.round(WALL_PERCENTILE * 100)} original-luminance threshold,
 *                   then a ${RAMP.length}-step glyph ramp below tone ${BLANK_ABOVE}.
 *
 * scripts/generate-portrait.mjs explains why each step is needed. The short
 * version: the photo is softly lit, so the face occupies a narrow tonal band and
 * a global ramp renders it flat. CLAHE opens that band up, the background is
 * blanked from the original tone so the flat wall stays clean, and cutting the
 * ramp off at ${BLANK_ABOVE} leaves about half the cells blank, which is what lets
 * the features separate instead of the silhouette reading as a slab of dashes.
 *
 * A character cell is about 0.6 as wide as the line box is tall, so this grid is
 * square. Render it in a monospace face with a \`line-height\` of about 1.073
 * (\`font-size * 0.6\` advance against a \`1.073 * font-size\` line box) or the
 * portrait will be stretched.
 */

export const PORTRAIT_COLS = ${GRID.cols};
export const PORTRAIT_ROWS = ${GRID.rows};

export const portraitArt = \`${body
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')}\`;
`;

  writeFileSync(OUTPUT, content, 'utf8');
  process.stdout.write(
    `portrait ${GRID.cols}x${GRID.rows}: ${blankPct.toFixed(0)}% blank cells\nwrote ${OUTPUT}\n`,
  );
}

if (process.argv[1]?.endsWith('generate-portrait.mjs')) main();
