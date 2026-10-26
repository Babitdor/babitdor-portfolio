'use client';

import type Lenis from 'lenis';

/**
 * Scroll state is kept OUTSIDE React on purpose.
 *
 * `scrollState` is mutated every frame by the Lenis scroll handler. Routing that
 * through React state would re-render the whole tree 60x/second. React only
 * subscribes to the *discrete* stage index, which changes 5 times per full page
 * scroll.
 */

export const STAGE_IDS = ['home', 'about', 'skills', 'projects', 'contact'] as const;
export type StageId = (typeof STAGE_IDS)[number];
export const STAGE_COUNT = STAGE_IDS.length;

export const STAGE_LABELS: Record<StageId, string> = {
  home: 'HOME',
  about: 'ABOUT',
  skills: 'SKILLS',
  projects: 'PROJECTS',
  contact: 'CONTACT',
};

/** The command echoed in the prompt bar for each stage. */
export const STAGE_COMMANDS: Record<StageId, string> = {
  home: 'whoami',
  about: 'cat about.md',
  skills: 'ls -la stack/',
  projects: 'ls work/',
  contact: 'ssh babit@portfolio',
};

export type ScrollState = {
  /** Global scroll progress, 0..1 */
  progress: number;
  /** Index of the section occupying the reading line */
  stage: number;
  /** Progress within the current section, 0..1 */
  stageT: number;
};

export const scrollState: ScrollState = { progress: 0, stage: 0, stageT: 0 };

/** Set by SmoothScrollProvider so non-React code can drive navigation. */
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

type Rect = { top: number; height: number };

let stageRects: Rect[] = [];
const listeners = new Set<() => void>();

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/** Height of the fixed top bar, read from the design tokens. */
function topOffset(): number {
  if (typeof window === 'undefined') return 0;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--bar-top-h');
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 46;
}

/**
 * Measure section geometry from the DOM so navigation and the active tab line
 * up with sections. Sections no longer have to be a viewport tall: this is the
 * reason the page can use a content rhythm instead of five empty screens.
 */
export function measureStages(): boolean {
  if (typeof window === 'undefined') return false;

  const measured: Rect[] = [];
  for (const id of STAGE_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    measured.push({ top: rect.top + window.scrollY, height: rect.height });
  }

  if (measured.length !== STAGE_COUNT) {
    stageRects = [];
    return false;
  }

  stageRects = measured;
  return true;
}

function notify() {
  for (const listener of listeners) listener();
}

/** Called from the Lenis scroll handler and from the reduced-motion fallback. */
export function updateFromScroll(scrollY: number): void {
  if (typeof window === 'undefined') return;

  const viewportHeight = window.innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
  scrollState.progress = clamp(scrollY / maxScroll, 0, 1);

  // Inner pages (a case file, the 404) have no stage sections. Keep the global
  // progress honest, but do not invent stages that are not in the DOM.
  if (stageRects.length !== STAGE_COUNT && !measureStages()) {
    scrollState.stageT = 0;
    if (scrollState.stage !== 0) {
      scrollState.stage = 0;
      notify();
    }
    return;
  }

  // The reading line sits just below the fixed bar, so the active section
  // changes when its top edge arrives there, not when its centre crosses the
  // middle of the viewport.
  const probe = scrollY + topOffset() + 8;

  let index = 0;
  for (let i = 0; i < stageRects.length; i++) {
    if (probe >= stageRects[i].top) index = i;
  }

  const rect = stageRects[index];
  const withinStage = rect ? clamp((probe - rect.top) / Math.max(1, rect.height), 0, 1) : 0;

  scrollState.stageT = withinStage;

  if (index !== scrollState.stage) {
    scrollState.stage = index;
    notify();
  }
}

/* ---------- React bindings ---------- */

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getStageSnapshot(): number {
  return scrollState.stage;
}

export function getServerStageSnapshot(): number {
  return 0;
}

/* ---------- Navigation ---------- */

export function scrollToStage(index: number): void {
  const clamped = clamp(index, 0, STAGE_COUNT - 1);
  const rect = stageRects[clamped];
  if (!rect) return;

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = clamp(rect.top - topOffset(), 0, maxScroll);

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.1 });
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}

export function scrollToSectionId(id: string): void {
  const index = (STAGE_IDS as readonly string[]).indexOf(id);
  if (index >= 0) scrollToStage(index);
}

/* ---------- Overlay scroll lock ---------- */

/**
 * Used by the mobile menu. Lenis owns the scroll, so toggling `overflow: hidden`
 * alone can be undone by the next wheel tick. Stop the instance as well; the
 * class is the fallback for reduced motion and for direct visits before Lenis
 * has mounted.
 */
export function lockScroll(): void {
  lenisInstance?.stop();
  document.documentElement.classList.add('tuiMenuOpen');
}

export function unlockScroll(): void {
  lenisInstance?.start();
  document.documentElement.classList.remove('tuiMenuOpen');
}
