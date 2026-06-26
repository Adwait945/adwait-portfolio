# Sprint 1 — Feature Requirements

_Written by PRODUCT on 2026-06-25_

**Sprint Goal:** Production-grade Home page (all 10 sections, canonical order); Teams Retro skeleton page; three professional stub pages; SEO and deployment readiness — all on Next.js 14 App Router, extending the Sprint 0 foundation.

**Locked Home Page Section Order (`app/page.tsx` must render in exactly this sequence):**
1. `<Hero />` — CONTENT §3
2. `<HowIWork />` — CONTENT §4
3. `<SelectedWork />` — CONTENT §5
4. `<CareerTrajectory />` — CONTENT §6
5. `<Skills />` — CONTENT §7
6. `<Experience />` — CONTENT §8
7. `<Education />` — CONTENT §9
8. `<About />` — CONTENT §10
9. `<BeyondTheWork />` — CONTENT §11
10. `<ContactCTA />` — CONTENT §12

Any deviation from this order is an automatic REVIEWER rejection.

---

## Epic 1: Global Layout — Nav, Footer, Container

### User Story
As a visitor, I want a consistent top navigation and footer on every page so I can navigate the site and find contact links regardless of where I land.

### Acceptance Criteria

- **AC-1.1:** `components/layout/Nav.tsx` renders: "Adwait Mulye" on the left (Space Grotesk display font, links to `/`, white, no underline on default state), five center links — Home · Teams Retro · Artifacts · Git · Writing — and a "Resume" dropdown button on the right. Labels are verbatim from `PORTFOLIO_CONTENT.md` §2.
- **AC-1.2:** The Resume dropdown exposes exactly two options: "PM-Technical" linking to `/resumes/Adwait_Mulye_PM-Technical.pdf` and "TPM" linking to `/resumes/Adwait_Mulye_TPM.pdf`. Both open in a new tab with `target="_blank" rel="noopener noreferrer"`.
- **AC-1.3:** Nav is sticky (`position: fixed` or `sticky`) on scroll. A `backdrop-blur` style is applied after the user has scrolled past approximately 80vh of vertical height.
- **AC-1.4:** At viewports < 768px, the five center nav links are hidden and replaced by a hamburger icon button with `aria-label="Open navigation menu"`. Clicking the hamburger opens a full-screen overlay containing the same five links.
- **AC-1.5:** The currently active route is visually indicated by a primary-color (`--primary` cyan) underline or text-color shift on the matching nav link.
- **AC-1.6:** `components/layout/Footer.tsx` renders a three-column layout: left column with copyright/colophon text verbatim from `PORTFOLIO_CONTENT.md` §17, center column with site map links (Home · Teams Retro · Artifacts · Git · Writing), right column with LinkedIn, GitHub, and Email icon links.
- **AC-1.7:** All three footer icon links carry `aria-label` values exactly as specified in `PORTFOLIO_CONTENT.md` §17: `aria-label="LinkedIn profile"`, `aria-label="GitHub profile"`, `aria-label="Email Adwait"`.
- **AC-1.8:** The footer bottom line renders the text "Plano, TX · Built 2026 · v1.0" in a very small, muted style (full width, below the three columns) — verbatim from §17.
- **AC-1.9:** `components/layout/Container.tsx` applies `max-w-[1200px] mx-auto` with symmetric horizontal padding: `px-4` at mobile (< 768px), `px-6` at tablet (768–1199px), `px-8` at desktop (≥ 1200px). No asymmetric padding that creates a right-side whitespace gap.
- **AC-1.10:** `app/layout.tsx` renders `<Nav />` above and `<Footer />` below `{children}`, preserving Sprint 0 font variable classes (`font-sans`, `font-display`, `font-mono` CSS variables on `<html>`).
- **AC-1.11:** A skip-to-content link is rendered in the header. It is visible only on keyboard focus (not on mouse hover). It links to `#main-content`. The `<main>` element wrapping page content carries `id="main-content"`.

### AC-UI (Epic 1)

- **AC-UI-1.1:** The nav renders on a deep navy/black background (`--background` token) with no visible bottom border in the default (not-scrolled) state. After scrolling, a subtle backdrop-blur and darkened background is applied, consistent with the hero mock `docs/ui-mocks/hero.png`.
- **AC-UI-1.2:** "Adwait Mulye" in the nav top-left is always visible at all viewport widths. The center links and Resume button are expected at viewports ≥ 768px. At all widths, "Adwait Mulye" remains top-left and is the first focusable element after the skip link.
- **AC-UI-1.3:** The three footer social buttons in the right column use icon or icon+label treatment with visible `aria-label`. The bottom "Plano, TX · Built 2026 · v1.0" line spans full width and is visually de-emphasized (very small font, muted color).

### Non-Functional Requirements

- **NFR-1.P:** Performance — Nav and Footer contribute no more than 5KB of additional JS to the initial route bundle (they are layout-level, rendered on every route).
- **NFR-1.A:** Accessibility — WCAG 2.1 AA. Skip-to-content link present and functional. Hamburger button has `aria-label`. All icon-only buttons have `aria-label`. Focus order in mobile overlay matches DOM reading order. Focus is trapped inside the mobile overlay while it is open.
- **NFR-1.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; tested at 360px, 768px, 1024px, 1440px.
- **NFR-1.I:** i18n — English only this sprint. All user-facing strings sourced from `PORTFOLIO_CONTENT.md` §2 and §17.
- **NFR-1.S:** Security — No secrets in client code. Resume PDF links reference `/public/resumes/` paths only. All external links carry `rel="noopener noreferrer"`.
- **NFR-1.O:** Observability — No structured logging required for layout components. Console errors on any route are a test failure (E2E-9 in the backlog).

### Dependencies

- Existing file: `app/layout.tsx` (Sprint 0 — must be extended, not replaced)
- Existing file: `lib/site-config.ts` (LinkedIn URL, GitHub URL, email, resume paths)
- Prototype reference: `docs/prototypes/Nav.tsx` — extract sticky/display-font class patterns; note the prototype is minimal and the full dropdown, hamburger, and active-state logic must be authored by DEV using these patterns
- Prototype reference: `docs/prototypes/Footer.tsx` — extract `flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto` button row, glass outline button class, primary filled button class, `h-14 text-base flex-1 rounded-xl` sizing (note: the Replit Footer.tsx is a combined contact CTA + site footer; DEV must split these into `ContactCTA.tsx` and `Footer.tsx` for production)
- Content: `PORTFOLIO_CONTENT.md` §2 (nav labels), §17 (footer copy and icon aria-labels)
- Resume PDFs placed manually at `public/resumes/` before E2E testing

### Out of Scope
- Light-mode nav/footer variant.
- Mega-menu or multi-level dropdown navigation.
- Footer newsletter or contact form.

---

## Epic 2: Home — How I Work

### User Story
As a recruiter, I want to see the candidate's competency in three plain-language buckets so I can map their profile to a PMT job description instantly.

### Acceptance Criteria

- **AC-2.1:** The section carries `id="how-i-work"` so the Hero's "How I Build" CTA can smooth-scroll to it.
- **AC-2.2:** The section heading renders "How I Work" and the subhead renders "Three things a Big Tech PMT has to do well. Here's what I bring to each." — verbatim from `PORTFOLIO_CONTENT.md` §4. Both are centered.
- **AC-2.3:** Three glass cards render in a 3-column grid on desktop (≥ 1024px), 2-column on tablet (768–1023px), and 1-column on mobile (< 768px). All three cards use the `glass-card` utility class. Cards are equal height within the row.
- **AC-2.4:** Card 1 (Product Thinking): renders the `Target` lucide-react icon (cyan, `w-8 h-8`), title "Product Thinking", body paragraph, and the following tags in order — "Agile / Scrum", "GTM Strategy", "User Research", "Metrics & KPIs", "PRD Authoring", "WSJF / RICE" — all verbatim from `PORTFOLIO_CONTENT.md` §4 Pillar 1.
- **AC-2.5:** Card 2 (Engineering Depth): renders the `Code2` lucide-react icon, title "Engineering Depth", body paragraph, and tags — "System Architecture (Tradeoffs · Scalability Milestones · Cross-functional Dependencies · Bottlenecks · Execution Risks & Mitigations)", "TypeScript", "REST / SOAP APIs", "React / Next.js", "Distributed Systems" — verbatim from §4 Pillar 2. The "System Architecture" tag's parenthetical sub-label is rendered in a visually distinct but readable style (smaller or dimmer) within the same chip or as a second line inside the chip.
- **AC-2.6:** Card 3 (AI & Systems): renders the `BrainCircuit` lucide-react icon, title "AI & Systems", body paragraph, and tags — "Multi-Agent Workflows (MAW)", "Claude Code · Windsurf · Antigravity", "Mem0 MCP Memory", "Playwright MCP", "RAG Architecture" — verbatim from §4 Pillar 3.
- **AC-2.7:** All tags use `font-mono` (JetBrains Mono), a bordered pill style with `bg-white/5 border border-white/10 rounded-md`, and are non-interactive (no click handler, no hover state change).
- **AC-2.8:** Visual output matches `docs/ui-mocks/how-i-work.png`.

### AC-UI (Epic 2)

- **AC-UI-2.1:** Each card's icon is set in a small `bg-primary/10 rounded-xl` container (approximately `p-4 w-max`) positioned at the top of the card above the title — matching the mock.
- **AC-UI-2.2:** Section heading is centered, display font (Space Grotesk), large (`text-3xl md:text-4xl font-bold`). Section subhead is centered, muted color (`text-muted-foreground`), below the heading with visible spacing (`mb-4` heading, then subhead, then `mb-16` before the grid).
- **AC-UI-2.3:** The "System Architecture" tag in Card 2 renders as a wider chip that wraps naturally. The parenthetical content is legible and does not overflow the card boundary.
- **AC-UI-2.4:** Cards have `p-8` internal padding and are arranged in a `gap-8` grid. Section-level vertical padding is `py-24`.

### Non-Functional Requirements

- **NFR-2.P:** Performance — `HowIWork.tsx` renders as a React Server Component (no `"use client"` unless animation requires it). If Framer Motion animations are added, they must not block TTI.
- **NFR-2.A:** Accessibility — WCAG 2.1 AA. Card headings use `<h3>`. Section heading uses `<h2>`. Tag chips are `<span>` elements (not `<button>` — non-interactive). Icons have `aria-hidden="true"` (decorative).
- **NFR-2.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-2.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §4.
- **NFR-2.S:** Security — Static section; no data fetching, no user input.
- **NFR-2.O:** Observability — No logging required for this static section.

### Dependencies

- Existing file: `app/page.tsx` (section imported and rendered in position 2)
- Prototype reference: `docs/prototypes/TechnicalDNA.tsx` (production name: `HowIWork.tsx`) — extract `glass-card p-8 rounded-2xl flex flex-col h-full` card, `text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300` tag chip, `mb-6 p-4 bg-primary/10 w-max rounded-xl` icon container, `grid grid-cols-1 md:grid-cols-3 gap-8` grid
- Content: `PORTFOLIO_CONTENT.md` §4

### Out of Scope
- Interactive filtering of pillar cards.
- Expandable tag detail panels.

---

## Epic 3: Home — Selected Work

### User Story
As a recruiter, I want to see real shipped work with verifiable numbers so I can assess this candidate's ability to ship, not just plan.

### Acceptance Criteria

- **AC-3.1:** The section heading renders "Selected Work" and the subhead renders "Real shipped artifacts. No fabricated metrics." — verbatim from `PORTFOLIO_CONTENT.md` §5. Both are centered.
- **AC-3.2:** Three cards render in a 3-column grid on desktop (≥ 1200px), 2-column on tablet (768–1199px), and 1-column on mobile (< 768px). Cards are equal height within each row.
- **AC-3.3:** Card 1 (Teams Retro — real card): renders at full opacity with a solid border (`border border-white/10`). All fields are verbatim from `PORTFOLIO_CONTENT.md` §5 Card 1: eyebrow "PRODUCT · AI-NATIVE BUILD", title "Teams Retro", description paragraph, four metric lines, highlight quote block, tech stack tags ("Next.js 14 · TypeScript · MongoDB Atlas · Jest · Playwright · Tailwind"), and CTA "Read the case study →" linking to `/teams-retro`.
- **AC-3.4:** The four metric lines render with exact values — no paraphrasing, no rounding: "5,055 lines of production TypeScript across 48 files", "87/87 Jest unit tests passing", "44 Playwright end-to-end test cases", "Zero @ts-nocheck escapes".
- **AC-3.5:** Card 2 (Functional & Technical Artifacts — placeholder): renders at 0.6 opacity (`opacity-60`) with a dashed border (`border border-dashed border-white/20`). All fields verbatim from §5 Card 2: eyebrow "ARTIFACTS · IN PROGRESS", title "Functional & Technical Artifacts", description paragraph. CTA renders as non-interactive text "Coming in Sprint 3 →" (a `<span>`, not a `<button>` or `<a>`).
- **AC-3.6:** Card 3 (Code & Workflows — placeholder): renders at 0.6 opacity with a dashed border. All fields verbatim from §5 Card 3: eyebrow "GIT · IN PROGRESS", title "Code & Workflows", description paragraph. CTA renders as non-interactive text "Coming in Sprint 3 →".
- **AC-3.7:** The strings "NeuroMetrics Dashboard", "Agentic Orchestration Engine", and any invented metric not present in `PORTFOLIO_CONTENT.md` do not appear anywhere in the component or on the rendered page.
- **AC-3.8:** Visual output matches `docs/ui-mocks/selected-work.png`.

### AC-UI (Epic 3)

- **AC-UI-3.1:** Card 1 includes a 16:10 aspect-ratio image area at the top of the card (`aspect-[16/10] overflow-hidden`). At Sprint 1, this area uses a placeholder tinted background (`bg-primary/5`) if the screenshot asset is not available.
- **AC-UI-3.2:** The highlight quote in Card 1 renders in a left-bordered glass panel (`glass rounded-xl border-l-2 border-l-primary`) with italic, small text — matching the prototype quote block pattern.
- **AC-UI-3.3:** The metric lines in Card 1 each have a small primary-colored bullet (`text-primary`) preceding the metric text.
- **AC-UI-3.4:** The placeholder cards (Cards 2 and 3) have a centered circular dashed placeholder in their image area (`w-16 h-16 rounded-full border-2 border-dashed border-white/20 absolute inset-0 flex items-center justify-center`) — matching the prototype.
- **AC-UI-3.5:** The section carries a subtly darker background (`bg-black/20`) relative to surrounding sections, matching the mock.
- **AC-UI-3.6:** The card CTA for Card 1 ("Read the case study →") is a text link with `ArrowUpRight` icon, styled `text-sm font-medium text-white hover:text-primary transition-colors`, pinned to the bottom of the card (`mt-auto`).

### Non-Functional Requirements

- **NFR-3.P:** Performance — No images fetched from external URLs at Sprint 1. Card 1 image area uses local asset or placeholder background. No cumulative layout shift caused by image loading (`aspect-[16/10]` wrapper prevents CLS).
- **NFR-3.A:** Accessibility — WCAG 2.1 AA. Card titles use `<h3>`. Eyebrows use `<span>` with `font-mono`. The disabled CTA on placeholder cards must be a `<span>` (not `<button>` or `<a>`) to avoid keyboard tab stop on non-functional elements. Any image in Card 1 must have `alt="Teams Retro Dashboard"`.
- **NFR-3.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-3.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §5.
- **NFR-3.S:** Security — Static section. No user input. CTA link to `/teams-retro` is an internal route.
- **NFR-3.O:** Observability — No logging required for this static section.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 3)
- Prototype reference: `docs/prototypes/FeaturedProjects.tsx` (production name: `SelectedWork.tsx`) — extract `glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full` card, metric bullet pattern, quote block `glass rounded-xl border-l-2 border-l-primary`, opacity-60 + dashed-border placeholder, `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` grid
- Content: `PORTFOLIO_CONTENT.md` §5

### Out of Scope
- Hover lift effect on placeholder cards (explicitly disabled per §5 visual spec).
- Carousel or horizontal scroll for the card grid.
- Real content for Cards 2 and 3 (Sprint 3).

---

## Epic 4: Home — Career Trajectory

### User Story
As a recruiter, I want to understand the candidate's growth arc and download the right resume without searching for it.

### Acceptance Criteria

- **AC-4.1:** The section heading renders exactly "Career Trajectory" — not "Career History", not "My Background", not any other variant. Verbatim from `PORTFOLIO_CONTENT.md` §6.
- **AC-4.2:** The intro line "Three resumes, because I've held three lenses on the same craft." renders below the heading, verbatim from §6.
- **AC-4.3:** Three sub-blocks render below the intro line, each with a bold label and body text — verbatim from §6: "SAFe Product Owner." with body, "Technical Program Manager." with body, "Product Manager, Technical." with body. Label text is `font-bold text-white`, body text follows inline.
- **AC-4.4:** The emphasis line renders immediately below the three sub-blocks, italicized, verbatim: "*And increasingly: **AI-Native PM** — using agentic workflows as the operating layer, not as a feature. Already shipping this way.*" — "AI-Native PM" is bold within the italic.
- **AC-4.5:** Two resume buttons render immediately below the emphasis line (not in a separate section, not in the footer): primary filled button "Download PM-Technical Resume" linking to `/resumes/Adwait_Mulye_PM-Technical.pdf`, and secondary outline button "Download TPM Resume" linking to `/resumes/Adwait_Mulye_TPM.pdf`. Both open in a new tab with `target="_blank" rel="noopener noreferrer"`.
- **AC-4.6:** The muted SAFe note renders below the buttons, verbatim from §6: "Looking for a SAFe Product Owner conversation? Email me — I keep a separate resume tailored for those engagements." The word "Email me" links to `mailto:adwaitmulye@gmail.com`.
- **AC-4.7:** On mobile (< 768px), the two resume buttons stack vertically (full-width, one above the other).
- **AC-4.8:** Visual output matches `docs/ui-mocks/career-trajectory.png`.

### AC-UI (Epic 4)

- **AC-UI-4.1:** The three sub-blocks render as three glass cards in a 3-column grid on desktop (`glass-card p-8 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8`), matching the mock. On mobile, cards stack to 1 column.
- **AC-UI-4.2:** The emphasis line is centered, `italic text-slate-300`, constrained to `max-w-3xl mx-auto`, with visible margin above and below.
- **AC-UI-4.3:** The primary resume button carries an `ArrowDown` lucide-react icon to the left of the label text. The secondary button also carries `ArrowDown`. This matches the prototype `CareerTrajectory.tsx` pattern.
- **AC-UI-4.4:** The primary button uses `bg-primary text-primary-foreground hover:opacity-90 font-bold px-8 rounded-xl h-14 text-base shadow-[0_0_20px_rgba(0,229,255,0.3)]`. The secondary button uses the glass outline style `glass border-white/10 hover:bg-white/10 text-white px-8 rounded-xl h-14`.
- **AC-UI-4.5:** The SAFe note is `text-xs text-slate-500`, centered, `max-w-2xl mx-auto`.
- **AC-UI-4.6:** The section carries `bg-black/20` background matching the mock.

### Non-Functional Requirements

- **NFR-4.P:** Performance — Static section. No async data fetching. PDF links trigger browser-native download or new tab.
- **NFR-4.A:** Accessibility — WCAG 2.1 AA. Resume download links are `<a>` elements (not `<button>`). Both carry descriptive text labels. The `ArrowDown` icon carries `aria-hidden="true"`. "Email me" link has sufficient color contrast against its background.
- **NFR-4.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-4.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §6.
- **NFR-4.S:** Security — Resume PDFs served from `/public/resumes/` (static assets, no auth gate at MVP). All external links use `rel="noopener noreferrer"`.
- **NFR-4.O:** Observability — No logging required for this static section.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 4)
- Existing file: `lib/site-config.ts` (resume paths)
- Prototype reference: `docs/prototypes/CareerTrajectory.tsx` — extract 3-col glass-card grid for sub-blocks, emphasis line centering, `flex flex-col sm:flex-row items-center justify-center gap-6` button row, `ArrowDown` icon usage, SAFe note text styling
- Content: `PORTFOLIO_CONTENT.md` §6

### Out of Scope
- The "Selected AI-Augmented Initiatives" sub-section visible in the Replit prototype (`CareerTrajectory.tsx` lines 113–138 and `docs/ui-mocks/selected-ai-initiatives.png`) — this is NOT included in Sprint 1. It is not in the locked section order and not in the backlog.
- SAFe resume download button (off-portfolio per PRD §5).

---

## Epic 5: Home — Skills & Tools

### User Story
As a recruiter doing a skills-check, I want to find specific technologies explicitly listed so I can verify against job requirements.

### Acceptance Criteria

- **AC-5.1:** The section heading renders "Skills & Tools" — verbatim from `PORTFOLIO_CONTENT.md` §7. Centered.
- **AC-5.2:** Four glass cards render in a 2-column grid on desktop (≥ 768px) and 1-column on mobile (< 768px). All four use the `glass-card` utility class.
- **AC-5.3:** Card 1 heading "Product Management" and dot-separated skill list render verbatim from §7 Group 1: "Product vision & roadmap · Customer & stakeholder discovery · Requirements decomposition · Acceptance criteria & testable contracts · Edge-case analysis · Prioritization (WSJF, RICE) · OKRs & success metrics · PRD authoring · Design systems · GTM coordination".
- **AC-5.4:** Card 2 heading "Technical Depth" and skill list render verbatim from §7 Group 2: "REST & SOAP APIs · Microservices · Distributed systems · System design & scaling · SQL (complex querying) · Databricks Lakehouse · ETL pipelines · MongoDB / PostgreSQL · JSON / XML data contracts · React · Next.js · Java Spring Boot · Python · CI/CD".
- **AC-5.5:** Card 3 heading "AI & GenAI Tooling" and skill list render verbatim from §7 Group 3: "Custom multi-agent workflow design · Windsurf Cascade · Google Antigravity · Claude Code CLI · Replit · Databricks Genie · Mem0 MCP cross-IDE memory · Playwright MCP browser-agent E2E · RAG architecture · AI-assisted prototyping · Prompt engineering · LLM integration".
- **AC-5.6:** Card 4 heading "Delivery & Tools" and skill list render verbatim from §7 Group 4: "Cross-functional leadership · Dependency & risk management · Agile / Scrum · SAFe at enterprise scale · JIRA · Confluence · Postman · Effective in both structured-program and autonomous-team models".
- **AC-5.7:** Skills render as a dot-separated inline text list (`·` separator, `text-sm text-slate-300 leading-relaxed`) — matching the rendering pattern visible in `docs/ui-mocks/skills.png` and the prototype `SkillsTools.tsx`. Not rendered as individual pill chips.
- **AC-5.8:** Visual output matches `docs/ui-mocks/skills.png`.

### AC-UI (Epic 5)

- **AC-UI-5.1:** Each card uses `glass-card p-8 rounded-2xl border border-white/10`. Card heading is `text-xl font-bold mb-4`. Skill list text is `text-sm text-slate-300 leading-relaxed`.
- **AC-UI-5.2:** The 2-column grid uses `grid grid-cols-1 md:grid-cols-2 gap-8`. Cards fill the full container width.
- **AC-UI-5.3:** Section heading is centered, `text-3xl md:text-4xl font-bold mb-4`, with `mb-16` between heading area and the grid.

### Non-Functional Requirements

- **NFR-5.P:** Performance — Static section. No data fetching, no client-side JavaScript required.
- **NFR-5.A:** Accessibility — WCAG 2.1 AA. Group headings use `<h3>`. Section heading uses `<h2>`. Skill text is a `<p>` element (prose string with `·` separators, not a `<ul>`).
- **NFR-5.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-5.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §7.
- **NFR-5.S:** Security — Static section. No user input.
- **NFR-5.O:** Observability — No logging required.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 5)
- Prototype reference: `docs/prototypes/SkillsTools.tsx` (production name: `Skills.tsx`) — extract `grid grid-cols-1 md:grid-cols-2 gap-8`, `glass-card p-8 rounded-2xl border border-white/10`, `text-xl font-bold mb-4` heading, `text-sm text-slate-300 leading-relaxed` prose skill list
- Content: `PORTFOLIO_CONTENT.md` §7

### Out of Scope
- Interactive skill filtering or search.
- Proficiency ratings or bar charts.
- Individual skill pill chips (dot-separated prose is the correct rendering per mock and prototype).

---

## Epic 6: Home — Experience Snapshot

### User Story
As a recruiter, I want a quick read of employment history with the most important facts per role.

### Acceptance Criteria

- **AC-6.1:** Section heading renders "Experience" and subhead renders "14 years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare." — verbatim from `PORTFOLIO_CONTENT.md` §8. Both centered.
- **AC-6.2:** Six entries render in the following order, verbatim from §8: Entry 1 (7-Eleven), Entry 2 (Wells Fargo), Entry 3 (USAA), Entry 4 (Freeman Company), Entry 5 (FedEx), Entry 6 (Earlier — Aperia Solutions / Techgene Solutions / MedAssets). No entries omitted, no entries added.
- **AC-6.3:** Each of the six entries renders: company name and role (`font-bold text-white`), a meta line with via/dates/location in muted style (`text-slate-400`), and the marquee paragraph (`text-sm text-slate-500 leading-relaxed`) — all verbatim from §8.
- **AC-6.4:** A "Full work history →" link appears at the bottom of the section, linking to `/resumes/Adwait_Mulye_PM-Technical.pdf`, opening in a new tab with `target="_blank" rel="noopener noreferrer"`.
- **AC-6.5:** Visual output matches `docs/ui-mocks/experience.png`.

### AC-UI (Epic 6)

- **AC-UI-6.1:** Entries render as a vertical center-axis timeline. A vertical line (`absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-white/10`) runs down the center. Each entry has a primary-colored glow dot (`w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] border-2 border-black z-10`) centered on the axis above the entry card.
- **AC-UI-6.2:** Each entry card uses `glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors`. Cards are constrained to approximately 2/3 container width (`md:w-2/3`) and centered (`text-center`).
- **AC-UI-6.3:** The date/period renders in `text-primary font-mono text-sm` as the first line inside the card, above the role title (`text-xl font-bold`) and company name (`text-slate-400`).
- **AC-UI-6.4:** The "Full work history →" link renders with `ArrowUpRight` icon, centered, with a glow dot node on the timeline above it matching the entry nodes.
- **AC-UI-6.5:** Section carries `bg-black/20` background. Section vertical padding is `py-24`.

### Non-Functional Requirements

- **NFR-6.P:** Performance — Static section. Six entry objects rendered server-side; no client-side data fetching.
- **NFR-6.A:** Accessibility — WCAG 2.1 AA. Each entry's role/company heading is an `<h3>`. The timeline's decorative dot elements and vertical line carry `aria-hidden="true"`. The "Full work history" link text is descriptive. The section heading is `<h2>`.
- **NFR-6.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-6.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §8.
- **NFR-6.S:** Security — "Full work history" link opens PDF from `/public/resumes/`. No user data collected.
- **NFR-6.O:** Observability — No logging required.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 6)
- Prototype reference: `docs/prototypes/Timeline.tsx` (production name: `Experience.tsx`) — extract centered vertical timeline pattern, `absolute left-1/2 transform -translate-x-1/2` line, glow-dot node, `glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors` entry card, `text-primary font-mono text-sm` date rendering
- Content: `PORTFOLIO_CONTENT.md` §8

### Out of Scope
- Expandable/collapsible entry detail panels.
- Full résumé rendered inline on the page.

---

## Epic 7: Home — Education

### User Story
As a recruiter completing a candidate checklist, I want education credentials visible without opening a PDF.

### Acceptance Criteria

- **AC-7.1:** Section heading renders "Education" — verbatim from `PORTFOLIO_CONTENT.md` §9.
- **AC-7.2:** A subtle horizontal separator (`border-t border-white/5`) is visible above the section, distinguishing it from the Experience section above.
- **AC-7.3:** Two entries render verbatim from §9: Entry 1 — degree "Master of Science, Management Information Systems", institution "University of Houston–Clear Lake", year "2010"; Entry 2 — degree "Bachelor of Engineering, Electronics", institution "University of Mumbai, India", year "2007".
- **AC-7.4:** The section uses no `glass-card` component and no card background — entries render as plain text on the dark background.
- **AC-7.5:** No icons and no university logos render anywhere in this section.
- **AC-7.6:** Visual output matches `docs/ui-mocks/education.png`.

### AC-UI (Epic 7)

- **AC-UI-7.1:** The two entries render side-by-side in a 2-column grid on desktop (`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto`), stacking to 1 column on mobile — matching the prototype and the mock.
- **AC-UI-7.2:** Each entry renders three lines: degree name (`font-bold text-white mb-1`), institution (`text-sm text-slate-400`), graduation year (`text-sm text-slate-500 mt-1`). No other elements.
- **AC-UI-7.3:** Section heading is centered, `text-3xl md:text-4xl font-bold mb-10 text-center`. Section vertical padding is `py-16` (lighter than card-heavy sections).
- **AC-UI-7.4:** The education section appears visually lightweight — no background color change, no card chrome — providing a deliberate visual break between Experience and The Bridge.

### Non-Functional Requirements

- **NFR-7.P:** Performance — Static, no JS required beyond framework baseline.
- **NFR-7.A:** Accessibility — WCAG 2.1 AA. Degree names are `<p font-bold>` (not `<h3>` — no heading hierarchy needed). Screen readers will read all three lines in natural DOM order.
- **NFR-7.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge.
- **NFR-7.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §9.
- **NFR-7.S:** Security — Static section. No user input.
- **NFR-7.O:** Observability — No logging required.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 7)
- Prototype reference: `docs/prototypes/Education.tsx` — extract `border-t border-white/5` separator pattern, `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto` layout, three-line entry rendering
- Content: `PORTFOLIO_CONTENT.md` §9

### Out of Scope
- GPAs, honors, or coursework detail.
- University logo images.

---

## Epic 8: Home — The Bridge (About)

### User Story
As a recruiter who has scrolled deep, I want the human story behind the resume — the "why" behind the trajectory.

### Acceptance Criteria

- **AC-8.1:** Section heading renders "The Bridge" — verbatim from `PORTFOLIO_CONTENT.md` §10.
- **AC-8.2:** Three paragraphs render verbatim from §10. In Paragraph 2, the text "AI-native PM" is bold (`font-bold text-white` within the surrounding `text-slate-300` paragraph).
- **AC-8.3:** Paragraph 3 renders with exact wording: "The Product Owner foundation has been built. The technical depth is where I've been heading the entire time. This site is a working artifact of both." — no variation in punctuation, capitalization, or phrasing.
- **AC-8.4:** The section uses no `glass-card` and no background panel. Text renders directly on the dark background (`--background` token), providing visual contrast with the card-heavy sections above.
- **AC-8.5:** Visual output matches the "The Bridge" section visible in `docs/ui-mocks/beyond-the-work.png` (the mock shows both The Bridge and Beyond the Work sections together on one screen).

### AC-UI (Epic 8)

- **AC-UI-8.1:** Section heading is centered, `text-3xl md:text-4xl font-bold mb-10 text-center` — matching the `TheBridge.tsx` prototype.
- **AC-UI-8.2:** The three paragraphs render in a `max-w-4xl mx-auto space-y-6` container. Each paragraph uses `text-slate-300 leading-relaxed`. No card chrome, no background panel.
- **AC-UI-8.3:** Section vertical padding is `py-24`.

### Non-Functional Requirements

- **NFR-8.P:** Performance — Static section. Server component. No JS execution required.
- **NFR-8.A:** Accessibility — WCAG 2.1 AA. Section heading uses `<h2>`. Paragraphs use `<p>`. Bold "AI-native PM" uses `<strong>` or a `font-bold` `<span>`. Color contrast of `text-slate-300` on `--background` (deep navy `230 40% 4%`) must pass WCAG AA minimum 4.5:1 for normal-sized text.
- **NFR-8.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge.
- **NFR-8.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §10.
- **NFR-8.S:** Security — Static section. No user input.
- **NFR-8.O:** Observability — No logging required.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 8, component imported as `<About />`)
- Prototype reference: `docs/prototypes/TheBridge.tsx` (production name: `About.tsx`) — extract `max-w-4xl mx-auto space-y-6`, `text-slate-300 leading-relaxed` paragraph pattern, centered `text-3xl md:text-4xl font-bold mb-10` heading
- Content: `PORTFOLIO_CONTENT.md` §10

### Out of Scope
- Resume download buttons in this section (they belong only in CareerTrajectory — PRD D16 and D17).
- Card or panel background for the text.

---

## Epic 9: Home — Beyond the Work

### User Story
As a recruiter or hiring manager, I want one human signal that this candidate has the long-term patience and discipline to truly build skills — not just list them.

### Acceptance Criteria

- **AC-9.1:** Section heading renders "Beyond the Work" — verbatim from `PORTFOLIO_CONTENT.md` §11.
- **AC-9.2:** One paragraph renders verbatim from §11: "Outside of work, I've played guitar for 25 years — long enough to know that the gap between knowing something and being able to do it under pressure is where most of the real learning happens, and it takes a lot of patience to properly build a skill over time while also excelling at a day job."
- **AC-9.3:** The section uses no `glass-card`, no icon, and no tag chips. Same plain-text on dark background treatment as The Bridge (Epic 8).
- **AC-9.4:** The section contains exactly two elements: the section heading and the one paragraph. No additional copy, links, buttons, images, or visual elements.
- **AC-9.5:** Visual output matches the "Beyond the Work" section visible in `docs/ui-mocks/beyond-the-work.png`.

### AC-UI (Epic 9)

- **AC-UI-9.1:** Section heading is centered, `text-3xl md:text-4xl font-bold mb-10 text-center` — same rhythm as The Bridge.
- **AC-UI-9.2:** The paragraph is centered (`text-center`), `text-slate-300 leading-relaxed`, constrained to `max-w-4xl mx-auto` — matching the `BeyondTheWork.tsx` prototype exactly.
- **AC-UI-9.3:** Section vertical padding is `py-24`, consistent with The Bridge.

### Non-Functional Requirements

- **NFR-9.P:** Performance — Static section. Server component. No JS execution required.
- **NFR-9.A:** Accessibility — WCAG 2.1 AA. Section heading uses `<h2>`. Paragraph uses `<p>`. No interactive elements; nothing requires keyboard focus.
- **NFR-9.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge.
- **NFR-9.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §11.
- **NFR-9.S:** Security — Static section. No user input.
- **NFR-9.O:** Observability — No logging required.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 9)
- Prototype reference: `docs/prototypes/BeyondTheWork.tsx` — extract centered heading, `text-center text-slate-300 leading-relaxed max-w-4xl mx-auto` paragraph pattern, `py-24` section padding
- Content: `PORTFOLIO_CONTENT.md` §11

### Out of Scope
- Photography, audio, or video embedding.
- Any second paragraph or additional personal content.

---

## Epic 10: Home — Contact CTA

### User Story
As a recruiter who has scrolled to the bottom, I want a clear "what to do next" and easy ways to reach out.

### Acceptance Criteria

- **AC-10.1:** Section heading renders "Let's talk" — verbatim from `PORTFOLIO_CONTENT.md` §12.
- **AC-10.2:** Two body lines render verbatim from §12: Line 1 — "Open to PM-Technical, Product TPM, Senior TPM, and Senior/Principal PM roles at companies investing in technical product leadership and AI-native delivery." Line 2 — "Plano-based; flexible on hybrid and remote."
- **AC-10.3:** Three equal-width buttons render: "LinkedIn", "GitHub", and "Email" — per §12. On desktop (≥ 640px), they render side-by-side (`flex-row`); on mobile (< 640px), they stack vertically (`flex-col`).
- **AC-10.4:** LinkedIn and GitHub button `href` values are sourced from `lib/site-config.ts` (not hardcoded in the component). Email button uses `href="mailto:adwaitmulye@gmail.com"`.
- **AC-10.5:** LinkedIn and GitHub buttons carry `target="_blank" rel="noopener noreferrer"`. The Email mailto link does not require these attributes.
- **AC-10.6:** Visual output matches `docs/ui-mocks/contact.png`.

### AC-UI (Epic 10)

- **AC-UI-10.1:** The three buttons have equal width (`flex-1`) within a `flex` container constrained to `max-w-2xl mx-auto`. LinkedIn and GitHub use the glass/outline style (`glass border-white/10 hover:bg-white/10 text-white rounded-xl h-14 text-base`). Email uses the primary filled style (`bg-primary text-primary-foreground hover:opacity-90 font-bold rounded-xl h-14 text-base shadow-[0_0_20px_rgba(0,229,255,0.3)]`) — matching the mock where Email appears as the cyan-filled button.
- **AC-UI-10.2:** The heading is centered, display font, `text-3xl md:text-4xl font-bold mb-6`.
- **AC-UI-10.3:** The two body lines are centered, `text-slate-300 leading-relaxed`, with `space-y-2 mb-10` container above the button row.
- **AC-UI-10.4:** The ContactCTA section sits immediately above `<Footer />` as the last content section of the home page. It uses `py-24` vertical padding. A `border-t border-white/5` separator distinguishes it from BeyondTheWork above.

### Non-Functional Requirements

- **NFR-10.P:** Performance — Static section. No async fetching. Button `href` values resolved at build time from `lib/site-config.ts`.
- **NFR-10.A:** Accessibility — WCAG 2.1 AA. Section heading uses `<h2>`. All three buttons render as `<a>` elements with descriptive text labels. Tab order matches visual order (LinkedIn → GitHub → Email).
- **NFR-10.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; 360px, 768px, 1024px, 1440px.
- **NFR-10.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §12.
- **NFR-10.S:** Security — External links use `rel="noopener noreferrer"`. No form submission, no PII collected.
- **NFR-10.O:** Observability — No logging required for static section.

### Dependencies

- Existing file: `app/page.tsx` (section rendered in position 10)
- Existing file: `lib/site-config.ts` (LinkedIn URL, GitHub URL)
- Prototype reference: `docs/prototypes/Footer.tsx` — extract `flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto` button row pattern, glass outline button classes, primary filled button with glow shadow, `h-14 text-base flex-1 rounded-xl` sizing (note: ContactCTA is separated from the actual `<Footer />` in production; the Replit prototype combines them in one component)
- Content: `PORTFOLIO_CONTENT.md` §12

### Out of Scope
- A contact form (Sprint 1 scope is CTA links only — PRD §5).
- Phone number or calendar booking link.

---

## Epic 11: Teams Retro Skeleton + Stub Pages + SEO + Deployment Readiness

### User Story
As the candidate, I want every route to be real and every page to preview correctly when shared, so the site is credible from day one.

### Acceptance Criteria

- **AC-11.1 (CRITICAL):** The "AI Intelligence Center" chat interface is completely absent from all pages and all components. No fake chat box, no "Technical Twin ONLINE" status badge, no non-functional input field, no `AISandbox` component renders anywhere. If a Technical Twin placeholder slot is included, it renders solely as the clean "in development" card from `PORTFOLIO_CONTENT.md` §13: a `glass-card` with heading "Technical Twin", a cyan "IN DEVELOPMENT" badge, the description paragraph, and the italic "Building this in Sprint 5." line. No input field, no send button, no chat interface.
- **AC-11.2:** `/teams-retro` renders `components/teams-retro/TeamsRetroSkeleton.tsx`. The page includes in order: back navigation link, hero section (eyebrow + heading + subhead), metric strip (four callouts), and five placeholder sections (What it is, How it was built, System Design, See it live, Links row) — all verbatim from `PORTFOLIO_CONTENT.md` §14.
- **AC-11.3:** The metric strip renders exactly four callouts with these exact values: "5,055" / "lines of production TypeScript", "87/87" / "Jest tests passing", "44" / "Playwright E2E test cases", "~20–30 hrs" / "across three weekends". Numbers render in `text-primary font-display text-4xl md:text-5xl font-bold tracking-tight`. No placeholder text replaces these values.
- **AC-11.4:** `components/shared/StubPageLayout.tsx` is a reusable component accepting props: `eyebrow: string`, `title: string`, `blurb: string`, `statusNote: string`. It renders these with a "← Back to home" link to `/`.
- **AC-11.5:** `/artifacts` page renders `StubPageLayout` with content verbatim from `PORTFOLIO_CONTENT.md` §16 `/artifacts` entry: eyebrow "ARTIFACTS", title "Functional & Technical Artifacts", blurb text, status note "Coming in Sprint 3.", back link "← Back to home".
- **AC-11.6:** `/git` page renders `StubPageLayout` with content verbatim from §16 `/git` entry: eyebrow "GIT · WORKFLOWS", title "Code & Workflows", blurb text, status note "Coming in Sprint 3.", back link "← Back to home".
- **AC-11.7:** `/writing` page renders `StubPageLayout` with content verbatim from §16 `/writing` entry: eyebrow "WRITING", title "Writing", blurb text, status note "First two pieces coming in Sprint 4 — ...", back link "← Back to home".
- **AC-11.8:** All five pages (`/`, `/teams-retro`, `/artifacts`, `/git`, `/writing`) export a `metadata` object via the Next.js Metadata API. Each `metadata` includes `title`, `description`, `openGraph` (title, description, url, type), and `twitter` fields — values verbatim from `PORTFOLIO_CONTENT.md` §15. Title format: `<Page Name> — Adwait Mulye`.
- **AC-11.9:** `app/sitemap.ts` generates a valid `/sitemap.xml` listing all five public routes (`/`, `/teams-retro`, `/artifacts`, `/git`, `/writing`). Verified by Playwright fetching `/sitemap.xml` and asserting a 200 status.
- **AC-11.10:** `app/robots.ts` generates `/robots.txt` that allows all crawlers (`User-agent: *`, `Allow: /`) and includes a `Sitemap:` reference.
- **AC-11.11:** `@vercel/analytics` is installed as a production dependency and `<Analytics />` from `@vercel/analytics/react` is rendered inside `app/layout.tsx`.
- **AC-11.12:** `README.md` exists at the repo root and contains at minimum: project description, tech stack (Next.js 14, TypeScript, Tailwind, shadcn/ui), `npm install` step, `npm run dev` step, `npm test` / `npm run test:run` command, and `npm run build` command.
- **AC-11.13:** `.env.example` exists at the repo root listing all environment variables used in the project. `.env.local` is in `.gitignore` and is confirmed not committed to the repository.

### AC-UI (Epic 11)

- **AC-UI-11.1:** The Teams Retro metric strip uses `grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto` and renders 2-column on mobile, 4-column on desktop — matching the `TeamsRetro.tsx` prototype.
- **AC-UI-11.2:** The Teams Retro hero section is centered: eyebrow in `text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold`, heading in `text-5xl md:text-7xl font-bold tracking-tighter`, subhead in `text-lg md:text-xl text-slate-400`.
- **AC-UI-11.3:** The back navigation renders "← Back to home" using `ArrowLeft` lucide-react icon, `text-sm text-slate-400 hover:text-primary transition-colors`, as an `<a>` or Next.js `<Link>` to `/`, placed above the hero section with `pt-8` container padding.
- **AC-UI-11.4:** Placeholder content sections (What it is, How it was built, System Design, See it live) alternate between transparent and `bg-black/20` backgrounds. Placeholder paragraph text is `text-slate-400 text-lg italic`.
- **AC-UI-11.5:** The Demo placeholder renders as `border-2 border-dashed border-white/20 rounded-2xl p-12 flex items-center justify-center` with centered italic text "Live seeded demo + Loom walkthrough — coming in Sprint 2".
- **AC-UI-11.6:** The links row renders three equal-flex buttons (`flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto`). "Live Demo" uses `bg-primary text-primary-foreground` with the cyan glow shadow. "View on GitHub" and "Watch Loom" use `border border-white/10 rounded-xl px-8 py-4` outline style.
- **AC-UI-11.7:** Stub pages use the same dark theme, display font headings, and `--primary` cyan accent as the Home page. They render a centered max-width container. No construction imagery, no humor, no placeholder images.
- **AC-UI-11.8:** If the Technical Twin "in development" card is rendered anywhere, it matches `docs/ui-mocks/technical-twin.png`: centered `glass-card rounded-2xl` with `max-w-2xl mx-auto`, "Technical Twin" heading, "IN DEVELOPMENT" badge in a `font-mono border border-primary text-primary text-xs rounded` pill, body paragraph centered, italic "Building this in Sprint 5." line below.

### Non-Functional Requirements

- **NFR-11.P:** Performance — Lighthouse mobile on `/`: performance score ≥ 90, accessibility score ≥ 95, SEO score ≥ 95. Verified manually post-deployment (Tier 3). Teams Retro and stub pages must not contain render-blocking resources or un-sized images.
- **NFR-11.A:** Accessibility — WCAG 2.1 AA across all five routes. `StubPageLayout` uses `<h1>` for page title. Teams Retro metric strip numbers use `<p>` or `<span>` elements (not headings). The section heading "Teams Retro" on its page uses `<h1>`.
- **NFR-11.B:** Browser support — last 2 versions of Chrome, Firefox, Safari, Edge; all five routes verified.
- **NFR-11.I:** i18n — English only. All copy from `PORTFOLIO_CONTENT.md` §13–§16.
- **NFR-11.S:** Security — `.env.local` not committed. No secrets in client-side code. Vercel Analytics is privacy-respecting and GDPR-compliant (no cookies, no PII).
- **NFR-11.O:** Observability — Vercel Web Analytics captures page views on all five routes automatically once `<Analytics />` is present in `app/layout.tsx`. No additional structured logging required for Sprint 1.
- **NFR-11.T:** Type safety — `npx tsc --noEmit` passes with zero errors across the entire project after all Sprint 1 components are implemented.
- **NFR-11.ST:** Styling compliance — Tailwind utility classes only across all components. No `style={{}}` props, no `<style>` tags. All design tokens reference CSS custom properties from `app/globals.css`.
- **NFR-11.E2E:** E2E testing — All twelve Playwright E2E tests (E2E-1 through E2E-12, as defined in the Sprint 1 backlog Test Strategy) must pass in CI mode (`npm run test:run`).

### Dependencies

- Existing file: `app/layout.tsx` (receives `<Analytics />` addition; global Nav and Footer rendering preserved)
- Existing file: `app/page.tsx` (imports all 10 home section components in locked order)
- Existing file: `lib/site-config.ts` (consumed by ContactCTA, Nav, and any component needing LinkedIn/GitHub URLs or resume paths)
- Existing tests: `src/__tests__/` (Sprint 0 tests must continue to pass; DEV must not modify test files)
- Prototype reference: `docs/prototypes/TeamsRetro.tsx` (production name: `TeamsRetroSkeleton.tsx`) — extract metric strip large-number pattern (`text-4xl md:text-5xl font-bold text-primary font-display tracking-tight`), alternating-background section pattern, back nav `ArrowLeft` pattern, Demo dashed-box, links row three-button pattern
- Content: `PORTFOLIO_CONTENT.md` §13 (Technical Twin placeholder copy), §14 (Teams Retro skeleton copy), §15 (metadata), §16 (stub page copy)

### Out of Scope (Sprint 1)
- Teams Retro deep content — full product overview, MAW walkthrough, system design doc, live demo, Loom recording (Sprint 2).
- Artifacts page real content (Sprint 3).
- Git page real content (Sprint 3).
- Writing page real content (Sprint 4).
- Technical Twin live feature (Sprint 5).
- Light theme, internationalization, contact form, MDX rendering.
- Custom domain DNS (manual step per PRD §10).
- Per-route dynamic OG images via `opengraph-image.tsx` (static `og:image` referencing `public/opengraph.jpg` is acceptable at Sprint 1).

---

## Global Non-Functional Requirements (All Epics)

These apply to every component and route produced in Sprint 1. REVIEWER checks each during the 28-point audit.

- **NFR-G.TC:** Type safety — Strict TypeScript throughout. `npx tsc --noEmit` passes with zero errors. No `any` casts without an explanatory comment.
- **NFR-G.LL:** No `console.log` in any production file under `app/`, `components/`, or `lib/`. Use the project logger (`src/lib/logger.ts`) if logging is genuinely required (it is not required for Sprint 1's static sections).
- **NFR-G.ST:** Tailwind-only styling. No `style={{}}` props anywhere. No `<style>` tags anywhere. All design tokens are CSS custom properties in `app/globals.css` (`--primary`, `--background`, `--foreground`, `--muted-foreground`, etc.).
- **NFR-G.TH:** Dark theme only at MVP. The `<html>` element carries the dark theme class or equivalent. No light-mode CSS classes or conditional theme switching.
- **NFR-G.CP:** All visible copy traces to a specific section of `PORTFOLIO_CONTENT.md` v3. No paraphrasing, no invented strings, no placeholder text ("Lorem ipsum", "Coming soon", "Under construction") in production code.
- **NFR-G.AT:** ATDD discipline enforced. Tests are written by TEST agent before DEV implements. DEV does not modify test files. Every AC in this document has at least one corresponding test.
- **NFR-G.FN:** Fonts loaded via `next/font/google` only — Inter (body), Space Grotesk (display), JetBrains Mono (mono). No CDN `<link>` font imports.
- **NFR-G.RM:** `prefers-reduced-motion` is respected. CSS transitions and animations that are non-essential are wrapped in `@media (prefers-reduced-motion: no-preference)` guards or the equivalent Tailwind `motion-safe:` prefix.
- **NFR-G.BU:** `npm run build` completes with zero errors before the REVIEWER verdict is issued. Zero TypeScript errors, zero Next.js build warnings about missing metadata or malformed components.
- **NFR-G.SL:** No file in `src/`, `app/`, or `components/` exceeds 200 lines. Components approaching the cap must be split per `CLAUDE.md` hard rules.
- **NFR-G.OG:** All five pages have valid Open Graph preview metadata (`og:title`, `og:description`, `og:image`, `og:url`). Verified via `https://opengraph.xyz` post-deployment (Tier 3 manual check).
