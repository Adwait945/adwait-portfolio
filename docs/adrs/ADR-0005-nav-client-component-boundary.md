# ADR-0005: Nav as a Client Component island; all other sections stay Server Components
_Date: 2026-06-25 · Status: Proposed · Sprint: 1_

## Context
Sprint 1 adds a global Nav that must: stick on scroll and apply a backdrop-blur after ~80vh (AC-1.3), highlight the active route (AC-1.5), expose a Resume dropdown (AC-1.2), and collapse into a hamburger-driven full-screen overlay with a focus trap below 768px (AC-1.4, NFR-1.A). These all require browser-only APIs (`useState`, `useEffect` scroll listener, `usePathname`, focus/keyboard handling). Meanwhile NFR-1.P caps layout JS at ~5KB and NFR-11.P targets Lighthouse perf ≥ 90, so we want to ship as little client JS as possible. The 10 home sections, Footer, stub pages, and Teams Retro skeleton are entirely static copy from `siteConfig`.

## Options Considered
1. **Single large Client `Nav.tsx` containing menu + dropdown inline** — Pros: one file, fewer imports. Cons: risks exceeding the 200-line cap (NFR-G.SL) once scroll logic + active-route + focus trap + dropdown coexist; harder to unit-test the focus trap in isolation.
2. **Nav split into `Nav` + `MobileMenu` + `ResumeDropdown` client components; everything else RSC** — Pros: each interactive concern is isolated and under the line cap; the only client JS on the home route is the Nav island; static sections ship zero JS; focus-trap logic is independently testable. Cons: more files; minor prop-passing between Nav and its children.
3. **Make sections Client Components too (e.g., to add framer-motion entrance animations like the prototypes)** — Pros: visual parity with Replit prototypes. Cons: ships client JS for otherwise-static content, hurts NFR-1.P/NFR-11.P, and no AC requires animation (DEBT-1.4). Rejected.

## Decision
Adopt **Option 2**. `Nav.tsx`, `MobileMenu.tsx`, and `ResumeDropdown.tsx` are the only Sprint-1 `"use client"` components (plus the pre-existing `app/error.tsx`). Every home section, the Footer, Container, SkipLink, BackLink, StubPageLayout, TeamsRetroSkeleton, and all page routes are React Server Components reading `siteConfig` at module scope. The Nav is a self-contained client island in the root layout; the rest of every page is static server-rendered HTML.

## Consequences
- Positive: home route's First Load JS is dominated only by the Nav island → satisfies NFR-1.P (≤5KB layout JS) and supports Lighthouse ≥ 90; focus-trap and dropdown logic are isolated and testable; each file stays under 200 lines.
- Negative: three small client files instead of one; Nav must pass `open`/`onClose`/`links`/`pathname` down to `MobileMenu`.
- Follow-ups: if a future sprint wants section entrance animations, wrap only the animated subtree in a thin client component (DEBT-1.4), never convert whole sections.
