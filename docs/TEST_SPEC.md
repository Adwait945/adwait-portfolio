# Sprint 0 — Test Specification
_Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation_

## Test Runner
Jest + React Testing Library via `next/jest` (ADR-0004).
- Config: `jest.config.ts` (root)
- Setup: `jest.setup.ts` (root) — imports `@testing-library/jest-dom`
- `moduleNameMapper`: `^@/(.*)$ → <rootDir>/$1` (mirrors tsconfig `@/*` alias)
- Test environment: `jsdom`

## Snapshot Policy
No snapshot tests in Sprint 0. The Hero component contains only dynamic content sourced from `siteConfig`; snapshots would rot on every copy change and provide no additional protection over the explicit text assertions already written. Snapshots are forbidden by default per CLAUDE.md test discipline.

## Contract Test Tier Note
ARCHITECTURE_DESIGN.md §4 explicitly states Sprint 0 has zero API routes. The contract test file (`src/__tests__/contract/no-api-routes.test.ts`) documents this absence and asserts the `app/api/` directory does not exist. Real contract tests (using supertest) will be written in the first API-bearing sprint.

---

## Unit Tests

| AC-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| T-0.1, AC-0.7 | `src/__tests__/Hero.test.tsx` | T-0.1: renders without throwing an error | `render(<Hero />)` does not throw |
| T-0.2, AC-0.7, AC-0.9 | `src/__tests__/Hero.test.tsx` | T-0.2: rendered output contains exact headline | Full headline found in DOM |
| T-0.2, AC-UI-1.3 | `src/__tests__/Hero.test.tsx` | T-0.2b: h1 accessible name includes full headline | `getByRole('heading', {level:1})` has correct textContent |
| T-0.3, AC-0.7, AC-0.9, AC-UI-1.2 | `src/__tests__/Hero.test.tsx` | T-0.3: rendered output contains exact eyebrow text | Eyebrow string `"PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"` found |
| T-0.4, AC-0.7, AC-UI-1.5 | `src/__tests__/Hero.test.tsx` | T-0.4a: "View Featured Work" CTA is present | `getByRole('link', {name: /View Featured Work/i})` present |
| T-0.4, AC-0.7, AC-UI-1.6 | `src/__tests__/Hero.test.tsx` | T-0.4b: "How I Build" CTA is present | `getByRole('link', {name: /How I Build/i})` present |
| T-0.4, AC-0.7 | `src/__tests__/Hero.test.tsx` | T-0.4c: exactly two CTA links exist | `getAllByRole('link')` returns array of length 2 |
| T-0.5, AC-0.9 | `src/__tests__/Hero.test.tsx` | T-0.5: sub-headline verbatim text present | Exact sub-headline string found in DOM |
| AC-0.6, NFR-1.I | `src/__tests__/unit/site-config.test.ts` | AC-0.6: name is "Adwait Mulye" | `siteConfig.name === "Adwait Mulye"` |
| AC-0.6 | `src/__tests__/unit/site-config.test.ts` | AC-0.6: email is the correct contact email | `siteConfig.email === "adwaitmulye@gmail.com"` |
| AC-0.6 | `src/__tests__/unit/site-config.test.ts` | AC-0.6: linkedinUrl is a non-empty string | Non-empty string |
| AC-0.6 | `src/__tests__/unit/site-config.test.ts` | AC-0.6: githubUrl is a non-empty string | Non-empty string |
| AC-0.6 | `src/__tests__/unit/site-config.test.ts` | AC-0.6: subheadline is a non-empty string | Non-empty string |
| AC-0.6, AC-0.9 | `src/__tests__/unit/site-config.test.ts` | AC-0.6/AC-0.9: hero.eyebrow matches verbatim value | Exact eyebrow string |
| AC-0.9, NFR-1.I | `src/__tests__/unit/site-config.test.ts` | AC-0.9: headline segments concatenate to exact full headline | `headlineLead + headlineMuted + headlineTrailing + headlineAccent === "Bridging Product Strategy and Technical Execution"` |
| AC-0.9, AC-UI-1.3 | `src/__tests__/unit/site-config.test.ts` | AC-0.9: hero.headlineAccent is "Technical Execution" | Exact match |
| AC-0.9, AC-UI-1.3 | `src/__tests__/unit/site-config.test.ts` | AC-0.9: hero.headlineMuted is "and" | Exact match |
| T-0.5, AC-0.9 | `src/__tests__/unit/site-config.test.ts` | AC-0.9/T-0.5: subheadline matches verbatim from PORTFOLIO_CONTENT.md §3 | Exact sub-headline string with em-dash |
| AC-0.9 | `src/__tests__/unit/site-config.test.ts` | AC-0.9: sub-headline uses em-dash not hyphen | `toContain('—')` and no ` - ` |
| AC-0.7 | `src/__tests__/unit/site-config.test.ts` | AC-0.7: hero.primaryCta.label contains "View Featured Work" | String contains expected label |
| AC-0.7 | `src/__tests__/unit/site-config.test.ts` | AC-0.7: hero.primaryCta.href is "#" | `=== "#"` |
| AC-0.7 | `src/__tests__/unit/site-config.test.ts` | AC-0.7: hero.secondaryCta.label is "How I Build" | Exact match |
| AC-0.7 | `src/__tests__/unit/site-config.test.ts` | AC-0.7: hero.secondaryCta.href is "#" | `=== "#"` |
| NFR-1.I | `src/__tests__/unit/site-config.test.ts` | NFR-1.I: siteConfig.hero object exists with all required keys | All 7 hero keys present |
| AC-UI-1.2 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.2: eyebrow element exists with exact locked copy | Eyebrow text found |
| AC-UI-1.3 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.3: a single h1 element is present | Exactly one h1 |
| AC-UI-1.3 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.3: h1 contains text "Bridging Product Strategy" | Substring match |
| AC-UI-1.3 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.3: h1 contains text "and" (muted span) | Substring match |
| AC-UI-1.3 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.3: h1 contains text "Technical Execution" (accent span) | Substring match |
| AC-UI-1.3 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.3: full headline text assembled from spans matches locked copy | Normalized textContent exact match |
| AC-UI-1.4 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.4: sub-headline paragraph contains verbatim locked copy | Exact string match |
| AC-UI-1.5 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.5: primary CTA is an anchor linking to "#" | `<a href="#">` |
| AC-UI-1.6 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.6: secondary CTA is an anchor linking to "#" | `<a href="#">` |
| NFR-1.A, AC-UI-1.5 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.5: ArrowRight icon inside primary CTA is aria-hidden | All SVGs inside primary CTA have `aria-hidden="true"` |
| AC-UI-1.8 | `src/__tests__/unit/hero.test.tsx` | AC-UI-1.8: a section element wraps the Hero content | `document.querySelector('section')` not null |
| NFR-1.I | `src/__tests__/unit/hero.test.tsx` | NFR-1.I: eyebrow matches siteConfig.hero.eyebrow | Rendered text === siteConfig value |
| NFR-1.ST | `src/__tests__/unit/hero.test.tsx` | NFR-1.ST: section has no inline style attribute | `getAttribute('style')` is null |
| NFR-1.ST | `src/__tests__/unit/hero.test.tsx` | NFR-1.ST: h1 has no inline style attribute | `getAttribute('style')` is null |

---

## Integration Tests

| AC-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| AC-0.8 | `src/__tests__/integration/home-page.test.tsx` | AC-0.8: Home page renders without throwing | `render(<Home />)` does not throw |
| AC-0.8 | `src/__tests__/integration/home-page.test.tsx` | AC-0.8: Home page contains exactly one h1 (the Hero headline) | Exactly one h1 |
| AC-0.8 | `src/__tests__/integration/home-page.test.tsx` | AC-0.8: Hero eyebrow text is present in the page | Eyebrow string found |
| AC-0.8, T-0.5 | `src/__tests__/integration/home-page.test.tsx` | AC-0.8: Hero sub-headline is present in the page | Sub-headline exact match |
| AC-UI-1.10 | `src/__tests__/integration/home-page.test.tsx` | AC-UI-1.10: no nav element in the page | `document.querySelector('nav')` is null |
| AC-UI-1.10 | `src/__tests__/integration/home-page.test.tsx` | AC-UI-1.10: the only links are Hero CTAs pointing to "#" | All links have `href="#"` |

---

## Contract Tests

| AC-ID | Test File | Test Name | API Route | Expected Behavior |
|---|---|---|---|---|
| ARCHITECTURE §4 | `src/__tests__/contract/no-api-routes.test.ts` | app/api directory does not exist (no API routes in Sprint 0) | n/a | `fs.existsSync('app/api')` returns `false` |

_No HTTP contract tests applicable in Sprint 0. First API-bearing sprint will introduce supertest-based contract tests._

---

## Non-Functional Requirement Tests

| NFR-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: Hero has zero accessibility violations (axe WCAG 2.1 AA) | jest-axe reports zero violations |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: exactly one h1 element is present in Hero output | Single h1 |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: no h2-h6 elements in Hero (single heading level) | No sub-headings |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: primary CTA is a native anchor element | `tagName === 'a'` |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: secondary CTA is a native anchor element | `tagName === 'a'` |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: SVG icon inside primary CTA has aria-hidden="true" | All SVGs have `aria-hidden="true"` |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | NFR-1.A: no elements with role="button" exist in Hero | Zero `[role="button"]` nodes |
| NFR-1.I | `src/__tests__/unit/site-config.test.ts` | NFR-1.I: siteConfig.hero has all required keys | Object shape validated |
| NFR-1.I | `src/__tests__/unit/hero.test.tsx` | NFR-1.I: eyebrow matches siteConfig.hero.eyebrow | Rendered === config value |
| NFR-1.ST | `src/__tests__/unit/hero.test.tsx` | NFR-1.ST: section has no inline style attribute | No `style` attribute |
| NFR-1.ST | `src/__tests__/unit/hero.test.tsx` | NFR-1.ST: h1 has no inline style attribute | No `style` attribute |
| NFR-1.T | CLI gate: `npm run typecheck` | `tsc --noEmit` exits 0 | Zero TS errors |
| NFR-1.P | CLI gate: `npm run build` route table | First Load JS for `/` must not exceed 250KB | Within budget |
| NFR-1.S | CLI gate: grep for `process.env` in `app/` and `components/` | Zero matches | No secrets in client code |
| NFR-1.O | CLI gate: grep for `console.` in `app/` and `components/` | Zero matches | No console calls in production code |
| NFR-1.B | Manual: open in Chrome + Safari | No layout breakage | Passes browser check |

---

## AC Coverage Matrix

| AC-ID | Covered By |
|---|---|
| AC-0.1 | `npm run build` gate + REVIEWER |
| AC-0.2 | `npm run build` gate + REVIEWER (CSS file audit) |
| AC-0.3 | `npm run build` gate + REVIEWER |
| AC-0.4 | `npm run build` gate + REVIEWER |
| AC-0.5 | `integration/home-page.test.tsx` (no nav) |
| AC-0.6 | `unit/site-config.test.ts` (all fields) |
| AC-0.7 | `Hero.test.tsx` (T-0.1 – T-0.5), `unit/hero.test.tsx` |
| AC-0.8 | `integration/home-page.test.tsx` |
| AC-0.9 | `unit/site-config.test.ts` + `Hero.test.tsx` |
| AC-0.10 | Manual resize check (360px / 1440px) |
| AC-0.11 | `npm run build` gate |
| AC-0.12 | `npm run dev` manual check |
| AC-0.13 | `npm run typecheck` gate |
| AC-UI-1.1 | REVIEWER visual check |
| AC-UI-1.2 | `unit/hero.test.tsx` |
| AC-UI-1.3 | `unit/hero.test.tsx` |
| AC-UI-1.4 | `unit/hero.test.tsx` |
| AC-UI-1.5 | `unit/hero.test.tsx`, `a11y/hero-a11y.test.tsx` |
| AC-UI-1.6 | `unit/hero.test.tsx`, `a11y/hero-a11y.test.tsx` |
| AC-UI-1.7 | Manual responsive check |
| AC-UI-1.8 | `unit/hero.test.tsx` |
| AC-UI-1.9 | REVIEWER visual check (`overflow-hidden` class) |
| AC-UI-1.10 | `integration/home-page.test.tsx` |
| NFR-1.P | `npm run build` route table |
| NFR-1.A | `a11y/hero-a11y.test.tsx` |
| NFR-1.B | Manual browser check |
| NFR-1.I | `unit/site-config.test.ts`, `unit/hero.test.tsx` |
| NFR-1.S | grep gate |
| NFR-1.O | grep gate |
| NFR-1.T | `npm run typecheck` gate |
| NFR-1.ST | `unit/hero.test.tsx` |
