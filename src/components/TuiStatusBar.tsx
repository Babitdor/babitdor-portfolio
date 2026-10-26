'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  STAGE_IDS,
  STAGE_LABELS,
  lockScroll,
  scrollToSectionId,
  unlockScroll,
  type StageId,
} from '@/lib/scroll';
import { useStage } from '@/lib/useStage';
import ThemeToggle from './ThemeToggle';

export default function TuiStatusBar() {
  const stage = useStage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Adjust state during render rather than in an effect: a route change must
  // close the overlay before it commits, and the effect form triggers a
  // cascading render warning.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const onHome = pathname === '/';
  const onCase = pathname.startsWith('/work/');
  const activeIndex = onCase ? 3 : onHome ? stage : -1;
  const activeId = STAGE_IDS[activeIndex] as StageId | undefined;

  const pathLabel = onCase
    ? `~/work/${pathname.split('/').pop()}`
    : onHome
      ? `~/portfolio/${activeId ?? 'home'}`
      : '~/404';

  const go = (event: React.MouseEvent, id: string) => {
    const fromMenu = menuOpen;
    setMenuOpen(false);
    if (!onHome) return;
    event.preventDefault();

    if (fromMenu) {
      // Closing the menu also releases the body scroll lock. Unlock here, before
      // handing the target to Lenis, or a stopped instance drops the request.
      unlockScroll();

      // The clicked link is about to unmount, so focus would fall back to body.
      // Move it to the destination heading; `preventScroll` leaves the travel to
      // Lenis so keyboard and pointer visitors get the same motion.
      const section = document.getElementById(id);
      const heading = section?.querySelector<HTMLElement>('h1, h2, h3') ?? section;
      if (heading) {
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }

    scrollToSectionId(id);
  };

  useEffect(() => {
    if (!menuOpen) return;

    lockScroll();
    const menu = menuRef.current;
    const links = Array.from(menu?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const first = links[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const stops: HTMLElement[] = buttonRef.current ? [buttonRef.current, ...links] : links;
      if (stops.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
      const index = current ? stops.indexOf(current) : -1;

      if (event.shiftKey) {
        if (index <= 0) {
          event.preventDefault();
          stops[stops.length - 1].focus();
        }
      } else if (index === stops.length - 1) {
        event.preventDefault();
        stops[0].focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockScroll();
    };
  }, [menuOpen]);

  useEffect(() => () => unlockScroll(), []);

  return (
    <>
      <nav className="tuiBar tuiBar--top" aria-label="Sections">
        <div className="tuiBar__inner">
          <Link className="tuiBar__brand" href="/" onClick={() => setMenuOpen(false)}>
            <span className="tuiDot" aria-hidden="true" />
            <span className="tuiBar__brandText">babit@portfolio</span>
          </Link>

          <span className="tuiBar__path" aria-hidden="true">
            {pathLabel}
          </span>

          <ul className="tuiTabs">
            {STAGE_IDS.map((id, index) => (
              <li key={id}>
                <Link
                  href={onHome ? `#${id}` : `/#${id}`}
                  className={`tuiTab${index === activeIndex ? ' is-active' : ''}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={(event) => go(event, id)}
                >
                  <span className="tuiTab__num">{index + 1}</span>
                  {STAGE_LABELS[id as StageId]}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            ref={buttonRef}
            type="button"
            className="tuiMenuBtn"
            aria-expanded={menuOpen}
            aria-controls="tui-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '[ x ]' : '[ = ]'}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="tuiMobileMenu" id="tui-mobile-menu" ref={menuRef}>
          <nav className="tuiMobileMenu__inner" aria-label="Sections, mobile">
            {STAGE_IDS.map((id, index) => (
              <Link
                key={id}
                href={onHome ? `#${id}` : `/#${id}`}
                className={`tuiMobileMenu__link${index === activeIndex ? ' is-active' : ''}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={(event) => go(event, id)}
              >
                <span className="tuiTab__num">{index + 1}</span>
                {STAGE_LABELS[id as StageId]}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
