'use client';

import type { ReactNode } from 'react';

type PaneProps = {
  /** Window title, e.g. `~/about.md` */
  title: string;
  /** Optional right-hand status text in the title bar */
  status?: string;
  /** Optional command line shown above the pane body */
  command?: string;
  children: ReactNode;
  className?: string;
  /** Semantic element to render as */
  as?: 'div' | 'section';
  id?: string;
};

/**
 * A terminal window: title bar with traffic-light dots, an optional prompt
 * line, then the body. Every section of the site is one of these.
 */
export default function TuiPane({
  title,
  status,
  command,
  children,
  className = '',
  as = 'div',
  id,
}: PaneProps) {
  const Tag = as;

  return (
    <Tag className={`tuiWindow ${className}`.trim()} id={id}>
      <div className="tuiWindow__bar">
        <span className="tuiWindow__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="tuiWindow__title">{title}</span>
        {status ? <span className="tuiWindow__status">{status}</span> : null}
      </div>

      {command ? (
        <div className="tuiWindow__cmd">
          <span className="tuiPrompt__sigil">$</span> {command}
        </div>
      ) : null}

      <div className="tuiWindow__body">{children}</div>
    </Tag>
  );
}
