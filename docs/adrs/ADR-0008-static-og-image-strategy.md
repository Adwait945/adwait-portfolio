# ADR-0008: Static Open Graph image for all routes (defer dynamic OG)
_Date: 2026-06-25 · Status: Proposed · Sprint: 1_

## Context
All five routes must expose valid Open Graph preview metadata — `og:title`, `og:description`, `og:image`, `og:url` (AC-11.8, NFR-G.OG, NFR-11.SEO). The site must "preview correctly when shared" (Epic 11 user story). Next.js App Router supports two OG-image approaches: a static image file referenced in `metadata.openGraph.images`, or per-route dynamic images via `opengraph-image.tsx` (rendered at the edge with `@vercel/og`). The backlog Out-of-Scope list explicitly states: "Per-route dynamic OG images via `opengraph-image.tsx` (static `og:image` referencing `public/opengraph.jpg` is acceptable at Sprint 1)."

## Options Considered
1. **Single static `public/opengraph.jpg` referenced by every route's metadata** — Pros: simplest; zero runtime cost; satisfies AC-11.8 + NFR-G.OG; explicitly sanctioned by the backlog; no extra dependency. Cons: every route shares one preview image (titles/descriptions still differ per route via metadata text).
2. **Per-route dynamic OG via `opengraph-image.tsx` + `@vercel/og`** — Pros: tailored image per page. Cons: explicitly out of scope this sprint; adds the `@vercel/og` runtime, edge-render cost, and more surface to test; unnecessary for a five-route portfolio at MVP.
3. **No OG image (text-only OG tags)** — Pros: least work. Cons: violates NFR-G.OG (`og:image` required) and produces poor link previews. Rejected.

## Decision
Use a **single static `public/opengraph.jpg`**, referenced from `siteConfig.ogImage` and included in every route's `metadata.openGraph.images` (and `twitter` card). Per-route `title`/`description`/`url` still come from `siteConfig.meta.<route>` (§15), so each share preview shows the correct text with a consistent brand image. `siteConfig.siteUrl` (env-overridable via `NEXT_PUBLIC_SITE_URL`) provides the absolute base for `og:url` and the sitemap.

## Consequences
- Positive: meets AC-11.8 + NFR-G.OG with no runtime cost or new dependency; aligns with the backlog's explicit allowance; verifiable post-deploy via opengraph.xyz (Tier 3).
- Negative: all routes share one preview image; the `opengraph.jpg` asset must be created and committed before deploy (manual prerequisite).
- Follow-ups: a later sprint may adopt `opengraph-image.tsx` for per-route dynamic images (e.g., the Teams Retro case study) once dynamic OG is in scope.
