'use client';

import { toggleTheme, useTheme } from '@/lib/theme';

/**
 * Dark is the house style, light is the paper print. The icon and the label
 * cross-rotate through CSS, so the switch keeps moving even before React has
 * caught up with the theme that the inline script applied.
 */
export default function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="tuiTheme"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={`${theme} theme, switch to ${next}`}
      title={`Switch to ${next} theme`}
    >
      <span className="tuiTheme__icons" aria-hidden="true">
        <svg className="tuiTheme__moon" viewBox="0 0 16 16">
          <path d="M13.2 9.6A5.5 5.5 0 0 1 6.4 2.8 5.5 5.5 0 1 0 13.2 9.6Z" />
        </svg>
        <svg className="tuiTheme__sun" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="3.1" />
          <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1" />
        </svg>
      </span>
      <span className="tuiTheme__label">
        <span className="tuiTheme__labelDark">dark</span>
        <span className="tuiTheme__labelLight">light</span>
      </span>
    </button>
  );
}
