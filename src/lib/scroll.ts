'use client';

import type Lenis from 'lenis';

/**
 * Scroll state is kept OUTSIDE React on purpose.
 *
 * `scrollState` is mutated every frame (by the Lenis scroll handler) and read
 * every frame (by three.js `useFrame`). Routing that through React state would
 * re-render the whole tree 60x/second. React only subscribes to the *discrete*
 * stage index, which changes 5 times per full page scroll.
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
  projects: 'ls projects/',
  contact: 'ssh babit@portfolio',
};

/**
 * The word the keyboard spells: one key per stage.
 * `Babit` -> home=B, about=a, skills=b, projects=i, contact=t
 */
export const PRESS_WORD = 'Babit';

export type ScrollState = {
  /** Global scroll progress, 0..1 */
  progress: number;
  /** Index of the section occupying the viewport centre */
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

/** Measure section geometry from the DOM so keypresses line up with sections. */
export function measureStages(): void {
  if (typeof window === 'undefined') return;

  const measured: Rect[] = [];
  for (const id of STAGE_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    measured.push({ top: rect.top + window.scrollY, height: rect.height });
  }

  // Fall back to an even split if the sections are not mounted yet.
  if (measured.length !== STAGE_COUNT) {
    const doc = document.documentElement;
    const total = Math.max(1, doc.scrollHeight);
    const slice = total / STAGE_COUNT;
    stageRects = STAGE_IDS.map((_, i) => ({ top: i * slice, height: slice }));
    return;
  }

  stageRects = measured;
}

function notify() {
  for (const listener of listeners) listener();
}

/** Called from the Lenis scroll handler and from the reduced-motion fallback. */
export function updateFromScroll(scrollY: number): void {
  if (typeof window === 'undefined') return;

  if (stageRects.length !== STAGE_COUNT) measureStages();

  const viewportHeight = window.innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
  scrollState.progress = clamp(scrollY / maxScroll, 0, 1);

  const centre = scrollY + viewportHeight / 2;

  // Last section whose top edge is above the viewport centre.
  let index = 0;
  for (let i = 0; i < stageRects.length; i++) {
    if (centre >= stageRects[i].top) index = i;
  }

  const rect = stageRects[index];
  const withinStage = rect ? clamp((centre - rect.top) / Math.max(1, rect.height), 0, 1) : 0;

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
  const target = rect ? rect.top + rect.height / 2 - window.innerHeight / 2 : 0;

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
