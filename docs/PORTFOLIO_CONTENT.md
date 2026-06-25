# Portfolio — Content (Locked Copy)

**Companion to:** `PORTFOLIO_PRD.md`, `PORTFOLIO_IA.md`
**Version:** v3 — guitar section added, Bridge p3 rewritten, Technical Twin copy added, section order updated
**Status:** Locked for Sprint 1 build
**Last updated:** 2026-06-21

This document holds the final, locked copy for every visible piece of text on the site at MVP. The DEV agent uses this as the source of truth and does not paraphrase or rewrite. If anything here needs to change, edit this file first, then update the component. Never the reverse.

---

## 1. Site-Wide Configuration

| Field | Value |
|---|---|
| Site name | Adwait Mulye |
| Browser tab default | Adwait Mulye — Product Manager, Technical · TPM |
| Default meta description | 14 years turning ambiguous business intent into shipped software. Senior Product Owner moving into PMT / TPM roles at Big Tech, with an AI-native operating model. |
| Email | adwaitmulye@gmail.com |
| LinkedIn URL | _https://www.linkedin.com/in/adwait-mulye-0b708818a/_ |
| GitHub URL | _https://github.com/Adwait945_ |
| Location | Plano, Texas |
| Open to | PM-Technical, Product TPM, Senior TPM, Senior/Principal PM roles |
| Resume paths | `/resumes/Adwait_Mulye_PM-Technical.pdf` (primary) · `/resumes/Adwait_Mulye_TPM.pdf` (secondary) |

---

## 2. Navigation Labels

- Home
- Teams Retro
- Artifacts
- Git
- Writing
- **Resume** *(button — dropdown with two options: "PM-Technical" and "TPM")*

**Name in Nav:** The nav left slot renders "Adwait Mulye" as the site name, linking to `/`. This is the primary location of the candidate's name on the site. It appears on every page via the global layout. Style: display font, slightly larger than the nav links, white, no decoration on default state.

---

## 3. Home — §1 Hero

**Eyebrow (small pill, uppercase, mono font):**
> PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER

**Headline (large, display font; "and" in muted gray; "Technical Execution" in primary cyan accent):**
> Bridging Product Strategy and Technical Execution

**Sub-headline (centered, one line on desktop):**
> 14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.

**Primary CTA button (filled, cyan):**
> View Featured Work → *(links to `/teams-retro`)*

**Secondary CTA button (outlined):**
> How I Build *(smooth-scrolls to `#how-i-work`)*

---

## 4. Home — §2 How I Work (Three Pillars)

**Section heading:**
> How I Work

**Section subhead:**
> Three things a Big Tech PMT has to do well. Here's what I bring to each.

### Pillar 1 — Product Thinking

**Icon:** `Target` (lucide-react)

**Title:** Product Thinking

**Body:**
> Defining what to build, why it matters, and how to know it worked. Discovery, requirements decomposition, acceptance criteria that survive sprint 14, and the discipline to say no.

**Tags (mono chips, in order):**
- Agile / Scrum
- GTM Strategy
- User Research
- Metrics & KPIs
- PRD Authoring
- WSJF / RICE

### Pillar 2 — Engineering Depth

**Icon:** `Code2` (lucide-react)

**Title:** Engineering Depth

**Body:**
> Designing systems, reasoning about tradeoffs, and writing production code. APIs and integration contracts, distributed systems, data pipelines, and modern web stacks.

**Tags (mono chips, in order):**
- System Architecture *(Tradeoffs · Scalability Milestones · Cross-functional Dependencies · Bottlenecks · Execution Risks & Mitigations)*
- TypeScript
- REST / SOAP APIs
- React / Next.js
- Distributed Systems

**Note to DEV:** The first tag "System Architecture" has a parenthetical sub-label. Render the parenthetical in a smaller, slightly dimmer style within the same chip, or as a second line inside the chip. It must be visually distinct from the tag title but readable.

### Pillar 3 — AI & Systems

**Icon:** `BrainCircuit` (lucide-react)

**Title:** AI & Systems

**Body:**
> Treating AI as the operating layer, not a feature. A self-designed six-persona agentic workflow, cross-IDE memory, browser-agent E2E testing, and the discipline to make AI-generated code production-quality.

**Tags (mono chips, in order):**
- Multi-Agent Workflows (MAW)
- Claude Code · Windsurf · Antigravity
- Mem0 MCP Memory
- Playwright MCP
- RAG Architecture

---

## 5. Home — §3 Selected Work

**Section heading:**
> Selected Work

**Section subhead:**
> Real shipped artifacts. No fabricated metrics.

**Layout:** 3-column card grid desktop / 2-column tablet / 1-column mobile. All cards equal height within each row. Real cards: full opacity, solid border. Placeholder cards: 0.6 opacity, dashed border.

### Card 1 — Teams Retro (REAL CARD)

**Eyebrow:** PRODUCT · AI-NATIVE BUILD

**Title:** Teams Retro

**Description:**
> A real-time team retrospective app — feedback feed, gamification engine, time-window analytics, admin moderation — designed, built, tested, and deployed using my own six-persona agentic workflow.

**Metric strip (four items — exact values, no paraphrasing):**
- 5,055 lines of production TypeScript across 48 files
- 87/87 Jest unit tests passing
- 44 Playwright end-to-end test cases
- Zero @ts-nocheck escapes

**Highlight quote:**
> "A quarter of traditional solo development, compressed into ~20–30 hours across three focused weekends. Roughly 15–30× faster than the baseline a single PM/dev would need to ship the same scope."

**Tech stack tags:** Next.js 14 · TypeScript · MongoDB Atlas · Jest · Playwright · Tailwind

**CTA:** Read the case study → *(links to `/teams-retro`)*

### Card 2 — Functional & Technical Artifacts (PLACEHOLDER)

**Eyebrow:** ARTIFACTS · IN PROGRESS

**Title:** Functional & Technical Artifacts

**Description:**
> Sanitized artifacts from recent engagements — best-in-class acceptance criteria, system design doc, technical risk assessment, and a business translation framework.

**CTA:** Coming in Sprint 3 → *(no link, disabled or plain text)*

**Visual:** 0.6 opacity, dashed border, no hover lift effect.

### Card 3 — Code & Workflows (PLACEHOLDER)

**Eyebrow:** GIT · IN PROGRESS

**Title:** Code & Workflows

**Description:**
> GitHub walkthrough, annotated forks and stars, and the six-persona Multi-Agent Workflow (MAW) — the agentic pipeline behind everything on this site.

**CTA:** Coming in Sprint 3 → *(no link, disabled or plain text)*

**Visual:** 0.6 opacity, dashed border, no hover lift effect.

---

## 6. Home — §4 Career Trajectory

**Section heading:**
> Career Trajectory

**Intro line:**
> Three resumes, because I've held three lenses on the same craft.

**Sub-block 1:**
**SAFe Product Owner.** Fourteen years grounding in turning ambiguous business intent into shipped software. Discovery loops, requirements quality, dependency management, and the discipline of finishing.

**Sub-block 2:**
**Technical Program Manager.** The natural expansion: from owning one product to orchestrating delivery across many teams and systems. Architecture-level decisions, integration contracts, and scaling.

**Sub-block 3:**
**Product Manager, Technical.** Owning a product end-to-end with the technical depth to make the right calls, not just relay them. Where I'm headed next.

**Emphasis line (italicized, below the three blocks):**
> *And increasingly: **AI-Native PM** — using agentic workflows as the operating layer, not as a feature. Already shipping this way.*

**Resume buttons (immediately below the emphasis line; buttons side-by-side on desktop, stacked on mobile):**
- Primary button: "Download PM-Technical Resume" → `/resumes/Adwait_Mulye_PM-Technical.pdf`
- Secondary/outline button: "Download TPM Resume" → `/resumes/Adwait_Mulye_TPM.pdf`

**Small muted note below buttons:**
> Looking for a SAFe Product Owner conversation? [Email me](mailto:adwaitmulye@gmail.com) — I keep a separate resume tailored for those engagements.

---

## 7. Home — §5 Skills & Tools

**Section heading:**
> Skills & Tools

**Layout:** 2-column grid desktop / 1-column mobile. Four glass-card group blocks.

### Group 1 — Product Management

Product vision & roadmap · Customer & stakeholder discovery · Requirements decomposition · Acceptance criteria & testable contracts · Edge-case analysis · Prioritization (WSJF, RICE) · OKRs & success metrics · PRD authoring · Design systems · GTM coordination

### Group 2 — Technical Depth

REST & SOAP APIs · Microservices · Distributed systems · System design & scaling · SQL (complex querying) · Databricks Lakehouse · ETL pipelines · MongoDB / PostgreSQL · JSON / XML data contracts · React · Next.js · Java Spring Boot · Python · CI/CD

### Group 3 — AI & GenAI Tooling

Custom multi-agent workflow design · Windsurf Cascade · Google Antigravity · Claude Code CLI · Replit · Databricks Genie · Mem0 MCP cross-IDE memory · Playwright MCP browser-agent E2E · RAG architecture · AI-assisted prototyping · Prompt engineering · LLM integration

### Group 4 — Delivery & Tools

Cross-functional leadership · Dependency & risk management · Agile / Scrum · SAFe at enterprise scale · JIRA · Confluence · Postman · Effective in both structured-program and autonomous-team models

---

## 8. Home — §6 Experience

**Section heading:**
> Experience

**Section subhead:**
> 14 years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare.

**Layout:** vertical timeline; six entries. Each: company name + role (bold), via/dates/location line (muted), marquee paragraph.

### Entry 1 — 7-Eleven

**Role:** Senior Product Owner | Technical Product Lead
**Meta:** *via Kforce · Allen, TX · April 2024 – Present*

In-house Fuels Pricing & Sign-Push integration platform — the industry's only major retailer running this fully in-house. Inherited the pod as the 7th lead in five years; rebuilt product definition and delivery from the ground up. Shipped 70+ features across 8 program increments, hit a 10,000-store rollout target a full year ahead of schedule. Avoided ~$1M in headcount cost by modeling capacity and rejecting a proposed team expansion.

### Entry 2 — Wells Fargo

**Role:** Senior Product Owner | Technical Product Manager
**Meta:** *via Kforce · June 2022 – April 2024 · Treasury Payments*

First-wave implementer of the Federal Reserve's FedNow 24/7 instant-payment rail. Owned IRWS requirements and dependencies across 5+ integrating projects. Partnered with engineering on a monolith-to-microservices re-architecture that lifted efficiency 30%, cut API latency 50%, and raised throughput from 100 to 400 TPS.

### Entry 3 — USAA

**Role:** Program Manager
**Meta:** *via Essential Technologies · 2020 – 2022 · Model Risk Management*

Coordinated cross-functional dependencies across Product Management, Model Owners, Developers, Implementers, Validators, and Data Warehouse for multiple Model Risk Management programs at a Fortune 100 financial services firm.

### Entry 4 — Freeman Company

**Role:** Product Owner
**Meta:** *via Essential Technologies · 2018 – 2020 · Virtual Events Platform*

Led delivery during the pandemic-era pivot to virtual and hybrid events. Sustained ~175 user stories/month across 3–4 concurrent client engagements on a 12-week-per-client cycle.

### Entry 5 — FedEx

**Role:** Systems Analyst
**Meta:** *via Essential Technologies · 2016 – 2018 · API Products*

Drove a REST and SOAP API platform for FedEx Office's e-commerce printing channel, including a public API portal enabling commercial customers to embed services in white-labeled apps.

### Entry 6 — Earlier

Aperia Solutions (Senior Business Analyst, 2013–2016) · Techgene Solutions / MedAssets (Business Analyst, 2011–2013)

**Link at bottom of section:**
> Full work history → *(links to `/resumes/Adwait_Mulye_PM-Technical.pdf`)*

---

## 9. Home — §7 Education

**Section heading:**
> Education

**Layout:** Lightweight two-entry block. No glass-card treatment. Subtle horizontal rule or divider above the section. No icons.

**Entry 1:**
Master of Science, Management Information Systems · University of Houston–Clear Lake · 2010

**Entry 2:**
Bachelor of Engineering, Electronics · University of Mumbai, India · 2007

---

## 10. Home — §8 The Bridge

**Section heading:**
> The Bridge

**Visual treatment:** Plain text on the dark background, no card. Provides contrast with the card-heavy sections above.

**Paragraph 1:**
> Fourteen years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare have taught me one thing repeatedly: the gap between what business leaders want and what engineering ships is almost always a translation gap, not an effort gap. Most of my career has been spent closing it — turning ambiguous executive intent into testable contracts, dependencies into delivery plans, and architecture decisions into roadmaps a business can stand behind.

**Paragraph 2:**
> What's changed in the last two years is how I work. I now operate as an **AI-native PM** — running a self-designed six-persona agentic workflow (PRODUCT · ARCHITECT · TEST · DEV · PROFESSOR · REVIEWER) across Claude Code, Windsurf, and Antigravity, with cross-IDE memory bridging via MCP. I don't talk about AI as a product feature. I use it as my operating layer. I take concepts from whiteboard to working prototype in a weekend, ship 5,000+ lines of tested production code in three, and replace slide-only stakeholder reviews with functioning demos.

**Paragraph 3 (UPDATED — "unfaked" removed):**
> The Product Owner foundation has been built. The technical depth is where I've been heading the entire time. This site is a working artifact of both.

---

## 11. Home — §9 Beyond the Work

**Section heading:**
> Beyond the Work

**Visual treatment:** Same plain-text treatment as The Bridge — no card, dark background. Sits naturally as a brief human moment between The Bridge and Contact CTA.

**Body (single paragraph):**
> Outside of work, I've played guitar for 25 years — long enough to know that the gap between knowing something and being able to do it under pressure is where most of the real learning happens, and it takes a lot of patience to properly build a skill over time while also excelling at a day job.

**Note to DEV:** This is a short standalone section. No icon, no card, no tags. A simple section heading and one paragraph, styled the same as The Bridge. Section spacing matches the rest of the page.

---

## 12. Home — §10 Contact CTA

**Section heading:**
> Let's talk

**Body line 1:**
> Open to PM-Technical, Product TPM, Senior TPM, and Senior/Principal PM roles at companies investing in technical product leadership and AI-native delivery.

**Body line 2:**
> Plano-based; flexible on hybrid and remote.

**Buttons (three, equal width on desktop; stacked on mobile):**
- LinkedIn *(opens LinkedIn profile in new tab)*
- GitHub *(opens GitHub profile in new tab)*
- Email *(`mailto:adwaitmulye@gmail.com`)*

All external links: `target="_blank" rel="noopener noreferrer"`.

---

## 13. Technical Twin — Future Feature Copy

**Location:** This copy is used in Sprint 5 when the Technical Twin feature is built. At MVP (Sprints 0–1), any Technical Twin placeholder on the page uses the "in development" treatment below.

**In-development placeholder (for any visible slot on the page):**

> **Technical Twin** *(in development)*
>
> A conversational AI assistant trained on this portfolio's public content — case studies, artifacts, and writing. Ask it anything you'd ask me in a first-round interview: what I've shipped, how I approach system design, what I think about AI-native delivery. It won't hallucinate about my record because it only knows what's on this site.
>
> *Building this in Sprint 5.*

**Note:** The Technical Twin placeholder should NOT appear as a prominent section on the Home page MVP. If the existing Replit scaffold shows an "AI Intelligence Center" chat interface, it is replaced in Sprint 1 with a small, clean "in development" card — not a fake chat UI that doesn't work. A broken or placeholder chat interface is worse than no interface.

---

## 14. Teams Retro Page — Sprint 1 Skeleton Copy

Route: `/teams-retro`. Sprint 1 builds the structure; Sprint 2 replaces placeholder paragraphs with real content. Metric strip values are real and locked — never placeholder.

**Back navigation:** ← Back to home *(links to `/`)*

### Section 1 — Hero

**Eyebrow:** CASE STUDY · PRODUCT · AI-NATIVE BUILD

**Heading:** Teams Retro

**Sub-heading:**
> A real-time team retrospective app built end-to-end with a six-persona agentic workflow in three weekends.

### Section 2 — Metric Strip

Four large-number callouts in a horizontal row. Numbers in primary accent color (display font, large). Labels below in muted body font.

| Number | Label |
|---|---|
| 5,055 | lines of production TypeScript |
| 87/87 | Jest tests passing |
| 44 | Playwright E2E test cases |
| ~20–30 hrs | across three weekends |

### Section 3 — What It Is

**Heading:** What it is

**Paragraph (placeholder):** *[Full product overview — coming in Sprint 2]*

### Section 4 — How It Was Built

**Heading:** How it was built

**Paragraph (placeholder):** *[MAW workflow walkthrough — coming in Sprint 2]*

### Section 5 — System Design

**Heading:** System Design

**Paragraph (placeholder):** *[Architecture, data models, API contracts — coming in Sprint 2]*

### Section 6 — Demo

**Heading:** See it live

**Placeholder box (dashed border):**
> Live seeded demo + Loom walkthrough — coming in Sprint 2

### Section 7 — Links Row

Three buttons, side by side on desktop, stacked on mobile. All linking to `#` as placeholders:

- View on GitHub →
- Watch Loom →
- Live Demo →

---

## 15. Page Metadata (SEO / OG)

Title format: `<Page Name> — Adwait Mulye`

| Route | Title | Description (~140 chars) |
|---|---|---|
| `/` | Adwait Mulye — Product Manager, Technical · TPM | 14 years turning ambiguous business intent into shipped software. PMT / TPM candidate with an AI-native operating model. |
| `/teams-retro` | Teams Retro — Case Study — Adwait Mulye | Real-time retrospective app built in 3 weekends: 5,055 lines of TypeScript, 87 Jest tests, 44 Playwright E2E, six-persona agentic workflow. |
| `/artifacts` | Functional & Technical Artifacts — Adwait Mulye | Sanitized artifacts: acceptance criteria examples, system design doc, technical risk assessment, business translation framework. |
| `/git` | Code & Workflows — Adwait Mulye | GitHub walkthrough, annotated forks and stars, and the six-persona Multi-Agent Workflow (MAW) writeup. |
| `/writing` | Writing — Adwait Mulye | AI-native delivery, requirements quality, and bridging business and engineering. |

---

## 16. Stub Page Copy

Routes: `/artifacts`, `/git`, `/writing`. All use `StubPageLayout`.

### `/artifacts`

- **Eyebrow:** ARTIFACTS
- **Title:** Functional & Technical Artifacts
- **Blurb:** Sanitized artifacts from recent engagements — best-in-class acceptance criteria examples, a synthesized system design doc, a technical risk assessment, and a business translation framework. Drawn from real work; published with all employer-identifying material removed.
- **Status note:** Coming in Sprint 3.
- **Back link:** ← Back to home

### `/git`

- **Eyebrow:** GIT · WORKFLOWS
- **Title:** Code & Workflows
- **Blurb:** Annotated GitHub walkthrough — pinned repos, curated forks and stars with notes on what each taught me, the six-persona Multi-Agent Workflow (MAW) writeup, and what I'm continuously studying. The point isn't the volume of code; it's the judgment behind which code is worth my time.
- **Status note:** Coming in Sprint 3.
- **Back link:** ← Back to home

### `/writing`

- **Eyebrow:** WRITING
- **Title:** Writing
- **Blurb:** Pieces on AI-native delivery, requirements quality, and the gap between business and engineering. Cross-posted from LinkedIn and other platforms.
- **Status note:** First two pieces coming in Sprint 4 — "A quarter of work in three weekends: what the MAW workflow actually does" and "Plain-English translation as a PMT skill."
- **Back link:** ← Back to home

---

## 17. Footer

**Left column (small, muted):**
> © 2026 Adwait Mulye. Built end-to-end with Next.js, Tailwind, and my own MAW agentic workflow.

**Center column — site map links:**
Home · Teams Retro · Artifacts · Git · Writing

**Right column — icon links (each with `aria-label`):**
- LinkedIn (`aria-label="LinkedIn profile"`)
- GitHub (`aria-label="GitHub profile"`)
- Email (`aria-label="Email Adwait"`, `href="mailto:adwaitmulye@gmail.com"`)

**Bottom line (full width, very small, muted):**
> Plano, TX · Built 2026 · v1.0

---

## 18. Microcopy Reference

| Context | Copy |
|---|---|
| Stub page status | "Coming in Sprint N." |
| Back navigation | "← Back to home" |
| Secondary CTA arrow | "Read more →" |
| In-progress card CTA | "Coming in Sprint N →" |
| Resume primary button | "Download PM-Technical Resume" |
| Resume secondary button | "Download TPM Resume" |
| Resume SAFe note | "Looking for a SAFe Product Owner conversation? Email me — I keep a separate resume tailored for those engagements." |
| Placeholder section body | "*[Description — coming in Sprint N]*" (italicized) |
| Placeholder demo box | "Live seeded demo + Loom walkthrough — coming in Sprint 2" |
| Dashed-border placeholder | Dashed border + 0.6 opacity, no hover lift |
| Technical Twin placeholder | See §13 |
