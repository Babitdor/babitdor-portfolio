'use client';

import type { ReactNode } from 'react';

/** CRT scanlines, vignette and edge brackets. Purely decorative. */
export default function TuiFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="tuiOverlay" aria-hidden="true">
        <div className="tuiOverlay__scanlines" />
        <div className="tuiOverlay__vignette" />
        <span className="tuiBracket tuiBracket--tl" />
        <span className="tuiBracket tuiBracket--tr" />
        <span className="tuiBracket tuiBracket--bl" />
        <span className="tuiBracket tuiBracket--br" />
      </div>
      {children}
    </>
  );
}
