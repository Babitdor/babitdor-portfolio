'use client';

import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'tui-theme';
const EVENT = 'tui:theme';

/** `startViewTransition` is still missing from the DOM lib on some TS versions. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute('content', theme === 'light' ? '#f2efe4' : '#070a08');

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // A blocked storage API should not block the theme.
  }

  window.dispatchEvent(new CustomEvent<Theme>(EVENT, { detail: theme }));
}

/**
 * A crossfade for browsers without the View Transitions API. The current paper
 * colour covers the page, the new theme is applied underneath, then the veil
 * fades away. The colour is read from the page so it never drifts from the CSS.
 */
function applyWithVeil(theme: Theme) {
  if (document.querySelector('.tuiThemeVeil')) return;

  const veil = document.createElement('div');
  veil.className = 'tuiThemeVeil';
  veil.setAttribute('aria-hidden', 'true');
  veil.style.background = getComputedStyle(document.body).backgroundColor;
  document.body.appendChild(veil);

  requestAnimationFrame(() => veil.classList.add('is-on'));

  window.setTimeout(() => {
    applyTheme(theme);
    veil.classList.remove('is-on');
  }, 180);

  window.setTimeout(() => veil.remove(), 560);
}

export function toggleTheme(origin?: { x: number; y: number }): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const viewDocument = document as ViewTransitionDocument;

  if (reduced) {
    applyTheme(next);
    return next;
  }

  if (typeof viewDocument.startViewTransition === 'function') {
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    // Radius to the furthest viewport corner, so the circle always clears the page.
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);
    root.style.setProperty('--theme-r', `${Math.ceil(r)}px`);
    viewDocument.startViewTransition(() => applyTheme(next));
    return next;
  }

  applyWithVeil(next);
  return next;
}

/** React mirror of the theme set before paint by the inline head script. */
export function useTheme(): Theme {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return theme;
}
