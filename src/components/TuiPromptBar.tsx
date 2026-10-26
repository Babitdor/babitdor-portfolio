'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { STAGE_COMMANDS, STAGE_IDS, type StageId } from '@/lib/scroll';
import { useStage } from '@/lib/useStage';

/**
 * The bottom prompt bar: the current command, a live scroll readout, and the
 * stage counter. On a case file it shows the file being read instead of a
 * section command, because that is the page the visitor is actually on.
 */
export default function TuiPromptBar() {
  const stage = useStage();
  const pathname = usePathname();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollPercent(Math.round((window.scrollY / max) * 100));
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const onCase = pathname.startsWith('/work/');
  const command = onCase
    ? `cat ~/work/${pathname.split('/').pop()}`
    : STAGE_COMMANDS[STAGE_IDS[stage] as StageId];
  const context = onCase ? 'case file' : `stage ${stage + 1}/${STAGE_IDS.length}`;

  return (
    <footer className="tuiBar tuiBar--bottom">
      <div className="tuiBar__inner">
        <div className="tuiPrompt">
          <span className="tuiPrompt__path">babit@portfolio</span>
          <span className="tuiPrompt__sep">:</span>
          <span className="tuiPrompt__dir">~</span>
          <span className="tuiPrompt__sigil">$</span>
          <span className="tuiPrompt__cmd">{command}</span>
          <span className="tuiCursor" aria-hidden="true" />
        </div>

        <div className="tuiPrompt__meta" aria-hidden="true">
          <span>{context}</span>
          <span>
            scroll <b>{scrollPercent}%</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
