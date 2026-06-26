# Sprint 1 — Architecture Design
_Written by ARCHITECT on 2026-06-25_

> Supersedes the Sprint 0 version of this file. Sprint 0's design is summarized in §1 and **must not be re-designed** — Sprint 1 extends it.

## 0. Pre-Flight Summary

- **Mem0:** No Mem0 MCP tool was available in this pre-flight session, so no `search_memory` call was made. This document and the new ADRs are the recall surface for future sprints. (If Mem0 becomes available, ARCHITECT should store each ADR headline per the agent contract.)
- **Inputs read in full:** `FEATURE_REQUIREMENTS.md` (11 epics, 62 ACs, 42 AC-UI rows, global NFRs), `SPRINT_1_BACKLOG.md` (incl. 12-test E2E strategy), `PORTFOLIO_CONTENT.md` v3 (§1–§18), Sprint 0 `ARCHITECTURE_DESIGN.md` + `IMPLEMENTATION_PLAN.md`, ADR-0001 → ADR-0004, all 12 prototypes (`Nav, Footer, TechnicalDNA, FeaturedProjects, CareerTrajectory, SkillsTools, Timeline, Education, TheBridge, BeyondTheWork, TeamsRetro, Home`), and key UI mocks.
- **Prototype reality check:** every prototype imports `framer-motion`, `wouter` (`Link`), and/or shadcn `@/components/ui/button`. **None of these are carried over.** `wouter` → `next/link`. shadcn `<Button asChild>` → styled `<a>`/`<Link>`. `framer-motion` entrance animations → omitted (see DEBT-1.4 and NFR-G.RM). `@assets/*` image imports → omitted; placeholder tints used.
- **Critical removals (AC-11.1):** the Replit `Home.tsx` renders `<AISandbox />` (the "AI Intelligence Center" fake chat). It is **deleted** — never ported. `CareerTrajectory.tsx` prototype also carries a "Selected AI-Augmented Initiatives" block (lines 113–138) that is **explicitly out of scope** (Epic 4 Out of Scope) and must not be ported.
- **Carried-forward debt resolved this sprint:** DEBT-0.2 (Hero CTAs link to `#`) is resolved in TASK-1.13b — primary CTA → `/teams-retro`, secondary CTA → `#how-i-work`. DEBT-0.3 (Next.js CVEs) remains deferred to a security sprint; documented in §10.

---

## 1. Sprint 0 Foundation Summary (do NOT re-design — reference only)

Already built, audited, and APPROVED. Sprint 1 consumes these as-is and extends them.

| Asset | State | Sprint 1 interaction |
|---|---|---|
| `app/layout.tsx` | `<html className="dark + 3 font vars">`, 3 `next/font/google` fonts, metadata | **Modified** (TASK-1.3, 1.16): add `<Nav/>`, `<main id>`, `<Footer/>`, `<Analytics/>`, skip link. Must preserve dark class + font vars. |
| `app/globals.css` | 8 authoritative tokens + sibling tokens, `@layer base`, `.glass`/`.glass-card`/`.text-gradient` | **Read-only ideally.** Optional additive `motion-reduce` guard (TASK-1.18). Existing utilities must not regress. |
| `tailwind.config.ts` | `darkMode:"class"`, token color map, 3 font families, radius | **Unchanged** content array already globs `./components/**` and `./app/**`. No new dirs outside those globs. |
| `lib/site-config.ts` | `SiteConfig` type + `siteConfig` const (hero copy, name, email, social URLs) | **Extended** (TASK-1.0): add `resumes`, `nav`, `footer`, and all 10 section content shapes. Existing `hero`/`name`/`email`/`linkedinUrl`/`githubUrl` keys preserved. |
| `components/home/Hero.tsx` | Server Component, reads `siteConfig.hero`, two `<a>` CTAs to `#` | **Light edit** (TASK-1.13b): repoint CTAs to real targets via siteConfig. Structure unchanged. |
| `app/page.tsx` | renders `<Hero/>` only | **Rewritten** (TASK-1.13): renders all 10 sections in locked order. |
| `app/error.tsx` | Client error boundary | Reused as-is; stub routes inherit it or get their own as needed. |
| Jest + RTL (`next/jest`) | configured, 5 Hero tests pass | TEST extends with Sprint 1 unit tests; Playwright added new (ADR-0006). |

**Design tokens available to every Sprint 1 component:** `bg-background`, `text-foreground`, `text-primary`, `text-primary-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `bg-card`, `font-sans`/`font-display`/`font-mono`, `rounded-lg/md/sm`, plus utilities `.glass`, `.glass-card`, `.text-gradient`. Prototypes use raw `text-slate-300/400/500` and `bg-white/5`, `border-white/10` — these are Tailwind built-ins (not tokens) and are retained verbatim where ACs cite them.

---

## 2. Component Inventory (Sprint 1)

Every NEW file DEV creates or modifies. RSC = React Server Component (default, no `"use client"`). CC = Client Component (`"use client"`, justified). All files < 200 lines (splits flagged where needed).

### 2.1 Layout components (`components/layout/`)

| File | Action | Type | Role | Props |
|---|---|---|---|---|
| `components/layout/Container.tsx` | Create | RSC | `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8` wrapper (AC-1.9) | `{ children: React.ReactNode; className?: string; id?: string }` |
| `components/layout/Nav.tsx` | Create | **CC** | Sticky nav: name + 5 links + Resume dropdown + hamburger + scroll-blur + active route | none (reads `siteConfig.nav`; uses `usePathname`) |
| `components/layout/MobileMenu.tsx` | Create | **CC** | Full-screen overlay with 5 links + focus trap (split out of Nav to stay < 200 lines / isolate trap logic) | `{ open: boolean; onClose: () => void; links: NavLink[]; pathname: string }` |
| `components/layout/ResumeDropdown.tsx` | Create | **CC** | "Resume" button → 2-option menu (PM-Technical, TPM) | `{ resumes: { label: string; href: string }[] }` |
| `components/layout/Footer.tsx` | Create | RSC | 3-column footer + bottom line (AC-1.6–1.8) | none (reads `siteConfig.footer`) |
| `components/layout/SkipLink.tsx` | Create | RSC | Focus-only skip-to-content `<a href="#main-content">` (AC-1.11) | none |

> **Nav split rationale:** Nav owns scroll state + active route + open/close state. The mobile overlay (with its focus trap, Escape handler, and body-scroll lock) and the Resume dropdown are each self-contained interactive units. Splitting keeps `Nav.tsx` comfortably under 200 lines and isolates the focus-trap logic that NFR-1.A requires for REVIEWER/TEST verification.

### 2.2 Home section components (`components/home/`) — LOCKED names

| File | Action | Type | Role | Props |
|---|---|---|---|---|
| `components/home/Hero.tsx` | Modify | RSC | Existing — repoint CTAs (TASK-1.13b) | none |
| `components/home/HowIWork.tsx` | Create | RSC | `#how-i-work` 3 pillar glass cards (Epic 2) | none |
| `components/home/SelectedWork.tsx` | Create | RSC | 3-card grid: 1 real + 2 placeholders (Epic 3) | none |
| `components/home/CareerTrajectory.tsx` | Create | RSC | 3 sub-blocks + emphasis + 2 resume `<a>` + SAFe note (Epic 4) | none |
| `components/home/Skills.tsx` | Create | RSC | 4 group glass cards, dot-separated prose (Epic 5) | none |
| `components/home/Experience.tsx` | Create | RSC | Centered vertical timeline, 6 entries + history link (Epic 6) | none |
| `components/home/Education.tsx` | Create | RSC | 2-entry plain-text block + top separator (Epic 7) | none |
| `components/home/About.tsx` | Create | RSC | "The Bridge" 3 paragraphs, plain text (Epic 8) | none |
| `components/home/BeyondTheWork.tsx` | Create | RSC | "Beyond the Work" heading + 1 paragraph (Epic 9) | none |
| `components/home/ContactCTA.tsx` | Create | RSC | "Let's talk" + 2 body lines + 3 buttons (Epic 10) | none |

### 2.3 Teams Retro + shared + stubs

| File | Action | Type | Role | Props |
|---|---|---|---|---|
| `components/teams-retro/TeamsRetroSkeleton.tsx` | Create | RSC | Back nav + hero + metric strip + 5 placeholder sections + links row (AC-11.2) | none (reads `siteConfig.teamsRetro`) |
| `components/shared/StubPageLayout.tsx` | Create | RSC | Reusable stub: back link + eyebrow + title + blurb + status note (AC-11.4) | `{ eyebrow: string; title: string; blurb: string; statusNote: string }` |
| `components/shared/BackLink.tsx` | Create | RSC | "← Back to home" `Link` with `ArrowLeft` (reused by TeamsRetro + StubPageLayout) | `{ className?: string }` |
| `app/work/teams-retro/page.tsx` | Create | RSC | Route → renders `<TeamsRetroSkeleton/>`; exports `metadata` | n/a |
| `app/artifacts/page.tsx` | Create | RSC | `<StubPageLayout {...artifacts}/>`; exports `metadata` | n/a |
| `app/git/page.tsx` | Create | RSC | `<StubPageLayout {...git}/>`; exports `metadata` | n/a |
| `app/writing/page.tsx` | Create | RSC | `<StubPageLayout {...writing}/>`; exports `metadata` | n/a |
| `app/page.tsx` | Rewrite | RSC | 10 sections in locked order, wrapped in `<main id="main-content">` (see §2.5) | n/a |

> **Route path note:** The backlog/CONTENT copy links to `/teams-retro`. The ARCHITECT task brief locks the file at `app/work/teams-retro/page.tsx`, which serves the URL `/work/teams-retro` — **not** `/teams-retro`. **Resolution:** build the page at `app/work/teams-retro/page.tsx` and update every internal link target (Hero primary CTA, SelectedWork Card 1 CTA, nav "Teams Retro" link, sitemap) to `/work/teams-retro` so they are consistent and 404-free (E2E-2, E2E-4). The `siteConfig.routes.teamsRetro` constant is the single source of truth for this path so DEV never hardcodes it in two places. This is logged as **DEBT-1.1** (copy in CONTENT §3/§5 says `/teams-retro`; the live route is `/work/teams-retro` — reconcile in a future content pass or add a redirect). REVIEWER: verify the link target matches the actual route file, not the literal CONTENT string.

### 2.4 SEO / infra files

| File | Action | Type | Role |
|---|---|---|---|
| `app/sitemap.ts` | Create | (build) | `MetadataRoute.Sitemap` listing all 5 routes (AC-11.9) |
| `app/robots.ts` | Create | (build) | `MetadataRoute.Robots` allow-all + sitemap ref (AC-11.10) |
| `public/resumes/Adwait_Mulye_PM-Technical.pdf` | Place (manual) | asset | Primary resume (placed before E2E) |
| `public/resumes/Adwait_Mulye_TPM.pdf` | Place (manual) | asset | Secondary resume |
| `public/opengraph.jpg` | Place (manual) | asset | Static OG image referenced by all metadata (ADR-0008) |
| `README.md` | Create | doc | Stack + dev/test/build steps (AC-11.12) |
| `.env.example` | Create | doc | Env var list (AC-11.13) |
| `package.json` | Modify | deps | Add `@vercel/analytics`, `@playwright/test`; Playwright scripts |
| `playwright.config.ts` | Create | config | E2E config (ADR-0006) |
| `src/__tests__/e2e/*.spec.ts` | Create (TEST) | tests | E2E-1 … E2E-12 |

### 2.5 Client-component justification (NFR-2.P / NFR-G — every `"use client"` accounted for)

| Component | Why it MUST be a Client Component |
|---|---|
| `Nav.tsx` | `useState` for menu/dropdown open state; `useEffect` scroll listener for backdrop-blur after ~80vh (AC-1.3); `usePathname()` for active-route styling (AC-1.5). |
| `MobileMenu.tsx` | Focus trap (`useRef` + `keydown` handler), Escape-to-close, body-scroll lock — all browser-only (NFR-1.A focus trap requirement). |
| `ResumeDropdown.tsx` | `useState` open/close; click-outside + Escape handlers; `aria-expanded` toggling. |
| `app/error.tsx` (Sprint 0) | Next.js error-boundary contract requires `"use client"`. |

**Every other component (all 10 home sections, Footer, Container, StubPageLayout, TeamsRetroSkeleton, BackLink, SkipLink, all page routes) is a Server Component** — static copy from `siteConfig`, zero interactivity, zero client JS. This keeps the home route's First Load JS dominated only by the Nav island, satisfying NFR-1.P (Nav + Footer ≤ 5KB added JS; Footer contributes 0).

---

## 3. `lib/site-config.ts` Extension — Full Typed Shape

Sprint 0 keys (`name`, `role`, `headline`, `subheadline`, `email`, `linkedinUrl`, `githubUrl`, `hero`) are **preserved**. The following are **added**. All string values are transcribed **verbatim** from `PORTFOLIO_CONTENT.md` v3 (NFR-G.CP). This is the single content source for every Sprint 1 component (no inline copy in JSX — NFR-1.I, NFR-G.CP).

```ts
// ---- Shared leaf types ----
export type Cta = { label: string; href: string };
export type NavLink = { label: string; href: string };

// ---- Routes (single source of truth for internal paths) ----
export type Routes = {
  home: string;          // "/"
  teamsRetro: string;    // "/work/teams-retro"  (see DEBT-1.1)
  artifacts: string;     // "/artifacts"
  git: string;           // "/git"
  writing: string;       // "/writing"
};

// ---- Resumes (§1) ----
export type ResumeLink = { label: string; href: string }; // label "PM-Technical" | "TPM"

// ---- Nav (§2) ----
export type NavConfig = {
  brand: { label: string; href: string };      // "Adwait Mulye" → "/"
  links: NavLink[];                              // Home·Teams Retro·Artifacts·Git·Writing
  resumeLabel: string;                           // "Resume"
  resumes: ResumeLink[];                         // [{PM-Technical}, {TPM}]
};

// ---- Footer (§17) ----
export type FooterConfig = {
  colophon: string;                              // "© 2026 Adwait Mulye. Built end-to-end…"
  siteMap: NavLink[];                            // same 5 links
  social: { label: string; href: string; ariaLabel: string }[]; // LinkedIn/GitHub/Email
  bottomLine: string;                            // "Plano, TX · Built 2026 · v1.0"
};

// ---- §4 How I Work ----
export type Pillar = {
  icon: "Target" | "Code2" | "BrainCircuit";     // mapped to lucide component in the component
  title: string;
  body: string;
  tags: { label: string; subLabel?: string }[];  // subLabel = System Architecture parenthetical
};
export type HowIWork = { heading: string; subhead: string; pillars: Pillar[] };

// ---- §5 Selected Work ----
export type WorkCard = {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: string[];          // Card 1 only — 4 exact strings
  quote?: string;              // Card 1 only
  stack?: string[];            // Card 1 only
  cta: { label: string; href?: string; disabled: boolean }; // disabled → <span>
  placeholder: boolean;        // true → opacity-60 + dashed border + circle placeholder
  imageAlt?: string;           // "Teams Retro Dashboard"
};
export type SelectedWork = { heading: string; subhead: string; cards: WorkCard[] };

// ---- §6 Career Trajectory ----
export type CareerBlock = { label: string; body: string };
export type CareerTrajectory = {
  heading: string;                 // "Career Trajectory"
  intro: string;
  blocks: CareerBlock[];           // 3 blocks
  emphasisPre: string;             // italic text before bold
  emphasisBold: string;            // "AI-Native PM"
  emphasisPost: string;            // italic text after bold
  primaryResume: Cta;              // "Download PM-Technical Resume"
  secondaryResume: Cta;            // "Download TPM Resume"
  safeNotePre: string;             // "Looking for a SAFe… "
  safeNoteLinkLabel: string;       // "Email me"
  safeNotePost: string;            // " — I keep a separate resume…"
  safeNoteHref: string;            // "mailto:adwaitmulye@gmail.com"
};

// ---- §7 Skills ----
export type SkillGroup = { heading: string; skills: string };  // dot-separated prose string
export type Skills = { heading: string; groups: SkillGroup[] }; // 4 groups

// ---- §8 Experience ----
export type ExperienceEntry = { period: string; role: string; company: string; description: string };
export type Experience = {
  heading: string; subhead: string;
  entries: ExperienceEntry[];      // 6 entries
  historyLink: Cta;                // "Full work history →" → PM-T resume
};

// ---- §9 Education ----
export type EducationEntry = { degree: string; institution: string; year: string };
export type Education = { heading: string; entries: EducationEntry[] }; // 2

// ---- §10 About / The Bridge ----
export type About = {
  heading: string;                 // "The Bridge"
  paragraph1: string;
  para2Pre: string; para2Bold: string; para2Post: string; // "AI-native PM" bold
  paragraph3: string;
};

// ---- §11 Beyond the Work ----
export type BeyondTheWork = { heading: string; paragraph: string };

// ---- §12 Contact CTA ----
export type ContactCTA = {
  heading: string;                 // "Let's talk"
  line1: string; line2: string;
  buttons: { label: "LinkedIn" | "GitHub" | "Email"; href: string; primary: boolean; external: boolean }[];
};

// ---- §14 Teams Retro skeleton ----
export type Metric = { value: string; label: string };
export type RetroSection = { heading: string; body: string };       // italic placeholder body
export type TeamsRetro = {
  backLabel: string;               // "← Back to home"
  eyebrow: string; heading: string; subhead: string;
  metrics: Metric[];               // 4 exact: 5,055 / 87/87 / 44 / ~20–30 hrs
  sections: RetroSection[];        // What it is / How it was built / System Design
  demoHeading: string; demoText: string;
  links: Cta[];                    // View on GitHub / Watch Loom / Live Demo (→ "#")
};

// ---- §13 Technical Twin (in-development card; NOT shown on Home MVP) ----
export type TechnicalTwin = { heading: string; badge: string; body: string; note: string };

// ---- §15 Metadata ----
export type PageMeta = { title: string; description: string; path: string };

// ---- §16 Stub pages ----
export type StubContent = { eyebrow: string; title: string; blurb: string; statusNote: string };

// ---- Extended SiteConfig ----
export type SiteConfig = {
  /* ...existing Sprint 0 keys preserved... */
  name: string; role: string; headline: string; subheadline: string;
  email: string; linkedinUrl: string; githubUrl: string;
  hero: { /* existing shape; primaryCta/secondaryCta hrefs repointed in TASK-1.13b */ };
  /* ...new Sprint 1 keys... */
  routes: Routes;
  ogImage: string;                 // "/opengraph.jpg"
  siteUrl: string;                 // production base URL for OG/sitemap (env-overridable)
  nav: NavConfig;
  footer: FooterConfig;
  howIWork: HowIWork;
  selectedWork: SelectedWork;
  careerTrajectory: CareerTrajectory;
  skills: Skills;
  experience: Experience;
  education: Education;
  about: About;
  beyondTheWork: BeyondTheWork;
  contact: ContactCTA;
  teamsRetro: TeamsRetro;
  technicalTwin: TechnicalTwin;
  stubs: { artifacts: StubContent; git: StubContent; writing: StubContent };
  meta: { home: PageMeta; teamsRetro: PageMeta; artifacts: PageMeta; git: PageMeta; writing: PageMeta };
};
```

> **File-size guard:** `lib/site-config.ts` will exceed 200 lines once all §3–§17 copy is inlined. **Split:** keep `lib/site-config.ts` as the typed aggregator that imports from `lib/content/` modules — `lib/content/home.ts` (§3–§12), `lib/content/teams-retro.ts` (§13–§14), `lib/content/stubs.ts` (§16), `lib/content/meta.ts` (§15), `lib/content/nav-footer.ts` (§2, §17). Each stays < 200 lines (NFR-G.SL). `lib/site-config.ts` re-exports `siteConfig` so existing `@/lib/site-config` imports (Hero) keep working unchanged. See TASK-1.0.

> **Verbatim hazards (DEV must transcribe exactly — REVIEWER diff-checks against CONTENT):**
> - Em-dashes `—` and middots `·` are literal characters, not hyphens/periods.
> - Metric strings exact: `"5,055 lines of production TypeScript across 48 files"`, `"87/87 Jest unit tests passing"`, `"44 Playwright end-to-end test cases"`, `"Zero @ts-nocheck escapes"`. Teams Retro page metrics: `"5,055"`, `"87/87"`, `"44"`, `"~20–30 hrs"`.
> - The CONTENT §10 prototype text "I now operate as **a** AI-native PM" is a grammar error in the prototype; CONTENT §10 reads "an **AI-native PM**". Use the CONTENT version ("an"). Bold span = "AI-native PM".
> - SkillsTools prototype omits some CONTENT §7 items (e.g., "Design systems" in Group 1, "AI-assisted prototyping" in Group 3). The **CONTENT §7 string is authoritative** — transcribe §7 verbatim, not the prototype's shorter list (AC-5.3–5.6).

---

## 4. Data Flow

No database, no API, no client fetch in Sprint 1 (CLAUDE.md: "None at MVP"; MongoDB arrives Sprint 2+). All content is static at build time.

```
PORTFOLIO_CONTENT.md v3  (§2–§17, locked, human-authored)
        │  DEV transcribes VERBATIM (NFR-G.CP) — zero paraphrasing
        ▼
lib/content/*.ts  →  aggregated by  lib/site-config.ts  →  export const siteConfig
        │  imported at module scope (no props drilling for page-level copy)
        ▼
components/**  (Server Components read siteConfig.<section>; icon names → lucide components)
        │  default exports
        ▼
app/page.tsx  →  <main id="main-content"> 10 sections in locked order </main>
app/work/teams-retro/page.tsx  →  <TeamsRetroSkeleton/>
app/{artifacts,git,writing}/page.tsx  →  <StubPageLayout {...siteConfig.stubs.X}/>
        │  wrapped by app/layout.tsx  →  <SkipLink/> <Nav/> {children} <Footer/> <Analytics/>
        ▼
Static HTML (RSC) + one small Nav client island
```

- **New types:** all in §3 (`Routes`, `NavConfig`, `Pillar`, `WorkCard`, … `StubContent`). No `src/types/index.ts` needed yet — content types live with the content module that owns them; shared leaves (`Cta`, `NavLink`) are exported from `lib/site-config.ts`.
- **No store methods, no API endpoints, no migrations.** (See §5, §6.)
- **Icon mapping:** `siteConfig` stores icon **names** as string literals (`"Target"`); each component maps name → `lucide-react` component via a small local `const iconMap`. Keeps content serializable and JSX out of the content layer.

---

## 5. API Contracts

**None.** Sprint 1 introduces zero API routes and zero server route handlers (explicitly out of scope — Epic 11 has no API ACs; the only `app/*.ts` non-page files are `sitemap.ts` and `robots.ts`, which are Next.js metadata generators, not request handlers). `app/sitemap.ts` and `app/robots.ts` produce static XML/text at build time and take no request body — there is nothing for TEST to contract-test. The contract-test tier (`src/__tests__/contract/`) remains **not applicable** until the first API-bearing sprint (Sprint 2: MongoDB-backed Teams Retro demo). Verification of `/sitemap.xml` and `/robots.txt` is an **E2E** concern (E2E checks 200 status), not a contract concern.

---

## 6. Migration Strategy

**None.** No database, no schema, no persisted data, no ORM in Sprint 1 (MongoDB Atlas arrives Sprint 2+ per CLAUDE.md). There is no forward migration and no rollback to document. The only "migration-like" actions are additive file edits (extending `site-config`, adding Nav/Footer to layout); rollback for any of them is a plain `git revert` of the task commit, with no data implications.

---

## 7. Breaking Change Risk

Sprint 1 touches three Sprint-0 foundation files. Each carries a regression risk that REVIEWER must check.

1. **`app/layout.tsx` (TASK-1.3, 1.16) — dropping the dark class or font vars.** Adding `<Nav/>`/`<Footer/>`/`<main>`/`<Analytics/>` requires editing the `<body>`. If DEV rewrites the `<html>` line, the `dark` class (NFR-G.TH) or the three font `variable` classes (`inter.variable` etc.) could be lost — silently breaking the entire theme and all typography on **every route**. **Mitigation:** TASK-1.3 edits only the `<body>` children; the `<html className="dark ${…}">` line is preserved byte-for-byte. §8 lists it as a hard REVIEWER check. The new `<main id="main-content">` wraps `{children}` (AC-1.11) — Nav/Footer sit outside `<main>`.

2. **`lib/site-config.ts` (TASK-1.0) — breaking the Hero's existing import.** Hero imports `{ siteConfig }` and reads `siteConfig.hero.*`, `siteConfig.subheadline`. The refactor into `lib/content/*` must keep `siteConfig` exported from `lib/site-config.ts` with the existing `hero`/`subheadline`/`name`/`email`/`linkedinUrl`/`githubUrl` keys intact. **Breaks if:** a key is renamed or the export path changes. **Mitigation:** additive-only; the 5 Sprint-0 Hero tests (`src/__tests__/Hero.test.tsx`) act as the regression guard — they must still pass after TASK-1.0.

3. **`components/home/Hero.tsx` (TASK-1.13b) — changing the accessible name.** Repointing `primaryCta.href`/`secondaryCta.href` is a data change only; the headline spans and CTA labels are untouched, so the Hero's accessible name and the 5 existing tests stay green. **Breaks if:** DEV edits markup. **Mitigation:** TASK-1.13b changes only `siteConfig.hero.primaryCta.href` → `routes.teamsRetro` and `secondaryCta.href` → `"#how-i-work"`; `Hero.tsx` JSX is not modified.

4. **`app/page.tsx` (TASK-1.13) — wrong section order.** The locked order is non-negotiable (auto-reject). **Mitigation:** TASK-1.13 enumerates the exact import + render order; E2E + REVIEWER verify.

5. **`app/globals.css` (TASK-1.18, optional) — regressing `.glass`/`.glass-card`/`.text-gradient`.** If DEV adds a `motion-reduce` guard or any rule, a malformed `@layer` block could strip the frosted-glass utilities that **every** card section depends on. **Mitigation:** prefer Tailwind `motion-safe:`/`motion-reduce:` variants at the component level over editing `globals.css`; if `globals.css` is touched, the existing utility blocks are preserved verbatim.

6. **Tailwind `content` array — new directories not globbed.** New files live under `components/layout/`, `components/home/`, `components/teams-retro/`, `components/shared/`, and `app/**`. The existing globs `./app/**/*.{ts,tsx}` and `./components/**/*.{ts,tsx}` already cover all of these. **No config change needed** — but REVIEWER should confirm no component was placed outside `app/`, `components/`, or `lib/` (a stray `src/components/...` would not be scanned and classes would be purged).

---

## 8. Global UI Infrastructure (CRITICAL — preserve through every edit)

All set in Sprint 0; Sprint 1 must **re-verify** after touching `layout.tsx`, `tailwind.config.ts`, or `globals.css`. REVIEWER checks each.

- **Theme mode:** `<html lang="en" className="dark …">` in `app/layout.tsx:35–38`. The `dark` class is mandatory (NFR-G.TH). No light-mode variant, no theme toggle.
- **Body fonts (CSS vars on `<html>`):** `${inter.variable}` (`--font-sans`), `${spaceGrotesk.variable}` (`--font-display`), `${jetbrainsMono.variable}` (`--font-mono`) in `app/layout.tsx:37`. All via `next/font/google` with `display:"swap"` (NFR-G.FN). Body inherits `font-sans` from `@layer base`.
- **CSS variables (`app/globals.css:5–14`):** `--background 230 40% 4%`, `--foreground 0 0% 100%`, `--primary 190 100% 50%`, `--primary-foreground 230 40% 6%`, `--card 230 30% 8%`, `--muted-foreground 230 20% 70%`, `--border 230 20% 18%`, `--radius 0.75rem`.
- **Utility classes (`app/globals.css:30–56`):** `.glass`, `.glass-card` (+ `:hover` → `border-color: primary/0.5`), `.text-gradient`. Used by HowIWork, SelectedWork, Skills, CareerTrajectory cards, Experience entry cards, TeamsRetro quote/glass blocks, and the Nav scrolled state.
- **`@layer base` (`app/globals.css:16–28`):** `body { font-sans antialiased bg-background text-foreground }`; `h1–h6 { font-display tracking-tight }`. This is why every section `<h2>`/`<h3>` automatically renders in Space Grotesk — DEV does **not** add `font-display` per heading.
- **Tailwind config (`tailwind.config.ts`):** `darkMode:"class"`; `content` globs `./app/**`, `./components/**`, `./lib/**`; color map to `hsl(var(--*))`; `fontFamily.sans/display/mono`; `borderRadius` from `--radius`. **Unchanged in Sprint 1.**
- **New global patterns introduced in Sprint 1 (additive, documented for future sprints):**
  - **Section container:** `components/layout/Container.tsx` — `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8`. Note the prototypes use `container mx-auto px-4 md:px-6` (Tailwind's `container`, no `lg:px-8`). AC-1.9 mandates `max-w-[1200px]` + the `lg:px-8` step, so `Container` is the production wrapper; sections use `<Container>` rather than raw `container mx-auto` to satisfy AC-1.9 (no right-side whitespace gap at 1440px, Tier-3 manual check).
  - **Anchor offset:** `#how-i-work` is the smooth-scroll target of the Hero secondary CTA. Because Nav is `fixed`, add `scroll-mt-24` (or equivalent) to the `HowIWork` section so its heading is not hidden under the sticky nav. Apply the same to any future in-page anchor.
  - **Reduced motion:** any transition (`hover:` border, scroll-blur) uses Tailwind's `transition-*` which is fine; no JS-driven animation is added. If animation is later introduced, gate with `motion-safe:` (NFR-G.RM).

---

## 9. Playwright E2E Architecture

Playwright is introduced this sprint (ADR-0006). It runs the dev/preview server and drives a real browser; Jest stays for component units.

- **Config:** `playwright.config.ts` — `testDir: "src/__tests__/e2e"`, `webServer: { command: "npm run build && npm run start", url: "http://localhost:3000", reuseExistingServer: !CI }`, projects for Chromium (primary) with a mobile viewport project (360px) for E2E-6/E2E-7. `npm run test:run` must invoke both Jest and Playwright in CI (NFR-11.E2E) — wire a composite script (e.g. `test:run` runs `jest --ci` then `playwright test`), or document the two-command gate; ADR-0006 records the choice.
- **Resume download (E2E-5):** real PDFs must exist in `public/resumes/` before E2E runs (manual prerequisite). The test asserts either a download event or a new-tab navigation to the PDF path returning 200.

| Test | File | Covers (AC) |
|---|---|---|
| E2E-1 | `home.spec.ts` | `/` hero headline "Bridging Product Strategy and Technical Execution" visible (AC-0.x carryover) |
| E2E-2 | `home.spec.ts` | Hero primary CTA navigates to `/work/teams-retro` (AC-3.3, DEBT-0.2 fix) |
| E2E-3 | `home.spec.ts` | "How I Build" scrolls `#how-i-work` into viewport (AC-2.1) |
| E2E-4 | `nav.spec.ts` | All 5 nav links navigate, no 404 (AC-1.1, AC-11.5–11.7) |
| E2E-5 | `resume.spec.ts` | PM-T resume triggers download / opens new tab (AC-1.2, AC-4.5) |
| E2E-6 | `nav.mobile.spec.ts` (360px) | Hamburger visible, center links hidden (AC-1.4) |
| E2E-7 | `nav.mobile.spec.ts` (360px) | Hamburger click opens overlay (AC-1.4) |
| E2E-8 | `contact.spec.ts` | 3 contact buttons have correct hrefs (AC-10.4) |
| E2E-9 | `console.spec.ts` | Zero console errors on all 5 routes (NFR-1.O) |
| E2E-10 | `teams-retro.spec.ts` | All 4 metric numbers present (AC-11.3) |
| E2E-11 | `no-fake-chat.spec.ts` | No "AI Intelligence Center" text on any page (AC-11.1) |
| E2E-12 | `nav.spec.ts` | "Adwait Mulye" in nav on every page (AC-UI-1.2) |

> TEST authors these specs; DEV does not modify them (ATDD, CLAUDE.md). They are written to fail before the corresponding components exist.

---

## 10. NFR Implementation Notes

| NFR | Design approach |
|---|---|
| **NFR-11.P Lighthouse Perf ≥ 90** | 10/13 components are zero-JS Server Components; only the Nav island ships client JS. No external images (placeholder tints, `aspect-[16/10]` wrappers prevent CLS — AC-UI-3.1). Fonts self-hosted via `next/font` with `swap`. No `framer-motion`. `@vercel/analytics` is a tiny async script. PDFs are static assets, lazy on click. Verified via `npm run build` route table + Lighthouse mobile. |
| **NFR-11.A / NFR-1.A A11y ≥ 95 / WCAG AA** | Single `<h1>` per route (Hero on `/`; "Teams Retro"/stub title elsewhere — AC-11.1, AC-11.4). Section headings `<h2>`, card titles `<h3>` (Epics 2/3/5/6). Skip link → `#main-content` (AC-1.11). Hamburger `aria-label="Open navigation menu"`; mobile overlay traps focus + Escape closes + restores focus (NFR-1.A). All icon-only controls get `aria-label`; decorative icons get `aria-hidden="true"` (NFR-2.A, NFR-4.A, NFR-6.A). Disabled placeholder CTAs render as `<span>` (no tab stop — NFR-3.A). External `<a>` get `rel="noopener noreferrer"`. Color contrast: `text-slate-300/400` on `--background` verified ≥ 4.5:1 (NFR-8.A). `font-mono` non-interactive tags are `<span>` (NFR-2.A). |
| **NFR-11.SEO ≥ 95 / NFR-G.OG** | Every route exports `metadata` (title `<Page> — Adwait Mulye`, description, `openGraph`, `twitter`) from `siteConfig.meta` (AC-11.8). `app/sitemap.ts` (5 routes) + `app/robots.ts` (allow-all + sitemap ref). Static `public/opengraph.jpg` referenced by all routes (ADR-0008; per-route dynamic OG out of scope). Semantic HTML, `lang="en"`, descriptive link text. |
| **NFR-1.P Layout JS ≤ 5KB** | Nav + sub-components are the only layout JS. Footer/Container/SkipLink are RSC (0 JS). `lucide-react` icons tree-shake to individual SVGs. |
| **NFR-G.TC / NFR-11.T Type safety** | Strict TS; every content shape typed in §3; `tsc --noEmit` is a DoD gate (TASK-1.18). No `any` without comment. |
| **NFR-G.LL Observability** | Static sections need no logging. No `console.*` in `app/`/`components/`/`lib/` (grep gate, TASK-1.18). Vercel Analytics auto-captures page views (NFR-11.O). |
| **NFR-G.ST Styling** | Tailwind utilities only; no `style={{}}`/`<style>` (grep gate). Tokens from `globals.css`. Arbitrary-value utilities (`shadow-[0_0_20px_rgba(0,229,255,0.3)]`, `tracking-[0.2em]`, `aspect-[16/10]`, `max-w-[1200px]`) are still Tailwind utilities — permitted. |
| **NFR-G.RM Reduced motion** | No JS animation added (DEBT-1.4 defers prototype `framer-motion`). CSS `transition-colors` on hover is non-essential and may be wrapped `motion-safe:` if REVIEWER flags it; documented. |
| **NFR-G.SL ≤ 200 lines** | Nav split into Nav/MobileMenu/ResumeDropdown; `site-config` split into `lib/content/*`. All other files comfortably under cap. |
| **NFR-G.BU Build** | `npm run build` zero errors/warnings gate (TASK-1.18). |
| **DEBT-0.3 (carried) Next.js CVEs** | Not addressed this sprint (requires a breaking `next` major bump). Remains logged; must clear before public deploy. |

---

## 11. Tech Debt — Sprint 1

Logged in `docs/TECH_DEBT.md` (updated this sprint).

- **DEBT-0.2 → RESOLVED** in TASK-1.13b (Hero CTAs repointed to `/work/teams-retro` and `#how-i-work`).
- **DEBT-1.1 (new):** Route path mismatch — CONTENT §3/§5 copy says `/teams-retro`; the locked route file serves `/work/teams-retro`. All internal links use `siteConfig.routes.teamsRetro` to stay consistent. Reconcile copy or add a redirect in a future content pass.
- **DEBT-1.2 (new):** Teams Retro link-row buttons (View GitHub / Watch Loom / Live Demo) link to `"#"` placeholders per CONTENT §14 — real URLs arrive Sprint 2.
- **DEBT-1.3 (new):** SelectedWork Card 1 and TeamsRetro hero use a placeholder tinted image area (`bg-primary/5`) — real screenshot asset deferred (AC-UI-3.1 permits this at Sprint 1).
- **DEBT-1.4 (carried/extended from DEBT-0.1):** Prototype `framer-motion` entrance animations omitted across all sections (zero-JS RSC goal; no AC requires motion). Revisit only if a future backlog AC requests it.
- **DEBT-0.3 (carried):** Next.js scaffold CVEs — still deferred to a security/upgrade sprint; must clear before public deploy.

---

## 12. Definition of Done (architecture view)

- All 62 ACs + 42 AC-UI rows across Epics 1–11 satisfiable by the files in §2.
- 10 home sections render in the locked order (§2.5); 5 routes reachable without 404.
- Global UI Infrastructure (§8) preserved and REVIEWER-verifiable; Sprint-0 Hero tests still green.
- All metadata/sitemap/robots present (AC-11.8–11.10); `<Analytics/>` in layout (AC-11.11).
- No "AI Intelligence Center" fake chat anywhere (AC-11.1); no fabricated metrics/strings (NFR-G.CP).
- `npm run build` clean, `tsc --noEmit` zero errors, all Jest + 12 Playwright E2E pass.
- Three new ADRs (0005–0008) created; none contradicts ADR-0001…0004.
