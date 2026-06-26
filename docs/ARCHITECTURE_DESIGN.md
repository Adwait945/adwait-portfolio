# Sprint 0 — Architecture Design
_Written by ARCHITECT on 2026-06-25_

## 0. Pre-Flight Summary

- **Mem0:** Not invoked in this pre-flight (no MCP call made in the read phase). First sprint — no prior architecture decisions to recall. This document establishes the baseline that future sprints recall.
- **Prior ADRs:** None exist (`docs/adrs/` is empty). This sprint creates ADR-0001 through ADR-0004.
- **TECH_DEBT.md:** Did not exist before this sprint. This sprint introduces no debt to address; two new debt items are logged (see §9).
- **Existing scaffold state** (audited, all confirmed default `create-next-app` output that must be rewritten):
  - `app/layout.tsx` — loads **Geist local fonts** (`./fonts/GeistVF.woff`), metadata is `"Create Next App"`, no `dark` class on `<html>`. Full rewrite required (AC-0.4, AC-0.5).
  - `app/globals.css` — default light/dark `prefers-color-scheme` tokens, `Arial` body font, a `.text-balance` utility. Full rewrite required (AC-0.2).
  - `app/page.tsx` — default Next.js landing page with `next/image` logos and external links. Full rewrite required (AC-0.8).
  - `tailwind.config.ts` — only `background`/`foreground` mapped to bare `var(--background)`. Full rewrite required (AC-0.3).
  - `tsconfig.json` — **already** has `strict: true` and `@/* → ./*` path alias. No change needed; `@/components/...` and `@/lib/...` imports resolve.
  - `package.json` — has `next`, `react`, `tailwindcss`, `eslint`. **Missing**: `lucide-react` (needed for `ArrowRight`), and a full test toolchain + a `typecheck` script. The `lint` script exists; `dev`/`build`/`start` exist.
- **Prototype audit:** `docs/prototypes/Hero.tsx` is Vite/Replit-flavored — imports `framer-motion`, `@/components/ui/button` (shadcn). Both are out of scope for Sprint 0. We extract the Tailwind class strings and JSX structure only.

---

## 1. Component Inventory

Every file DEV creates or modifies in Sprint 0. No file exceeds 200 lines.

| File | Action | Role | Exports |
|---|---|---|---|
| `tailwind.config.ts` | Rewrite | Theme tokens: colors mapped to `hsl(var(--*))`, three font families bound to `--font-*` vars, `borderRadius` from `--radius`, `darkMode: "class"` | `default` (Config) |
| `app/globals.css` | Rewrite | Design token set in `:root`, `@layer base`, `@layer utilities` (`.glass`, `.glass-card`, `.text-gradient`) | n/a (CSS) |
| `app/layout.tsx` | Rewrite | Root layout shell; loads 3 fonts via `next/font/google`, sets font CSS vars + `dark` class on `<html>`, exports metadata | `default` (RootLayout), `metadata` |
| `lib/site-config.ts` | Create | Typed, centralized content constants sourced from `PORTFOLIO_CONTENT.md` §1 + §3 | `siteConfig`, `type SiteConfig` |
| `components/home/Hero.tsx` | Create | Presentational Hero section: eyebrow, headline, sub-headline, two CTA anchors. Server Component (no client interactivity in Sprint 0) | `default` (Hero) |
| `app/page.tsx` | Rewrite | Home route; renders `<Hero />` as sole content | `default` (Home) |
| `app/error.tsx` | Create | Route-level error boundary (CLAUDE.md React rule). Client Component | `default` (Error) |
| `package.json` | Modify | Add `lucide-react`; add test toolchain + `test`, `test:run`, `typecheck` scripts | n/a |
| `jest.config.ts` | Create | Jest + RTL config via `next/jest`, jsdom env, `@/*` moduleNameMapper | `default` |
| `jest.setup.ts` | Create | `@testing-library/jest-dom` import | n/a |
| `src/__tests__/Hero.test.tsx` | Create (by TEST agent, not DEV) | T-0.1 – T-0.5 | n/a |

### Component prop interfaces

```ts
// components/home/Hero.tsx
// No props. Hero pulls its copy from siteConfig at module scope.
function Hero(): JSX.Element

// app/error.tsx (Next.js App Router error boundary contract)
function Error(props: { error: Error & { digest?: string }; reset: () => void }): JSX.Element
```

```ts
// lib/site-config.ts
export type SiteConfig = {
  name: string;          // "Adwait Mulye"
  role: string;          // eyebrow string (also reused as role descriptor)
  headline: string;      // full headline plain text (metadata / a11y reference)
  subheadline: string;   // §3 sub-headline, verbatim
  email: string;         // adwaitmulye@gmail.com
  linkedinUrl: string;   // §1
  githubUrl: string;     // §1
  hero: {
    eyebrow: string;          // "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"
    headlineLead: string;     // "Bridging Product Strategy "  (trailing space)
    headlineMuted: string;    // "and"
    headlineTrailing: string; // " "  (single space)
    headlineAccent: string;   // "Technical Execution"
    primaryCta: { label: string; href: string };    // "View Featured Work", "#"
    secondaryCta: { label: string; href: string };  // "How I Build", "#"
  };
};
export const siteConfig: SiteConfig;
```

> **Headline segmentation rationale:** AC-UI-1.3 requires "and" in muted slate and "Technical Execution" in cyan, the rest in white. Rather than hardcode three `<span>`s with literal strings in JSX (which violates NFR-1.I — no hardcoded user-facing copy in components), the headline is decomposed into named segments in `siteConfig.hero`. The component maps each segment to a span with the correct color class. The exact rendered string `"Bridging Product Strategy and Technical Execution"` (required by T-0.2) must equal `headlineLead + headlineMuted + headlineTrailing + headlineAccent` with exactly single spaces between words. DEV must verify this concatenation. (`headlineLead` ends with one trailing space; `headlineTrailing` is one space.)

---

## 2. Prototype Review — `docs/prototypes/Hero.tsx`

### Visual Inventory (matched against `docs/ui-mocks/hero.png`)
- `<section>`: `relative min-h-screen flex items-center justify-center pt-20 overflow-hidden`, dark navy background.
- Absolute gradient layer (`bg-gradient-to-br from-[#030A14] via-[#050d1a] to-[#030A14]`) behind content at `z-0`.
- Content container: `container mx-auto px-4 md:px-6 relative z-10` → inner `flex flex-col items-center text-center max-w-4xl mx-auto`.
- Eyebrow pill: `px-6 py-2 text-xs font-mono tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full glass mb-12 inline-block`.
- `<h1>`: `text-6xl md:text-8xl font-bold tracking-tighter mb-12 leading-[1.1] text-white`, with `<span className="text-slate-500">and</span>` and `<span className="text-primary">Technical Execution</span>`.
- Sub-headline `<p>`: `text-lg md:text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed`.
- Button row: `flex flex-col sm:flex-row gap-6`.
- Primary button: `bg-primary text-primary-foreground hover:opacity-90 font-bold px-12 rounded-xl h-16 text-lg shadow-[0_0_20px_rgba(0,229,255,0.3)]` + `<ArrowRight className="ml-2 w-5 h-5" />`.
- Secondary button: `glass border-white/10 hover:bg-white/10 text-white px-12 rounded-xl h-16 text-lg`.

### Gap Analysis (what the prototype lacks for production)
- **State management:** None needed — Hero is static. No store, no fetch.
- **API calls:** None.
- **Error handling:** Prototype has none. Production adds `app/error.tsx` route boundary (no error source inside Hero, but the route rule requires it).
- **Loading / empty states:** N/A — no async data.
- **Accessibility:** Prototype renders shadcn `<Button>` (a `<button>`, not a link) with a no-op `onClick`. Production gaps to close:
  - CTAs are navigational → render as `<a href>` anchors styled like buttons, so they are keyboard-activatable and semantically correct (AC-UI / NFR-1.A).
  - `ArrowRight` icon must be `aria-hidden="true"` (NFR-1.A).
  - Visible focus indicators required on both CTAs (`focus-visible:ring-*`). The prototype provides none.
  - `<h1>` must be the single top-level heading on the page.
  - The `<br/>` line breaks in the headline are decorative; the accessible name must remain `"Bridging Product Strategy and Technical Execution"`. Do not insert punctuation or hidden text between segments.
- **Responsive behavior:** Prototype is responsive (`md:`, `sm:`). Verify 360px has no horizontal overflow (AC-0.10, AC-UI-1.9 — `overflow-hidden` on section).

### Style Conversion (Vite → Next.js App Router)
| Prototype (do NOT carry over) | Production replacement |
|---|---|
| `import { motion } from "framer-motion"` | Removed — animations out of scope (Sprint 0). Plain `<div>`/`<h1>`/`<p>`. |
| `import { Button } from "@/components/ui/button"` (shadcn) | Removed — shadcn out of scope. Styled `<a>` anchors with Tailwind classes. |
| `bg-[#030A14]` hardcoded hex | `bg-background` token (`--background` ≈ `#030A14`). Optional subtle gradient overlay may keep arbitrary values. |
| `<Button onClick={() => {}}>` | `<a href={siteConfig.hero.secondaryCta.href}>` styled identically. |
| Inline literal copy in JSX | All strings come from `siteConfig` (NFR-1.I). |

### Integration Path for DEV
1. Read `PORTFOLIO_CONTENT.md` §1 + §3 → populate `lib/site-config.ts`.
2. Read the prototype for class strings; read `hero.png` for the visual target.
3. Build `Hero.tsx` as a Server Component: section → gradient layer → container → centered column → eyebrow `<span>` → `<h1>` (segmented spans) → `<p>` → button row of two `<a>` anchors.
4. Pull every visible string from `siteConfig`; pull the icon from `lucide-react`.
5. Wire `<Hero />` into `app/page.tsx`.

---

## 3. Data Flow

No database in Sprint 0 (CLAUDE.md: "None at MVP"). Content flows statically at build time:

```
PORTFOLIO_CONTENT.md §1, §3   (locked copy, human-authored)
        │  (DEV transcribes verbatim — zero paraphrasing, AC-0.9)
        ▼
lib/site-config.ts   →   export const siteConfig: SiteConfig   (typed constants)
        │  (import at module scope)
        ▼
components/home/Hero.tsx   →   reads siteConfig.hero.*   (renders spans/anchors)
        │  (default export)
        ▼
app/page.tsx   →   <Hero />   (sole content of the / route)
        ▼
Rendered HTML (Server Component, static at build time)
```

- **No new store methods.** No client state.
- **No new API endpoints.** (See §4.)
- **New types:** `SiteConfig` in `lib/site-config.ts`. No `src/types/index.ts` needed yet — introduced when shared types appear in Sprint 1.
- **Rendering model:** `Hero` is a React Server Component (no `useState`/`useEffect`/event handlers). This keeps client JS minimal (NFR-1.P). `app/error.tsx` is the only Client Component (`"use client"`), per the Next.js error-boundary contract.

---

## 4. API Contracts

**None.** Sprint 0 has zero API routes and zero server route handlers (explicitly out of scope per FEATURE_REQUIREMENTS.md and the backlog scope table). The `/` route is a statically-rendered page with no data fetching.

There is nothing for TEST to write contract tests against in this sprint. The contract-test tier (`src/__tests__/contract/`) is **not applicable** to Sprint 0 and is deferred to the first API-bearing sprint.

---

## 5. Migration Strategy

**None.** Sprint 0 has no database, no schema, no persisted data (CLAUDE.md: MongoDB Atlas arrives in Sprint 2+). There is no forward migration and no rollback to document.

The only "migration-like" action is the design-token migration from the Replit `index.css` into `app/globals.css`. This is a one-way, build-time file rewrite with no data implications. Rollback = `git revert` of the globals.css commit. It carries no runtime migration risk.

---

## 6. Breaking Change Risk

Sprint 0 is a greenfield rewrite of scaffold defaults; there are no downstream consumers yet. Risks are about silently breaking the *foundation itself*:

1. **Dropping the dark theme.** The current scaffold relies on `@media (prefers-color-scheme: dark)`. If DEV rewrites `globals.css` to token-based `:root` values but forgets `className="dark"` on `<html>` (AC-UI-1.1), the page still renders (tokens are on `:root`, not `.dark`), but any future `.dark`-scoped token or `dark:` variant breaks. **Mitigation:** AC-UI-1.1 + §7 make `dark` on `<html>` a hard, REVIEWER-verified requirement.
2. **Font swap CLS.** Replacing Geist local fonts with `next/font/google` changes metrics. If `display: "swap"` is missing or `variable` is not wired to `--font-sans/-display/-mono`, fonts fall back to system and the headline reflows (CLS → NFR-1.P). **Mitigation:** ADR-0001 mandates `next/font/google` with `variable` + `display: "swap"`; Tailwind `fontFamily` reads the vars.
3. **Breaking `.glass` / `.glass-card` / `.text-gradient`.** Defined in `@layer utilities` in `globals.css`. The eyebrow pill (AC-UI-1.2) and secondary CTA (AC-UI-1.6) depend on `.glass`. A malformed `@layer utilities` block or a missing `--primary`/`--card`/`--border` token strips the frosted background and cyan border. **Mitigation:** §7.5 enumerates each utility's exact definition; REVIEWER visual check catches regressions.
4. **`@/*` path alias under Jest.** Hero imports `@/lib/site-config`; `app/page.tsx` imports `@/components/home/Hero`. tsconfig maps `@/* → ./*`, and Jest must mirror this via `moduleNameMapper` (§10) or the suite fails to resolve imports.
5. **Orphaned Geist imports.** After the rewrite, `app/fonts/GeistVF.woff` references are removed. The font files may remain on disk harmlessly, but `next/font/local` imports must be deleted or the build fails if files are later removed. **Mitigation:** TASK-0.3 removes all Geist imports.

---

## 7. Global UI Infrastructure (CRITICAL — preserve across every future rewrite)

DEV sets every item below in Sprint 0. From Sprint 1 onward, DEV must re-verify all of them after touching `layout.tsx`, `tailwind.config.ts`, or `globals.css`. REVIEWER checks each one.

### 7.1 Theme mode
- `<html lang="en" className="dark ...fontVars">` in `app/layout.tsx`. The `dark` class is mandatory (AC-UI-1.1). Dark-only at MVP — no theme toggle.

### 7.2 Fonts (set on `<html>` as CSS variables, via `next/font/google`)
- `Inter`          → `variable: "--font-sans"`,    `subsets: ["latin"]`, `display: "swap"`
- `Space_Grotesk`  → `variable: "--font-display"`, `subsets: ["latin"]`, `display: "swap"`
- `JetBrains_Mono` → `variable: "--font-mono"`,    `subsets: ["latin"]`, `display: "swap"`
- Applied as `` className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} `` on `<html>`.
- `<body>` carries (via `@layer base`) `font-sans antialiased bg-background text-foreground`.

### 7.3 CSS variables (defined in `:root` in `app/globals.css`)
Authoritative values from AC-0.2 (HSL channel triplets, no `hsl()` wrapper — Tailwind wraps them):
```
--background:           230 40% 4%
--foreground:           0 0% 100%
--primary:              190 100% 50%
--primary-foreground:   230 40% 6%
--card:                 230 30% 8%
--muted-foreground:     230 20% 70%
--border:               230 20% 18%
--radius:               0.75rem
```
> The backlog says "and all remaining variables from the source file." The source `index.css` is not in the repo (ambiguity #3 in FEATURE_REQUIREMENTS.md), so the eight values above are authoritative for Sprint 0. For token completeness (so `tailwind.config.ts` never maps an undefined var), DEV may additionally define sibling dark tokens derived from the above:
> ```
> --card-foreground:        0 0% 100%
> --popover:                230 30% 8%
> --popover-foreground:     0 0% 100%
> --secondary:              230 20% 14%
> --secondary-foreground:   0 0% 100%
> --muted:                  230 20% 14%
> --accent:                 230 20% 14%
> --accent-foreground:      0 0% 100%
> --destructive:            0 72% 51%
> --destructive-foreground: 0 0% 100%
> --input:                  230 20% 18%
> --ring:                   190 100% 50%
> ```
> These are additive and never referenced by the Hero, but they prevent `hsl(var(--undefined))` leaks if Tailwind maps a full color set. If DEV maps only the eight authoritative tokens in Tailwind, this sibling block may be omitted. Either choice is acceptable; the eight authoritative values are non-negotiable.

### 7.4 Tailwind config extension keys (`tailwind.config.ts`)
```
darkMode                                 = "class"
content                                  = ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"]
theme.extend.colors.background           = "hsl(var(--background))"
theme.extend.colors.foreground           = "hsl(var(--foreground))"
theme.extend.colors.primary.DEFAULT      = "hsl(var(--primary))"
theme.extend.colors.primary.foreground   = "hsl(var(--primary-foreground))"
theme.extend.colors.card.DEFAULT         = "hsl(var(--card))"
theme.extend.colors.border               = "hsl(var(--border))"
theme.extend.colors.muted.foreground     = "hsl(var(--muted-foreground))"   // enables text-muted-foreground
theme.extend.fontFamily.sans             = ["var(--font-sans)", ...sansFallbacks]
theme.extend.fontFamily.display          = ["var(--font-display)", ...sansFallbacks]
theme.extend.fontFamily.mono             = ["var(--font-mono)", ...monoFallbacks]
theme.extend.borderRadius.lg/md/sm       = derived from var(--radius)
```

### 7.5 Utility classes (`@layer utilities` in `app/globals.css`)
Defined exactly so (AC-0.2). These are the frosted-glass + gradient-text helpers:
```css
@layer utilities {
  .glass {
    background-color: hsl(var(--card) / 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .glass-card {
    background-color: hsl(var(--card) / 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid hsl(var(--border) / 0.5);
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .glass-card:hover {
    border-color: hsl(var(--primary) / 0.5);
  }
  .text-gradient {
    background-image: linear-gradient(to right, hsl(var(--foreground)), hsl(var(--primary)));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
```
> Token-based (no hardcoded hex), so they track the design tokens. `.glass-card` and `.text-gradient` are not used by the Sprint 0 Hero but AC-0.2 requires them present; Sprint 1 sections need them.

### 7.6 `@layer base` (`app/globals.css`)
```css
@layer base {
  body { @apply font-sans antialiased bg-background text-foreground; }
  h1, h2, h3, h4, h5, h6 { @apply font-display tracking-tight; }
}
```

---

## 8. NFR Implementation Notes (all 8 NFRs from FEATURE_REQUIREMENTS.md)

| NFR | How the design satisfies it |
|---|---|
| **NFR-1.P Performance** | Hero is a **Server Component** — zero client-side JS for the Hero itself (only React's base runtime + the `lucide-react` `ArrowRight` icon, tree-shaken to a single SVG). No `framer-motion`. `next/font/google` self-hosts fonts (no render-blocking CDN request) with `display: "swap"`. CTAs are plain `<a>` anchors → no event-handler bundles. Expected First Load JS well under the 250KB cap; DEV verifies via `npm run build` route table. TTI < 1.5s on 3G is feasible since the route ships near-static HTML + CSS. |
| **NFR-1.A Accessibility (WCAG 2.1 AA)** | Single `<h1>` per page. CTAs are `<a href>` anchors → natively focusable and `Enter`-activatable. Visible focus rings via `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`. `ArrowRight` icon `aria-hidden="true"`. `<html lang="en">`. Cyan `--primary` on near-black `--background`, and dark `--primary-foreground` text on cyan, both exceed AA contrast. Decorative `<br/>` breaks do not change the heading's accessible name. |
| **NFR-1.B Browser Support** | Only widely-supported CSS: flexbox, custom properties, `backdrop-filter` (with `-webkit-` prefix in `.glass` for Safari). No bleeding-edge features. `next/font` handles cross-browser loading. Covers last-2 Chrome/Firefox/Safari/Edge + iOS 16+ Safari + Android Chrome. |
| **NFR-1.I i18n** | Zero hardcoded user-facing strings in JSX. Every visible string (eyebrow, headline segments, sub-headline, CTA labels) lives in `lib/site-config.ts`, sourced verbatim from `PORTFOLIO_CONTENT.md`. Single extraction point for future locale files. No locale-dependent date/number formatting in scope. |
| **NFR-1.S Security** | Public anonymous page. No auth, no forms, no user data, no `process.env.*` reads in any Sprint 0 path. No secrets in client code. CTA targets are `#` placeholders (no `target="_blank"` yet); real external links (Sprint 1) get `rel="noopener noreferrer"`. |
| **NFR-1.O Observability** | No server routes → no structured logging applicable. No `console.log`/`console.error` anywhere in `app/` or `components/` (CLAUDE.md hard rule). Project logger not invoked. `app/error.tsx` surfaces (not swallows) any render error at the route boundary; it does not `console.log`. |
| **NFR-1.T Type Safety** | `tsconfig.json` already enforces `strict: true`. `SiteConfig` is an explicit type; `Hero` returns `JSX.Element`; `error.tsx` uses the exact Next.js error-boundary prop signature. `npx tsc --noEmit` (via `npm run typecheck`) is a DoD gate. |
| **NFR-1.ST Styling Compliance** | Tailwind utility classes only. No `style={{}}`, no `<style>` tags, no CSS Modules. The only raw CSS lives in `globals.css` (`:root` tokens, `@layer base`, `@layer utilities`) — the sanctioned location, not component-level. Arbitrary-value utilities (`shadow-[...]`, `tracking-[0.2em]`, `leading-[1.1]`) are still Tailwind utilities and are permitted. |

---

## 9. Tech Debt Introduced / Logged

- **DEBT-0.1 — Animations deferred.** The Replit prototype uses `framer-motion` entrance animations. Sprint 0 ships static Hero (no AC requires animation). If motion is later desired it must be a Client Component wrapper or CSS, and re-tested.
- **DEBT-0.2 — CTA targets are placeholders.** Both CTAs link to `#` per AC-0.7, overriding `PORTFOLIO_CONTENT.md` §3 (`/teams-retro`, `#how-i-work`). Sprint 1 wires real targets.

Both logged in `docs/TECH_DEBT.md`. No pre-existing debt to address (first sprint).

---

## 10. Test Toolchain Design (for TEST agent)

- **Runner:** Jest + React Testing Library via `next/jest` (chosen over bare Vitest — see ADR-0004). `next/jest` auto-loads `next.config`, handles the SWC transform, CSS stubbing, and `next/font` mocking — lowest friction for App Router.
- **Files:** `jest.config.ts` (`next/jest` preset, `testEnvironment: "jsdom"`, `moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" }`, `setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]`), `jest.setup.ts` (`import "@testing-library/jest-dom"`).
- **Dev dependencies to add:** `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@types/jest`. Runtime dep: `lucide-react`.
- **Scripts to add to `package.json`:** `"test": "jest"`, `"test:run": "jest --ci"`, `"typecheck": "tsc --noEmit"`. (CLAUDE.md references these exact names.)
- **`moduleNameMapper`** must mirror the `@/*` alias or Hero's imports won't resolve under Jest.
- The five tests (T-0.1–T-0.5) render `<Hero />` and assert on text content — no async, no API mocking.

---

## 11. Definition of Done (architecture view)

- All 13 functional ACs + 10 UI ACs satisfiable by the files in §1.
- All 8 NFRs addressed per §8.
- Global UI Infrastructure (§7) fully present and REVIEWER-verifiable.
- `npm run build` clean, `npx tsc --noEmit` zero errors, 5 Jest tests pass.
- No ADR contradicts a prior ADR (none exist; this sprint sets the baseline).
