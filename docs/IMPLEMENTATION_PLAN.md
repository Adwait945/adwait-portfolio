# Sprint 0 — Implementation Plan
_Written by ARCHITECT on 2026-06-25_

DEV executes top-to-bottom. One commit per task. Mark `[x]` as each completes.
TEST writes `src/__tests__/Hero.test.tsx` BEFORE DEV starts TASK-0.5 (tests must fail first).
Project already scaffolded (Next.js 14.2.35, App Router, TS strict, Tailwind 3, ESLint). No `create-next-app` re-init needed; the scaffold's default files are rewritten in place.

---

## TASK-0.0: Add dependencies and scripts
**File(s):** `package.json`
**AC refs:** AC-0.4 (lucide icon), NFR-1.T, test toolchain
- [x] Add runtime dependency: `lucide-react`
- [x] Add devDependencies: `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@types/jest`
- [x] Add scripts: `"test": "jest"`, `"test:run": "jest --ci"`, `"typecheck": "tsc --noEmit"`
- [x] Run `npm install`; confirm lockfile updates and no peer-dep errors
**Commit:** `chore(deps): add lucide-react and jest test toolchain (TASK-0.0)`

---

## TASK-0.1: Configure tailwind.config.ts
**File(s):** `tailwind.config.ts`
**AC refs:** AC-0.3, AC-UI-1.1
- [x] Set `darkMode: "class"`
- [x] Set `content` to `["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"]`
- [x] Map colors to `hsl(var(--*))`: `background`, `foreground`, `primary` (`DEFAULT` + `foreground`), `card` (`DEFAULT`), `border`, `muted.foreground` (per ARCHITECTURE_DESIGN §7.4)
- [x] Add `fontFamily`: `sans → var(--font-sans)`, `display → var(--font-display)`, `mono → var(--font-mono)` (each with system fallbacks)
- [x] Add `borderRadius` lg/md/sm derived from `var(--radius)`
- [x] Remove the old bare `var(--background)` / `var(--foreground)` mappings
**Commit:** `feat(config): tailwind theme tokens, fonts, dark mode (TASK-0.1)`

---

## TASK-0.2: Migrate design tokens to app/globals.css
**File(s):** `app/globals.css`
**AC refs:** AC-0.2, AC-UI-1.1, AC-UI-1.2, AC-UI-1.6
- [x] Keep the three `@tailwind` directives (base, components, utilities)
- [x] Remove the default light/dark `prefers-color-scheme` block, the `Arial` body rule, and `.text-balance`
- [x] Add `:root { ... }` with the 8 authoritative tokens from ARCHITECTURE_DESIGN §7.3 (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--card`, `--muted-foreground`, `--border`, `--radius`) — optionally the sibling block too
- [x] Add `@layer base` (body: `font-sans antialiased bg-background text-foreground`; h1–h6: `font-display tracking-tight`)
- [x] Add `@layer utilities` with `.glass`, `.glass-card` (+ `:hover`), `.text-gradient` exactly as in ARCHITECTURE_DESIGN §7.5
- [x] Verify no hardcoded hex in tokens — all HSL channel triplets
**Commit:** `feat(styles): migrate design tokens and glass utilities (TASK-0.2)`

---

## TASK-0.3: Rewrite app/layout.tsx (fonts + dark + metadata)
**File(s):** `app/layout.tsx`
**AC refs:** AC-0.4, AC-0.5, AC-UI-1.1, AC-UI-1.10, NFR-1.A, NFR-1.P
- [x] Remove `next/font/local` Geist imports entirely
- [x] Import `Inter`, `Space_Grotesk`, `JetBrains_Mono` from `next/font/google`
- [x] Configure each: `subsets: ["latin"]`, `display: "swap"`, `variable: "--font-sans" | "--font-display" | "--font-mono"`
- [x] `<html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>`
- [x] `<body>{children}</body>` only — NO Nav, NO Footer (AC-0.5, AC-UI-1.10)
- [x] Replace `metadata`: `title: "Adwait Mulye — Product Manager, Technical · TPM"`, `description` from PORTFOLIO_CONTENT §1 default meta description
- [x] Keep `import "./globals.css"`
**Commit:** `feat(layout): root shell with next/font fonts and dark theme (TASK-0.3)`

---

## TASK-0.4: Create lib/site-config.ts
**File(s):** `lib/site-config.ts`
**AC refs:** AC-0.6, AC-0.9, NFR-1.I, NFR-1.T
- [x] Define and export `type SiteConfig` per ARCHITECTURE_DESIGN §1
- [x] Export `const siteConfig: SiteConfig` with values VERBATIM from PORTFOLIO_CONTENT §1 + §3:
  - `name: "Adwait Mulye"`, `role`, `headline`, `subheadline`, `email`, `linkedinUrl`, `githubUrl`
  - `hero.eyebrow: "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"`
  - `hero.headlineLead: "Bridging Product Strategy "`, `headlineMuted: "and"`, `headlineTrailing: " "`, `headlineAccent: "Technical Execution"`
  - `hero.subheadline`/`subheadline: "14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end."`
  - `hero.primaryCta: { label: "View Featured Work", href: "#" }`, `hero.secondaryCta: { label: "How I Build", href: "#" }`
- [x] Verify: `headlineLead + headlineMuted + headlineTrailing + headlineAccent === "Bridging Product Strategy and Technical Execution"`
- [x] Use the em-dash `—` character in the sub-headline, not a hyphen
**Commit:** `feat(config): site-config with locked hero copy (TASK-0.4)`

---

## TASK-0.5: Create components/home/Hero.tsx
**File(s):** `components/home/Hero.tsx`
**AC refs:** AC-0.7, AC-0.9, AC-0.10, AC-UI-1.2 through AC-UI-1.9, NFR-1.A, NFR-1.I, NFR-1.ST
**Pre-req:** `src/__tests__/Hero.test.tsx` exists and FAILS (TEST agent).
- [x] Server Component (no `"use client"`, no hooks). Default export `Hero`.
- [x] Import `siteConfig` from `@/lib/site-config` and `ArrowRight` from `lucide-react`
- [x] `<section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">`
- [x] Optional decorative gradient layer at `z-0` (`absolute inset-0`)
- [x] `<div className="container mx-auto px-4 md:px-6 relative z-10">` → `<div className="flex flex-col items-center text-center max-w-4xl mx-auto">`
- [x] Eyebrow `<span>`: `px-6 py-2 text-xs font-mono tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full glass mb-12 inline-block` → `{siteConfig.hero.eyebrow}`
- [x] `<h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 leading-[1.1] text-white">` with three spans: lead (white), `headlineMuted` in `text-slate-500`, `headlineAccent` in `text-primary`; preserve exact spacing so the accessible name is the full headline string
- [x] Sub-headline `<p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed">{siteConfig.subheadline}</p>`
- [x] Button row `<div className="flex flex-col sm:flex-row gap-6">`
  - Primary `<a href={siteConfig.hero.primaryCta.href}>`: `inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-bold px-12 rounded-xl h-16 text-lg shadow-[0_0_20px_rgba(0,229,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` → label + `<ArrowRight aria-hidden="true" className="ml-2 w-5 h-5" />`
  - Secondary `<a href={siteConfig.hero.secondaryCta.href}>`: `inline-flex items-center justify-center glass border border-white/10 hover:bg-white/10 text-white px-12 rounded-xl h-16 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` → label
- [x] NO inline `style={{}}`, NO `<style>`, NO hardcoded copy strings (all from `siteConfig`)
- [x] File under 200 lines
**Commit:** `feat(home): Hero section with locked copy and CTAs (TASK-0.5)`

---

## TASK-0.6: Wire Hero into app/page.tsx
**File(s):** `app/page.tsx`
**AC refs:** AC-0.8, AC-UI-1.10
- [x] Remove all default `create-next-app` markup, `next/image`, external links
- [x] Import `Hero` from `@/components/home/Hero`
- [x] `export default function Home() { return <Hero />; }` — `<Hero />` is the sole content
**Commit:** `feat(home): render Hero as home page content (TASK-0.6)`

---

## TASK-0.7: Add route error boundary
**File(s):** `app/error.tsx`
**AC refs:** NFR-1.O (do not swallow client errors), CLAUDE.md React rule (every page route has an error boundary)
- [x] `"use client"` at top
- [x] Default export `Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void })`
- [x] Render a minimal dark-themed fallback with a retry `<button onClick={reset}>` (label via plain text is acceptable here; not part of locked copy)
- [x] NO `console.log` / `console.error`
**Commit:** `feat(home): route-level error boundary (TASK-0.7)`

---

## TASK-0.8: Jest + RTL setup
**File(s):** `jest.config.ts`, `jest.setup.ts`
**AC refs:** test infrastructure for T-0.1–T-0.5
- [x] `jest.config.ts`: use `next/jest` `createJestConfig`, `testEnvironment: "jsdom"`, `moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" }`, `setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]`
- [x] `jest.setup.ts`: `import "@testing-library/jest-dom"`
- [x] Confirm `npm test` runs and discovers `src/__tests__/Hero.test.tsx`
**Commit:** `chore(test): jest + react testing library config (TASK-0.8)`

> Note: the 5 test cases (T-0.1–T-0.5) in `src/__tests__/Hero.test.tsx` are authored by the TEST agent, not DEV. DEV does not modify test files (CLAUDE.md). This task only stands up the runner config.

---

## TASK-0.9: Verify NFR-1.T (Type Safety)
**File(s):** none (verification)
- [x] Run `npm run typecheck` (`tsc --noEmit`) → zero errors
**Commit:** none (verification task; fold fixes into the relevant TASK commit)

## TASK-0.10: Verify NFR-1.P (Performance) + AC-0.11
**File(s):** none (verification)
- [x] Run `npm run build` → succeeds with no errors and no warnings
- [x] Inspect First Load JS for `/` in the build route table → ≤ 250KB gzipped
**Commit:** none

## TASK-0.11: Verify NFR-1.A (Accessibility) + AC-0.10
**File(s):** none (verification)
- [x] `npm run dev` → confirm single `<h1>`, both CTAs reachable by Tab with a visible focus ring, `Enter`-activatable
- [x] Confirm `ArrowRight` has `aria-hidden="true"` and `<html lang="en">`
- [x] Resize to 360px: buttons stack, no horizontal scrollbar; at 1440px: buttons side-by-side
**Commit:** none

## TASK-0.12: Verify NFR-1.ST + NFR-1.O + NFR-1.S + NFR-1.I + NFR-1.B
**File(s):** none (verification)
- [x] NFR-1.ST: grep `app/` + `components/` for `style={{` and `<style` → none
- [x] NFR-1.O: grep `app/` + `components/` for `console.` → none
- [x] NFR-1.S: grep Sprint-0 paths for `process.env` → none
- [x] NFR-1.I: confirm no user-facing string literals in `Hero.tsx` (all from `siteConfig`)
- [x] NFR-1.B: spot-check Hero in Chrome + Safari (or note `-webkit-backdrop-filter` present for Safari glass)
**Commit:** none

## TASK-0.13: Verify tests (T-0.1–T-0.5)
**File(s):** none (verification)
- [x] `npm test` (or `npm run test:run`) → all 5 tests pass
**Commit:** none

---

## Execution order summary
0.0 deps → 0.1 tailwind → 0.2 globals → 0.3 layout → 0.4 site-config → (TEST writes failing Hero.test.tsx) → 0.5 Hero → 0.6 page → 0.7 error boundary → 0.8 jest config → 0.9–0.13 verification gates.

## Definition of Done
- All 13 functional ACs (AC-0.1–AC-0.13) + 10 UI ACs (AC-UI-1.1–1.10) pass.
- All 8 NFRs verified (TASK-0.9 through 0.12).
- `npm run build` clean, `npm run typecheck` zero errors, 5 Jest tests pass.
- Global UI Infrastructure (ARCHITECTURE_DESIGN §7) present and correct.
- DEV records pre-flight (prototype read) in `docs/IMPLEMENTATION_NOTES.md`.
