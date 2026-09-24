import * as THREE from 'three';

/**
 * Keycap legends are drawn into small canvases at runtime.
 *
 * This avoids shipping a font file or a sprite atlas: the browser already has
 * a monospace face, and there are at most ~60 distinct labels. Textures are
 * memoised by label so repeated legends (`Shift`, `Ctrl`, `Cmd`, `Alt`) share
 * one texture instead of allocating a new one per keycap.
 */

const cache = new Map<string, THREE.CanvasTexture>();

const SIZE = 128;

/**
 * The legend texture is white and untinted; per-key colour is applied by the
 * mesh's material, so one cached texture serves all ~60 keys.
 */
export function getLegendTexture(label: string): THREE.CanvasTexture {
  const cached = cache.get(label);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    // Drawn in pure white so the mesh can tint it to any hue by multiplication.
    // A soft white halo fakes the bloom a backlit legend has, and it tints with
    // the glyph, so the glow always matches the legend colour.
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowBlur = 12;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = label.length > 1 ? label.toUpperCase() : label;

    // Shrink the type until it fits the cap face.
    let fontSize = label.length > 1 ? 34 : 62;
    const maxWidth = SIZE * 0.82;
    do {
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      if (ctx.measureText(text).width <= maxWidth) break;
      fontSize -= 3;
    } while (fontSize > 12);

    ctx.fillText(text, SIZE / 2, SIZE / 2 + 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  cache.set(label, texture);
  return texture;
}

const letterCache = new Map<string, THREE.CanvasTexture>();

/** A single large glyph used by the sprite that pops above the pressed key. */
export function getLetterTexture(letter: string): THREE.CanvasTexture {
  const cached = letterCache.get(letter);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    ctx.shadowColor = 'rgba(57, 255, 136, 0.9)';
    ctx.shadowBlur = 28;
    ctx.fillStyle = '#39ff88';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 180px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.fillText(letter, 128, 132);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  letterCache.set(letter, texture);
  return texture;
}
