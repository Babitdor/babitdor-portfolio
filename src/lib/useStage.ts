'use client';

import { useSyncExternalStore } from 'react';
import { getServerStageSnapshot, getStageSnapshot, subscribe } from '@/lib/scroll';

/**
 * Subscribes React to the DISCRETE stage index only.
 *
 * Continuous scroll progress deliberately stays outside React (see
 * `lib/scroll.ts`) so the tree re-renders 5 times per page scroll rather than
 * 60 times per second.
 */
export function useStage(): number {
  return useSyncExternalStore(subscribe, getStageSnapshot, getServerStageSnapshot);
}
