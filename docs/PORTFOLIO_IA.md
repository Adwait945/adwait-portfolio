# Portfolio — Information Architecture

**Companion to:** `PORTFOLIO_PRD.md`
**Drives:** `SPRINT_1_BACKLOG.md` and all subsequent sprint backlogs
**Version:** v2 — updated after Replit design review
**Last updated:** 2026-06-14

This document is the spatial spec. It defines what pages exist, what sections live on each, how they are ordered, and what component renders each one. The ARCHITECT agent reads this to ground design decisions. Future sprints reference this when adding sections so the site doesn't drift.

**Source of visual truth:** Replit screenshots in `docs/ui-mocks/`. Any ambiguity about layout, spacing, or visual treatment is resolved by the screenshot, not by text in this document.

---

## 1. Sitemap

```
/
├── /                  Home (production in Sprint 1)
├── /teams-retro       Teams Retro — skeleton in Sprint 1, full content in Sprint 2
├── /artifacts         Functional/Technical artifacts — stub in Sprint 1, real in Sprint 3
├── /git               Code & workflows — stub in Sprint 1, real in Sprint 3
├── /writing           Writing/posts — stub in Sprint 1, real in Sprint 4
├── /not-found         404 page
└── /api/*             Reserved for future server-side features (no routes in Sprint 1)
```

**URL conventions:**
- Lowercase, hyphenated, no trailing slashes.
- No query parameters in primary navigation.
- Future multi-entry sections follow `/[area]/[slug]` (e.g., `/artifacts/system-design-doc`). At MVP each top-level route is a single page.

---

## 2. Next.js App Router File Structure

```
app/
├── layout.tsx                    Root layout — Nav, Footer, fonts, metadata defaults
├── page.tsx                      Home — imports all 9 section components in order
├── globals.css                   Tailwind base + design tokens (migrated from index.css)
├── opengraph-image.tsx           Default OG image for root route
├── icon.png                      Favicon
│
├── teams-retro/
│   ├── page.tsx                  Skeleton in Sprint 1; full content in Sprint 2
│   └── opengraph-image.tsx       Per-route OG image
│
├── artifacts/
│   ├── page.tsx                  Stub — StubPageLayout
│   └── opengraph-image.tsx
│
├── git/
│   ├── page.tsx                  Stub — StubPageLayout
│   └── opengraph-image.tsx
│
├── writing/
│   ├── page.tsx                  Stub — StubPageLayout
│   └── opengraph-image.tsx
│
├── sitemap.ts                    Auto-generates /sitemap.xml
├── robots.ts                     Auto-generates /robots.txt
└── not-found.tsx                 404 page

components/
├── layout/
│   ├── Nav.tsx                   Top navigation (sticky, with Resume dropdown)
│   ├── Footer.tsx                Three-column footer
│   └── Container.tsx             Max-width wrapper, used by every page section
│
├── home/
│   ├── Hero.tsx                  §1 — full viewport hero, eyebrow/headline/CTAs
│   ├── HowIWork.tsx              §2 — three-pillar card grid
│   ├── SelectedWork.tsx          §3 — card grid (renamed from FeaturedWork)
│   ├── CareerTrajectory.tsx      §4 — three-lens narrative + resume download buttons
│   ├── Skills.tsx                §5 — four-group skills & tools inventory
│   ├── Experience.tsx            §6 — vertical timeline
│   ├── Education.tsx             §7 — two-entry education block
│   ├── About.tsx                 §8 — The Bridge narrative (plain text, no cards)
│   └── ContactCTA.tsx            §9 — three social/contact buttons
│
├── teams-retro/
│   └── TeamsRetroSkeleton.tsx    Sprint 1 skeleton; replaced with real content in Sprint 2
│
├── ui/                           shadcn/ui components
└── shared/
    ├── StubPageLayout.tsx        Used by /artifacts, /git, /writing
    ├── SectionHeading.tsx        Reusable section heading + optional subhead
    ├── MetricStrip.tsx           Four-metric horizontal strip (used on Teams Retro page)
    └── ResumeDropdown.tsx        Resume download dropdown in Nav and CareerTrajectory

lib/
└── site-config.ts                Centralized: name, role labels, contact links, resume paths

public/
├── favicon.png
├── opengraph.jpg                 Default OG image
└── resumes/
    ├── Adwait_Mulye_PM-Technical.pdf    (place manually after DEV creates public/)
    └── Adwait_Mulye_TPM.pdf             (place manually after DEV creates public/)
```

**Key naming change from v1:** `FeaturedWork.tsx` is now `SelectedWork.tsx`. The section heading on the page remains "Selected Work." Update any reference to `FeaturedWork` accordingly.

---

## 3. Global Components

### 3.1 Navigation (top)

- **Left:** "Adwait Mulye" — links to `/`.
- **Center (desktop):** Home · Teams Retro · Artifacts · Git · Writing.
- **Right:** "Resume" button — opens a small dropdown with two options: "PM-Technical (primary)" and "TPM", linking to the respective PDFs in `/public/resumes/`.
- Sticky on scroll; applies subtle `backdrop-blur` after scrolling past the hero (~80vh).
- Mobile: hamburger expands a full-screen overlay with the same five links.
- Active route is visually indicated (primary-color underline or text-color shift).

### 3.2 Footer

- **Left column (small, muted):** "© 2026 Adwait Mulye. Built end-to-end with Next.js, Tailwind, and my own MAW agentic workflow."
- **Center column:** site map links — Home · Teams Retro · Artifacts · Git · Writing.
- **Right column:** social/contact icons — LinkedIn, GitHub, Email — each with `aria-label`.
- **Below all columns, full width, very small, muted:** "Plano, TX · Built 2026 · v1.0"

### 3.3 Container

- Max-width: 1200px desktop.
- Full-width mobile with 16–24px horizontal padding (symmetrical on both sides — this was the bug causing right-side gap in the Replit preview; fix confirmed).
- Vertical rhythm: section padding 80px desktop / 48px mobile.

---

## 4. Home Page — Section Order & Spec (LOCKED v2)

This order is locked. Any future change requires a PRD decision log entry and a new IA version.

| # | Section | Component | Purpose | Visual reference |
|---|---|---|---|---|
| 1 | **Hero** | `Hero.tsx` | First impression: role family, headline, two CTAs. Full viewport height desktop. | `docs/ui-mocks/hero.png` |
| 2 | **How I Work** | `HowIWork.tsx` | Three-pillar framing: Product Thinking / Engineering Depth / AI & Systems. 3-col desktop. | `docs/ui-mocks/how-i-work.png` |
| 3 | **Selected Work** | `SelectedWork.tsx` | Card grid: 1 real + 2 in-progress placeholder cards. 3-col desktop / 2-col tablet / 1-col mobile. | `docs/ui-mocks/selected-work.png` |
| 4 | **Career Trajectory** | `CareerTrajectory.tsx` | Three-lens narrative (SAFe PO → TPM → PM-T → AI-Native PM). Resume download buttons immediately below narrative. | `docs/ui-mocks/career-trajectory.png` |
| 5 | **Skills & Tools** | `Skills.tsx` | Full technical inventory: 4 groups × comma-separated list. 2-col grid desktop / 1-col mobile. | `docs/ui-mocks/skills.png` |
| 6 | **Experience** | `Experience.tsx` | Vertical timeline: 6 entries with company, role, dates, marquee facts. | `docs/ui-mocks/experience.png` |
| 7 | **Education** | `Education.tsx` | Lightweight two-entry block. No heavy card treatment. Subtle divider above. | `docs/ui-mocks/education.png` |
| 8 | **The Bridge** | `About.tsx` | Three-paragraph personal narrative. Plain text on dark background — no card. | `docs/ui-mocks/about.png` |
| 9 | **Contact CTA** | `ContactCTA.tsx` | Open-to-roles statement. Three equal buttons: LinkedIn, GitHub, Email. | `docs/ui-mocks/contact.png` |

**Scroll behavior:** Hero's secondary CTA "How I Build" smooth-scrolls to `#how-i-work`.

---

## 5. Selected Work — Card Grid Spec

Layout: **3 columns desktop (≥1200px) / 2 columns tablet (768–1199px) / 1 column mobile (< 768px)**. All cards equal height within each row. Cards use the existing `glass-card` utility class.

### Card states

**Real card (Teams Retro):** full opacity, solid border, active CTA button linking to `/teams-retro`.

**In-progress placeholder cards:** reduced opacity (0.6), dashed border style, CTA button disabled or showing "Coming in Sprint N". Two placeholder cards at launch:
- Functional & Technical Artifacts → coming Sprint 3
- Code & Workflows → coming Sprint 3

### Adding future cards

When a new project is ready (Sprint 3+), replace a placeholder card with a real card in the same grid position. No layout changes needed — the grid reflows automatically. The visual pattern (eyebrow / title / description / metrics / tags / CTA) is consistent across all real cards.

---

## 6. Teams Retro Page — Sprint 1 Skeleton Structure

Route: `/teams-retro`. In Sprint 1 this page has real structure with placeholder content blocks. Sprint 2 fills the content.

Sections in order:

| # | Section | Sprint 1 state | Sprint 2 state |
|---|---|---|---|
| — | Back nav | "← Back to home" link | same |
| 1 | Hero | Real: heading, eyebrow, one-line sub | same |
| 2 | Metric strip | Real: four large-number callouts | same |
| 3 | Overview — "What it is" | Placeholder paragraph | Full product overview |
| 4 | Build story — "How it was built" | Placeholder paragraph | MAW walkthrough |
| 5 | System design | Placeholder paragraph | Architecture, data models, API contracts |
| 6 | Demo | Dashed-border placeholder box | Live seeded demo embed + Loom |
| 7 | Links row | Three placeholder buttons (GitHub / Loom / Live Demo) | Real links |

**Component:** `TeamsRetroSkeleton.tsx` in Sprint 1; replaced by `TeamsRetroCaseStudy.tsx` in Sprint 2. Route (`/teams-retro`) does not change between sprints.

**Metric strip values (real, locked — never placeholder):**
- "5,055" / "lines of production TypeScript"
- "87/87" / "Jest tests passing"
- "44" / "Playwright E2E test cases"
- "~20–30 hrs" / "across three weekends"

---

## 7. Stub Pages — Structure

Routes: `/artifacts`, `/git`, `/writing`. Each renders `StubPageLayout` with:

- Eyebrow (small caps)
- Page title
- 2-sentence blurb
- Status note ("Coming in Sprint N")
- "← Back to home" link

Visual treatment: professional, no construction banners, no humor. Same dark theme, same fonts, same accent color as Home. Centered max-width container with correct vertical padding.

Full copy in `PORTFOLIO_CONTENT.md` §14.

---

## 8. Metadata & SEO Strategy

Every page sets via the Next.js Metadata API:

- `title` — format: `"<Page Name> — Adwait Mulye"`
- `description` — ~140 chars, page-specific
- `openGraph` — title, description, image, type, url
- `twitter` — same as OG
- Canonical URL (once domain is set)

Root `layout.tsx` exports default metadata; each page overrides specific fields.

`app/sitemap.ts` generates `/sitemap.xml` listing all five public routes.
`app/robots.ts` generates `/robots.txt` allowing all crawlers and referencing the sitemap.

---

## 9. Design Tokens — Migrated from Replit `index.css`

All tokens preserved exactly. DEV agent migrates these into `app/globals.css`.

**Color tokens (HSL, as CSS custom properties):**

```css
--background: 230 40% 4%;       /* Deep navy/black */
--foreground: 0 0% 100%;        /* White */
--primary: 190 100% 50%;        /* Electric cyan */
--primary-foreground: 230 40% 6%;
--card: 230 30% 8%;
--card-foreground: 0 0% 100%;
--secondary: 230 20% 15%;
--secondary-foreground: 0 0% 100%;
--muted: 230 20% 15%;
--muted-foreground: 230 20% 70%;
--accent: 230 30% 12%;
--accent-foreground: 190 100% 50%;
--border: 230 20% 18%;
--input: 230 20% 18%;
--ring: 190 100% 50%;
--radius: 0.75rem;
```

**Utility classes (preserve exactly):**

```css
.glass {
  bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]
}
.glass-card {
  bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10
  shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300
}
.glass-card:hover {
  border-primary/50 shadow-[0_8px_32px_rgba(0,229,255,0.15)] -translate-y-1
}
.text-gradient {
  bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-primary
}
```

**Typography:**
- `--font-sans`: Inter (body, antialiased)
- `--font-display`: Space Grotesk (h1–h6, tight tracking)
- `--font-mono`: JetBrains Mono (tag chips, code, eyebrows)

Loaded via `next/font/google` in `app/layout.tsx`. Font CSS variables set on `<html>` element; referenced in `tailwind.config.ts`.

Dark theme only at MVP.

---

## 10. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile < 768px | Single column everywhere; hamburger nav; larger tap targets; buttons stack vertically |
| Tablet 768–1199px | Two columns for How I Work cards and Selected Work grid; nav remains full inline |
| Desktop ≥ 1200px | Three columns for How I Work; three columns for Selected Work grid; full-width hero with constrained inner container |

Verify at: 360px, 768px, 1024px, 1440px.

**Known bug fixed in Replit:** Extra whitespace on the right side of all sections below the hero was caused by an asymmetric container (left padding without matching right padding). The `Container` component must apply symmetric horizontal padding on all viewports.

---

## 11. Accessibility Baseline

- All interactive elements keyboard-reachable with visible focus rings.
- Color contrast meets WCAG AA: cyan accent on dark navy passes; muted-foreground gray on dark background to be verified.
- All images have `alt` text; decorative images use `alt=""`.
- All icon-only buttons (social icons in footer, hamburger) have `aria-label`.
- Skip-to-content link in header, visible on focus only.
- `prefers-reduced-motion` respected — non-essential transitions disabled.
- Resume download links open with `target="_blank" rel="noopener noreferrer"`.

---

## 12. What Lives Where — Quick Reference

| To update this… | Edit these files |
|---|---|
| Hero copy | `PORTFOLIO_CONTENT.md` §3 → `components/home/Hero.tsx` |
| Pillar titles, body, tags | `PORTFOLIO_CONTENT.md` §4 → `components/home/HowIWork.tsx` |
| Teams Retro card content | `PORTFOLIO_CONTENT.md` §5 → `components/home/SelectedWork.tsx` |
| Career Trajectory narrative | `PORTFOLIO_CONTENT.md` §6 → `components/home/CareerTrajectory.tsx` |
| Skills groups | `PORTFOLIO_CONTENT.md` §7 → `components/home/Skills.tsx` |
| Experience entries | `PORTFOLIO_CONTENT.md` §8 → `components/home/Experience.tsx` |
| Education entries | `PORTFOLIO_CONTENT.md` §9 → `components/home/Education.tsx` |
| The Bridge narrative | `PORTFOLIO_CONTENT.md` §10 → `components/home/About.tsx` |
| Contact copy or links | `PORTFOLIO_CONTENT.md` §11 → `components/home/ContactCTA.tsx` |
| Stub page copy | `PORTFOLIO_CONTENT.md` §14 → `components/shared/StubPageLayout.tsx` |
| Resume PDFs | Replace files in `public/resumes/`; no code change needed |
| OG image for a route | `app/[route]/opengraph-image.tsx` |
| Footer copy | `PORTFOLIO_CONTENT.md` §15 → `components/layout/Footer.tsx` |
| Design tokens | `app/globals.css` |
| Nav links | `components/layout/Nav.tsx` + update this IA |
| Adding a new top-level route | Create `app/[route]/page.tsx`, update `Nav.tsx`, update this IA §1 |
| Home section order | Update this IA §4, update `PORTFOLIO_PRD.md` D15, update `app/page.tsx` |
