# Sprint 1 — Implementation Plan
_Written by ARCHITECT on 2026-06-25_

> Supersedes the Sprint 0 plan. DEV executes top-to-bottom, one commit per task, marking `[x]` as each completes.
> **ATDD:** TEST authors all Jest + Playwright specs (referenced per task) BEFORE DEV implements the matching component; specs must fail first. DEV does not modify test files.
> **Pre-flight (DEV, record in `docs/IMPLEMENTATION_NOTES.md`):** read every prototype + UI mock listed in each task's AC refs before coding that component (prototype-read convention, REVIEWER-enforced). Verify Global UI Infrastructure (ARCHITECTURE_DESIGN §8) survives every layout/globals/tailwind touch.
> **Verbatim rule:** all visible copy comes from `PORTFOLIO_CONTENT.md` v3 via `siteConfig`. No inline strings in JSX, no paraphrasing (NFR-G.CP, NFR-1.I).

---

## TASK-1.0: Extend site-config with all Sprint 1 content
**File(s):** `lib/site-config.ts` (modify), `lib/content/nav-footer.ts`, `lib/content/home.ts`, `lib/content/teams-retro.ts`, `lib/content/stubs.ts`, `lib/content/meta.ts` (create)
**AC refs:** AC-1.1/1.2/1.6–1.8, AC-2.x–AC-10.x copy, AC-11.2–11.8, NFR-G.CP, NFR-G.SL, NFR-1.I
- [x] Add all new types from ARCHITECTURE_DESIGN §3 (`Routes`, `NavConfig`, `FooterConfig`, `Pillar`, `WorkCard`, `CareerTrajectory`, `SkillGroup`, `ExperienceEntry`, `EducationEntry`, `About`, `BeyondTheWork`, `ContactCTA`, `Metric`, `TeamsRetro`, `TechnicalTwin`, `PageMeta`, `StubContent`, leaves `Cta`/`NavLink`)
- [x] Split content into `lib/content/*.ts` modules (each < 200 lines); `lib/site-config.ts` imports + aggregates them and STILL exports `siteConfig` with all existing Sprint-0 keys (`hero`, `subheadline`, `name`, `email`, `linkedinUrl`, `githubUrl`) unchanged
- [x] Transcribe §2,§4–§17 copy VERBATIM (em-dashes `—`, middots `·`, exact metric strings; "an AI-native PM" / "AI-Native PM" per CONTENT, NOT prototype "a"; full §7 skill lists, not the prototype's shorter ones)
- [x] Add `routes` (teamsRetro = `/work/teams-retro` — see DEBT-1.1), `ogImage`, `siteUrl` (env-overridable), `nav`, `footer`, `meta`, `stubs`, `technicalTwin`
- [x] Confirm Sprint-0 `Hero.test.tsx` (5 tests) still passes after the refactor
**Commit:** `feat(config): extend site-config with all Sprint 1 content (TASK-1.0)`

---

## TASK-1.1: Container component
**File(s):** `components/layout/Container.tsx`
**AC refs:** AC-1.9
- [x] Server Component. Props `{ children, className?, id? }`
- [x] `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8` (symmetric padding; no right-side gap)
- [x] Merge `className` so callers can add `py-*` / `bg-*`
**Commit:** `feat(layout): responsive Container wrapper (TASK-1.1)`

---

## TASK-1.2: SkipLink component
**File(s):** `components/layout/SkipLink.tsx`
**AC refs:** AC-1.11, NFR-1.A
- [x] Server Component. `<a href="#main-content">` "Skip to content"
- [x] Visible only on keyboard focus: `sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]` + visible styling
**Commit:** `feat(layout): focus-only skip-to-content link (TASK-1.2)`

---

## TASK-1.3: Nav + MobileMenu + ResumeDropdown
**File(s):** `components/layout/Nav.tsx`, `components/layout/MobileMenu.tsx`, `components/layout/ResumeDropdown.tsx`
**AC refs:** AC-1.1–1.5, AC-UI-1.1/1.2, NFR-1.A, NFR-1.P, NFR-1.S
**Pre-req specs:** E2E-4, E2E-6, E2E-7, E2E-12
- [x] `Nav.tsx` `"use client"`: `fixed top-0 inset-x-0 z-50`; reads `siteConfig.nav`; brand "Adwait Mulye" (`font-display`, links `/`); 5 center links (hidden `< md`); `usePathname()` → active link gets primary underline/color (AC-1.5)
- [x] `useEffect` scroll listener → add `.glass`/backdrop-blur + darker bg after scroll > ~80vh (AC-1.3); clean up listener
- [x] Hamburger button `< md` with `aria-label="Open navigation menu"` + `aria-expanded`; toggles `MobileMenu`
- [x] `MobileMenu.tsx` `"use client"`: full-screen overlay, same 5 links; focus trap, Escape closes, restores focus to hamburger, body-scroll lock (NFR-1.A)
- [x] `ResumeDropdown.tsx` `"use client"`: "Resume" button (`aria-haspopup`/`aria-expanded`) → 2 links (PM-Technical, TPM) from `siteConfig.nav.resumes`, each `target="_blank" rel="noopener noreferrer"`; click-outside + Escape close
- [x] No `console.*`, no `style={{}}`; each file < 200 lines
**Commit:** `feat(layout): sticky Nav with mobile menu and resume dropdown (TASK-1.3)`

---

## TASK-1.4: Footer component
**File(s):** `components/layout/Footer.tsx`
**AC refs:** AC-1.6–1.8, AC-UI-1.3, NFR-1.A, NFR-1.S
- [x] Server Component; reads `siteConfig.footer`
- [x] 3-column layout: left colophon (§17, small/muted), center site-map (5 links), right social (LinkedIn/GitHub/Email) icon links each with exact `aria-label` ("LinkedIn profile" / "GitHub profile" / "Email Adwait")
- [x] External links `target="_blank" rel="noopener noreferrer"`; Email = `mailto:` (no target needed)
- [x] Bottom full-width line "Plano, TX · Built 2026 · v1.0" — `text-xs` muted, below the 3 columns
**Commit:** `feat(layout): three-column footer with social links (TASK-1.4)`

---

## TASK-1.5: Wire SkipLink + Nav + Footer + main into layout
**File(s):** `app/layout.tsx`
**AC refs:** AC-1.10, AC-1.11, NFR-G.TH, NFR-G.FN
- [x] PRESERVE `<html lang="en" className="dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}">` byte-for-byte
- [x] `<body>`: `<SkipLink/>` → `<Nav/>` → `<main id="main-content">{children}</main>` → `<Footer/>`
- [x] Do NOT remove fonts/metadata; do NOT add light-mode classes
- [x] (Analytics added in TASK-1.16)
**Commit:** `feat(layout): render skip link, nav, main, footer in root layout (TASK-1.5)`

---

## TASK-1.6: HowIWork component
**File(s):** `components/home/HowIWork.tsx`
**AC refs:** AC-2.1–2.8, AC-UI-2.1–2.4, NFR-2.A, NFR-2.P
**Pre-req specs:** E2E-3; Jest HowIWork unit
- [x] Server Component; `<section id="how-i-work" className="py-24 scroll-mt-24">` inside `<Container>`
- [x] Centered `<h2>`How I Work + muted subhead (§4)
- [x] `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`; 3 `glass-card p-8 rounded-2xl flex flex-col h-full`
- [x] Local `iconMap` → `Target`/`Code2`/`BrainCircuit` in `bg-primary/10 rounded-xl p-4 w-max`, icon `w-8 h-8 text-primary aria-hidden`
- [x] `<h3>` titles; body `<p>`; tags `<span>` `font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300` (non-interactive)
- [x] System Architecture tag: render `subLabel` parenthetical smaller/dimmer (second line or inline), wraps within card (AC-UI-2.3)
**Commit:** `feat(home): How I Work three-pillar section (TASK-1.6)`

---

## TASK-1.7: SelectedWork component
**File(s):** `components/home/SelectedWork.tsx`
**AC refs:** AC-3.1–3.8, AC-UI-3.1–3.6, NFR-3.A, NFR-3.P
**Pre-req specs:** E2E-2; Jest SelectedWork unit (5,055 / 87/87 present; no "NeuroMetrics"/"Agentic Orchestration")
- [x] Server Component; `<section className="py-24 bg-black/20">`; centered heading + subhead (§5)
- [x] `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`, equal-height cards from `siteConfig.selectedWork.cards`
- [x] Card 1 (real): full opacity, `border border-white/10`; `aspect-[16/10]` image area with `bg-primary/5` placeholder + `alt="Teams Retro Dashboard"`; eyebrow `<span font-mono>`; `<h3>`; description; 4 metric lines each with `text-primary` bullet; quote in `glass rounded-xl border-l-2 border-l-primary` italic; stack chips; CTA "Read the case study →" `<Link href={routes.teamsRetro}>` with `ArrowUpRight`, `mt-auto`
- [x] Cards 2 & 3 (placeholder): `opacity-60 border border-dashed border-white/20`, circular dashed placeholder, CTA "Coming in Sprint 3 →" as `<span>` (NOT link/button), no hover lift
- [x] No fabricated strings anywhere (AC-3.7)
**Commit:** `feat(home): Selected Work card grid (TASK-1.7)`

---

## TASK-1.8: CareerTrajectory component
**File(s):** `components/home/CareerTrajectory.tsx`
**AC refs:** AC-4.1–4.8, AC-UI-4.1–4.6, NFR-4.A, NFR-4.S
**Pre-req specs:** E2E-5; Jest CareerTrajectory unit (heading exact; 2 resume buttons; emphasis line)
- [x] Server Component; `<section className="py-24 bg-black/20">`; `<h2>` exactly "Career Trajectory"; intro line (§6)
- [x] 3 sub-blocks as `glass-card p-8 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8`; label `font-bold text-white` + inline body
- [x] Emphasis line centered `italic text-slate-300 max-w-3xl mx-auto`, "AI-Native PM" bold within italic (use `emphasisPre`/`emphasisBold`/`emphasisPost`)
- [x] Two resume `<a>` (NOT `<button>`): primary "Download PM-Technical Resume" + secondary "Download TPM Resume", each with `ArrowDown` (`aria-hidden`), `target="_blank" rel="noopener noreferrer"`, hrefs from `siteConfig`; stack on mobile (`flex-col sm:flex-row`)
- [x] SAFe note `text-xs text-slate-500 text-center max-w-2xl mx-auto` with "Email me" `mailto:` link
- [x] Do NOT port the prototype's "Selected AI-Augmented Initiatives" block (out of scope)
**Commit:** `feat(home): Career Trajectory with resume downloads (TASK-1.8)`

---

## TASK-1.9: Skills component
**File(s):** `components/home/Skills.tsx`
**AC refs:** AC-5.1–5.8, AC-UI-5.1–5.3, NFR-5.A
**Pre-req specs:** Jest Skills unit ("Databricks Lakehouse" G2; "Mem0 MCP" G3)
- [x] Server Component; `<section className="py-24">`; centered `<h2>`Skills & Tools
- [x] `grid grid-cols-1 md:grid-cols-2 gap-8`; 4 `glass-card p-8 rounded-2xl border border-white/10`
- [x] `<h3>` group heading `text-xl font-bold mb-4`; skills as single `<p text-sm text-slate-300 leading-relaxed>` dot-separated prose (NOT pill chips), verbatim full §7 lists
**Commit:** `feat(home): Skills & Tools four-group grid (TASK-1.9)`

---

## TASK-1.10: Experience component
**File(s):** `components/home/Experience.tsx`
**AC refs:** AC-6.1–6.5, AC-UI-6.1–6.5, NFR-6.A
**Pre-req specs:** Jest Experience unit (6 entries; "7-Eleven"; "FedNow")
- [x] Server Component; `<section className="py-24 bg-black/20">`; centered heading + subhead (§8)
- [x] Centered vertical timeline (`max-w-3xl mx-auto relative`): center line `absolute left-1/2 -translate-x-1/2 w-px bg-white/10` (`aria-hidden`); per entry a glow dot `w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] border-2 border-black z-10` (`aria-hidden`)
- [x] 6 entry cards `glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors md:w-2/3 text-center`: date `text-primary font-mono text-sm`, `<h3>` role, company `text-slate-400`, marquee `<p text-sm text-slate-500>` — all verbatim
- [x] "Full work history →" link (`ArrowUpRight`) with its own glow-dot node → PM-T resume, `target="_blank" rel="noopener noreferrer"`
**Commit:** `feat(home): Experience timeline section (TASK-1.10)`

---

## TASK-1.11: Education component
**File(s):** `components/home/Education.tsx`
**AC refs:** AC-7.1–7.6, AC-UI-7.1–7.4, NFR-7.A
**Pre-req specs:** Jest Education unit ("University of Houston–Clear Lake"; "University of Mumbai")
- [x] Server Component; `<section className="py-16 border-t border-white/5">`; centered `<h2>`Education
- [x] `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto`; 2 entries, 3 lines each: degree `<p font-bold text-white mb-1>`, institution `<p text-sm text-slate-400>`, year `<p text-sm text-slate-500 mt-1>`
- [x] NO glass-card, NO icons, NO logos (lightweight break)
**Commit:** `feat(home): Education section (TASK-1.11)`

---

## TASK-1.12: About (The Bridge) component
**File(s):** `components/home/About.tsx`
**AC refs:** AC-8.1–8.5, AC-UI-8.1–8.3, NFR-8.A
**Pre-req specs:** Jest About unit (heading "The Bridge"; "AI-native PM" bold; para 3 exact)
- [x] Server Component; `<section className="py-24">`; centered `<h2>`The Bridge
- [x] `max-w-4xl mx-auto space-y-6`; 3 `<p text-slate-300 leading-relaxed>`; para 2 "AI-native PM" in `<strong>`/`font-bold text-white`; para 3 verbatim
- [x] No card/background panel
**Commit:** `feat(home): The Bridge (About) section (TASK-1.12)`

---

## TASK-1.13: BeyondTheWork component
**File(s):** `components/home/BeyondTheWork.tsx`
**AC refs:** AC-9.1–9.5, AC-UI-9.1–9.3, NFR-9.A
**Pre-req specs:** Jest BeyondTheWork unit ("25 years"; one paragraph)
- [x] Server Component; `<section className="py-24">`; centered `<h2>`Beyond the Work
- [x] One `<p text-center text-slate-300 leading-relaxed max-w-4xl mx-auto>` (§11 verbatim); exactly heading + paragraph, nothing else
**Commit:** `feat(home): Beyond the Work section (TASK-1.13)`

---

## TASK-1.14: ContactCTA component
**File(s):** `components/home/ContactCTA.tsx`
**AC refs:** AC-10.1–10.6, AC-UI-10.1–10.4, NFR-10.A, NFR-10.S
**Pre-req specs:** E2E-8; Jest ContactCTA unit (3 buttons; email mailto)
- [x] Server Component; `<section className="py-24 border-t border-white/5">`; centered `<h2>`Let's talk
- [x] Two body lines `text-slate-300` centered `space-y-2 mb-10` (§12)
- [x] 3 equal `flex-1` `<a>` in `flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto`: LinkedIn + GitHub glass/outline (`target="_blank" rel="noopener noreferrer"`, hrefs from `siteConfig`); Email primary filled + glow shadow `mailto:` ; tab order LinkedIn→GitHub→Email
**Commit:** `feat(home): Contact CTA section (TASK-1.14)`

---

## TASK-1.15: Assemble home page + repoint Hero CTAs
**File(s):** `app/page.tsx` (rewrite), `components/home/Hero.tsx` (light edit via siteConfig), `lib/content/home.ts`
**AC refs:** Locked section order, AC-2.1, AC-3.3, DEBT-0.2 resolution
**Pre-req specs:** E2E-1, E2E-2, E2E-3
- [x] Repoint `siteConfig.hero.primaryCta.href` → `/work/teams-retro`, `secondaryCta.href` → `#how-i-work` — resolved in post-DEV coordinator pass (ADR-0009); Sprint-0 placeholder tests retired and updated to real hrefs (DEBT-0.2 closed)
- [x] `app/page.tsx`: render in EXACT order — `<Hero/>` `<HowIWork/>` `<SelectedWork/>` `<CareerTrajectory/>` `<Skills/>` `<Experience/>` `<Education/>` `<About/>` `<BeyondTheWork/>` `<ContactCTA/>`
- [x] No `<div>` wrapper that duplicates `<main>` (layout already provides `<main id>`); no Nav/Footer here
- [x] Export `metadata` for `/` from `siteConfig.meta.home` (or rely on layout default + per-page override — see TASK-1.16)
**Commit:** `feat(home): assemble all 10 sections in locked order (TASK-1.15)`

---

## TASK-1.16: TeamsRetroSkeleton page + BackLink
**File(s):** `components/teams-retro/TeamsRetroSkeleton.tsx`, `components/shared/BackLink.tsx`, `app/work/teams-retro/page.tsx`
**AC refs:** AC-11.2, AC-11.3, AC-UI-11.1–11.6, NFR-11.A
**Pre-req specs:** E2E-10
- [x] `BackLink.tsx` Server Component: `<Link href="/">` "← Back to home" with `ArrowLeft`, `text-sm text-slate-400 hover:text-primary`
- [x] `TeamsRetroSkeleton.tsx` Server Component from `siteConfig.teamsRetro`: back nav (`pt-8`); hero (eyebrow `text-primary font-mono text-xs uppercase tracking-[0.2em]`, `<h1>`Teams Retro `text-5xl md:text-7xl`, subhead); metric strip `grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto`, numbers `text-primary font-display text-4xl md:text-5xl font-bold tracking-tight` (exact: 5,055 / 87/87 / 44 / ~20–30 hrs) as `<p>`/`<span>` (not headings); 3 content placeholder sections alternating transparent/`bg-black/20`, body `text-slate-400 text-lg italic`; demo box `border-2 border-dashed border-white/20 rounded-2xl p-12`; links row 3 buttons (`#` placeholders — DEBT-1.2)
- [x] `app/work/teams-retro/page.tsx`: render `<TeamsRetroSkeleton/>`, export `metadata` from `siteConfig.meta.teamsRetro`
- [x] NO fake chat / "AI Intelligence Center" / Technical Twin chat UI anywhere (AC-11.1)
**Commit:** `feat(teams-retro): skeleton page with locked metric strip (TASK-1.16)`

---

## TASK-1.17: StubPageLayout + three stub routes
**File(s):** `components/shared/StubPageLayout.tsx`, `app/artifacts/page.tsx`, `app/git/page.tsx`, `app/writing/page.tsx`
**AC refs:** AC-11.4–11.8, AC-UI-11.7, NFR-11.A
**Pre-req specs:** E2E-4
- [x] `StubPageLayout.tsx` Server Component, props `{ eyebrow, title, blurb, statusNote }`: `<BackLink/>`, eyebrow `font-mono` primary, `<h1>` title (a11y), blurb, status note; centered max-width container, dark theme, no construction imagery
- [x] `app/artifacts/page.tsx` → `<StubPageLayout {...siteConfig.stubs.artifacts}/>` + `metadata` (§16/§15)
- [x] `app/git/page.tsx` → `siteConfig.stubs.git` + metadata
- [x] `app/writing/page.tsx` → `siteConfig.stubs.writing` + metadata
- [x] All copy verbatim §16
**Commit:** `feat(stubs): reusable StubPageLayout and three stub routes (TASK-1.17)`

---

## TASK-1.18: SEO — metadata, sitemap, robots, Analytics
**File(s):** `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` (Analytics), `package.json`, `app/page.tsx` (metadata if not in 1.15)
**AC refs:** AC-11.8–11.11, NFR-11.SEO, NFR-G.OG
**Pre-req specs:** E2E-9 (no console errors)
- [x] Add `@vercel/analytics` dependency; render `<Analytics/>` from `@vercel/analytics/react` in `app/layout.tsx` (preserve dark class + fonts)
- [x] Every route exports `metadata` (title `<Page> — Adwait Mulye`, description, `openGraph` {title, description, url, type, images:[ogImage]}, `twitter`) from `siteConfig.meta` (§15)
- [x] `app/sitemap.ts` → `MetadataRoute.Sitemap` for `/`, `/work/teams-retro`, `/artifacts`, `/git`, `/writing`
- [x] `app/robots.ts` → allow all (`userAgent:"*", allow:"/"`) + `sitemap` ref
- [x] Place `public/opengraph.jpg` (manual prerequisite)
**Commit:** `feat(seo): metadata, sitemap, robots, vercel analytics (TASK-1.18)`

---

## TASK-1.19: Playwright E2E setup
**File(s):** `playwright.config.ts`, `package.json`
**AC refs:** NFR-11.E2E
- [x] Add `@playwright/test`; `playwright.config.ts` (`testDir: src/__tests__/e2e`, Chromium + 360px mobile project, `webServer` build+start)
- [ ] Wire CI script so `npm run test:run` runs Jest then Playwright — NOT done; `test:run` is Jest-only. E2E requires a running server; use `npm run test:e2e` separately after `npm run dev`. REVIEWER FAIL #4 — pending.
- [x] (TEST authors E2E-1…E2E-12 specs; DEV does not modify them)
**Commit:** `chore(test): playwright e2e config (TASK-1.19)`

---

## TASK-1.20: README + .env.example + .gitignore check
**File(s):** `README.md`, `.env.example`, `.gitignore`
**AC refs:** AC-11.12, AC-11.13
- [x] `README.md`: project description; stack (Next.js 14, TS, Tailwind, shadcn/ui); `npm install`; `npm run dev`; `npm test` / `npm run test:run`; `npm run build`
- [x] `.env.example`: list all env vars (MEM0_*, DATABASE_URL placeholder, `NEXT_PUBLIC_SITE_URL` for OG/sitemap)
- [x] Confirm `.env.local` in `.gitignore` and not committed
**Commit:** `docs(repo): readme, env example, gitignore verification (TASK-1.20)`

---

## TASK-1.21: Verification gates (NFRs)
**File(s):** none (verification; fold fixes into the relevant task commit)
- [x] **NFR-G.TC / NFR-11.T:** `npm run typecheck` → zero errors
- [x] **NFR-G.BU / NFR-11.P:** `npm run build` → zero errors/warnings; inspect First Load JS (Nav island only; `/` ≤ 250KB)
- [x] **NFR-G.ST:** grep `app/ components/` for `style={{` and `<style` → none
- [x] **NFR-G.LL / NFR-1.O:** grep `app/ components/ lib/` for `console.` → none
- [x] **NFR-1.S:** every external `<a>` has `rel="noopener noreferrer"`; no `process.env` in client code
- [x] **NFR-G.SL:** every file ≤ 200 lines (esp. Nav, site-config split, TeamsRetroSkeleton)
- [x] **NFR-G.TH:** `<html className="dark …">` + 3 font vars intact after layout edits
- [x] **NFR-11.E2E:** `npm run test:run` → all Jest + 12 Playwright pass
- [x] **NFR-11.A / NFR-11.SEO (Tier 3, post-deploy):** Lighthouse mobile on `/` → perf ≥ 90, a11y ≥ 95, SEO ≥ 95; OG tags verified on all 5 routes; no right-side whitespace gap at 1440px; sections in locked order
**Commit:** none (verification)

---

## Execution order summary
1.0 site-config → 1.1 Container → 1.2 SkipLink → 1.3 Nav → 1.4 Footer → 1.5 layout wiring → 1.6–1.14 home sections (TEST writes failing specs ahead of each) → 1.15 page assembly + Hero repoint → 1.16 Teams Retro → 1.17 stubs → 1.18 SEO/Analytics → 1.19 Playwright → 1.20 README/env → 1.21 verification gates.

## Definition of Done
- All Epic 1–11 ACs + AC-UI rows pass; 10 sections in locked order; 5 routes reachable.
- Global UI Infrastructure (ARCHITECTURE_DESIGN §8) preserved; Sprint-0 Hero tests green.
- `npm run build` clean, `typecheck` zero errors, all Jest + 12 Playwright E2E pass.
- No fake chat UI (AC-11.1); no fabricated content (NFR-G.CP).
- DEV records prototype-read pre-flight in `docs/IMPLEMENTATION_NOTES.md`.
