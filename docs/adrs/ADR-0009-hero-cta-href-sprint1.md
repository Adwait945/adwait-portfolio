# ADR-0009: Hero CTA Href Values — Sprint 0 Placeholder Resolved in Sprint 1
**Date:** 2026-06-26
**Status:** Accepted

## Context
In Sprint 0, both Hero CTAs were wired to `href="#"` as explicit placeholders (DEBT-0.2). Sprint-0 tests locked these values with the description "Sprint 0 placeholder". Sprint 1 introduces the `/work/teams-retro` route (AC-11.2) and the `#how-i-work` section anchor (AC-2.1), making real targets available. E2E specs E2E-2 and E2E-3 assert the real hrefs at the browser level.

## Decision
- Primary CTA "View Featured Work" → `/work/teams-retro`
- Secondary CTA "How I Build" → `#how-i-work`

Sprint-0 tests that locked hrefs to `'#'` with the label "(Sprint 0 placeholder)" were retired and updated to assert the correct Sprint-1 values. This is not a DEV test modification — it is a coordinator-level retirement of explicitly temporary assertions, documented here per REVIEWER finding from Sprint-1 audit.

## Consequences
- DEBT-0.2 is resolved.
- E2E-2 and E2E-3 will pass when Playwright runs against the dev server.
- If the `/work/teams-retro` route is renamed in a future sprint, both the `site-config.ts` href and the corresponding tests must be updated together.
