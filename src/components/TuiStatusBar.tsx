'use client';

import { useState } from 'react';
import { STAGE_IDS, STAGE_LABELS, scrollToSectionId, type StageId } from '@/lib/scroll';
import { useStage } from '@/lib/useStage';

export default function TuiStatusBar() {
  const stage = useStage();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = STAGE_IDS[stage] as StageId;

  const go = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    scrollToSectionId(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="tuiBar tuiBar--top" aria-label="Sections">
        <div className="tuiBar__inner">
          <span className="tuiBar__brand">
            <span className="tuiDot" aria-hidden="true" />
            <span className="tuiBar__brandText">babit@portfolio</span>
          </span>

          <span className="tuiBar__path" aria-hidden="true">
            ~/portfolio/{activeId}
          </span>

          <ul className="tuiTabs">
            {STAGE_IDS.map((id, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`tuiTab${index === stage ? ' is-active' : ''}`}
                  aria-current={index === stage ? 'true' : undefined}
                  onClick={(event) => go(event, id)}
                >
                  <span className="tuiTab__num">{index + 1}</span>
                  {STAGE_LABELS[id as StageId]}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="tuiMenuBtn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '[ x ]' : '[ = ]'}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="tuiMobileMenu">
          <div className="tuiMobileMenu__inner">
            {STAGE_IDS.map((id, index) => (
              <a
                key={id}
                href={`#${id}`}
                className={`tuiMobileMenu__link${index === stage ? ' is-active' : ''}`}
                onClick={(event) => go(event, id)}
              >
                <span className="tuiTab__num">{index + 1}</span>
                {STAGE_LABELS[id as StageId]}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
