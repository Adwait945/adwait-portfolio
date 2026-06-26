# ADR-0002: Centralize locked copy in a typed site-config.ts, not MDX/CMS
_Date: 2026-06-25 · Status: Accepted · Sprint: 0_

## Context
`PORTFOLIO_CONTENT.md` is the single source of truth for all visible copy. AC-0.6/AC-0.9 require the Hero's strings to come from a central typed location and match the content doc verbatim. NFR-1.I requires no hardcoded user-facing strings inside component JSX, to keep future i18n extraction tractable. We must pick where transcribed copy lives.

## Options Considered
1. **Typed `lib/site-config.ts` constants** — Pros: zero runtime cost (compile-time constants), full TypeScript safety, trivial to test, single import point, easy i18n extraction later. Cons: copy changes require a code edit + commit (acceptable — copy is "locked").
2. **MDX content files** — Pros: nice for long-form prose. Cons: overkill for short structured strings (eyebrow, headline, CTA labels); adds an MDX toolchain dependency not needed at Sprint 0; harder to type-check individual fields.
3. **Headless CMS / DB-backed content** — Pros: editable without deploy. Cons: requires a backend (explicitly out of scope until Sprint 2+), adds latency and a failure mode, and the copy is intentionally locked, not user-editable.

## Decision
Store transcribed copy as **typed constants in `lib/site-config.ts`** (`siteConfig: SiteConfig`). Components import named fields; no string literals appear in JSX. The headline is decomposed into segments (`headlineLead`/`headlineMuted`/`headlineTrailing`/`headlineAccent`) so the component can apply per-segment colors without hardcoding copy.

## Consequences
- Positive: Type-safe, testable, zero runtime cost, satisfies NFR-1.I and AC-0.6/0.9. A single file becomes the i18n extraction surface.
- Negative: Copy edits are code edits (acceptable for locked copy). Risk of drift from `PORTFOLIO_CONTENT.md` — mitigated by REVIEWER's verbatim copy check (AUDIT check #4).
- Follow-ups: Sprint 1 extends `siteConfig` with the remaining sections (How I Work, Selected Work, etc.). If editor-driven content is ever needed, the `SiteConfig` type becomes the schema for a future CMS adapter.
