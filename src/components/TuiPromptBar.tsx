'use client';

import { useEffect, useState } from 'react';
import { STAGE_COMMANDS, STAGE_IDS, type StageId } from '@/lib/scroll';
import { useStage } from '@/lib/useStage';

/**
 * The bottom prompt bar: the current stage's command, a live scroll readout and
 * the stage counter. The prompt reads as a real shell would.
 */
export default function TuiPromptBar() {
  const stage = useStage();
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

  return (
    <div className="tuiBar tuiBar--bottom">
      <div className="tuiBar__inner">
        <div className="tuiPrompt" aria-live="polite">
          <span className="tuiPrompt__path">babit@portfolio</span>
          <span className="tuiPrompt__sep">:</span>
          <span className="tuiPrompt__dir">~</span>
          <span className="tuiPrompt__sigil">$</span>
          <span className="tuiPrompt__cmd">{STAGE_COMMANDS[STAGE_IDS[stage] as StageId]}</span>
          <span className="tuiCursor" />
        </div>

        <div className="tuiPrompt__meta" aria-hidden="true">
          <span>
            stage <b>{stage + 1}</b>/{STAGE_IDS.length}
          </span>
          <span>
            scroll <b>{scrollPercent}%</b>
          </span>
        </div>
      </div>
    </div>
  );
}
