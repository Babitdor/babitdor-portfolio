# NAMI.md

Guidance for AI assistants working in this repository.

## Project overview

A terminal-styled portfolio for Babitdor Kayang Khonglah, an AI engineer. The site presents as a TUI: a top status bar, window panes, a bottom prompt bar, a boot sequence, and hand-written ASCII effects.

There is no 3D scene and no animation library. The visual system is React plus CSS, with character-cell renderers for the torus, ambient field, and boot banner.

## Stack

- Next.js 16.1 App Router
- React 19.2
- TypeScript 5
- Lenis 1.3 for smooth scrolling
- Font Awesome 7 for interface icons
- Hand-written ASCII renderers in `src/lib/`
- No Three.js, no Framer Motion

## Source of truth

All personal facts live in `src/content/`.

- `profile.ts`: name, role, positioning, experience, education, certifications, skills, stats, contact links.
- `projects.ts`: eight projects, public repo links, tags, case-study copy, execution traces, metrics.

Every fact was verified against a primary source (GitHub API, certificate pages, Hugging Face, Ollama, ORCID). Do not invent credentials, metrics, awards, or project claims. If a new claim cannot be verified, leave it out.

Older root notes (`Information.md`, `Projects.md`, `Last_Project.md`) are raw inputs and have drifted. `src/content/` wins.

## Project structure

```text
src/
  app/
    layout.tsx              root metadata, inline theme guard, boot guard, shell
    page.tsx                home composition
    globals.css             both palettes, layout, motion, responsive rules
    not-found.tsx           custom 404
    robots.ts / sitemap.ts  metadata routes
    work/[slug]/page.tsx    static case file route, metadata, JSON-LD
  components/
    About.tsx               about.md, portrait, experience, education, certs
    AsciiBackdrop.tsx       ambient field behind the panes
    AsciiBanner.tsx         boot name banner
    AsciiDonut.tsx          hero torus, drag inertia, pointer spotlight
    BootSequence.tsx        once-per-tab boot log
    CommandPalette.tsx      Ctrl/Cmd+K or : command list
    Contact.tsx             contact channels, click to copy
    CopyToast.tsx           clipboard feedback
    Hero.tsx                hero pane and torus figure
    Projects.tsx            case-file index
    SectionHead.tsx         section statements and numbering
    Skills.tsx              filterable skill table and published models
    ThemeToggle.tsx         dark/light switch in the top bar
    TuiFrame.tsx            scanlines, vignette, edge brackets
    TuiPane.tsx             window chrome
    TuiPromptBar.tsx        bottom footer: prompt and scroll readout
    TuiStatusBar.tsx        top nav: path, section tabs, theme, mobile menu
  content/
    profile.ts
    projects.ts
  lib/
    ascii.ts                character ramps and ramp helper
    banner.ts               5x7 bitmap font and scramble reveal
    donut.ts                z-buffered donut.c port
    field.ts                ambient field renderer
    scroll.ts               shared section state and scroll helpers
    site.ts                 canonical URL and shared metadata copy
    theme.ts                storage, View Transition, fallback, useTheme
    useAsciiLoop.ts         shared rAF loop, visibility and reduced motion
    SmoothScrollProvider.tsx
    toast.ts
    useClient.ts
    useStage.ts
```

## Routing

- `/` is composed in `src/app/page.tsx`.
- `/work/[slug]` is statically generated for every project in `projects.ts`.
- `not-found.tsx` is the 404.
- `sitemap.ts` and `robots.ts` read from `projects.ts` and `site.ts`.
- The OG image is `public/og.png`, 1200x630. Regenerate it from the live hero after major visual changes.

## Theme system

Dark is the default. Light is a warm paper "daylight terminal" palette, not an inversion.

- `src/app/layout.tsx` contains a blocking inline script that applies a saved `tui-theme` value before paint.
- `src/lib/theme.ts` owns `getTheme`, `toggleTheme`, and `useTheme`.
- `ThemeToggle.tsx` calls `toggleTheme` with the button centre, so keyboard activation also reveals from the button.
- Theme changes use `document.startViewTransition` where available. The radius is computed to the furthest viewport corner. Browsers without it get a short opaque veil fallback.
- Reduced motion skips the reveal and changes the theme immediately.
- Tokens for both palettes are at the top of `src/app/globals.css`. Use the variables; do not add palette hex values to component CSS.
- Accent-alpha work should use `rgba(var(--accent-rgb), a)` so both themes follow.
- `color-scheme` and the `theme-color` meta tag are updated with the theme.

Do not respect the OS preference on first visit. The dark console is the identity; light is an explicit choice.

## ASCII effects

- One `<pre>` per effect, one `textContent` write per frame. Never a DOM node per cell.
- `useAsciiLoop` throttles with a time accumulator, pauses off-screen or on a hidden tab, and paints one still frame under `prefers-reduced-motion`.
- Renderers are pure functions of time. No `Math.random`.
- Each ASCII `<pre>` sets `font-family: var(--mono)` explicitly: the UA monospace rule outranks inheritance.
- Character cell size is measured at runtime. Do not hardcode a cell width.
- The torus spotlight is a radial gradient clipped to the glyphs. It is scoped to `@media (hover: hover) and (pointer: fine)` because clipped text repaints are expensive on touch. Keep it that way.
- Under reduced motion the torus stage stays visible but does not accept pointer events.

## Boot sequence

- Home only. Skipped on case files, repeat visits (`sessionStorage.tui-booted`), and reduced motion.
- Total run is under 2.4 seconds.
- The server-rendered boot guard in `layout.tsx` is hidden, never removed. Removing a React-owned node desyncs the tree and causes it to return on a later render.
- The guard script and the boot component must agree on timing. The guard backstop is 2600ms.
- A `<noscript>` rule hides the guard and the client-only controls. Without JavaScript the page is readable, with native anchors for navigation.

## Accessibility rules

- One `<h1>` per page.
- The skip link must remain the first focusable element.
- Every control needs a visible focus state and an accessible name.
- Icon-only controls need `aria-label`. The theme button label must include its visible text so axe's label-in-name check passes.
- Do not hide content under reduced motion. Keep a static frame instead.
- Keep interactive targets at least 24x24 CSS pixels; the house pattern is 36 or 44.
- The bottom prompt bar is a `<footer>` landmark. The top bar is a `<nav>`.
- Check both themes with axe. Contrast failures often only appear in the light palette.

## Navigation rules

- Desktop section tabs and the mobile menu share `go()` in `TuiStatusBar.tsx`.
- The mobile menu locks body and Lenis scroll. Unlock before handing a target to Lenis, or the stopped instance drops the request.
- When the menu closes after selection, focus moves to the destination heading with `preventScroll`; the smooth scroll supplies the motion.
- The mobile menu is a scroll container. Keep the inner panel centered with `margin: auto` and the outer menu `overflow-y: auto` so short landscape viewports can reach every link.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start

npx tsc --noEmit
```

Do not run `npm run build` while the dev server is running. Both write `.next`.

On this Windows machine, invoke npm through `C:/nvm4w/nodejs/npm.cmd`; a shell shim may intercept plain `npm`.

## Common workflows

### Add a case file

1. Add a `Project` to `src/content/projects.ts`.
2. Fill all required fields: slug, title, shortTitle, blurb, detail, tags, and the caseStudy problem, approach, result, trace, and metrics.
3. Add `link` only if the repo exists. Omit it otherwise.
4. Rebuild. The route, metadata, sitemap entry, and next-case link are generated automatically.

### Change the palettes

1. Edit the dark tokens in `:root` and the light overrides in `:root[data-theme="light"]` in `src/app/globals.css`.
2. Keep `--accent-rgb` in sync with `--accent` for every alpha accent.
3. Recheck contrast in both themes.

### Change the hero art

The torus renderer is `src/lib/donut.ts`; the interaction is in `AsciiDonut.tsx`; the visual frame is in `Hero.tsx`. Keep the renderer pure and the drag state outside React.

### Add a section

1. Add the stage id and label to `src/lib/scroll.ts`.
2. Add the section component and render it in `src/app/page.tsx`.
3. Add its command to `STAGE_COMMANDS` if the prompt bar should show it.
4. Verify the stage counter, top tabs, mobile menu, and command palette all still agree.
