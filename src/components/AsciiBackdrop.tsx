'use client';

import { useRef } from 'react';
import { useAsciiLoop } from '@/lib/useAsciiLoop';
import { renderField } from '@/lib/field';

const SIZE = 12;

/**
 * Ambient character field behind every pane. The cell is measured from the live
 * font by `useAsciiLoop`, so the grid matches what the browser lays out.
 */
export default function AsciiBackdrop() {
  const ref = useRef<HTMLPreElement>(null);

  useAsciiLoop(ref, {
    fps: 12,
    stillTime: 4,
    render: (t, cols, rows) => renderField(t, cols, rows),
  });

  return (
    <div className="asciiBackdrop" aria-hidden="true">
      <pre ref={ref} style={{ fontSize: SIZE, lineHeight: '13px' }} />
    </div>
  );
}
