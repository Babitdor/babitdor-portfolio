# babit-os: design direction

## Brief

Babitdor Kayang Khonglah is an AI engineer at Siemens Digital Industries Software and an
M.Sc. AI candidate at FAU Erlangen-Nürnberg. The site has to get him shortlisted for
research collaborations and hard agent problems, not just collect admiration. The audience
is technical: hiring managers, research groups, and engineers who can spot a demo that
would collapse under load. The site's job is to make the depth checkable in under a minute,
then give the visitor a project record worth reading.

Assumptions:

- The public URL is `https://babitdor.dev` until `NEXT_PUBLIC_SITE_URL` is set.
- Project facts are the verified ones already in `src/content/`. Nothing has been invented.
- A phone number is public because it is already on the site. Email remains the primary route.

## Concept

Idea: the portfolio is a running production log for an AI engineer, not a highlight reel.
Every claim is a command, every project is a case file, and the system shows what happens
after the demo.

Metaphor: a terminal session inside an observability console.

Signature: the boot trace resolves into the name banner, then the overlay lifts to reveal
the hero; the ASCII torus keeps spinning while the rest of the site stays quiet.

Emotion: calm confidence. The visitor should feel they are looking at a working system,
not a themed template.

Motion verb: resolve. Elements arrive like output, settle, and stop. Nothing bounces.

Screenshot: the hero pane with the oversized name, the live torus, and the prompt bar.

## Art direction

Palette: two complete surfaces, not an inversion.

Night console (default):

- `--bg #070a08`: ground
- `--bg-panel #0a0f0c`: panes
- `--bg-panel-2 #0d1410`: title bars and wells
- `--fg #e3eee6`: body ink
- `--fg-dim #a3b5a8`: secondary
- `--fg-faint #85998c`: metadata
- `--accent #8dffb2`: phosphor accent
- `--accent-2 #8ad7ff`: system cyan
- `--warn #ffd166`: attention
- `--error #ff7a85`: failure

Daylight terminal (opt-in, saved):

- `--bg #f2efe4`: warm paper
- `--bg-panel #fbf8ef`: printed panes
- `--bg-panel-2 #f3efe3`: title bars and wells
- `--fg #14241b`: ink
- `--fg-dim #43564a`: secondary
- `--fg-faint #54685a`: metadata
- `--accent #0a6b3d`: printed green
- `--accent-2 #0c637a`: system teal
- `--warn #8a5d00`: attention
- `--error #b3261e`: failure

The light surface is not a mechanical inversion: shadows soften, scanlines lighten, the
accent darkens enough for small text, and the torus reads as green ink on paper. The theme
choice is made in the top bar, persists in `localStorage`, and is applied before first paint.
The switch is a circular View Transition from the button, with a short crossfade fallback.
Reduced motion changes theme immediately.

Type: JetBrains Mono, one family, three weights. 800 for the name, 600 for headings and
labels, 400 for body. Body 15px with 1.65 leading. Small UI 12px minimum, 13px for links.
Display scale is fluid with a hard maximum so the line lengths stay readable.

Grid: a 12-column inner measure capped at 1180px. Panes can break to 1180px; prose stays
under 68 characters. Sections alternate between a split pane and a full-width index.

Shape: square corners, 1px rules, no rounded cards except the three traffic-light dots.
Motion language: 160 to 420ms, one ease (`cubic-bezier(0.16, 1, 0.3, 1)`), small travel,
no layout animation. The idle state is the spinning torus and the ambient character field.

## Page plan

Home:

1. Hero: split pane, oversized two-tier name, live torus, three-line `whoami` readout.
2. About: section head, portrait and prose, stats, then a two-column experience and
   education ledger.
3. Stack: section head, filterable groups, published models as a manifest.
4. Work: section head, eight-row index. Every row opens a case file.
5. Contact: section head, one large mail link, four channels, one closing line.

Inner page: `/work/[slug]` for all eight projects. Record header, narrative, ASCII trace,
metrics, source link, next case. A dedicated 404 uses the same system and gets the visitor
back to work.

## What the generic version would have done

- centered hero over a gradient blob
- three equal feature cards
- an eyebrow above every heading
- a green-on-black terminal with no content behind it
- a project list that links every card to a GitHub profile

The site keeps the terminal because the subject works in one, but earns it with case files,
real metrics, a production vocabulary, and a loader that resolves into content.
