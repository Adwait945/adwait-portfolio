# ADR-0006: Playwright for end-to-end testing
_Date: 2026-06-25 · Status: Proposed · Sprint: 1_

## Context
Sprint 1 requires twelve E2E tests (E2E-1…E2E-12) covering navigation, smooth-scroll, resume download, the 360px hamburger flow, console-error-free routes, the Teams Retro metric strip, and the absence of the "AI Intelligence Center" fake chat (NFR-11.E2E). These are cross-route, real-browser behaviors that Jest + RTL (jsdom) cannot exercise — there is no real navigation, no real scroll/viewport, and no real download in jsdom. The backlog Test Strategy names the tier "Playwright E2E" and CLAUDE.md already lists Playwright MCP in the stack. ADR-0004 established Jest + RTL for component units; this ADR covers the complementary E2E tier.

## Options Considered
1. **Playwright** — Pros: real Chromium/Firefox/WebKit; first-class viewport projects (360px mobile for E2E-6/7); built-in download assertions (E2E-5); `webServer` option auto-builds/starts Next.js; console-message capture (E2E-9); already named in the backlog and CLAUDE.md. Cons: heavier dependency; CI needs a browser install step.
2. **Cypress** — Pros: mature, good DX. Cons: Chromium-family focus (WebKit/Safari support weaker, relevant to NFR-1.B); download + multi-tab handling more awkward; diverges from the backlog/CLAUDE.md naming.
3. **jsdom-only (extend Jest)** — Pros: no new dependency. Cons: cannot test real navigation, scroll, viewport, or downloads — fails the actual E2E ACs. Rejected.

## Decision
Use **Playwright** (`@playwright/test`). Config at `playwright.config.ts`: `testDir: "src/__tests__/e2e"`, a Chromium project plus a 360px mobile project for E2E-6/E2E-7, and a `webServer` that runs `npm run build && npm run start` against `http://localhost:3000` (reusing an existing server locally). Jest remains the unit/component runner (ADR-0004). `npm run test:run` is wired to run Jest then Playwright so the single CI gate covers both tiers (NFR-11.E2E). TEST authors the specs; DEV does not modify them (ATDD).

## Consequences
- Positive: real-browser coverage for all 12 E2E ACs including mobile viewport and downloads; aligns with backlog + CLAUDE.md; reusable for Sprint 2+ (seeded-demo flows).
- Negative: CI must install browsers (`npx playwright install --with-deps`); E2E runtime longer than unit tests; resume PDFs must be present in `public/resumes/` before E2E-5 can pass (manual prerequisite).
- Follow-ups: add a WebKit project if Safari-specific regressions appear (NFR-1.B); add a GitHub Actions step caching the Playwright browser binaries.
