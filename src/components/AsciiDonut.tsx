'use client';

import { useRef } from 'react';
import { useAsciiLoop } from '@/lib/useAsciiLoop';
import { renderDonut } from '@/lib/donut';

const SIZE = 13;

/**
 * The hero centrepiece: a rotating ASCII torus.
 *
 * The character cell is measured from the live font by `useAsciiLoop` and
 * passed to `renderDonut`, which squeezes y by the cell aspect so the torus
 * stays round regardless of which font actually resolves.
 */
export default function AsciiDonut() {
  const ref = useRef<HTMLPreElement>(null);

  useAsciiLoop(ref, {
    fps: 20,
    stillTime: 0,
    render: (t, cols, rows, cell) => renderDonut(t, cols, rows, cell),
  });

  return (
    <div className="asciiDonut" aria-hidden="true">
      <pre ref={ref} style={{ fontSize: SIZE, lineHeight: '14px' }} />
    </div>
  );
}
