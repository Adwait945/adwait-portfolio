# Sprint 0 — Feature Requirements
_Written by PRODUCT on 2026-06-25_

## Sprint Goal

Validate the full Claude Code MAW pipeline (PRODUCT → ARCHITECT → TEST → DEV → PROFESSOR → REVIEWER) by building a minimal Next.js 14+ foundation with a single rendered Hero section. The output is not throwaway — it becomes the real foundation Sprint 1 extends.

---

## Epic 1: Next.js Foundation + Hero

### User Story

As the candidate testing the MAW pipeline, I want a minimal but real Next.js page rendering the portfolio Hero with correct fonts, colors, and locked copy, so that I can validate every agent works correctly before committing to the full Sprint 1 build.

---

### Acceptance Criteria

#### Functional ACs (from backlog)

- **AC-0.1:** A Next.js 14+ project is initialized with TypeScript strict mode, App Router, Tailwind CSS, and ESLint. No pages router, no `src/` directory wrapper.

- **AC-0.2:** `app/globals.css` contains the complete design token set migrated verbatim from `index.css`:
  - All CSS custom properties: `--background: 230 40% 4%`, `--foreground: 0 0% 100%`, `--primary: 190 100% 50%`, `--primary-foreground: 230 40% 6%`, `--card: 230 30% 8%`, `--muted-foreground: 230 20% 70%`, `--border: 230 20% 18%`, `--radius: 0.75rem`, and all remaining variables from the source file.
  - `@layer utilities` with `.glass`, `.glass-card` (including hover state), and `.text-gradient` defined exactly as in source.
  - `@layer base` applies `font-sans antialiased bg-background text-foreground` to `body` and `font-display tracking-tight` to `h1`-`h6`.

- **AC-0.3:** `tailwind.config.ts` extends theme with all color tokens mapped to CSS variables and three font families: `sans`, `display`, `mono`.

- **AC-0.4:** Fonts loaded via `next/font/google`: Inter, Space Grotesk, JetBrains Mono (all variable, subset latin). CSS variables `--font-sans`, `--font-display`, `--font-mono` set via `className` on `<html>`. No CDN font links.

- **AC-0.5:** `app/layout.tsx` renders only structural shell: `<html lang="en">` with font variable classes, `<body>`, `{children}`. No Nav, no Footer.

- **AC-0.6:** `lib/site-config.ts` exports `siteConfig` with: `name: "Adwait Mulye"`, `role`, `headline`, `subheadline`, `email`, `linkedinUrl`, `githubUrl` — all values sourced verbatim from `PORTFOLIO_CONTENT.md` v3 §1.

- **AC-0.7:** `components/home/Hero.tsx` renders:
  - Eyebrow: the exact string `"PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"` — uppercase, mono font, primary accent border.
  - Headline: the exact string `"Bridging Product Strategy and Technical Execution"` — display font, large. The word `"and"` renders in muted gray. The phrase `"Technical Execution"` renders in primary accent color (cyan).
  - Sub-headline: verbatim from `PORTFOLIO_CONTENT.md` §3, centered, body font.
  - Two CTA buttons — primary `"View Featured Work →"` and secondary `"How I Build"` — both linking to `#` as placeholders for Sprint 0.
  - Buttons are side-by-side at desktop viewport widths and stacked on mobile.
  - Section is full viewport height on desktop (`min-h-screen`) and auto height on mobile. Content is centered vertically and horizontally.

- **AC-0.8:** `app/page.tsx` imports and renders `<Hero />` as its sole content.

- **AC-0.9:** All visible Hero text matches `PORTFOLIO_CONTENT.md` §3 verbatim. Zero paraphrasing.

- **AC-0.10:** Hero renders correctly at 360px viewport width (buttons stack vertically, no horizontal overflow) and at 1440px viewport width (buttons are side-by-side).

- **AC-0.11:** `npm run build` succeeds with no errors and no warnings.

- **AC-0.12:** `npm run dev` boots without errors and the Hero renders at `http://localhost:3000`.

- **AC-0.13:** `npx tsc --noEmit` passes with zero TypeScript errors.

---

#### Visual and Interaction ACs (derived from `docs/ui-mocks/hero.png` and `docs/prototypes/Hero.tsx`)

- **AC-UI-1.1:** The page background is a near-black dark navy (`#030A14` or equivalent CSS variable `hsl(var(--background))`). No light theme is displayed; the dark theme is the only rendered theme.

- **AC-UI-1.2:** The eyebrow pill is a small inline-block element with: monospace font, uppercase text, `text-xs` size, wide letter-spacing (`tracking-[0.2em]`), primary cyan text color, a `border` in `primary/30` opacity, and a `glass` utility applied for the frosted-glass background effect. It sits centered above the headline with substantial vertical margin below it (approximately `mb-12`).

- **AC-UI-1.3:** The `<h1>` headline is set in the display font (Space Grotesk), bold weight, `text-6xl` on mobile scaling to `text-8xl` on `md:` breakpoint, with tight tracking (`tracking-tighter`) and a line-height of approximately `1.1`. The word "and" uses a muted slate color (approximately `text-slate-500`); the phrase "Technical Execution" uses the primary cyan accent color.

- **AC-UI-1.4:** The sub-headline paragraph is body font, `text-lg` on mobile / `text-xl` on `md:` breakpoint, muted slate color (`text-slate-400`), `max-w-2xl` container, `leading-relaxed`, and horizontally centered.

- **AC-UI-1.5:** The primary CTA button ("View Featured Work →") has a solid cyan background (`bg-primary`), dark foreground text (`text-primary-foreground`), bold font, `rounded-xl` corners, a fixed height of `h-16`, `text-lg`, a right-arrow icon appended inline (decorative, `aria-hidden="true"`), and a glow shadow in cyan (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`).

- **AC-UI-1.6:** The secondary CTA button ("How I Build") has a transparent glass background (`glass` utility), a border in `border-white/10`, white text (`text-white`), `hover:bg-white/10`, `rounded-xl` corners, fixed height of `h-16`, and `text-lg`.

- **AC-UI-1.7:** The two CTA buttons are arranged in a flex row with `gap-6` between them on `sm:` and wider viewports (640px+). On viewports narrower than `sm`, the flex direction is `flex-col` and the buttons stack vertically.

- **AC-UI-1.8:** The entire hero content block (eyebrow, headline, sub-headline, buttons) is horizontally centered (`items-center text-center`) with a `max-w-4xl` constraint and `mx-auto` centering within a `container` with horizontal padding (`px-4 md:px-6`).

- **AC-UI-1.9:** The section uses `overflow-hidden` to prevent any decorative gradient or background layer from causing a horizontal scrollbar.

- **AC-UI-1.10:** Nav ("Adwait Mulye" name in the upper-left of the mock) is NOT rendered in Sprint 0. The `app/layout.tsx` must not include any Nav component; `app/page.tsx` renders only `<Hero />`.

---

### Test Criteria (passed to TEST agent verbatim from backlog)

These five criteria must be written as failing tests BEFORE DEV implements production code.

- **T-0.1:** `Hero` renders without throwing an error.
- **T-0.2:** Rendered output contains exact string `"Bridging Product Strategy and Technical Execution"`.
- **T-0.3:** Rendered output contains exact eyebrow string `"PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"`.
- **T-0.4:** Rendered output contains exactly two buttons: "View Featured Work" and "How I Build".
- **T-0.5:** Sub-headline text from `PORTFOLIO_CONTENT.md` §3 appears verbatim in rendered output.

The verbatim sub-headline string (from `PORTFOLIO_CONTENT.md` v3 §3) is:

> 14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.

---

### Non-Functional Requirements

- **NFR-1.P — Performance:** The Hero section renders to interactive in under 1.5 seconds on simulated 3G (project-wide budget per `CLAUDE.md`). The initial route JS bundle must not exceed 250KB gzipped (Next.js First Load JS per route). `npm run build` output must show each route at or below this cap.

- **NFR-1.A — Accessibility:** WCAG 2.1 AA. Both CTA buttons must have visible focus indicators. Both buttons must be keyboard-activatable via the `Enter` key. The `<h1>` must be the single top-level heading on the page. The right-arrow icon inside "View Featured Work →" must be `aria-hidden="true"` (it is decorative). The `<html>` element must have `lang="en"`. All form inputs are out of scope for this sprint.

- **NFR-1.B — Browser Support:** Last 2 versions of Chrome, Firefox, Safari, and Edge on desktop. Mobile Safari on iOS 16+. Chrome on Android (latest version). Hero must render without layout breakage or style loss in all listed environments.

- **NFR-1.I — i18n:** English only in Sprint 0. All user-facing strings must be sourced from `PORTFOLIO_CONTENT.md` v3 or exported from `lib/site-config.ts` — never hardcoded inline in component JSX — to facilitate future i18n extraction. No locale-dependent date or number formatting is used in this sprint.

- **NFR-1.S — Security:** No authentication required; the Hero is a public, anonymous page. No user data is collected or transmitted. No secrets or environment variables are accessed in any Sprint 0 code paths.

- **NFR-1.O — Observability:** No server-side routes exist in Sprint 0, so API-level structured logging is not applicable. Client errors must not be silently suppressed. No `console.log` or `console.error` may appear in production code under `app/` or `components/` (per `CLAUDE.md` hard rules). The project logger is not invoked in Sprint 0 scope.

- **NFR-1.T — Type Safety:** `npx tsc --noEmit` must pass with zero errors in TypeScript strict mode. This is a required gate for the Sprint 0 Definition of Done.

- **NFR-1.ST — Styling Compliance:** Tailwind utility classes only. No inline `style={{}}` props. No `<style>` tags in component files. No CSS Modules. This is a hard rule per `CLAUDE.md`.

---

### Dependencies

| Dependency | Type | Notes |
|---|---|---|
| `docs/PORTFOLIO_CONTENT.md` v3 §1 | Content source | Values for `siteConfig` exports |
| `docs/PORTFOLIO_CONTENT.md` v3 §3 | Content source | Verbatim Hero copy: eyebrow, headline, sub-headline, CTA labels |
| `docs/ui-mocks/hero.png` | Visual target | DEV must view and match |
| `docs/prototypes/Hero.tsx` | Pattern reference | Extract Tailwind classes, JSX structure; adapt to Next.js App Router; do not copy Vite-specific code |
| `app/globals.css` (existing scaffold) | File to rewrite | Currently holds Next.js default placeholder; AC-0.2 requires full replacement with design token set |
| `app/layout.tsx` (existing scaffold) | File to rewrite | Currently loads Geist fonts; AC-0.4 and AC-0.5 require rewrite for Inter/Space Grotesk/JetBrains Mono via `next/font/google` |
| `app/page.tsx` (existing scaffold) | File to rewrite | Currently renders Next.js default homepage; AC-0.8 requires it to render only `<Hero />` |
| `tailwind.config.ts` | File to create | Does not yet exist in project |
| `lib/site-config.ts` | File to create | Does not yet exist in project |
| `components/home/Hero.tsx` | File to create | Does not yet exist in project |
| `src/__tests__/Hero.test.tsx` | File to create (TEST agent) | Does not yet exist in project |

---

### Out of Scope (carried from backlog)

- All Home sections except Hero: How I Work, Selected Work, Career Trajectory, Skills, Experience, Education, The Bridge, Beyond the Work, Contact CTA.
- Nav component and Footer component.
- Stub routes for Teams Retro, Artifacts, Git, Writing.
- SEO metadata, Open Graph images, sitemap, robots.txt.
- Resume PDF files and download buttons.
- Vercel deploy configuration.
- MongoDB, API routes, any backend or database.
- shadcn/ui component library.
- Playwright E2E tests.
- Entrance animations (`framer-motion`) — the prototype uses them; no functional AC requires them in Sprint 0.

---

### Ambiguities Flagged for Human Review

1. **`framer-motion` animations:** The prototype (`docs/prototypes/Hero.tsx`) uses `framer-motion` for entrance animations (fade-in, slide-up). No AC in the backlog requires animations. This document treats them as out of scope for Sprint 0. If animations are desired, the backlog must be updated before TEST writes tests for them.

2. **Button link targets:** AC-0.7 specifies both CTA buttons link to `#` as placeholders for Sprint 0. `PORTFOLIO_CONTENT.md` §3 specifies the primary CTA links to `/teams-retro` and the secondary smooth-scrolls to `#how-i-work`. The backlog AC takes precedence. Sprint 1 must wire the real targets.

3. **`index.css` source file location:** AC-0.2 references design tokens from `index.css`, but this file is not present in the current project tree (it lives in the Replit prototype environment). The explicit token values enumerated in AC-0.2 are the authoritative source for Sprint 0. ARCHITECT must use those values directly.

---

### AC to Backlog Source Traceability

| AC | Source |
|---|---|
| AC-0.1 through AC-0.13 | `docs/SPRINT_0_BACKLOG.md` — Epic 1 Acceptance Criteria, verbatim |
| AC-UI-1.1 | `docs/ui-mocks/hero.png` — dark background observation |
| AC-UI-1.2 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` line 17 |
| AC-UI-1.3 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` lines 22-31 |
| AC-UI-1.4 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` lines 33-38 |
| AC-UI-1.5 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` line 48 |
| AC-UI-1.6 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` line 51 |
| AC-UI-1.7 | `docs/ui-mocks/hero.png` + `docs/prototypes/Hero.tsx` lines 43-54 |
| AC-UI-1.8 | `docs/prototypes/Hero.tsx` lines 10-12 |
| AC-UI-1.9 | `docs/prototypes/Hero.tsx` line 7 (`overflow-hidden`) |
| AC-UI-1.10 | `docs/ui-mocks/hero.png` (name in upper-left) + backlog scope table (Nav excluded) |
