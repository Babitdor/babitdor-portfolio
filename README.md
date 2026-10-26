# babit-os

The portfolio of Babitdor Kayang Khonglah, an AI engineer at Siemens and an M.Sc. AI candidate at FAU Erlangen-Nurnberg.

It is built as a production console rather than a conventional portfolio: a boot log, a live status bar, an ASCII torus, and eight long-form case files.

## What is here

- A terminal shell with section navigation, a command palette (`Ctrl/Cmd + K` or `:`), and a keyboard focus path through every control.
- Eight case studies at `/work/[slug]`, each with the problem, approach, result, execution trace, and verified facts.
- A hand-written ASCII torus in the hero. It rotates, drags with inertia, and reveals a pointer spotlight in the system accent. It becomes a still frame and stops accepting drags under reduced motion.
- A dark "night console" theme and a light "daylight terminal" theme. The choice persists in `localStorage`, applies before first paint, and switches with a circular View Transition. Browsers without that API get a short crossfade fallback.
- A boot sequence that plays once per tab on the home page and is skipped on case files, repeat visits, and reduced-motion visits.
- Per-page metadata, canonical URLs, Open Graph and Twitter cards, a generated 1200x630 image, JSON-LD, `robots.txt`, and a sitemap.
- A custom 404, a skip link, visible focus states, 24px minimum targets, and a reduced-motion path that keeps all content visible.

## Stack

- Next.js 16.1 App Router
- React 19
- TypeScript 5
- Lenis for smooth scrolling
- Font Awesome for interface icons
- Hand-written character-cell renderers for every ASCII effect. No 3D library and no animation library.

## Run it

```bash
npm install
npm run dev
```

Open the URL printed by Next.js. For a production check:

```bash
npm run build
npm start
```

### Site URL

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

The fallback in `src/lib/site.ts` is `https://babitdor.dev`. It keeps local builds valid, but it is not a claim that this domain is live.

## Content

Personal facts live in `src/content/` and nowhere else:

- `profile.ts`: identity, positioning, experience, education, certifications, skills, stats.
- `projects.ts`: the eight case files, their verified links, tags, traces, and metrics.

Every claim in those files was checked against a primary source. Add nothing that has not been verified. Case-study pages are generated from `projects.ts`; adding a project there also adds its static route, metadata, sitemap entry, and next-case link.

Older notes such as `Information.md`, `Projects.md`, and `Last_Project.md` are inputs, not sources of truth. `src/content/` wins.

## Structure

```text
src/
  app/
    layout.tsx              root metadata, theme guard, shell, skip link
    page.tsx                home: Hero, About, Skills, Projects, Contact
    globals.css             design tokens for both themes, layout, motion
    not-found.tsx           custom case-file 404
    robots.ts               robots.txt
    sitemap.ts              sitemap.xml
    work/[slug]/page.tsx    case file route, metadata, JSON-LD
  components/
    AsciiBackdrop.tsx       ambient character field
    AsciiBanner.tsx         boot name banner
    AsciiDonut.tsx          hero torus, drag, pointer spotlight
    BootSequence.tsx        once-per-tab boot log
    CommandPalette.tsx      Ctrl/Cmd+K command list
    Contact.tsx             contact channels and copy actions
    CopyToast.tsx           clipboard confirmation
    Hero.tsx                hero pane and torus figure
    Projects.tsx            case-file index
    SectionHead.tsx         section statements
    Skills.tsx              filterable skill table
    ThemeToggle.tsx         dark/light switch
    TuiFrame.tsx            scanlines, vignette, edge brackets
    TuiPane.tsx             window chrome
    TuiPromptBar.tsx        bottom prompt and scroll readout
    TuiStatusBar.tsx        top path, tabs, theme switch, mobile menu
  content/                  all personal facts
  lib/
    ascii.ts                character ramps
    banner.ts               5x7 font and scramble reveal
    donut.ts                z-buffered ASCII torus
    field.ts                ambient field renderer
    scroll.ts               section state and scroll helpers
    site.ts                 canonical URL and shared metadata copy
    theme.ts                theme persistence, View Transition, fallback
    useAsciiLoop.ts         shared rAF loop for every ASCII effect
```

## Theme system

Dark is the default identity. The inline guard in `src/app/layout.tsx` reads `tui-theme` before the first paint and applies a saved light choice to `<html data-theme="light">`.

`src/lib/theme.ts` owns the rest:

- writes the choice to `localStorage`
- updates `color-scheme` and the `theme-color` meta tag
- starts a View Transition from the switch button, with a radius computed to the furthest viewport corner
- falls back to a brief opaque veil when the browser has no View Transition support
- skips the animation under `prefers-reduced-motion`

The light palette is not an inversion. It is a warm paper surface with a darker printed green and softer shadows. Tokens live at the top of `globals.css`.

## Checks

```bash
npm run lint
npm run build
```

The build runs TypeScript. The production QA pass covers desktop, throttled mobile, reduced motion, keyboard focus, hover targets, axe-core, overflow, LCP, CLS, and console errors on the home page, a case file, and the 404.
