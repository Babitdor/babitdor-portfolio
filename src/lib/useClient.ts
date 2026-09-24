'use client';

import { useSyncExternalStore } from 'react';

/**
 * Client-detection and media-query hooks built on `useSyncExternalStore`.
 *
 * These replace the "read a browser API then setState in an effect" pattern,
 * which React 19 flags as a cascading render. `useSyncExternalStore` also gives
 * a distinct server snapshot, so hydration stays consistent.
 */

const subscribeNothing = () => () => {};

/** `false` on the server and during hydration, `true` once mounted. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  // `?nomotion=1` forces the reduced-motion path for verification.
  if (new URLSearchParams(window.location.search).has('nomotion')) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
}
