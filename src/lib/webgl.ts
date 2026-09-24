'use client';

/** WebGL capability probe, plus a `?nogl=1` override used for verification. */

let cached: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached;

  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('nogl')) {
      cached = false;
      return cached;
    }
    if (params.has('gl')) {
      cached = true;
      return cached;
    }
  } catch {
    /* fall through to capability detection */
  }

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');
    cached = Boolean(context);
  } catch {
    cached = false;
  }

  return cached;
}
