# NAMI.md

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

A terminal-styled portfolio site for Babitdor Kayang Khonglah, an AI engineer. The site
presents as a TUI: a status bar, window panes and a prompt bar, with ASCII art animations
(a rotating `donut.c` torus in the hero, an ambient character field behind the panes, and a
scramble-revealed name banner on boot). Content lives in `src/content/`.

## Technology Stack

**Core Framework:**
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5

**UI, Animation and Effects:**
- Lenis 1.3.26 - smooth scrolling (drives the section/stage state)
- @fortawesome/react-fontawesome 3.1.1 - icons
- No 3D library and no animation library: the ASCII effects are hand-written
  character-cell renderers (see `src/lib/ascii.ts`, `donut.ts`, `field.ts`, `banner.ts`).

**Development Tools:**
- ESLint 9 - Code linting
- TypeScript 5 - Type checking

## Project Structure

```
portfolio/
├── public/                    # Static assets
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout: providers, status bar, prompt bar, boot
│   │   ├── page.tsx          # Home page (Hero, About, Skills, Projects, Contact)
│   │   └── globals.css       # Design system: palette, primitives, layout
│   ├── content/              # ALL personal content. Edit facts here, not components.
│   │   ├── profile.ts        # Identity, experience, education, certs, skills, stats
│   │   └── projects.ts       # Project list with per-project repo links
│   ├── components/           # React components
│   │   ├── AsciiBackdrop.tsx # Ambient character field behind everything
│   │   ├── AsciiDonut.tsx    # Rotating ASCII torus (hero centrepiece)
│   │   ├── AsciiBanner.tsx   # Scramble-revealed name banner (boot)
│   │   ├── BootSequence.tsx  # Boot log -> banner, once per tab
│   │   ├── Hero.tsx          # Hero pane + donut figure
│   │   ├── About.tsx         # about.md: bio, stats, experience, education, certs
│   │   ├── Skills.tsx        # ~/stack/: filterable skill table + published models
│   │   ├── Projects.tsx      # ~/projects/: expandable project list
│   │   ├── Contact.tsx       # Channels, click-to-copy
│   │   ├── TuiPane.tsx       # The window chrome every section wears
│   │   ├── TuiStatusBar.tsx  # Top bar: path + section tabs
│   │   ├── TuiPromptBar.tsx  # Bottom bar: current command + scroll readout
│   │   ├── CommandPalette.tsx# Ctrl/Cmd+K
│   │   ├── CopyToast.tsx     # Copy confirmation
│   │   └── Footer.tsx
│   └── lib/                  # Non-React logic
│       ├── ascii.ts          # Character ramps + ramp-index helper
│       ├── useAsciiLoop.ts   # The single hook driving every ASCII effect
│       ├── donut.ts          # donut.c port (z-buffered ASCII torus)
│       ├── field.ts          # Ambient field renderer
│       ├── banner.ts         # 5x7 bitmap font + scramble reveal
│       ├── scroll.ts         # Scroll state outside React + stage measurement
│       ├── SmoothScrollProvider.tsx
│       ├── toast.ts          # Copy-to-clipboard + toast store
│       ├── useClient.ts      # Client / reduced-motion hooks
│       └── useStage.ts       # Subscribes React to the discrete stage index
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

## Content Rules

- **All personal facts live in `src/content/`.** Components read from there; do not
  hardcode a name, link, date or skill in a component.
- Every fact in `profile.ts` and `projects.ts` was verified against a primary source
  (GitHub API, the certificate page, Hugging Face, Ollama, ORCID). If you add a claim,
  verify it, or leave it out.
- `Information.md`, `Projects.md` and `Last_Project.md` in the repo root are older raw
  notes. They are NOT the source of truth and have drifted; `src/content/` wins.

## ASCII Effects

- One `<pre>` per effect, one `textContent` write per frame. Never a DOM node per cell.
- Driven by `useAsciiLoop`, which throttles with a time accumulator (not a timer), pauses
  when off-screen or on tab-hide, and renders a single still frame under
  `prefers-reduced-motion`.
- Renderers must be pure functions of `t` (no `Math.random`), so frames are reproducible.
- `pre` gets `font-family: monospace` from the UA stylesheet, which outranks the inherited
  font. Each ASCII layer must set `font-family: var(--mono)` explicitly.
- The character cell is measured from the live font at runtime; do not hardcode a cell
  width.

## Development Setup

### Prerequisites
- Node.js (v20 or higher recommended)

### Installation

```bash
npm install
```

### Environment Variables

No environment variables are currently required for this project.

## Development Commands

```bash
# Start development server (prints the actual port; 3000 is often taken)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type-check (the build does this too, but this is faster)
npx tsc --noEmit
```

**Do not run `npm run build` while the dev server is running.** Both write to `.next` and
the dev server will start serving stale or broken output.


## Architecture

### Component Architecture

The application follows a component-based architecture with clear separation of concerns:

**Layout Components:**
- `RootLayout` - Wraps the entire app with ThemeProvider, Navbar, and Footer
- `ThemeProvider` - Manages dark/light theme state with localStorage persistence

**Page Components:**
- `Home` - Main page composed of section components (Hero, About, Skills, Projects, Contact)

**Section Components:**
- `Hero` - Landing section with 3D model, name, title, and social links
- `About` - Personal information and education
- `Skills` - Technical skills display with categories
- `Projects` - Project showcase with descriptions
- `Contact` - Contact information and form

**Shared Components:**
- `Navbar` - Navigation with smooth scrolling and theme toggle
- `Footer` - Footer with links and copyright
- `Model3D` - Three.js canvas with interactive 3D bedroom model
- `Animations` - Framer Motion animation variants

### Theme System

The project uses a custom theme system with CSS variables:

**Light Theme (default):**
- Background: `#fafafa` (primary), `#ffffff` (secondary)
- Text: `#1d1d1f` (primary), `#6e6e73` (secondary)
- Accent: `#0066cc`
- Gradient: `#0066cc` to `#5b4fff`

**Dark Theme:**
- Background: `#000000` (primary), `#0a0a0a` (secondary)
- Text: `#f5f5f7` (primary), `#a1a1a6` (secondary)
- Accent: `#2997ff`
- Gradient: `#2997ff` to `#9d4edd`

Theme is stored in `localStorage` and respects system preferences on first load.

### 3D Model Integration

The 3D bedroom model is rendered using:
- `@react-three/fiber` Canvas for WebGL rendering
- `@react-three/drei` for OrbitControls, Environment, Float, ContactShadows
- GLB format model loaded via `useGLTF` hook
- Subtle floating animation and rotation
- Optimized materials with shadow casting/receiving

### Animation System

Framer Motion is used for:
- Page scroll animations (staggered children)
- Hover effects on cards and buttons
- Smooth transitions between sections
- Icon animations (spring physics)

Animation variants are defined in `Animations.tsx` and reused across components.

## Important Files

### Configuration Files

- `package.json` - Dependencies, scripts, and project metadata
- `tsconfig.json` - TypeScript compiler options with path aliases (`@/*` → `./src/*`)
- `next.config.ts` - Next.js configuration (currently minimal)
- `eslint.config.mjs` - ESLint rules using Next.js presets

### Core Application Files

- `src/app/layout.tsx` - Root layout with metadata and global structure
- `src/app/page.tsx` - Main page composition
- `src/app/globals.css` - Global styles, CSS variables, and theme definitions

### Component Files

- `src/components/ThemeProvider.tsx` - Theme context and toggle logic
- `src/components/Model3D.tsx` - 3D model rendering and animation
- `src/components/Hero.tsx` - Hero section with animations
- `src/components/Navbar.tsx` - Navigation with theme toggle
- `src/components/Footer.tsx` - Footer component

### Asset Files

- `public/room/bedroom.glb` - 3D bedroom model (GLB format)
- `src/app/favicon.ico` - Site favicon

## Common Workflows

### Adding a New Section

1. Create component in `src/components/` (e.g., `NewSection.tsx`)
2. Add to `src/app/page.tsx`:
   ```tsx
   import NewSection from "@/components/NewSection";

   export default function Home() {
     return (
       <>
         <Hero />
         <About />
         <NewSection />  // Add here
         <Skills />
         {/* ... */}
       </>
     );
   }
   ```

### Modifying the 3D Model

1. Replace `public/room/bedroom.glb` with new GLB file
2. Adjust scale and position in `src/components/Model3D.tsx`:
   ```tsx
   <primitive
     ref={modelRef}
     object={scene}
     scale={0.28}  // Adjust scale
     position={[0, 0, 0]}  // Adjust position
   />
   ```

### Updating Theme Colors

Edit CSS variables in `src/app/globals.css`:
- Light theme: `:root` block
- Dark theme: `[data-theme="dark"]` block

### Adding New Icons

1. Install FontAwesome icon package if needed
2. Import in component:
   ```tsx
   import { faIconName } from '@fortawesome/free-solid-svg-icons';
   ```
3. Use in JSX:
   ```tsx
   <FontAwesomeIcon icon={faIconName} />
   ```

### Modifying Animations

Edit animation variants in `src/components/Animations.tsx` or component-specific variants. Common patterns:
- `containerVariants` - Staggered children animations
- `itemVariants` - Individual item animations
- `iconVariants` - Icon-specific animations

## Testing

Currently, no automated tests are configured in this project.

**Manual Testing Checklist:**
- [ ] Dark/light theme toggle works correctly
- [ ] 3D model loads and renders properly
- [ ] All navigation links scroll to correct sections
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Animations play smoothly
- [ ] Contact form (if implemented) submits correctly

## Code Style and Conventions

### TypeScript
- Strict mode enabled
- Use type annotations for function parameters and return types
- Prefer interfaces for object shapes
- Use `type` for union types and aliases

### React
- Functional components with hooks
- `'use client'` directive for client components (most components)
- Server components for static content where possible
- Props interfaces defined above components

### Naming Conventions
- Components: PascalCase (`Hero.tsx`, `ThemeProvider.tsx`)
- Files: PascalCase for components, kebab-case for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### CSS
- Use CSS custom properties (variables) for theming
- BEM-like naming for component-specific classes
- Mobile-first responsive design
- Use CSS Grid and Flexbox for layouts

### Imports
- Use path aliases: `@/components/ComponentName` instead of `../../components/ComponentName`
- Group imports: React → Third-party → Local components
- Remove unused imports

## Additional Notes

### Performance Considerations
- 3D model is loaded asynchronously with Suspense
- Framer Motion animations use GPU acceleration
- Images and assets should be optimized for web
- Consider lazy loading for heavy components

### Browser Compatibility
- Modern browsers with WebGL support (for 3D model)
- ES2017+ JavaScript support required
- CSS Grid and Flexbox support required

### Deployment
- Optimized for Vercel deployment
- Static site generation possible with `next build`
- Environment variables not currently required

### Content Updates
- Personal information in `Information.md` (reference only)
- Project details in `src/components/Projects.tsx`
- Skills in `src/components/Skills.tsx`
- Contact info in `src/components/Contact.tsx`

### Known Limitations
- No backend/API integration
- No form submission handling
- 3D model may not load on devices without WebGL support
- No internationalization (i18n) support

### Future Enhancements
- Add automated testing (Jest, React Testing Library)
- Implement form submission with API integration
- Add blog section
- Optimize 3D model loading with compression
- Add more interactive 3D features
- Implement PWA features