# Sprint 1 Backlog — Portfolio

**Project:** Adwait Mulye — Personal Portfolio
**Version:** v4
**Sprint Goal:** Production-grade Home page (all 10 sections, canonical order); Teams Retro skeleton page; three professional stub pages; SEO and deployment readiness — all on Next.js 14 App Router, extending the Sprint 0 foundation.
**Companion docs:** `PORTFOLIO_PRD.md` (v2) · `PORTFOLIO_IA.md` (v2) · `PORTFOLIO_CONTENT.md` (v3)
**Prerequisite:** Sprint 0 REVIEWER verdict is APPROVED.

---

## Home Page — Canonical Section Order (LOCKED v3)

The DEV agent must render these sections in exactly this order in `app/page.tsx`. No reordering.

1. `<Hero />` — CONTENT §3
2. `<HowIWork />` — CONTENT §4
3. `<SelectedWork />` — CONTENT §5
4. `<CareerTrajectory />` — CONTENT §6
5. `<Skills />` — CONTENT §7
6. `<Experience />` — CONTENT §8
7. `<Education />` — CONTENT §9
8. `<About />` (The Bridge) — CONTENT §10
9. `<BeyondTheWork />` — CONTENT §11
10. `<ContactCTA />` — CONTENT §12

---

## Sprint 1 Definition of Done

All 11 epics implemented and all ACs pass, AND:

- `npm run build` succeeds with no errors.
- `npm run dev` boots; all routes render correctly.
- `npx tsc --noEmit` passes with zero errors.
- All Jest tests pass. All Playwright E2E tests pass.
- Lighthouse (mobile): performance ≥ 90, accessibility ≥ 95, SEO ≥ 95.
- All copy matches `PORTFOLIO_CONTENT.md` v3 verbatim.
- No fabricated metrics, no hallucinated content, no employer IP.
- Home page renders all 10 sections in the locked order above.
- All five routes reachable without 404.
- Resume downloads (PM-T primary, TPM secondary) work from Career Trajectory.
- No "AI Intelligence Center" fake chat UI anywhere on the site.
- Site deployable to Vercel by pushing to GitHub `main`.
- Visual output matches `docs/ui-mocks/` screenshots for every section.

---

## Out of Scope (Sprint 1)

- Teams Retro deep content — Sprint 2.
- Artifacts page real content — Sprint 3.
- Git page real content — Sprint 3.
- Writing page real content — Sprint 4.
- Technical Twin live feature — Sprint 5.
- Light theme, internationalization, contact form, MDX rendering.
- Custom domain DNS (manual step, PRD §10).

---

## Epic 1: Global Layout — Nav, Footer, Container

### Description

Build Nav (with name "Adwait Mulye" on the left, five center links, Resume dropdown), Footer (three-column), and Container wrapper. Update `app/layout.tsx` to include them.

### User Story

As a visitor, I want a consistent top navigation and footer on every page so I can navigate the site and find contact links regardless of where I land.

### Acceptance Criteria

- **AC-1.1:** `components/layout/Nav.tsx` renders: **"Adwait Mulye"** on the left (display font, links to `/`), five center links Home · Teams Retro · Artifacts · Git · Writing, and a "Resume" dropdown button on the right.
- **AC-1.2:** Resume button dropdown: two options — "PM-Technical" and "TPM" — linking to PDFs in `/public/resumes/`. Both open in new tab with `rel="noopener noreferrer"`.
- **AC-1.3:** Nav is sticky on scroll. Backdrop-blur applied after scrolling past ~80vh.
- **AC-1.4:** At < 768px, center links collapse into hamburger menu (`aria-label="Open navigation menu"`) opening a full-screen overlay.
- **AC-1.5:** Active route visually indicated (primary-color underline or text-color shift).
- **AC-1.6:** `components/layout/Footer.tsx` renders three-column layout per `PORTFOLIO_CONTENT.md` §17.
- **AC-1.7:** All footer icon links have `aria-label` per §17.
- **AC-1.8:** Footer bottom line "Plano, TX · Built 2026 · v1.0" renders small and muted.
- **AC-1.9:** `components/layout/Container.tsx` provides `max-w-[1200px] mx-auto` with symmetric horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop. No asymmetric padding.
- **AC-1.10:** `app/layout.tsx` renders `<Nav />` above and `<Footer />` below `{children}`, preserving Sprint 0 font variable classes.
- **AC-1.11:** Skip-to-content link in header, visible on focus only, linking to `#main-content`. `<main id="main-content">` wraps page content.

### UI Reference

- Mock: `docs/ui-mocks/hero.png` *(Nav visible at top of hero screenshot)*
- Prototype: `docs/prototypes/Nav.tsx` — extract sticky behavior, backdrop-blur pattern, Resume dropdown implementation, hamburger mobile pattern.

### Dependencies

- Sprint 0 foundation.
- `PORTFOLIO_CONTENT.md` v3 §2, §17.
- `docs/prototypes/Nav.tsx`
- Resume PDFs placed manually at `public/resumes/` before testing.

---

## Epic 2: Home — How I Work

### Description

Three-pillar card section anchored at `#how-i-work`. Three glass cards with icons, titles, body paragraphs, and mono tag chips.

### User Story

As a recruiter, I want to see the candidate's competency in three plain-language buckets so I can map their profile to a PMT job description instantly.

### Acceptance Criteria

- **AC-2.1:** Section anchored at `id="how-i-work"`.
- **AC-2.2:** Heading and subhead render verbatim from `PORTFOLIO_CONTENT.md` §4.
- **AC-2.3:** Three cards: 3-column desktop / 2-column tablet / 1-column mobile. All use `glass-card`.
- **AC-2.4:** Card 1 — Product Thinking: `Target` icon, verbatim title/body/tags from §4 Pillar 1.
- **AC-2.5:** Card 2 — Engineering Depth: `Code2` icon, verbatim title/body/tags from §4 Pillar 2. "System Architecture" tag renders with its parenthetical sub-label in a visually distinct but readable style.
- **AC-2.6:** Card 3 — AI & Systems: `BrainCircuit` icon, verbatim title/body/tags from §4 Pillar 3.
- **AC-2.7:** Tags use `font-mono`, bordered pill style, non-interactive.
- **AC-2.8:** Visual output matches `docs/ui-mocks/how-i-work.png`.

### UI Reference

- Mock: `docs/ui-mocks/how-i-work.png`
- Prototype: `docs/prototypes/TechnicalDNA.tsx` *(the Replit "How I Work" three-pillar component — may be named TechnicalDNA in the Replit file tree)* — extract `glass-card` usage pattern, 3-col grid, tag chip implementation, icon placement.

### Dependencies: Epic 1, CONTENT §4, `docs/prototypes/TechnicalDNA.tsx`, `docs/ui-mocks/how-i-work.png`.

---

## Epic 3: Home — Selected Work

### Description

Responsive 3-column card grid. One real card (Teams Retro), two in-progress placeholders. No fabricated Replit-scaffold content survives.

### User Story

As a recruiter, I want to see real shipped work with verifiable numbers so I can assess this candidate's ability to ship, not just plan.

### Acceptance Criteria

- **AC-3.1:** Section heading and subhead verbatim from `PORTFOLIO_CONTENT.md` §5.
- **AC-3.2:** 3-column desktop / 2-column tablet / 1-column mobile. Equal-height cards per row.
- **AC-3.3:** Card 1 — Teams Retro (full opacity, solid border): all fields verbatim from §5 Card 1. Metric values exact: "5,055 lines", "87/87 Jest", "44 Playwright", "Zero @ts-nocheck escapes". CTA links to `/teams-retro`.
- **AC-3.4:** Metric strip values are exact — no paraphrasing or rounding.
- **AC-3.5:** Card 2 — Functional & Technical Artifacts: verbatim from §5 Card 2. 0.6 opacity, dashed border, CTA non-interactive.
- **AC-3.6:** Card 3 — Code & Workflows: verbatim from §5 Card 3. Same placeholder treatment as Card 2.
- **AC-3.7:** No "NeuroMetrics Dashboard," "Agentic Orchestration Engine," or any invented metrics appear anywhere.
- **AC-3.8:** Visual output matches `docs/ui-mocks/selected-work.png`.

### UI Reference

- Mock: `docs/ui-mocks/selected-work.png`
- Prototype: `docs/prototypes/FeaturedProjects.tsx` *(Replit file name — production component will be renamed `SelectedWork.tsx`)* — extract card grid layout, metric strip pattern, placeholder card opacity/dashed-border treatment, CTA button style.

### Dependencies: Epic 1, CONTENT §5, `docs/prototypes/FeaturedProjects.tsx`, `docs/ui-mocks/selected-work.png`.

---

## Epic 4: Home — Career Trajectory

### Description

Three-lens narrative, AI-Native PM emphasis line, resume download buttons immediately below. Section heading is "Career Trajectory" — not "Career History."

### User Story

As a recruiter, I want to understand the candidate's growth arc and download the right resume without searching for it.

### Acceptance Criteria

- **AC-4.1:** Section heading renders "Career Trajectory" — not "Career History", not "My Background".
- **AC-4.2:** Intro line, three sub-blocks, emphasis line all verbatim from `PORTFOLIO_CONTENT.md` §6.
- **AC-4.3:** Emphasis line "*And increasingly: **AI-Native PM**…*" — italicized, "AI-Native PM" bold within the italic.
- **AC-4.4:** Two resume buttons immediately below emphasis line: primary "Download PM-Technical Resume" → PDF, secondary "Download TPM Resume" → PDF. Both new tab.
- **AC-4.5:** Muted SAFe note below buttons verbatim from §6.
- **AC-4.6:** Buttons stack on mobile.
- **AC-4.7:** Visual output matches `docs/ui-mocks/career-trajectory.png`.

### UI Reference

- Mock: `docs/ui-mocks/career-trajectory.png`
- Prototype: `docs/prototypes/CareerTrajectory.tsx` — extract layout, sub-block pattern, button placement relative to narrative, mobile stacking behavior.

### Dependencies: Epic 1, CONTENT §6, `docs/prototypes/CareerTrajectory.tsx`, `docs/ui-mocks/career-trajectory.png`.

---

## Epic 5: Home — Skills & Tools

### Description

Full technical inventory in four group cards, 2-column grid.

### User Story

As a recruiter doing a skills-check, I want to find specific technologies explicitly listed so I can verify against job requirements.

### Acceptance Criteria

- **AC-5.1:** Section heading "Skills & Tools" renders.
- **AC-5.2:** Four group cards: 2-column desktop / 1-column mobile. All use `glass-card`.
- **AC-5.3–5.6:** Each group heading and all items verbatim from `PORTFOLIO_CONTENT.md` §7 Groups 1–4.
- **AC-5.7:** Skills render as comma-separated list or non-interactive chips — whichever matches `docs/ui-mocks/skills.png`.
- **AC-5.8:** Visual output matches `docs/ui-mocks/skills.png`.

### UI Reference

- Mock: `docs/ui-mocks/skills.png`
- Prototype: `docs/prototypes/SkillsTools.tsx` — extract 2-col grid pattern, `glass-card` group layout, chip vs. comma-list rendering decision.

### Dependencies: Epic 1, CONTENT §7, `docs/prototypes/SkillsTools.tsx`, `docs/ui-mocks/skills.png`.

---

## Epic 6: Home — Experience Snapshot

### Description

Vertical timeline of six career entries with marquee facts.

### User Story

As a recruiter, I want a quick read of employment history with the most important facts per role.

### Acceptance Criteria

- **AC-6.1:** Section heading and subhead verbatim from `PORTFOLIO_CONTENT.md` §8.
- **AC-6.2:** Six entries in order verbatim from §8: 7-Eleven, Wells Fargo, USAA, Freeman, FedEx, Earlier.
- **AC-6.3:** Each entry: company/role (bold), meta line (muted), marquee paragraph — all verbatim.
- **AC-6.4:** "Full work history →" link at bottom opens PM-T resume PDF in new tab.
- **AC-6.5:** Visual output matches `docs/ui-mocks/experience.png`.

### UI Reference

- Mock: `docs/ui-mocks/experience.png`
- Prototype: `docs/prototypes/Timeline.tsx` — extract the dot-connector vertical timeline pattern, entry card structure, date/role/company layout, link styling.

### Dependencies: Epic 1, CONTENT §8, `docs/prototypes/Timeline.tsx`, `docs/ui-mocks/experience.png`.

---

## Epic 7: Home — Education

### Description

Lightweight two-entry education block after Experience.

### User Story

As a recruiter completing a candidate checklist, I want education credentials visible without opening a PDF.

### Acceptance Criteria

- **AC-7.1:** Section heading "Education" renders.
- **AC-7.2:** Subtle horizontal separator above section.
- **AC-7.3:** Two entries verbatim from `PORTFOLIO_CONTENT.md` §9.
- **AC-7.4:** No `glass-card` — plain text layout, lightweight.
- **AC-7.5:** No icons, no logos.
- **AC-7.6:** Visual output matches `docs/ui-mocks/education.png`.

### UI Reference

- Mock: `docs/ui-mocks/education.png`
- Prototype: `docs/prototypes/Education.tsx` — extract separator pattern and lightweight entry layout. Note: this section intentionally has no card treatment; if the prototype has cards, do not use them.

### Dependencies: Epic 1, CONTENT §9, `docs/prototypes/Education.tsx`, `docs/ui-mocks/education.png`.

---

## Epic 8: Home — The Bridge

### Description

Three-paragraph personal narrative, plain text, no card background.

### User Story

As a recruiter who has scrolled deep, I want the human story behind the resume — the "why" behind the trajectory.

### Acceptance Criteria

- **AC-8.1:** Section heading "The Bridge" renders.
- **AC-8.2:** Three paragraphs render verbatim from `PORTFOLIO_CONTENT.md` §10. "AI-native PM" in paragraph 2 is bold.
- **AC-8.3:** Paragraph 3 reads: "The Product Owner foundation has been built. The technical depth is where I've been heading the entire time. This site is a working artifact of both." — exact wording, no variation.
- **AC-8.4:** Plain text on dark background — no `glass-card`, no background panel.
- **AC-8.5:** Visual output matches `docs/ui-mocks/about.png`.

### UI Reference

- Mock: `docs/ui-mocks/about.png`
- Prototype: `docs/prototypes/TheBridge.tsx` — extract plain-text section spacing, paragraph rhythm, bold-within-paragraph implementation.

### Dependencies: Epic 1, CONTENT §10, `docs/prototypes/TheBridge.tsx`, `docs/ui-mocks/about.png`.

---

## Epic 9: Home — Beyond the Work

### Description

Single-paragraph section about the guitar / 25-year musician story. Plain text, same treatment as The Bridge.

### User Story

As a recruiter or hiring manager, I want one human signal that this candidate has the long-term patience and discipline to truly build skills — not just list them.

### Acceptance Criteria

- **AC-9.1:** Section heading "Beyond the Work" renders verbatim.
- **AC-9.2:** One paragraph renders verbatim from `PORTFOLIO_CONTENT.md` §11.
- **AC-9.3:** Plain text on dark background — no `glass-card`, no icon, no tags. Same visual treatment as The Bridge.
- **AC-9.4:** Section is short — heading + one paragraph. No additional elements.
- **AC-9.5:** Visual output matches `docs/ui-mocks/beyond-the-work.png`.

### UI Reference

- Mock: `docs/ui-mocks/beyond-the-work.png`
- Prototype: `docs/prototypes/BeyondTheWork.tsx`

### Dependencies: Epic 1, CONTENT §11, `docs/prototypes/BeyondTheWork.tsx`, `docs/ui-mocks/beyond-the-work.png`.

---

## Epic 10: Home — Contact CTA

### Description

Open-to-roles statement and three equal social/contact buttons. Final section of the Home page.

### User Story

As a recruiter who has scrolled to the bottom, I want a clear "what to do next" and easy ways to reach out.

### Acceptance Criteria

- **AC-10.1:** Section heading "Let's talk" renders.
- **AC-10.2:** Two body lines verbatim from `PORTFOLIO_CONTENT.md` §12.
- **AC-10.3:** Three equal-width buttons side-by-side desktop / stacked mobile: LinkedIn, GitHub, Email — per §12.
- **AC-10.4:** LinkedIn and GitHub use URLs from `lib/site-config.ts`. Email uses `mailto:adwaitmulye@gmail.com`.
- **AC-10.5:** All external links `target="_blank" rel="noopener noreferrer"`.
- **AC-10.6:** Visual output matches `docs/ui-mocks/contact.png`.

### UI Reference

- Mock: `docs/ui-mocks/contact.png`
- Prototype: `docs/prototypes/Footer.tsx` *(the Replit Footer component contains the contact social links pattern — extract the icon+link pattern and button sizing; the actual ContactCTA is a separate section above the footer)*
- Note: ContactCTA has no dedicated Replit prototype component — derive its layout from the mock and the Footer prototype's link patterns.

### Dependencies: Epic 1, CONTENT §12, `docs/prototypes/Footer.tsx`, `docs/ui-mocks/contact.png`.

---

## Epic 11: Teams Retro Skeleton + Stub Pages + SEO + Deployment Readiness

### Description

Teams Retro skeleton page with real metric strip. Three stub pages. Metadata API. Sitemap, robots.txt. Vercel Analytics. Remove any "AI Intelligence Center" fake chat UI.

### User Story

As the candidate, I want every route to be real and every page to preview correctly when shared, so the site is credible from day one.

### Acceptance Criteria

- **AC-11.1 (CRITICAL):** The "AI Intelligence Center" chat interface is completely removed. No fake chat box, no "Technical Twin ONLINE" status badge, no non-functional input field anywhere. If a Technical Twin slot exists, it renders the clean "in development" card from `PORTFOLIO_CONTENT.md` §13.
- **AC-11.2:** `/teams-retro` renders `TeamsRetroSkeleton.tsx` with: back nav, hero, metric strip (four real locked values from CONTENT §14), five placeholder sections, links row — all verbatim from §14.
- **AC-11.3:** Metric strip numbers: "5,055", "87/87", "44", "~20–30 hrs" — exact, never placeholder.
- **AC-11.4:** `StubPageLayout` accepts props and renders professional placeholder with eyebrow, title, blurb, status note, back link.
- **AC-11.5:** `/artifacts` renders verbatim from CONTENT §16 `/artifacts` entry.
- **AC-11.6:** `/git` renders verbatim from CONTENT §16 `/git` entry.
- **AC-11.7:** `/writing` renders verbatim from CONTENT §16 `/writing` entry.
- **AC-11.8:** All five pages export `metadata` per CONTENT §15.
- **AC-11.9:** `app/sitemap.ts` generates valid `/sitemap.xml`.
- **AC-11.10:** `app/robots.ts` generates `/robots.txt` allowing all crawlers.
- **AC-11.11:** `@vercel/analytics` installed; `<Analytics />` in `app/layout.tsx`.
- **AC-11.12:** `README.md` at repo root: stack, dev steps, test command, build command.
- **AC-11.13:** `.env.example` exists. `.env.local` in `.gitignore`.

### UI Reference

- Mock: `docs/ui-mocks/teams-retro-skeleton.png`
- Prototype: `docs/prototypes/TeamsRetro.tsx` — extract metric strip large-number pattern, placeholder section layout, back nav, links row.

### Dependencies: Epics 1–10, CONTENT §13–§16, `docs/prototypes/TeamsRetro.tsx`, `docs/ui-mocks/teams-retro-skeleton.png`.

---

## Test Strategy

### Tier 1 — Jest component tests

- Each of the 10 Home section components renders without throwing.
- Hero: exact eyebrow, headline, sub-headline strings (from Sprint 0).
- HowIWork: three cards; "System Architecture" tag in card 2; body text present.
- SelectedWork: three cards; Teams Retro real (full opacity); metric "5,055" present; metric "87/87" present; no text "NeuroMetrics"; no "Agentic Orchestration".
- CareerTrajectory: heading is "Career Trajectory"; two resume buttons; AI-Native PM emphasis line present.
- Skills: four group headings; "Databricks Lakehouse" in Group 2; "Mem0 MCP" in Group 3.
- Experience: six entries; "7-Eleven" present; "FedNow" present.
- Education: two entries; "University of Houston–Clear Lake"; "University of Mumbai".
- About (The Bridge): heading "The Bridge"; "AI-native PM" bold; paragraph 3 contains "The Product Owner foundation has been built."
- BeyondTheWork: heading "Beyond the Work"; "25 years" present; one paragraph.
- ContactCTA: three buttons; email mailto correct.
- StubPageLayout: renders props correctly.
- TeamsRetroSkeleton: metric "5,055" present; back link present.

### Tier 2 — Playwright E2E

- **E2E-1:** Landing on `/` — hero headline visible.
- **E2E-2:** "View Featured Work" navigates to `/teams-retro`.
- **E2E-3:** "How I Build" smooth-scrolls `#how-i-work` into viewport.
- **E2E-4:** All five nav links navigate without 404.
- **E2E-5:** PM-T resume download triggers PDF or opens new tab.
- **E2E-6:** At 360px, hamburger icon visible, center links hidden.
- **E2E-7:** Hamburger click opens mobile nav overlay.
- **E2E-8:** Three Contact buttons have correct hrefs.
- **E2E-9:** No console errors on any of the five routes.
- **E2E-10:** Teams Retro page shows all four metric numbers.
- **E2E-11:** No element with text "AI Intelligence Center" exists on any page.
- **E2E-12:** "Adwait Mulye" appears in the nav on every page.

### Tier 3 — Manual

- Lighthouse on `/`: performance ≥ 90, accessibility ≥ 95, SEO ≥ 95.
- All OG meta tags present on all five pages.
- Home page sections render in the correct locked order visually.
- At 1440px, no right-side whitespace gap on any section.

---

## Model & Effort Per Agent

| Agent | Model | Effort |
|---|---|---|
| PRODUCT | Sonnet 4.6 | medium |
| ARCHITECT | Opus 4.7 | high |
| TEST | Sonnet 4.6 | medium |
| DEV | Sonnet 4.6 | high (escalate to Opus only if visibly struggling) |
| PROFESSOR | Sonnet 4.6 | medium |
| REVIEWER | Opus 4.7 | high |

---

## MAW Pipeline Notes

- **Sprint 0 APPROVED is the prerequisite.** Do not start Sprint 1 until Sprint 0 passes.
- **Prototype convention (new in v4):** Every epic that has a prototype file listed in its UI Reference must have the DEV agent read that file as a pre-flight step. The prototype is reference, not copy-paste. Extract: Tailwind class patterns, component structure, responsive breakpoint patterns, `glass-card` usage, color token references. Adapt to Next.js App Router conventions. Never carry over Vite-specific code, hardcoded copy, or fabricated data from the Replit prototype.
- **Prototype file naming:** Replit file names may differ from production component names. The mapping is: `FeaturedProjects.tsx` → `SelectedWork.tsx`, `TechnicalDNA.tsx` → `HowIWork.tsx`, `Timeline.tsx` → `Experience.tsx`. REVIEWER checks that production components use the locked names, not the Replit names.
- **10 ui-mock screenshots required before PRODUCT runs:** hero.png, how-i-work.png, selected-work.png, career-trajectory.png, skills.png, experience.png, education.png, about.png, beyond-the-work.png, contact.png, teams-retro-skeleton.png.
- **Prototype files required before ARCHITECT runs:** Hero.tsx, Nav.tsx, TechnicalDNA.tsx (→ HowIWork), FeaturedProjects.tsx (→ SelectedWork), CareerTrajectory.tsx, SkillsTools.tsx, Timeline.tsx (→ Experience), Education.tsx, TheBridge.tsx, BeyondTheWork.tsx, Footer.tsx, TeamsRetro.tsx.
- **Section order is locked.** `app/page.tsx` must render 10 sections in the exact order in this backlog's opening table.
- **No "AI Intelligence Center" UI survives** — AC-11.1 is CRITICAL.
- **`SelectedWork` not `FeaturedWork`** — rename any artifact that uses the old name.
- **No fabricated content** — any invented metric = REVIEWER REJECTED.
- **Copy is locked** — no paraphrasing from PORTFOLIO_CONTENT.md v3.
- **`.gitignore` must include `docs/PORTFOLIO_PRD.md` and `docs/PORTFOLIO_IA.md`** before pushing.
- **LinkedIn and GitHub URLs must be filled** in PORTFOLIO_CONTENT.md §1 before this sprint runs.
