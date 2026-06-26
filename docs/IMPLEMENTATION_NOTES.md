# Sprint 0 — Implementation Notes
_Written by DEV on 2026-06-25, session 1_

## Pre-Flight (read before any production code)
- Read `docs/IMPLEMENTATION_PLAN.md`, `docs/ARCHITECTURE_DESIGN.md`, `docs/TEST_SPEC.md`, `docs/PORTFOLIO_CONTENT.md` (§1, §3 locked copy).
- Read prototype `docs/prototypes/Hero.tsx` — extracted Tailwind class strings and JSX structure; dropped `framer-motion`, shadcn `Button`, and hardcoded hex per ARCHITECTURE_DESIGN §2.
- Read all 6 test files in `src/__tests__/` (Hero.test.tsx, unit/site-config.test.ts, unit/hero.test.tsx, contract/no-api-routes.test.ts, integration/home-page.test.tsx, a11y/hero-a11y.test.tsx).
- Confirmed project uses repo-root `app/`, `components/`, `lib/` (tsconfig `@/* → ./*`); jest `moduleNameMapper` mirrors this.
- `docs/ui-mocks/Hero.png` not present in repo; relied on prototype + locked copy.

## Session Summary
- Tasks completed: TASK-0.0 through TASK-0.13.
- Files created: `lib/site-config.ts` (38), `components/home/Hero.tsx` (50), `app/error.tsx` (24).
- Files modified: `package.json`/`package-lock.json` (added lucide-react), `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`.
- Jest config/setup (`jest.config.ts`, `jest.setup.ts`) already present from TEST agent and matched the spec — TASK-0.8 required no change.

## Decisions Made
- Eyebrow `role` field in `siteConfig` reuses the verbatim eyebrow string (ARCHITECTURE_DESIGN §1 says "eyebrow string also reused as role descriptor").
- `hero.subheadline?` added as an OPTIONAL field (value left on top-level `siteConfig.subheadline`). Rationale: `unit/site-config.test.ts:63,70` reference `siteConfig.hero?.subheadline`; under `strict` tsc this access must type-check. Adding the optional key satisfies the type gate without changing any test. The subheadline value still lives on the top-level field, which is what the Hero renders.
- Headline segmentation: `headlineLead="Bridging Product Strategy "`, `headlineMuted="and"`, `headlineTrailing=" "`, `headlineAccent="Technical Execution"`. Concatenation equals the full headline (verified by test). Hero renders segments back-to-back so the h1 normalized textContent is exactly the locked headline.
- Background gradient overlay uses token classes (`from-background via-card to-background`) instead of the prototype's hardcoded hex, per ARCHITECTURE_DESIGN §2 style-conversion table.

## Deviations from Plan
- None functional. All Hero copy, classes, and structure follow IMPLEMENTATION_PLAN TASK-0.5 verbatim.

## Env Variables Added
- None. Sprint 0 reads no `process.env` in any app/components/lib path (verified by grep gate, NFR-1.S).

## Known Issues / Follow-Ups (for REVIEWER)
- **BLOCKER — defective test `src/__tests__/Hero.test.tsx` T-0.2** (`"T-0.2: rendered output contains exact headline ..."`). This test uses `screen.getByText` with a predicate that ignores the supplied `content` arg and inspects `element.textContent`. Because every ancestor element (`<body>`, RTL's `<div>` container, `<section>`, wrapper `<div>`s, and the `<h1>`) shares the same full `textContent`, the predicate matches multiple elements and `getByText` throws "Found multiple elements". Empirically reproduced: even a bare `<h1>` with the headline matches 3 elements (BODY, DIV, H1). The test is **unsatisfiable by any valid DOM** and cannot be made to pass without editing it — which DEV is forbidden to do. The equivalent, correct assertion **T-0.2b** (`getByRole('heading',{level:1})` with `toHaveTextContent`) PASSES, as do all 51 other tests. Recommend TEST agent fix T-0.2 to use `getByRole('heading',{level:1})` (or assert on `queryAllByText(...).length`) so it targets a single element. DEV did not modify the test per CLAUDE.md test-discipline rule.
- **Dependency audit** reports 4 high / 18 moderate vulnerabilities, all in the **pre-existing scaffold** (`next@14.2.35` framework advisories and transitive `glob`), none introduced by this sprint's `lucide-react` addition. Fix requires a breaking `next` major upgrade — out of Sprint 0 scope. Flagged for a future security sprint.

## Test Results
- Tests passing: 51 / 52 (1 failing = defective T-0.2 above; not a production defect).
  - unit/site-config.test.ts: PASS, unit/hero.test.tsx: PASS, integration/home-page.test.tsx: PASS, contract/no-api-routes.test.ts: PASS, a11y/hero-a11y.test.tsx: PASS (zero axe violations), Hero.test.tsx: T-0.2 fails; all others (T-0.1, T-0.2b, T-0.3, T-0.4a/b/c, T-0.5) pass.
- Type check (`npm run typecheck`): PASS (0 errors).
- Build (`npm run build`): PASS (clean, 5 static pages).
- Lint (`npm run lint`): PASS (0 warnings/errors).
- Dependency audit: 4 high (all pre-existing scaffold, not introduced this sprint).

## Bundle Size (frontend)
- `/` First Load JS: 88 kB vs. 250KB budget — within budget (~35%).

## Global UI Infrastructure re-verification (touched layout/tailwind/globals)
- `<html lang="en" className="dark ...fontVars">` intact in `app/layout.tsx`.
- 3 fonts (Inter→--font-sans, Space_Grotesk→--font-display, JetBrains_Mono→--font-mono) with `display:"swap"` + `variable` on `<html>`.
- 8 authoritative CSS tokens present in `app/globals.css :root` (HSL channel triplets, no hex).
- `@layer base` body + h1–h6 rules and `@layer utilities` `.glass`/`.glass-card`/`.text-gradient` present per ARCHITECTURE_DESIGN §7.5.
- Tailwind: `darkMode:"class"`, colors mapped to `hsl(var(--*))`, font families and borderRadius derived from `--radius`.
