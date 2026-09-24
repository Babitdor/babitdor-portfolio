'use client';

import { useSyncExternalStore } from 'react';

/** Tiny module-level store so any component can raise a toast without context plumbing. */

type Toast = { id: number; message: string };

let current: Toast | null = null;
let nextId = 1;
const listeners = new Set<() => void>();

const notify = () => {
  for (const listener of listeners) listener();
};

export function showToast(message: string): void {
  current = { id: nextId++, message };
  notify();
  window.setTimeout(() => {
    if (current && current.id === nextId - 1) {
      current = null;
      notify();
    }
  }, 2000);
}

export function copyToClipboard(value: string, label = 'copied'): void {
  const write = navigator.clipboard?.writeText(value);
  if (write && typeof write.then === 'function') {
    write.then(() => showToast(`${label}: ${value}`)).catch(() => showToast('copy failed'));
  } else {
    showToast(`${label}: ${value}`);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => null;

export function useToast(): Toast | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
