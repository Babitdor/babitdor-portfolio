'use client';

import { useEffect, useRef, useState } from 'react';
import { STAGE_IDS, STAGE_LABELS, scrollToSectionId, scrollToStage, type StageId } from '@/lib/scroll';

type Entry = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

const EXTERNAL: { label: string; hint: string; href: string }[] = [
  { label: 'github', hint: 'github.com/Babitdor', href: 'https://github.com/Babitdor' },
  {
    label: 'linkedin',
    hint: 'linkedin.com/in/babitdor',
    href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
  },
  { label: 'email', hint: 'babitdorbryan14@gmail.com', href: 'mailto:babitdorbryan14@gmail.com' },
];

/**
 * `Ctrl/Cmd + K` (or `:`) opens a TUI command list for jumping between
 * sections and opening the external links.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isPaletteKey = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

      if (isPaletteKey || (!open && event.key === ':')) {
        const target = event.target as HTMLElement | null;
        const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
        if (isPaletteKey || !typing) {
          event.preventDefault();
          setOpen((wasOpen) => !wasOpen);
          setQuery('');
          setCursor(0);
        }
        return;
      }

      if (open && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const entries: Entry[] = [
    ...STAGE_IDS.map((id, index) => ({
      id,
      label: `goto ${STAGE_LABELS[id as StageId].toLowerCase()}`,
      hint: `section ${index + 1}`,
      run: () => scrollToSectionId(id),
    })),
    ...EXTERNAL.map((item) => ({
      id: item.label,
      label: `open ${item.label}`,
      hint: item.hint,
      run: () => window.open(item.href, '_blank', 'noopener,noreferrer'),
    })),
    {
      id: 'top',
      label: 'goto top',
      hint: 'scroll to 0',
      run: () => scrollToStage(0),
    },
  ];

  const filtered = query
    ? entries.filter((entry) =>
        `${entry.label} ${entry.hint}`.toLowerCase().includes(query.toLowerCase()),
      )
    : entries;

  if (!open) return null;

  const choose = (entry: Entry) => {
    entry.run();
    setOpen(false);
  };

  return (
    <div className="tuiPalette" role="dialog" aria-label="Command palette" aria-modal="true">
      <div
        className="tuiPalette__scrim"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="tuiWindow tuiPalette__window">
        <div className="tuiWindow__bar">
          <span className="tuiWindow__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="tuiWindow__title">command palette</span>
          <span className="tuiWindow__status">esc</span>
        </div>

        <div className="tuiPalette__input">
          <span className="tuiPrompt__sigil">:</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCursor((c) => Math.min(filtered.length - 1, c + 1));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (event.key === 'Enter') {
                event.preventDefault();
                const entry = filtered[cursor];
                if (entry) choose(entry);
              }
            }}
            placeholder="type a command"
            aria-label="Command"
          />
        </div>

        <ul className="tuiPalette__list">
          {filtered.length === 0 ? (
            <li className="tuiPalette__empty">no matching command</li>
          ) : (
            filtered.map((entry, index) => (
              <li key={entry.id}>
                <button
                  type="button"
                  className={`tuiPalette__item${index === cursor ? ' is-active' : ''}`}
                  onMouseEnter={() => setCursor(index)}
                  onClick={() => choose(entry)}
                >
                  <span className="tuiPalette__itemLabel">{entry.label}</span>
                  <span className="tuiPalette__itemHint">{entry.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
