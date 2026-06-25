# Portfolio — Product Requirements Document

**Owner:** Adwait Mulye
**Status:** v2 — updated after Replit design review
**Last updated:** 2026-06-14
**Related docs:** `PORTFOLIO_IA.md`, `PORTFOLIO_CONTENT.md`, `SPRINT_1_BACKLOG.md`

---

## 1. Vision & Positioning

A personal portfolio that persuades a Big Tech recruiter or hiring manager — in under 30 seconds of skimming — to take the next step on a candidate moving from Senior Product Owner into **Product Manager, Technical / Technical Program Manager** roles.

The site is not a brochure. It is a credibility instrument. Every element on it exists to defeat one specific objection: *"Can this person operate as a technical product leader at scale at Google / Meta / Amazon / Microsoft?"*

The strongest answer to that objection is not more bullets — it is **AI-native operating capability** demonstrated by working software, sanitized artifacts, and a documented agentic workflow that compressed a quarter of traditional development into three weekends.

---

## 2. Target Audience

**Primary:** Recruiters and hiring managers for the following role family at Big Tech and FAANG-adjacent companies:

- Amazon — Senior PM-Technical (PMT), L6/L7
- Meta — Product TPM
- Google — Technical Program Manager (Product) within a Product Area
- Microsoft — Principal Program Manager / Principal Technical Program Manager
- Apple — Engineering Program Manager / Senior Product Manager
- Stripe / Airbnb / Salesforce / Snowflake / Databricks / Atlassian — Senior or Staff Technical Product Manager

**Secondary:** Past colleagues, referrers, and the broader product-tech community on LinkedIn.

**Explicitly not:** SAFe Product Owner contract roles. Those continue to be served by the dedicated SAFe resume variant, sent through staffing firms — not via this site.

---

## 3. Problem Statement

The default reading of an Adwait Mulye resume is *"Strong Senior PO."* The site exists to shift that reading to *"PMT-ready, with an AI-native edge."* Four pieces of evidence must land:

1. **Genuine technical depth** — system thinking, architecture decisions, integration contracts, TPM-flavored system complexity signals.
2. **Proven ability to ship working software** — Teams Retro, end to end, with real tests.
3. **AI-native operating capability** — the six-persona MAW workflow as proof of leverage.
4. **Discretion and judgment** — sanitized employer artifacts, no IP exposure.

A portfolio that does any three of these well, but botches the fourth, fails.

---

## 4. Goals & Success Criteria

**Quantitative (post-launch, first 90 days):**

- Recruiter-initiated outreach: at least 3 inbound conversations directly attributable to the portfolio URL being shared in applications or DMs.
- Site Lighthouse performance score: 90+ on mobile and desktop.
- Cumulative Google PageSpeed visits: tracked baseline; growth month-over-month.

**Qualitative:**

- Pre-launch peer review by 3+ people in PMT/TPM roles at target companies returns no flagged credibility issues (fake metrics, broken claims, IP exposure).
- Recruiter visiting on mobile reads the hero, scrolls to the Teams Retro card, and clicks through within 60 seconds — verified informally during the first month.

**Strategic:**

- The site itself is a working artifact of the candidate's AI-native operating model. The fact that it was built with the MAW workflow is part of the pitch, footnoted in the colophon.

---

## 5. Non-Goals

These are explicitly out of scope and will be defended against scope creep:

- **No user acquisition for Teams Retro.** The seeded demo + case study + Loom is the entire artifact. The portfolio is not a marketing site for the app.
- **No live RAG bot over JIRA / personal record at launch.** Dropped due to IP exposure risk and hallucination risk on the candidate's own delivery history. May be revisited in Sprint 5 — only over public site content, never employer data.
- **No multi-resume confusion.** Three resumes exist; the site presents one (PM-T) as primary, one (TPM) as secondary, and the SAFe variant lives off-site.
- **No raw employer artifacts.** Internal JIRA, business one-pagers, system design docs, and the business-translation source document remain private. Only synthesized, sanitized versions appear on the site.
- **No fabricated metrics.** The Replit scaffold's invented "Selected Work" cards (NeuroMetrics Dashboard, Agentic Orchestration Engine, and their hallucinated impact statistics) are deleted.
- **No trading content.** The Fibonacci candlestick "AI Sandbox" is off-brand for the target role family and is removed.
- **No light theme at MVP.** Dark theme only.
- **No horizontal carousel for the Selected Work grid.** Card grid chosen instead (see D15).

---

## 6. Scope — MVP (Sprint 1)

The MVP ships a **production-grade Home page** plus four **routable, stubbed pages** for future content. The Home page is fully populated with real content and the Replit design is the canonical visual reference. The four stubs are real routes that render professional "in development" placeholders — they exist so navigation works end-to-end and the URL structure is set for all future sprints.

### 6.1 Pages in Sprint 1

| Route | Status | Content Source |
|---|---|---|
| `/` (Home) | Production | `PORTFOLIO_CONTENT.md` §3–12 |
| `/teams-retro` | High-level structure with metric strip + section skeletons | `PORTFOLIO_CONTENT.md` §13 |
| `/artifacts` | Stub | `PORTFOLIO_CONTENT.md` §14 |
| `/git` | Stub | `PORTFOLIO_CONTENT.md` §14 |
| `/writing` | Stub | `PORTFOLIO_CONTENT.md` §14 |

**Note on `/teams-retro`:** Unlike the other three stubs, the Teams Retro page gets a real skeleton in Sprint 1 — hero with metric strip, section headings, placeholder content blocks — because it already has a Replit design reference. This reduces Sprint 2's scope to filling content, not building structure.

### 6.2 Home page sections (canonical order, locked)

1. Hero
2. How I Work (three pillars)
3. Selected Work (card grid)
4. Career Trajectory + resume downloads
5. Skills & Tools
6. Experience snapshot (timeline)
7. Education
8. The Bridge (About narrative)
9. Contact CTA

### 6.3 Out of scope for Sprint 1

- Teams Retro case study deep content — Loom, system design doc, live demo (Sprint 2)
- Artifacts page real content (Sprint 3)
- Git page real content (Sprint 3)
- Writing page real content (Sprint 4)
- Live Technical Twin bot (Sprint 5, optional)
- Analytics dashboard beyond Vercel's built-in (Sprint 2+)
- MDX-based blog post rendering (Sprint 4)

---

## 7. Future Roadmap

| Sprint | Goal | Long-pole inputs needed |
|---|---|---|
| **Sprint 0** | MAW pipeline smoke test — Next.js foundation + Hero only | None beyond docs already in `/docs` |
| **Sprint 1** | Home production (all 9 sections) + Teams Retro skeleton + 3 stubs + deployed | Resume PDFs, Replit ui-mock screenshots |
| **Sprint 2** | Teams Retro case study filled in | Mongo seed script, Loom recording, Teams Retro screenshots, system design doc (Workstream B) |
| **Sprint 3** | Artifacts page filled in | Cowork-extracted JIRA metrics, best-AC examples, technical risk assessment, business translation framework (Workstreams A + C) |
| **Sprint 4** | Git page + Writing page filled in | Curated forks/stars with annotations, 1–2 seeded blog posts (Teams Retro story, MAW writeup) |
| **Sprint 5 (optional)** | Technical Twin bot | Public-content corpus only; strict guardrails against hallucination |

Each sprint reuses the `/docs` pattern: PRD addendum (if needed), IA delta, CONTENT additions, SPRINT_N_BACKLOG.

---

## 8. Decision Log

Every locked decision and the rationale. Anchors future sprints against drift.

### D1 — Target role family is PMT / Product-TPM / Senior PM-T

The site targets a role *family*, not a specific company. Content is generic enough to pair with any of the three tailored resumes (PM-T, TPM, SAFe). The Home About narrative addresses the PO→PMT bridge explicitly so a reader from any of those targets sees themselves in the candidate.

### D2 — PM-T resume is the primary download; TPM is secondary; SAFe is off-portfolio

Reasoning: content shaped to PM-T downgrades cleanly to TPM. The reverse does not work. SAFe PO targeting is a separate workstream served by staffing firms, not this site.

### D3 — Career Trajectory framing wraps the three resumes in a growth narrative

Three resume buttons without context read as indecision. The three-lens narrative (SAFe PO → TPM → PM-T, with AI-Native PM as the emerging fourth) reads as clarity and intentional growth. Resume downloads appear immediately below the narrative, not in a separate section.

### D4 — Section name is "Career Trajectory" not "Career History"

"Career History" is backward-looking. "Career Trajectory" is forward-looking and signals intentional transition — the right read for a PMT job search. Locked.

### D5 — Framework is Next.js 14+, not Vite

Sprint 0 cost of porting the Replit Vite scaffold is acceptable in exchange for: better SEO (server-rendered HTML), native Open Graph image generation per page, file-based routing matching the MAW project pattern, and MDX support for the future Writing page. Vercel deployment is one-click.

### D6 — Express + Drizzle backend stripped; Next.js API routes added when needed

Sprint 1 Home is fully static. Future features (contact form, Technical Twin bot) use Next.js API routes on Vercel, not a separate Express app.

### D7 — Hosting is Vercel; domain is TBD (purchase during Sprint 1)

Vercel is the canonical Next.js host. Free tier covers the portfolio. Custom domain to be purchased per §10.

### D8 — MongoDB Atlas (free tier, existing account) for Sprint 2+ persistence

Existing Atlas account from the Teams Retro project. Used for Teams Retro seeded demo (Sprint 2) and optionally for Technical Twin bot vector search (Sprint 5) via Atlas Vector Search. No new database account needed.

### D9 — Selected Work uses a responsive card grid, not a horizontal carousel

Card grid (3 columns desktop / 2 columns tablet / 1 column mobile) is the chosen pattern. Carousel rejected because: content is hidden, mobile swipe conflicts with page scroll, and visitors don't know more items exist without clear affordance. Grid scales seamlessly — adding a new project card simply flows into the next row. In-progress cards are visually distinguished (reduced opacity, dashed border).

### D10 — Selected Work: one real card (Teams Retro) + two in-progress placeholders at MVP

Three cards in the grid at launch: Teams Retro (real), Functional & Technical Artifacts (placeholder, Sprint 3), Code & Workflows (placeholder, Sprint 3). No fourth card at MVP. Each in-progress card uses reduced opacity and a dashed border.

### D11 — Teams Retro "Read the case study" links to `/teams-retro` which has a real skeleton in Sprint 1

The Teams Retro page gets structure (hero, metric strip, section skeletons with placeholder content) in Sprint 1 because a Replit design reference exists. Sprint 2 fills the content. The link is live from day one.

### D12 — Skills & Tools is a dedicated section, separate from the pillar tag chips

The three pillars (How I Work) have small framing tags — they are marketing-level signals, not an exhaustive inventory. The Skills & Tools section further down the page holds the full technical inventory from the resume skills blocks. Both serve the same reader at different scroll depths. No duplication — they are complementary.

### D13 — Engineering Depth pillar tags call out TPM system-thinking sub-skills explicitly

The "System Architecture" tag in the Engineering Depth pillar is annotated: "System Architecture (Tradeoffs · Scalability Milestones · Cross-functional Dependencies · Bottlenecks · Execution Risks & Mitigations)". This is the primary location where TPM-flavored complexity signals appear in the How I Work section.

### D14 — Education section is included, after Skills & Tools

Education is lightweight but present. Two entries: M.S. Management Information Systems (University of Houston–Clear Lake, 2010) and B.E. Electronics (University of Mumbai, India, 2007). No heavy card treatment — clean text. Recruiters check for it; absence makes them wonder.

### D15 — Section order on Home is locked as of v2

1 Hero → 2 How I Work → 3 Selected Work → 4 Career Trajectory + resumes → 5 Skills & Tools → 6 Experience → 7 Education → 8 The Bridge → 9 Contact CTA. Any future sprint that adds a Home section must update this PRD and the IA before the build.

### D16 — Career Trajectory resume downloads sit immediately below the narrative

Resume download buttons belong in the Career Trajectory section, directly below the three-lens narrative. They do not appear in The Bridge section. Having them in two places would be repetitive.

### D17 — The Bridge (About) section is plain-text, no card background

The Bridge is the emotional/intellectual story, not a structured pitch. It renders as plain text on the dark background, providing visual contrast with the card-heavy sections above it. No resume downloads in this section.

### D18 — Technical Twin bot is a visual placeholder ("in development") in Sprint 1

Half-working AI is worse than honestly-marked future work. If the Technical Twin bot section is included in the MVP design, it renders as a clean "in development" slot. Sprint 5 is the earliest it becomes a real feature.

### D19 — Replit is the canonical visual reference for the MAW build

After the eight Replit prompts in the design-finalization session are run and screenshots are captured, Replit screenshots in `docs/ui-mocks/` become the source of truth for what every section should look like. The MAW DEV agent is instructed to match these screenshots. Any design ambiguity is resolved by updating Replit first, taking a new screenshot, and saving it to `docs/ui-mocks/` — not by giving the DEV agent a text description.

### D20 — MAW model + effort strategy targets cost/quality balance per agent

Documented in §11. Sonnet 4.6 is the default; Opus 4.7 is reserved for ARCHITECT and REVIEWER. This addresses the observed problem of Opus 4.7 at `xhigh` effort burning a 5-hour usage block in 3–4 messages.

### D21 — Git is set up as a fresh repo; no Vite Replit state needs preserving

The Replit project had no implemented pages — only Replit Agent-generated scaffolding. No branch preservation was needed. A fresh GitHub repository (`adwait-portfolio`) was created. Both Mac and Windows machines run Claude Code and sync via Git push/pull. GitHub is the single source of truth across both machines.

---

## 9. Tech Stack & Infrastructure

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | File-based routing, server components, MDX-ready |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS** + **shadcn/ui** | Carried over from Replit scaffold |
| Icons | **lucide-react** | Carried over |
| Fonts | Inter (body), Space Grotesk (display), JetBrains Mono (mono) | Loaded via `next/font`, not CDN |
| Backend | **None at MVP**; Next.js API routes added per-feature | Express + Drizzle removed |
| Database | **None at MVP; MongoDB Atlas (free tier) for Sprint 2+** | Existing Atlas account from Teams Retro. Used for seeded demo (Sprint 2) and optionally Atlas Vector Search for Technical Twin bot (Sprint 5) |
| Hosting | **Vercel** | Free tier; auto-deploys from GitHub `main` |
| Version control | **GitHub** | Single repo, `main` branch; both Mac and Windows machines sync via push/pull |
| Analytics | **Vercel Web Analytics** (free, privacy-respecting) | Enabled in Sprint 1 |
| Visual design reference | **Replit** (design studio only) | Phase 0 prototyping; screenshots exported to `docs/ui-mocks/` |

---

## 10. Deployment & Domain Setup — Step-by-Step Checklist

Manual steps executed by the candidate, separate from MAW agent work.

### 10.1 GitHub Setup (completed)

1. ✅ Created repository `adwait-portfolio` on GitHub (public).
2. ✅ Initialized Git locally on primary machine; connected remote; pushed initial commit.
3. ✅ Second machine clones via `git clone https://github.com/YOUR_USERNAME/adwait-portfolio.git`.
4. Daily workflow: `git pull origin main` before starting; `git push origin main` when done.

### 10.2 Domain Purchase (do during Sprint 1, parallel)

1. Check availability at **Cloudflare Registrar** (at-cost pricing) or **Namecheap**.
2. Preferred order: `adwaitmulye.com` → `adwaitmulye.dev` → `adwaitmulye.io`.
3. Cost: ~$10–15/year for `.com`, ~$12–15/year for `.dev`.
4. Enable WHOIS privacy (free; hides personal contact info from public DNS lookups).
5. Do not buy add-ons — no registrar email hosting, no SEO upsells, no extra SSL. Vercel provides SSL free.

### 10.3 Vercel Setup (after Sprint 0 or Sprint 1 code is on GitHub)

1. Sign up at vercel.com with the GitHub account that owns the portfolio repo. Free tier.
2. Click **Add New → Project**, select `adwait-portfolio`.
3. Vercel auto-detects Next.js and configures build settings. Accept defaults.
4. Click **Deploy**. First deploy completes in ~2 minutes at `your-project.vercel.app`.
5. Verify: hero, all sections, all stub routes render correctly at the auto-generated URL.

### 10.4 Connect Custom Domain

1. In Vercel project: **Settings → Domains → Add Domain**. Enter chosen domain.
2. Vercel provides DNS records (an A record for the apex, a CNAME for `www`).
3. At the registrar: open DNS management, add the records exactly as Vercel shows.
4. Wait for propagation (5 min–24 hours). Vercel auto-provisions a free SSL certificate.
5. Verify `https://` works.

### 10.5 Open Graph & SEO Verification

1. Visit https://opengraph.xyz, paste portfolio URL. Confirm preview image, title, description.
2. Paste URL into a LinkedIn message draft to verify the social preview card.
3. Submit sitemap to Google Search Console at https://search.google.com/search-console.

### 10.6 Analytics

1. In the Vercel dashboard, enable **Web Analytics** for the project (free tier).
2. Add `<Analytics />` component to `app/layout.tsx` per Vercel's setup docs (included in Sprint 1 backlog).

### 10.7 Ongoing

- Every push to `main` auto-deploys. Every PR gets a preview URL.
- Use preview URLs to share work-in-progress with peer reviewers before merging.

---

## 11. MAW Model Strategy

| Agent | Model | Effort | Rationale |
|---|---|---|---|
| PRODUCT | Sonnet 4.6 | medium | Translation, not deep reasoning. Reads backlog and mocks, writes ACs. |
| ARCHITECT | Opus 4.7 | high | Architecture decisions are the highest-leverage place to spend reasoning. `xhigh` only for multi-system features. |
| TEST | Sonnet 4.6 | medium | Writes failing tests against a clear spec. Mechanical once requirements are sharp. |
| **DEV** | **Sonnet 4.6** | **high** | **Default. Escalate to Opus only if Sonnet visibly struggles.** Primary source of usage leakage when set to Opus by default. |
| PROFESSOR | Sonnet 4.6 | medium | Read code, explain plainly. No deep reasoning needed. |
| REVIEWER | Opus 4.7 | high | The 17-point audit needs depth and an adversarial eye. |

**Additional levers:**
- **`opusplan` mode** — `claude --model opusplan` uses Opus for planning and auto-switches to Sonnet for execution. Best for combined ARCHITECT + DEV sessions.
- **Mid-session switching** — `/model sonnet` and `/model opus` within a running session. Drop to Sonnet for routine turns.

Document this strategy in the project's `CLAUDE.md` so it persists across sessions.

---

## 12. Content & Sanitization Constraints

Hard rules. Any artifact violating them is blocked from the site.

1. **No internal system names.** "Fuels Pricing platform" → "enterprise pricing & integration platform."
2. **No vendor or partner names** from current or past employer engagements.
3. **No named individuals** from the business-translation source document or any internal political dynamics. Only the framework and technique are portfolio-eligible; not the situation.
4. **No raw dollar figures** beyond what's already on the resume (e.g., the ~$1M headcount-saving narrative is acceptable).
5. **No JIRA exports verbatim.** Achievement-level metrics are safe (70+ features, 8 PIs, 600+ stories); individual stories and ACs must be sanitized.
6. **No hallucinated metrics.** Every number on the site traces to a verifiable source.

---

## 13. Success Criteria Recap (Definition of Done — Sprint 1)

The site is shippable when:

- All nine Home sections render with real content from `PORTFOLIO_CONTENT.md`.
- Section order matches the canonical sequence in §6.2.
- All four stub/skeleton routes are reachable and render the correct treatment.
- Mobile responsive at 360px, 768px, 1024px, 1440px.
- Lighthouse performance ≥ 90 on mobile; accessibility ≥ 95.
- All page-level OG meta tags render correctly when the URL is shared.
- Resume downloads (PM-T primary, TPM secondary) work from the Career Trajectory section.
- No fabricated content, no employer IP, no broken internal links.
- Visual output matches `docs/ui-mocks/` screenshots taken from the finalized Replit design.

---

## 14. Open Questions

- [ ] Domain purchased and DNS configured? (Target: by end of Sprint 1.)
- [ ] Replit design prompts run and screenshots saved to `docs/ui-mocks/`? (Required before Sprint 1 MAW run.)
- [ ] Loom recording for Teams Retro — recorded? hosted where? (Sprint 2.)
- [ ] Mongo seed script for Teams Retro demo — finalized? (Sprint 2.)
- [ ] Sanitization map for Cowork JIRA extraction — drafted? (Before Sprint 3.)
- [ ] Peer reviewers identified — 3+ people in PMT/TPM roles? (By end of Sprint 1.)
- [ ] LinkedIn and GitHub URLs added to `PORTFOLIO_CONTENT.md` §1? (Before Sprint 1 MAW run.)

---

## Appendix A — Glossary

- **MAW** — Multi-Agent Workflow. Six-persona agentic pipeline (PRODUCT, ARCHITECT, TEST, DEV, PROFESSOR, REVIEWER) designed and operated by the candidate across Claude Code, Windsurf, and Antigravity.
- **PMT / PM-T** — Product Manager, Technical. A product management role with deep technical depth, common at Amazon, Microsoft, and Stripe.
- **TPM** — Technical Program Manager. A delivery-execution role spanning multiple teams; varies by company between product-flavored and infrastructure-flavored.
- **PI** — Program Increment. A SAFe Agile delivery cycle, typically 10–12 weeks.
- **AC** — Acceptance Criteria. Testable pass/fail statements attached to a user story.
- **ATDD** — Acceptance Test-Driven Development. Failing tests are written before implementation begins.
- **OG (Open Graph)** — HTML metadata tags that control how a URL previews when shared on social platforms.
- **DNS** — Domain Name System. Maps a domain name to the server hosting the site.
- **Workstream A** — Cowork JIRA extraction pipeline (feeds Sprint 3 Artifacts page).
- **Workstream B** — Teams Retro productionization (feeds Sprint 2 case study).
- **Workstream C** — Artifacts drafting: system design doc, technical risk assessment, business translation framework (feeds Sprint 3).
