'use client';

import { useEffect, useRef } from 'react';
import { useAsciiLoop } from '@/lib/useAsciiLoop';
import { renderDonut } from '@/lib/donut';
import { beginDrag, createSpin, dragTo, endDrag, stepSpin } from '@/lib/donutSpin';

const SIZE = 13;

/** Live drag bookkeeping. Separate from `Spin` because it is gesture state. */
type Drag = { x: number; y: number; at: number; moved: number; active: boolean };

/**
 * The hero centrepiece: a rotating ASCII torus you can spin.
 *
 * The character cell is measured from the live font by `useAsciiLoop` and passed
 * to `renderDonut`, which squeezes y by the cell aspect so the torus stays round
 * whatever font resolves.
 *
 * Interaction is drag-to-spin with inertia. The rotation lives in `donutSpin` and
 * is stepped through the loop's `advance` hook, so a drag feeds straight into the
 * animation without triggering a re-render.
 *
 * The torus is decorative and carries no information, so it stays `aria-hidden`
 * and out of the tab order: it is a flourish you can play with if you have a
 * pointer, not a control, and adding a stop to keyboard navigation for it would
 * be noise. Under `prefers-reduced-motion` the stage is hidden and none of this
 * runs.
 */
export default function AsciiDonut() {
  const ref = useRef<HTMLPreElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef(createSpin());
  const dragRef = useRef<Drag>({ x: 0, y: 0, at: 0, moved: 0, active: false });

  useAsciiLoop(ref, {
    boxRef: stageRef,
    fps: 20,
    stillTime: 0,
    advance: (dt) => stepSpin(spinRef.current, dt),
    render: (_t, cols, rows, cell) => renderDonut(spinRef.current, cols, rows, cell),
  });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      // Primary button only, so a right-click menu is not swallowed.
      if (e.button !== 0) return;
      e.preventDefault();

      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        at: performance.now(),
        moved: 0,
        active: true,
      };
      beginDrag(spinRef.current, performance.now());

      // Capture so the drag survives the pointer leaving the stage.
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    };

    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;

      const now = performance.now();
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      d.x = e.clientX;
      d.y = e.clientY;
      d.moved += Math.hypot(dx, dy);
      const dt = Math.max((now - d.at) / 1000, 1 / 240);
      d.at = now;

      dragTo(spinRef.current, dx, dy, dt, now);
    };

    const onUp = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;
      d.active = false;

      endDrag(spinRef.current, performance.now(), d.moved);

      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.classList.remove('is-dragging');
    };

    // A cancelled gesture (a touch that turned into a scroll) must not leave the
    // torus stuck in its dragging state, where it would never auto-rotate again.
    const onCancel = onUp;

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel);
    };
  }, []);

  return (
    <div ref={stageRef} className="asciiDonut" aria-hidden="true">
      <pre ref={ref} style={{ fontSize: SIZE, lineHeight: '14px' }} />
    </div>
  );
}
