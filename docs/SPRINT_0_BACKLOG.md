# Sprint 0 Backlog — MAW Pipeline Smoke Test

**Project:** Adwait Mulye — Personal Portfolio
**Version:** v4
**Sprint Goal:** Validate the full Claude Code MAW pipeline (PRODUCT → ARCHITECT → TEST → DEV → PROFESSOR → REVIEWER) by building a minimal Next.js foundation with a single rendered Hero section. The output is not throwaway — it becomes the real foundation Sprint 1 extends.
**Companion docs:** `PORTFOLIO_PRD.md` (v2) · `PORTFOLIO_IA.md` (v2) · `PORTFOLIO_CONTENT.md` (v3)

---

## Why Sprint 0 Exists

This is a workflow validation sprint, not a feature sprint. The goal is to confirm:

1. The Claude Code MAW agent pipeline works end-to-end on this machine.
2. Each agent reads the correct input files and writes to the correct output files.
3. The docs/ handoff chain works — each agent reads the previous agent's output.
4. The DEV agent can scaffold a Next.js 14 project, install dependencies, and run build/test/typecheck.
5. The REVIEWER audit passes on a trivially small scope before committing to Sprint 1's 10-epic build.

If anything breaks, it breaks here on 1 epic / 5 tests instead of mid-way through Sprint 1.

---

## Sprint 0 Definition of Done

- One epic implemented; all 13 ACs pass.
- `npm run build` succeeds with no errors or warnings.
- `npm run dev` boots and renders the Hero at `localhost:3000`.
- TypeScript typecheck (`npx tsc --noEmit`) passes with zero errors.
- All Jest tests pass (minimum 5 tests per the test criteria below).
- REVIEWER audit report exists at `docs/AUDIT_REPORT.md` with verdict APPROVED.
- All six `/docs` communication files populated.
- `CODE_EXPLAINER.md` populated by PROFESSOR.

---

## Scope

| In scope | Out of scope |
|---|---|
| Next.js 14+ project init (App Router, TypeScript strict, Tailwind CSS, ESLint) | Every Home section except Hero |
| `app/globals.css` with full design token migration from `index.css` | Nav, Footer — not needed for smoke test |
| Font loading via `next/font` (Inter, Space Grotesk, JetBrains Mono) | All stub routes |
| `app/layout.tsx` — minimal root layout (html, body, font classes only) | SEO metadata, OG images, sitemap |
| `app/page.tsx` — renders only `<Hero />` | Resume PDFs and download buttons |
| `components/home/Hero.tsx` — hero with real locked copy from CONTENT v3 §3 | Vercel deploy config |
| `lib/site-config.ts` — centralized site values from CONTENT v3 §1 | MongoDB, API routes, any backend |
| `tailwind.config.ts` — theme extensions for colors and fonts | shadcn/ui (not needed for Hero alone) |
| 5+ Jest component tests | Playwright E2E tests |
| All six `/docs` communication files | |

---

## Epic 1 (only epic): Next.js Foundation + Hero

### Description

Initialize a Next.js 14+ project with TypeScript strict mode and Tailwind CSS. Migrate the full design token set from the existing Replit `index.css` into `app/globals.css`. Load all three fonts via `next/font`. Build a minimal root layout and a single Home page rendering only the Hero component with locked copy from `PORTFOLIO_CONTENT.md` §3.

### User Story

As the candidate testing the MAW pipeline, I want a minimal but real Next.js page rendering the portfolio Hero with correct fonts, colors, and locked copy, so that I can validate every agent works correctly before committing to the full Sprint 1 build.

### Acceptance Criteria

- **AC-0.1:** A Next.js 14+ project is initialized with TypeScript strict mode, App Router, Tailwind CSS, and ESLint. No pages router, no `src/` directory wrapper.
- **AC-0.2:** `app/globals.css` contains the complete design token set migrated verbatim from `index.css`:
  - All CSS custom properties: `--background: 230 40% 4%`, `--foreground: 0 0% 100%`, `--primary: 190 100% 50%`, `--primary-foreground: 230 40% 6%`, `--card: 230 30% 8%`, `--muted-foreground: 230 20% 70%`, `--border: 230 20% 18%`, `--radius: 0.75rem`, and all remaining variables from the source file.
  - `@layer utilities` with `.glass`, `.glass-card` (including hover state), and `.text-gradient` defined exactly as in source.
  - `@layer base` applies `font-sans antialiased bg-background text-foreground` to `body` and `font-display tracking-tight` to `h1`–`h6`.
- **AC-0.3:** `tailwind.config.ts` extends theme with all color tokens mapped to CSS variables and three font families: `sans`, `display`, `mono`.
- **AC-0.4:** Fonts loaded via `next/font/google`: Inter, Space Grotesk, JetBrains Mono (all variable, subset latin). CSS variables `--font-sans`, `--font-display`, `--font-mono` set via `className` on `<html>`. No CDN font links.
- **AC-0.5:** `app/layout.tsx` renders only structural shell: `<html lang="en">` with font variable classes, `<body>`, `{children}`. No Nav, no Footer.
- **AC-0.6:** `lib/site-config.ts` exports `siteConfig` with: `name: "Adwait Mulye"`, `role`, `headline`, `subheadline`, `email`, `linkedinUrl` (placeholder), `githubUrl` (placeholder) — all from `PORTFOLIO_CONTENT.md` §1.
- **AC-0.7:** `components/home/Hero.tsx` renders:
  - Eyebrow: "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER" — uppercase, mono font, primary accent border.
  - Headline: "Bridging Product Strategy and Technical Execution" — display font, large. "and" in muted gray. "Technical Execution" in primary accent color.
  - Sub-headline: verbatim from `PORTFOLIO_CONTENT.md` §3, centered, body font.
  - Two CTA buttons side-by-side desktop / stacked mobile: primary "View Featured Work →" and secondary "How I Build" — both linking to `#` as placeholders.
  - Full viewport height desktop (`min-h-screen`), auto height mobile. Content centered.
- **AC-0.8:** `app/page.tsx` imports and renders `<Hero />` as sole content.
- **AC-0.9:** All visible Hero text matches `PORTFOLIO_CONTENT.md` §3 verbatim. Zero paraphrasing.
- **AC-0.10:** Hero renders correctly at 360px (buttons stack, no overflow) and 1440px (buttons side-by-side).
- **AC-0.11:** `npm run build` succeeds with no errors or warnings.
- **AC-0.12:** `npm run dev` boots without errors, Hero renders at `http://localhost:3000`.
- **AC-0.13:** `npx tsc --noEmit` passes with zero TypeScript errors.

### Test Criteria (TEST agent writes these as failing tests before DEV implements)

- **T-0.1:** `Hero` renders without throwing an error.
- **T-0.2:** Rendered output contains exact string `"Bridging Product Strategy and Technical Execution"`.
- **T-0.3:** Rendered output contains exact eyebrow string `"PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"`.
- **T-0.4:** Rendered output contains exactly two buttons: "View Featured Work" and "How I Build".
- **T-0.5:** Sub-headline text from `PORTFOLIO_CONTENT.md` §3 appears verbatim in rendered output.

### UI Reference

- Mock: `docs/ui-mocks/hero.png` — screenshot of the finalized Replit hero design
- Prototype: `docs/prototypes/Hero.tsx` — Replit Hero component; extract Tailwind class patterns, eyebrow/headline color token usage, button styles, and responsive layout. Do not copy verbatim — adapt to Next.js App Router conventions.

### Dependencies

- `PORTFOLIO_CONTENT.md` v3 §1 and §3.
- Design tokens from `index.css` in project files — use this as the primary token source.
- `docs/prototypes/Hero.tsx` — Replit reference for visual patterns.
- `docs/ui-mocks/hero.png` — screenshot reference for visual target.

### Out of Scope

- All other Home sections: How I Work, Selected Work, Career Trajectory, Skills, Experience, Education, The Bridge, Beyond the Work, Contact CTA.
- Nav, Footer, stub routes, SEO, Vercel config.

---

## Agent Prompts — Sprint 0

### PRODUCT

```
[PRODUCT] — Sprint 0 Smoke Test

## Pre-Flight
1. Read docs/SPRINT_0_BACKLOG.md in full
2. Read docs/PORTFOLIO_CONTENT.md §1 and §3 only

## Task
You are the Product Owner. Single-epic smoke test sprint.
Write FEATURE_REQUIREMENTS.md:
1. State the sprint goal
2. Restate the user story verbatim
3. List all 13 ACs verbatim — do not rewrite them
4. List the 5 test criteria verbatim
5. Note any genuine ambiguities

## Output: docs/FEATURE_REQUIREMENTS.md
## Constraints: Do NOT invent requirements. Do NOT modify source files.
```

### ARCHITECT

```
[ARCHITECT] — Sprint 0 Smoke Test

## Pre-Flight
1. Read docs/FEATURE_REQUIREMENTS.md
2. Read docs/PORTFOLIO_CONTENT.md §1 and §3
3. Read docs/PORTFOLIO_IA.md §2 and §9
4. Read docs/prototypes/Hero.tsx — extract Tailwind class patterns,
   color token usage, responsive layout approach, button styles

## Task
You are the System Architect. Design the technical solution.

ARCHITECTURE_DESIGN.md:
1. Exact file tree to create
2. Each file: purpose, exports, imports
3. tailwind.config.ts: exact theme extension structure
4. next/font: exactly how three fonts load, where CSS vars are set
5. Hero component: semantic HTML structure, Tailwind class strategy
   (informed by the prototype pattern, adapted for Next.js App Router)

IMPLEMENTATION_PLAN.md checklist:
- [ ] TASK-1: Initialize Next.js 14 project
- [ ] TASK-2: Migrate design tokens to app/globals.css
- [ ] TASK-3: Configure tailwind.config.ts
- [ ] TASK-4: Set up font loading in app/layout.tsx
- [ ] TASK-5: Create lib/site-config.ts
- [ ] TASK-6: Create components/home/Hero.tsx
- [ ] TASK-7: Wire Hero into app/page.tsx
- [ ] TASK-8: Run build, dev, typecheck

## Output: docs/ARCHITECTURE_DESIGN.md and docs/IMPLEMENTATION_PLAN.md
## Constraints: Do NOT write implementation code. Do NOT create project files.
```

### TEST

```
[TEST] — Sprint 0 Smoke Test

## Pre-Flight
1. Read docs/FEATURE_REQUIREMENTS.md
2. Read docs/ARCHITECTURE_DESIGN.md
3. Read docs/IMPLEMENTATION_PLAN.md
4. Read docs/PORTFOLIO_CONTENT.md §3 (need exact copy strings)

## Task
Write FAILING tests BEFORE DEV implements.

1. Set up: Jest + React Testing Library (preferred) or Vitest
2. Write docs/TEST_SPEC.md mapping T-0.1–T-0.5 to test cases
3. Write src/__tests__/Hero.test.tsx implementing T-0.1–T-0.5
4. Run tests — ALL must FAIL (components don't exist yet)

## Output: docs/TEST_SPEC.md, test config, Hero.test.tsx, updated package.json
## Constraints: Tests MUST fail. Do NOT write production code.
```

### DEV

```
[DEV] — Sprint 0 Smoke Test

## Pre-Flight
1. Read docs/FEATURE_REQUIREMENTS.md
2. Read docs/ARCHITECTURE_DESIGN.md
3. Read docs/IMPLEMENTATION_PLAN.md
4. Read docs/TEST_SPEC.md and all test files
5. Read docs/PORTFOLIO_CONTENT.md §1 and §3
6. Read docs/prototypes/Hero.tsx — extract Tailwind patterns, 
   color usage, layout structure. Adapt to Next.js; do not copy verbatim.
7. View docs/ui-mocks/hero.png — this is the visual target

## Task
Execute IMPLEMENTATION_PLAN.md until ALL tests pass.
For each task: implement → mark [x] → run npm test → fix if needed.

After all [x]:
1. npm test — all pass
2. npx tsc --noEmit — zero errors
3. npm run build — succeeds
4. npm run dev — Hero renders at localhost:3000; visually matches hero.png

## Output: all project files, updated IMPLEMENTATION_PLAN.md, docs/IMPLEMENTATION_NOTES.md
## Hard constraints:
- Text MUST match PORTFOLIO_CONTENT.md §3 verbatim
- Tailwind only — no inline styles, no <style> tags
- Do NOT modify test files
- Prototype is reference only — adapt patterns, do not copy Vite-specific code
```

### PROFESSOR

```
[PROFESSOR] — Sprint 0 Smoke Test

## Pre-Flight
1. Read docs/IMPLEMENTATION_NOTES.md
2. Read every file listed as created or modified

## Task
Explain every file DEV created. For each:
1. What it IS
2. What it DOES (block by block)
3. WHY it exists
4. HOW it connects to other files

## Output: append to docs/CODE_EXPLAINER.md under "## Sprint 0"
## Constraints: Do NOT modify code. No assumed knowledge.
```

### REVIEWER

```
[REVIEWER] — Sprint 0 Smoke Test

## Pre-Flight
1. Read all docs/ files
2. Read all source files
3. Read all test files
4. View docs/ui-mocks/hero.png

## Task
Audit. For each check: ✅ PASS or ❌ FAIL with explanation.

1. AC Compliance — all AC-0.1–AC-0.13 satisfied
2. Plan Completion — all [ ] in IMPLEMENTATION_PLAN.md are [x]
3. Anti-Hallucination — no TODO, FIXME, placeholder in production code
4. Copy Accuracy — ALL Hero text matches PORTFOLIO_CONTENT.md §3 exactly
5. Tests Passing — all tests pass (run: npm test)
6. Type Safety — npx tsc --noEmit passes with zero errors
7. Build Success — npm run build succeeds
8. Styling Compliance — Tailwind only, no inline styles
9. Visual Fidelity — Hero visually matches docs/ui-mocks/hero.png

Run and include output: npm test · npx tsc --noEmit · npm run build

## Output: docs/AUDIT_REPORT.md — verdict APPROVED or REJECTED
## Constraints: Do NOT fix code. One failure = REJECTED.
```

---

## Expected File State After Sprint 0

```
adwait-portfolio/
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── home/
│       └── Hero.tsx
├── lib/
│   └── site-config.ts
├── src/
│   └── __tests__/
│       └── Hero.test.tsx
└── docs/
    ├── SPRINT_0_BACKLOG.md        ← this file (v4)
    ├── PORTFOLIO_PRD.md           ← v2 (in .gitignore)
    ├── PORTFOLIO_IA.md            ← v2 (in .gitignore)
    ├── PORTFOLIO_CONTENT.md       ← v3
    ├── SPRINT_1_BACKLOG.md        ← v4
    ├── FEATURE_REQUIREMENTS.md    ← PRODUCT
    ├── ARCHITECTURE_DESIGN.md     ← ARCHITECT
    ├── IMPLEMENTATION_PLAN.md     ← ARCHITECT → DEV
    ├── TEST_SPEC.md               ← TEST
    ├── IMPLEMENTATION_NOTES.md    ← DEV
    ├── CODE_EXPLAINER.md          ← PROFESSOR
    ├── AUDIT_REPORT.md            ← REVIEWER (APPROVED)
    ├── ui-mocks/
    │   └── hero.png               ← Replit screenshot
    └── prototypes/
        └── Hero.tsx               ← Replit source component
```

---

## What Sprint 0 Validates

- [ ] `npm run dev` boots, Hero renders at localhost:3000
- [ ] Hero visually matches `docs/ui-mocks/hero.png`
- [ ] Hero copy exactly matches PORTFOLIO_CONTENT.md §3 — verified visually
- [ ] All 5 Jest tests pass
- [ ] `npm run build` succeeds
- [ ] TypeScript typecheck passes with zero errors
- [ ] REVIEWER verdict is APPROVED
- [ ] All 7 docs/ communication files populated
- [ ] Pipeline handoff chain works

**If all boxes checked:** proceed to Sprint 1.
**If any fails:** debug the specific agent, fix, re-run from that agent forward. Do not start Sprint 1 until Sprint 0 is APPROVED.
