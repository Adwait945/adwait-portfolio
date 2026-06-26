# ADR-0001: Font loading via next/font/google (self-hosted), not CDN
_Date: 2026-06-25 · Status: Accepted · Sprint: 0_

## Context
The portfolio uses three typefaces — Inter (body), Space Grotesk (display), JetBrains Mono (mono) — per CLAUDE.md and AC-0.4. The existing scaffold loads Geist via `next/font/local`. We must replace it. Fonts must be wired to CSS variables (`--font-sans`, `--font-display`, `--font-mono`) so Tailwind's `fontFamily` can reference them. Performance budget (NFR-1.P): TTI < 1.5s on 3G, First Load JS ≤ 250KB; CLS must stay low.

## Options Considered
1. **`next/font/google` (self-hosted at build, variable CSS vars)** — Pros: zero render-blocking network request (fonts are inlined/self-hosted by Next at build), automatic `size-adjust` fallback metrics to minimize CLS, `display: "swap"`, no external domain dependency, works offline in dev. Cons: build-time font fetch from Google (one-time), slightly larger build step.
2. **CDN `<link>` to Google Fonts** — Pros: trivially simple. Cons: extra render-blocking request to a third-party origin, privacy/GDPR exposure, higher CLS risk, explicitly forbidden by AC-0.4 ("No CDN font links").
3. **`next/font/local` with self-supplied woff2 files** — Pros: full control, no Google dependency at build. Cons: must vendor and maintain three font files + weights manually; more upkeep than needed for standard Google-hosted families.

## Decision
Use **`next/font/google`** for all three families, each configured with `subsets: ["latin"]`, `display: "swap"`, and a `variable` (`--font-sans` / `--font-display` / `--font-mono`). Apply the variable classNames to `<html>`. Tailwind `fontFamily` reads the CSS variables. This satisfies AC-0.4 directly, minimizes CLS via Next's automatic fallback metrics, and adds no client JS.

## Consequences
- Positive: No render-blocking CDN request; low CLS; clean Tailwind `font-sans/display/mono` utilities; offline-capable dev.
- Negative: Build depends on a one-time Google font fetch (mitigated by Next's caching; not a runtime dependency).
- Follow-ups: Sprint 1 sections inherit the same three fonts automatically. If Google Fonts availability becomes a build concern, migrate to option 3 (`next/font/local`) with vendored woff2 — the `--font-*` variable contract stays identical, so no component changes.
