# Sprint 1 — Test Specification
_Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation_

> Sprint 0 tests are carried forward unchanged (see "Carried Forward" rows). Sprint 1 adds 58 new failing tests across unit, integration, a11y, and Playwright E2E tiers.

---

## Test Runner

**Jest + React Testing Library + jest-axe** (unit / integration / a11y):
- Config: `jest.config.ts` (root)
- Setup: `jest.setup.ts` (root) — imports `@testing-library/jest-dom`
- `moduleNameMapper`: `^@/(.*)$ → <rootDir>/$1` (mirrors tsconfig `@/*` alias)
- Test environment: `jsdom`
- Test match: `src/__tests__/**/*.test.ts(x)`

**Playwright** (E2E):
- Config: `playwright.config.ts` (root)
- `testDir: ./e2e`
- Projects: `chromium` (desktop) + `mobile-360` (360px viewport)
- `webServer`: `npm run build && npm run start` on port 3000

---

## Snapshot Policy

No snapshot tests in Sprint 0 or Sprint 1. Snapshots are forbidden by default per `CLAUDE.md` test discipline. All assertions use explicit text and role matchers.

---

## Contract Test Tier Note

`ARCHITECTURE_DESIGN.md` §5 explicitly states Sprint 1 has zero API routes. No HTTP contract tests apply this sprint. The contract test directory (`src/__tests__/contract/`) carries forward the Sprint 0 sentinel test only. Real supertest contract tests will be written in the first API-bearing sprint (Sprint 2).

---

## Sprint 0 Tests — Carried Forward (all must still pass)

| AC-ID | Test File | Test Count | Status |
|---|---|---|---|
| T-0.1–T-0.5 | `src/__tests__/Hero.test.tsx` | 8 | Carried forward — PASS |
| AC-0.6, AC-0.9, NFR-1.I | `src/__tests__/unit/site-config.test.ts` | 14 | Carried forward — PASS |
| AC-UI-1.2–1.8, NFR-1.ST | `src/__tests__/unit/hero.test.tsx` | 15 | Carried forward — PASS |
| AC-0.8, AC-UI-1.10 | `src/__tests__/integration/home-page.test.tsx` | 6 | Carried forward — PASS |
| NFR-1.A | `src/__tests__/a11y/hero-a11y.test.tsx` | 7 | Carried forward — PASS |
| ARCH §5 | `src/__tests__/contract/no-api-routes.test.ts` | 1 | Carried forward — PASS |

**Sprint 0 total: 51 tests — all passing**

---

## Unit Tests (Sprint 1)

| AC-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| **Nav — AC-1.1** | `src/__tests__/unit/nav.test.tsx` | renders "Adwait Mulye" as brand link | `<a href="/">` with text "Adwait Mulye" |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Home" nav link | Link text "Home" in DOM |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Teams Retro" nav link | Link text "Teams Retro" in DOM |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Artifacts" nav link | Link text in DOM |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Git" nav link | Link text in DOM |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Writing" nav link | Link text in DOM |
| AC-1.1 | `src/__tests__/unit/nav.test.tsx` | renders "Resume" button | Button text "Resume" in DOM |
| AC-1.2 | `src/__tests__/unit/nav.test.tsx` | "PM-Technical" resume option exists | Link text in DOM |
| AC-1.2 | `src/__tests__/unit/nav.test.tsx` | "TPM" resume option exists | Link text in DOM |
| AC-1.2 | `src/__tests__/unit/nav.test.tsx` | PM-Technical resume links to correct PDF | `href="/resumes/Adwait_Mulye_PM-Technical.pdf"` |
| AC-1.2 | `src/__tests__/unit/nav.test.tsx` | TPM resume links to correct PDF | `href="/resumes/Adwait_Mulye_TPM.pdf"` |
| AC-1.2, NFR-1.S | `src/__tests__/unit/nav.test.tsx` | resume links open in new tab noopener | `target="_blank" rel="noopener noreferrer"` |
| AC-1.4, NFR-1.A | `src/__tests__/unit/nav.test.tsx` | hamburger has aria-label "Open navigation menu" | `getByRole('button', {name: /Open navigation menu/})` |
| AC-1.4 | `src/__tests__/unit/nav.test.tsx` | hamburger toggles aria-expanded on click | `false` → `true` after `fireEvent.click` |
| NFR-G.ST | `src/__tests__/unit/nav.test.tsx` | nav element has no inline style | `getAttribute('style')` is null |
| **Footer — AC-1.6** | `src/__tests__/unit/footer.test.tsx` | renders copyright text verbatim | Exact colophon string from §17 |
| AC-1.6 | `src/__tests__/unit/footer.test.tsx` | renders all 5 site map links in footer | "Home", "Teams Retro", "Artifacts", "Git", "Writing" |
| AC-1.7 | `src/__tests__/unit/footer.test.tsx` | LinkedIn icon link has aria-label="LinkedIn profile" | `getByRole('link', {name: 'LinkedIn profile'})` |
| AC-1.7 | `src/__tests__/unit/footer.test.tsx` | GitHub icon link has aria-label="GitHub profile" | `getByRole('link', {name: 'GitHub profile'})` |
| AC-1.7 | `src/__tests__/unit/footer.test.tsx` | Email icon link has aria-label="Email Adwait" | `getByRole('link', {name: 'Email Adwait'})` |
| AC-1.7, NFR-1.S | `src/__tests__/unit/footer.test.tsx` | LinkedIn/GitHub links carry rel="noopener noreferrer" | Attribute present |
| AC-1.7 | `src/__tests__/unit/footer.test.tsx` | LinkedIn/GitHub links open in new tab | `target="_blank"` |
| AC-1.7 | `src/__tests__/unit/footer.test.tsx` | Email link uses mailto href | `href="mailto:adwaitmulye@gmail.com"` |
| AC-1.8 | `src/__tests__/unit/footer.test.tsx` | bottom line "Plano, TX · Built 2026 · v1.0" verbatim | Exact string in DOM |
| **HowIWork — AC-2.1** | `src/__tests__/unit/how-i-work.test.tsx` | section has id="how-i-work" | `getElementById('how-i-work')` not null |
| AC-2.2 | `src/__tests__/unit/how-i-work.test.tsx` | renders "How I Work" h2 | `getByRole('heading', {level:2})` |
| AC-2.2 | `src/__tests__/unit/how-i-work.test.tsx` | renders subhead verbatim from §4 | Exact string |
| AC-2.4 | `src/__tests__/unit/how-i-work.test.tsx` | renders "Product Thinking" card h3 | `getByRole('heading', {level:3})` |
| AC-2.4 | `src/__tests__/unit/how-i-work.test.tsx` | renders all 6 Card 1 tags | "Agile / Scrum", "GTM Strategy", etc. |
| AC-2.5 | `src/__tests__/unit/how-i-work.test.tsx` | renders "Engineering Depth" card h3 | `getByRole('heading', {level:3})` |
| AC-2.5 | `src/__tests__/unit/how-i-work.test.tsx` | renders all Card 2 tags | "System Architecture", "TypeScript", etc. |
| AC-2.6 | `src/__tests__/unit/how-i-work.test.tsx` | renders "AI & Systems" card h3 | `getByRole('heading', {level:3})` |
| AC-2.6 | `src/__tests__/unit/how-i-work.test.tsx` | renders all Card 3 tags | "Multi-Agent Workflows (MAW)", etc. |
| NFR-2.A | `src/__tests__/unit/how-i-work.test.tsx` | section heading is h2 | Single h2 |
| NFR-2.A | `src/__tests__/unit/how-i-work.test.tsx` | three h3 card title headings | `getAllByRole('heading', {level:3}).length >= 3` |
| **SelectedWork — AC-3.1** | `src/__tests__/unit/selected-work.test.tsx` | renders "Selected Work" h2 | `getByRole('heading', {level:2})` |
| AC-3.1 | `src/__tests__/unit/selected-work.test.tsx` | renders subhead verbatim | "Real shipped artifacts. No fabricated metrics." |
| AC-3.3 | `src/__tests__/unit/selected-work.test.tsx` | eyebrow "PRODUCT · AI-NATIVE BUILD" | Exact string |
| AC-3.3 | `src/__tests__/unit/selected-work.test.tsx` | "Teams Retro" h3 title | `getByRole('heading', {level:3})` |
| AC-3.3 | `src/__tests__/unit/selected-work.test.tsx` | tech stack string verbatim | "Next.js 14 · TypeScript · …" |
| AC-3.3 | `src/__tests__/unit/selected-work.test.tsx` | CTA links to /work/teams-retro | `href="/work/teams-retro"` |
| AC-3.4 | `src/__tests__/unit/selected-work.test.tsx` | renders 4 exact metric strings | Each verbatim from §5 |
| AC-3.5 | `src/__tests__/unit/selected-work.test.tsx` | Card 2 CTA is not a link/button | `tagName` is not A or BUTTON |
| AC-3.6 | `src/__tests__/unit/selected-work.test.tsx` | Card 3 eyebrow "GIT · IN PROGRESS" | Exact string |
| AC-3.7 | `src/__tests__/unit/selected-work.test.tsx` | "NeuroMetrics Dashboard" is ABSENT | `queryByText` returns null |
| AC-3.7 | `src/__tests__/unit/selected-work.test.tsx` | "Agentic Orchestration Engine" is ABSENT | `queryByText` returns null |
| NFR-3.A | `src/__tests__/unit/selected-work.test.tsx` | three h3 card headings | `getAllByRole('heading', {level:3}).length >= 3` |
| **CareerTrajectory — AC-4.1** | `src/__tests__/unit/career-trajectory.test.tsx` | heading is exactly "Career Trajectory" | `getByRole('heading', {name: 'Career Trajectory'})` |
| AC-4.1 | `src/__tests__/unit/career-trajectory.test.tsx` | heading is NOT "Career History" | `queryByText(/Career History/)` is null |
| AC-4.2 | `src/__tests__/unit/career-trajectory.test.tsx` | intro line verbatim from §6 | Exact string |
| AC-4.3 | `src/__tests__/unit/career-trajectory.test.tsx` | three sub-block labels (SAFe, TPM, PMT) | Each present in DOM |
| AC-4.4 | `src/__tests__/unit/career-trajectory.test.tsx` | emphasis line contains "AI-Native PM" | Text present |
| AC-4.5 | `src/__tests__/unit/career-trajectory.test.tsx` | "Download PM-Technical Resume" link | `getByRole('link')` present, correct href |
| AC-4.5 | `src/__tests__/unit/career-trajectory.test.tsx` | "Download TPM Resume" link | Correct href |
| AC-4.5, NFR-4.A | `src/__tests__/unit/career-trajectory.test.tsx` | resume links open new tab noopener | `target="_blank" rel="noopener noreferrer"` |
| AC-4.5, NFR-4.A | `src/__tests__/unit/career-trajectory.test.tsx` | resume links are `<a>` elements | `tagName === 'A'` |
| AC-4.6 | `src/__tests__/unit/career-trajectory.test.tsx` | SAFe note present | Text match |
| AC-4.6 | `src/__tests__/unit/career-trajectory.test.tsx` | "Email me" link is mailto | `href="mailto:adwaitmulye@gmail.com"` |
| **Skills — AC-5.1** | `src/__tests__/unit/skills.test.tsx` | renders "Skills & Tools" h2 | `getByRole('heading', {level:2})` |
| AC-5.3 | `src/__tests__/unit/skills.test.tsx` | "Product Management" card heading | h3 present |
| AC-5.3 | `src/__tests__/unit/skills.test.tsx` | "Design systems" present (§7 Group 1) | Text in DOM |
| AC-5.3 | `src/__tests__/unit/skills.test.tsx` | "GTM coordination" present | Text in DOM |
| AC-5.4 | `src/__tests__/unit/skills.test.tsx` | "Technical Depth" card heading | h3 present |
| AC-5.4 | `src/__tests__/unit/skills.test.tsx` | "Databricks Lakehouse" present (§7 Group 2) | Text in DOM |
| AC-5.4 | `src/__tests__/unit/skills.test.tsx` | "Java Spring Boot" present | Text in DOM |
| AC-5.5 | `src/__tests__/unit/skills.test.tsx` | "AI & GenAI Tooling" card heading | h3 present |
| AC-5.5 | `src/__tests__/unit/skills.test.tsx` | "Mem0 MCP cross-IDE memory" present (§7 Group 3) | Text in DOM |
| AC-5.5 | `src/__tests__/unit/skills.test.tsx` | "AI-assisted prototyping" present (§7 Group 3) | Text in DOM |
| AC-5.6 | `src/__tests__/unit/skills.test.tsx` | "Delivery & Tools" card heading | h3 present |
| AC-5.6 | `src/__tests__/unit/skills.test.tsx` | "SAFe at enterprise scale" present | Text in DOM |
| NFR-5.A | `src/__tests__/unit/skills.test.tsx` | exactly one h2, four h3 headings | Heading counts |
| **Experience — AC-6.1** | `src/__tests__/unit/experience.test.tsx` | renders "Experience" h2 | `getByRole('heading', {level:2})` |
| AC-6.1 | `src/__tests__/unit/experience.test.tsx` | subhead verbatim from §8 | Exact string |
| AC-6.2 | `src/__tests__/unit/experience.test.tsx` | all 6 company names present | 7-Eleven, Wells Fargo, USAA, Freeman, FedEx, Aperia |
| AC-6.3 | `src/__tests__/unit/experience.test.tsx` | Entry 1 role verbatim | "Senior Product Owner \| Technical Product Lead" |
| AC-6.3 | `src/__tests__/unit/experience.test.tsx` | Entry 2 mentions FedNow | Text in DOM |
| AC-6.3 | `src/__tests__/unit/experience.test.tsx` | 7-Eleven mentions "10,000-store rollout" | Text in DOM |
| AC-6.4 | `src/__tests__/unit/experience.test.tsx` | "Full work history →" link present | Correct href to PDF |
| AC-6.4, NFR-6.A | `src/__tests__/unit/experience.test.tsx` | Full work history opens new tab noopener | Attributes present |
| NFR-6.A | `src/__tests__/unit/experience.test.tsx` | section uses h2, entries use h3 | Heading hierarchy |
| **Education — AC-7.1** | `src/__tests__/unit/education.test.tsx` | renders "Education" heading | Heading present |
| AC-7.3 | `src/__tests__/unit/education.test.tsx` | Entry 1 degree, institution, year | Three text nodes |
| AC-7.3 | `src/__tests__/unit/education.test.tsx` | Entry 2 degree, institution, year | Three text nodes |
| AC-7.4 | `src/__tests__/unit/education.test.tsx` | no .glass-card elements | `querySelectorAll('.glass-card').length === 0` |
| AC-7.5 | `src/__tests__/unit/education.test.tsx` | no img elements | `querySelectorAll('img').length === 0` |
| **About — AC-8.1** | `src/__tests__/unit/about.test.tsx` | heading is "The Bridge" | `getByRole('heading', {level:2})` |
| AC-8.2 | `src/__tests__/unit/about.test.tsx` | Paragraph 1 key phrase present | Text match |
| AC-8.2 | `src/__tests__/unit/about.test.tsx` | Paragraph 2 contains "AI-native PM" | Text present |
| AC-8.2 | `src/__tests__/unit/about.test.tsx` | Paragraph 2 contains six-persona workflow mention | Text match |
| AC-8.3 | `src/__tests__/unit/about.test.tsx` | Paragraph 3 exact wording from §10 | Verbatim string match |
| AC-8.4 | `src/__tests__/unit/about.test.tsx` | no .glass-card elements | `querySelectorAll('.glass-card').length === 0` |
| NFR-8.A | `src/__tests__/unit/about.test.tsx` | section heading is h2 | Heading level |
| **BeyondTheWork — AC-9.1** | `src/__tests__/unit/beyond-the-work.test.tsx` | heading is "Beyond the Work" | `getByRole('heading', {level:2})` |
| AC-9.2 | `src/__tests__/unit/beyond-the-work.test.tsx` | guitar paragraph verbatim | Exact string from §11 |
| AC-9.2 | `src/__tests__/unit/beyond-the-work.test.tsx` | paragraph mentions "25 years" | Text match |
| AC-9.3 | `src/__tests__/unit/beyond-the-work.test.tsx` | no .glass-card elements | Length 0 |
| AC-9.4 | `src/__tests__/unit/beyond-the-work.test.tsx` | exactly one heading | `getAllByRole('heading').length === 1` |
| AC-9.4 | `src/__tests__/unit/beyond-the-work.test.tsx` | no links in section | `queryAllByRole('link').length === 0` |
| AC-9.4 | `src/__tests__/unit/beyond-the-work.test.tsx` | no buttons in section | `queryAllByRole('button').length === 0` |
| NFR-9.A | `src/__tests__/unit/beyond-the-work.test.tsx` | section heading is h2 | Heading level |
| **ContactCTA — AC-10.1** | `src/__tests__/unit/contact-cta.test.tsx` | heading is "Let's talk" | `getByRole('heading', {level:2})` |
| AC-10.2 | `src/__tests__/unit/contact-cta.test.tsx` | body line 1 verbatim from §12 | Exact string |
| AC-10.2 | `src/__tests__/unit/contact-cta.test.tsx` | body line 2 verbatim from §12 | Exact string |
| AC-10.3 | `src/__tests__/unit/contact-cta.test.tsx` | LinkedIn, GitHub, Email links present | Three `getByRole('link')` |
| AC-10.4 | `src/__tests__/unit/contact-cta.test.tsx` | LinkedIn href from siteConfig | Correct URL |
| AC-10.4 | `src/__tests__/unit/contact-cta.test.tsx` | GitHub href from siteConfig | Correct URL |
| AC-10.4 | `src/__tests__/unit/contact-cta.test.tsx` | Email href is mailto | `href="mailto:adwaitmulye@gmail.com"` |
| AC-10.5, NFR-10.S | `src/__tests__/unit/contact-cta.test.tsx` | LinkedIn/GitHub have noopener noreferrer | Attribute present |
| NFR-10.A | `src/__tests__/unit/contact-cta.test.tsx` | all three are `<a>` elements | `tagName === 'A'` |
| **site-config-s1 — AC-1.1** | `src/__tests__/unit/site-config-s1.test.ts` | siteConfig.nav exists | Property check |
| AC-1.1 | `src/__tests__/unit/site-config-s1.test.ts` | nav brand label and href | Exact values |
| AC-1.1 | `src/__tests__/unit/site-config-s1.test.ts` | five nav links with correct labels | Labels array |
| AC-1.2 | `src/__tests__/unit/site-config-s1.test.ts` | two resume options with correct hrefs | PDF paths |
| AC-1.6–1.8 | `src/__tests__/unit/site-config-s1.test.ts` | footer colophon, social, bottomLine | Exact strings |
| DEBT-1.1 | `src/__tests__/unit/site-config-s1.test.ts` | routes.teamsRetro = "/work/teams-retro" | String equality |
| NFR-G.CP | `src/__tests__/unit/site-config-s1.test.ts` | all section headings are present | Spot-checks |
| AC-11.3 | `src/__tests__/unit/site-config-s1.test.ts` | teamsRetro.metrics has 4 entries with exact values | "5,055", "87/87", "44", "~20–30 hrs" |

**Unit test total (Sprint 1 new): ~96 tests across 11 files**

---

## Integration Tests (Sprint 1)

| AC-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| Locked order | `src/__tests__/integration/home-page-s1.test.tsx` | renders without throwing | No error on full page render |
| AC-2.2 | `src/__tests__/integration/home-page-s1.test.tsx` | "How I Work" h2 present | Section renders in page |
| AC-3.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Selected Work" h2 present | Section renders in page |
| AC-4.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Career Trajectory" h2 — NOT "Career History" | Exact text; queryByText for "Career History" is null |
| AC-5.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Skills & Tools" h2 present | Section renders in page |
| AC-6.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Experience" h2 present | Section renders |
| AC-7.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Education" h2 present | Section renders |
| AC-8.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "The Bridge" h2 present | Section renders |
| AC-9.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Beyond the Work" h2 present | Section renders |
| AC-10.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "Let's talk" h2 present | Section renders |
| Locked order | `src/__tests__/integration/home-page-s1.test.tsx` | 9 section h2s in correct DOM order | Index comparison of h2 positions |
| AC-11.1 | `src/__tests__/integration/home-page-s1.test.tsx` | "AI Intelligence Center" absent | `queryByText` returns null |
| AC-11.1 | `src/__tests__/integration/home-page-s1.test.tsx` | no fake chat input on home page | `querySelectorAll('input[placeholder*="Ask"]').length === 0` |
| AC-3.7 | `src/__tests__/integration/home-page-s1.test.tsx` | "NeuroMetrics Dashboard" absent | `queryByText` returns null |
| AC-3.7 | `src/__tests__/integration/home-page-s1.test.tsx` | "Agentic Orchestration Engine" absent | `queryByText` returns null |
| Accessibility | `src/__tests__/integration/home-page-s1.test.tsx` | exactly one h1 on home page | `getAllByRole('heading', {level:1}).length === 1` |
| AC-1.10 | `src/__tests__/integration/layout-s1.test.tsx` | Nav is present in layout | `querySelector('nav')` not null |
| AC-1.10 | `src/__tests__/integration/layout-s1.test.tsx` | Footer is present in layout | `querySelector('footer')` not null |
| AC-1.10 | `src/__tests__/integration/layout-s1.test.tsx` | children render inside layout | `getByTestId('test-children')` present |
| AC-1.11 | `src/__tests__/integration/layout-s1.test.tsx` | `<main id="main-content">` exists | `getElementById('main-content').tagName === 'MAIN'` |
| AC-1.11 | `src/__tests__/integration/layout-s1.test.tsx` | skip link `a[href="#main-content"]` exists | `querySelector` not null |
| NFR-G.TH | `src/__tests__/integration/layout-s1.test.tsx` | html element has "dark" class | `classList.contains('dark')` is true |

**Integration test total (Sprint 1 new): 22 tests across 2 files**

---

## A11y Tests (Sprint 1)

| NFR-ID | Test File | Test Name | Expected Behavior |
|---|---|---|---|
| NFR-*.A | `src/__tests__/a11y/home-a11y.test.tsx` | jest-axe 0 violations on full home page | `toHaveNoViolations()` passes |
| NFR-1.A | `src/__tests__/a11y/nav-a11y.test.tsx` | jest-axe 0 violations on Nav | `toHaveNoViolations()` passes |
| NFR-1.A | `src/__tests__/a11y/nav-a11y.test.tsx` | hamburger has aria-label attribute | `toHaveAttribute('aria-label', 'Open navigation menu')` |
| NFR-1.A | `src/__tests__/a11y/nav-a11y.test.tsx` | hamburger has aria-expanded attribute | Attribute present |

**A11y test total (Sprint 1 new): 4 tests across 2 files (home-a11y currently passes on Sprint 0 page; will test the 10-section page when DEV completes it)**

---

## Playwright E2E Tests

| E2E-ID | Test File | Test Name | AC Coverage | Expected Behavior |
|---|---|---|---|---|
| E2E-1 | `e2e/home.spec.ts` | hero headline visible | AC-0.x carryover | `getByRole('heading', {level:1})` visible |
| E2E-2 | `e2e/home.spec.ts` | Hero CTA navigates to /work/teams-retro | AC-3.3, DEBT-0.2 | Click CTA → URL changes to `/work/teams-retro` |
| E2E-3 | `e2e/home.spec.ts` | "How I Build" scrolls #how-i-work into viewport | AC-2.1 | Click CTA → `#how-i-work` is visible |
| AC-11.1 | `e2e/home.spec.ts` | "AI Intelligence Center" absent from / | AC-11.1 | `getByText` count === 0 |
| AC-3.7 | `e2e/home.spec.ts` | "NeuroMetrics Dashboard" absent | AC-3.7 | Count 0 |
| AC-3.7 | `e2e/home.spec.ts` | "Agentic Orchestration Engine" absent | AC-3.7 | Count 0 |
| E2E-4 | `e2e/navigation.spec.ts` | all 5 nav links navigate without 404 | AC-1.1, AC-11.5–11.7 | Click each → URL changes, no 404 |
| E2E-12 | `e2e/navigation.spec.ts` | "Adwait Mulye" in nav on every page (×5 routes) | AC-UI-1.2 | Brand link visible on each route |
| E2E-5 | `e2e/resume.spec.ts` | PM-Technical resume link href correct | AC-4.5, AC-1.2 | `href="/resumes/Adwait_Mulye_PM-Technical.pdf"` |
| E2E-5 | `e2e/resume.spec.ts` | TPM resume link href correct | AC-4.5 | Correct PDF path |
| E2E-5 | `e2e/resume.spec.ts` | PM-T link opens new tab noopener | AC-1.2, AC-4.5 | Attributes present |
| E2E-8 | `e2e/resume.spec.ts` | LinkedIn/GitHub/Email contact hrefs correct | AC-10.4 | Exact href values |
| E2E-6 | `e2e/nav.mobile.spec.ts` | hamburger visible at 360px | AC-1.4 | Visible on mobile viewport |
| E2E-7 | `e2e/nav.mobile.spec.ts` | hamburger click opens overlay | AC-1.4, NFR-1.A | Click → nav links visible |
| E2E-7 | `e2e/nav.mobile.spec.ts` | aria-expanded changes true after click | AC-1.4, NFR-1.A | Attribute changes |
| E2E-9 | `e2e/console.spec.ts` | zero console errors on all 5 routes (×5) | NFR-1.O | `consoleErrors.length === 0` |
| E2E-10 | `e2e/teams-retro.spec.ts` | /work/teams-retro loads without 404 | AC-11.2 | Status not 404 |
| E2E-10 | `e2e/teams-retro.spec.ts` | four metric numbers visible | AC-11.3 | "5,055", "87/87", "44", "~20–30 hrs" visible |
| E2E-10 | `e2e/teams-retro.spec.ts` | "Teams Retro" h1 visible | AC-11.2 | Heading visible |
| AC-11.1 | `e2e/teams-retro.spec.ts` | "AI Intelligence Center" absent on /work/teams-retro | AC-11.1 | Count 0 |
| E2E-11 | `e2e/stubs.spec.ts` | /artifacts, /git, /writing load without 404 | AC-11.5–11.7 | Status not 404 |
| AC-11.5–11.7 | `e2e/stubs.spec.ts` | stub page h1 titles verbatim | AC-11.4 | Headings visible |
| AC-11.5–11.7 | `e2e/stubs.spec.ts` | status notes present | AC-11.5–11.7 | "Coming in Sprint 3." visible |
| E2E-11 | `e2e/no-fake-chat.spec.ts` | no AI Intelligence Center on any page (×5) | AC-11.1 | Count 0 per route |
| E2E-11 | `e2e/no-fake-chat.spec.ts` | no "Technical Twin ONLINE" badge (×5) | AC-11.1 | Count 0 per route |
| E2E-11 | `e2e/no-fake-chat.spec.ts` | no fake chat input (×5) | AC-11.1 | Locator count 0 |

**Playwright E2E total (Sprint 1 new): ~40 specs across 7 files**

---

## Non-Functional Requirement (NFR) Coverage

| NFR-ID | Covered By |
|---|---|
| NFR-1.P | `npm run build` route table inspection (manual gate, TASK-1.21) |
| NFR-1.A | `a11y/nav-a11y.test.tsx` (axe), `unit/nav.test.tsx` (aria-label, aria-expanded), `integration/layout-s1.test.tsx` (skip link, main id) |
| NFR-1.B | Manual browser check (last 2 versions Chrome, Firefox, Safari, Edge) |
| NFR-1.I | `unit/site-config-s1.test.ts` (all copy traces to siteConfig), `unit/*.test.tsx` (verbatim string assertions) |
| NFR-1.S | `unit/nav.test.tsx` (noopener), `unit/footer.test.tsx` (noopener), `unit/career-trajectory.test.tsx` (noopener), `unit/contact-cta.test.tsx` (noopener) |
| NFR-1.O | `e2e/console.spec.ts` (E2E-9, zero console errors on all 5 routes) |
| NFR-2.A | `unit/how-i-work.test.tsx` (h2/h3 hierarchy, icon aria-hidden implicitly) |
| NFR-2.P | `npm run build` bundle size check (TASK-1.21) |
| NFR-3.A | `unit/selected-work.test.tsx` (h2/h3, span for disabled CTA) |
| NFR-4.A | `unit/career-trajectory.test.tsx` (resume links are `<a>`, not `<button>`) |
| NFR-5.A | `unit/skills.test.tsx` (h2/h3 counts) |
| NFR-6.A | `unit/experience.test.tsx` (h2/h3 hierarchy) |
| NFR-7.A | `unit/education.test.tsx` (no glass-card, no img) |
| NFR-8.A | `unit/about.test.tsx` (no glass-card, h2) |
| NFR-9.A | `unit/beyond-the-work.test.tsx` (h2, no interactive elements) |
| NFR-10.A | `unit/contact-cta.test.tsx` (links are `<a>`, tab order) |
| NFR-11.A | `e2e/teams-retro.spec.ts` (h1 on Teams Retro), `e2e/stubs.spec.ts` (h1 on stubs), `a11y/home-a11y.test.tsx` |
| NFR-11.E2E | All 7 `e2e/*.spec.ts` files |
| NFR-11.P | `npm run build` Lighthouse gate (TASK-1.21, post-deploy Tier 3) |
| NFR-11.SEO | `npm run build` metadata output (TASK-1.21) |
| NFR-G.TC | `npm run typecheck` gate (TASK-1.21) |
| NFR-G.LL | grep gate: `grep -r 'console\.' app/ components/ lib/` (TASK-1.21) |
| NFR-G.ST | grep gate: `grep -r 'style={{' app/ components/` (TASK-1.21) |
| NFR-G.TH | `integration/layout-s1.test.tsx` (html has `dark` class) |
| NFR-G.CP | All verbatim string assertions in unit tests; `unit/site-config-s1.test.ts` |
| NFR-G.FN | `npm run build` font loading inspection (TASK-1.21) |
| NFR-G.RM | REVIEWER check (no JS animation added; `motion-safe:` for CSS transitions) |
| NFR-G.BU | `npm run build` zero errors gate (TASK-1.21) |
| NFR-G.SL | grep gate: file line counts in `app/`, `components/`, `lib/` (TASK-1.21) |
| NFR-G.OG | Post-deploy manual check via opengraph.xyz (TASK-1.21 Tier 3) |

---

## AC Coverage Matrix (Sprint 1)

| AC-ID | Covered By |
|---|---|
| AC-1.1 | `unit/nav.test.tsx`, `unit/site-config-s1.test.ts`, `e2e/navigation.spec.ts` |
| AC-1.2 | `unit/nav.test.tsx`, `unit/site-config-s1.test.ts`, `e2e/resume.spec.ts` |
| AC-1.3 | REVIEWER visual check + E2E (scroll behavior) |
| AC-1.4 | `unit/nav.test.tsx`, `a11y/nav-a11y.test.tsx`, `e2e/nav.mobile.spec.ts` |
| AC-1.5 | REVIEWER visual check |
| AC-1.6 | `unit/footer.test.tsx`, `unit/site-config-s1.test.ts` |
| AC-1.7 | `unit/footer.test.tsx`, `unit/site-config-s1.test.ts` |
| AC-1.8 | `unit/footer.test.tsx`, `unit/site-config-s1.test.ts` |
| AC-1.9 | REVIEWER check (Container Tailwind classes) |
| AC-1.10 | `integration/layout-s1.test.tsx` |
| AC-1.11 | `integration/layout-s1.test.tsx` (skip link, main id) |
| AC-UI-1.1 | REVIEWER visual check |
| AC-UI-1.2 | `unit/nav.test.tsx`, `e2e/navigation.spec.ts` (E2E-12) |
| AC-UI-1.3 | `unit/footer.test.tsx` |
| AC-2.1 | `unit/how-i-work.test.tsx`, `e2e/home.spec.ts` (E2E-3) |
| AC-2.2 | `unit/how-i-work.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-2.3 | REVIEWER visual check (grid layout) |
| AC-2.4 | `unit/how-i-work.test.tsx` |
| AC-2.5 | `unit/how-i-work.test.tsx` |
| AC-2.6 | `unit/how-i-work.test.tsx` |
| AC-2.7 | REVIEWER check (tag chip styling) |
| AC-2.8 | REVIEWER visual check vs ui-mock |
| AC-3.1 | `unit/selected-work.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-3.2 | REVIEWER visual check (grid) |
| AC-3.3 | `unit/selected-work.test.tsx`, `e2e/home.spec.ts` (E2E-2) |
| AC-3.4 | `unit/selected-work.test.tsx` (4 exact metric strings) |
| AC-3.5 | `unit/selected-work.test.tsx` (CTA is not link/button) |
| AC-3.6 | `unit/selected-work.test.tsx` |
| AC-3.7 | `unit/selected-work.test.tsx`, `integration/home-page-s1.test.tsx`, `e2e/home.spec.ts` |
| AC-3.8 | REVIEWER visual check vs ui-mock |
| AC-4.1 | `unit/career-trajectory.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-4.2 | `unit/career-trajectory.test.tsx` |
| AC-4.3 | `unit/career-trajectory.test.tsx` |
| AC-4.4 | `unit/career-trajectory.test.tsx` |
| AC-4.5 | `unit/career-trajectory.test.tsx`, `e2e/resume.spec.ts` |
| AC-4.6 | `unit/career-trajectory.test.tsx` |
| AC-4.7 | REVIEWER visual check (mobile stacking) |
| AC-4.8 | REVIEWER visual check vs ui-mock |
| AC-5.1 | `unit/skills.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-5.2 | REVIEWER visual check (grid) |
| AC-5.3 | `unit/skills.test.tsx` (full §7 Group 1 including "Design systems") |
| AC-5.4 | `unit/skills.test.tsx` (full §7 Group 2 including "Databricks Lakehouse") |
| AC-5.5 | `unit/skills.test.tsx` (full §7 Group 3 including "AI-assisted prototyping") |
| AC-5.6 | `unit/skills.test.tsx` |
| AC-5.7 | REVIEWER check (prose not chips) |
| AC-5.8 | REVIEWER visual check vs ui-mock |
| AC-6.1 | `unit/experience.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-6.2 | `unit/experience.test.tsx` (all 6 entries) |
| AC-6.3 | `unit/experience.test.tsx` (role titles, FedNow, 10,000-store) |
| AC-6.4 | `unit/experience.test.tsx` |
| AC-6.5 | REVIEWER visual check vs ui-mock |
| AC-7.1 | `unit/education.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-7.2 | REVIEWER check (`border-t border-white/5` class) |
| AC-7.3 | `unit/education.test.tsx` (both entries, all three lines each) |
| AC-7.4 | `unit/education.test.tsx` (no glass-card) |
| AC-7.5 | `unit/education.test.tsx` (no img) |
| AC-7.6 | REVIEWER visual check vs ui-mock |
| AC-8.1 | `unit/about.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-8.2 | `unit/about.test.tsx` (three paragraphs, "AI-native PM" bold) |
| AC-8.3 | `unit/about.test.tsx` (paragraph 3 verbatim) |
| AC-8.4 | `unit/about.test.tsx` (no glass-card) |
| AC-8.5 | REVIEWER visual check vs ui-mock |
| AC-9.1 | `unit/beyond-the-work.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-9.2 | `unit/beyond-the-work.test.tsx` (guitar paragraph verbatim, "25 years") |
| AC-9.3 | `unit/beyond-the-work.test.tsx` (no glass-card) |
| AC-9.4 | `unit/beyond-the-work.test.tsx` (one heading, no links/buttons) |
| AC-9.5 | REVIEWER visual check vs ui-mock |
| AC-10.1 | `unit/contact-cta.test.tsx`, `integration/home-page-s1.test.tsx` |
| AC-10.2 | `unit/contact-cta.test.tsx` (two body lines verbatim) |
| AC-10.3 | `unit/contact-cta.test.tsx` (three links) |
| AC-10.4 | `unit/contact-cta.test.tsx`, `e2e/resume.spec.ts` (E2E-8) |
| AC-10.5 | `unit/contact-cta.test.tsx` |
| AC-10.6 | REVIEWER visual check vs ui-mock |
| AC-11.1 | `integration/home-page-s1.test.tsx`, `e2e/home.spec.ts`, `e2e/no-fake-chat.spec.ts` |
| AC-11.2 | `e2e/teams-retro.spec.ts` |
| AC-11.3 | `unit/site-config-s1.test.ts`, `e2e/teams-retro.spec.ts` |
| AC-11.4 | `e2e/stubs.spec.ts` (back link on each stub) |
| AC-11.5 | `e2e/stubs.spec.ts` |
| AC-11.6 | `e2e/stubs.spec.ts` |
| AC-11.7 | `e2e/stubs.spec.ts` |
| AC-11.8 | `npm run build` metadata output inspection (TASK-1.21) |
| AC-11.9 | E2E fetch `/sitemap.xml` asserting 200 (TASK-1.21 gate) |
| AC-11.10 | E2E fetch `/robots.txt` asserting 200 |
| AC-11.11 | REVIEWER check (`<Analytics />` in layout, `@vercel/analytics` in package.json) |
| AC-11.12 | REVIEWER check (README.md exists with required sections) |
| AC-11.13 | REVIEWER check (.env.example exists, .env.local in .gitignore) |

---

## Summary

| Tier | Sprint 0 (carried forward) | Sprint 1 (new, failing) | Total |
|---|---|---|---|
| Unit | 37 | ~96 | ~133 |
| Integration | 6 | 22 | 28 |
| A11y | 7 | 4 | 11 |
| Contract | 1 | 0 | 1 |
| Playwright E2E | 0 | ~40 | ~40 |
| **TOTAL** | **51** | **~162** | **~213** |

**Jest run result (confirmed 2026-06-25):**
```
Test Suites: 15 failed, 7 passed, 22 total
Tests:       58 failed, 61 passed, 119 total
```
- 15 Sprint 1 test suites: all FAILING (correct — imports to non-existent components)
- 7 Sprint 0 test suites: all PASSING (no regression)
- Playwright E2E: config present at `playwright.config.ts`; tests written at `e2e/*.spec.ts`; not run (no dev server)
