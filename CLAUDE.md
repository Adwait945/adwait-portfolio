# Portfolio — Claude Code Context

This file is loaded automatically at the start of every Claude Code session in this project. It applies to all agents (PRODUCT, ARCHITECT, TEST, DEV, PROFESSOR, REVIEWER) without manual pasting.

---

## Stack

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


## Package Manager

This project uses **[npm | pnpm | yarn | bun]**. Use this consistently — do not mix package managers.

## Commands (use these exact commands — agents read this section)

| Action | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Run tests | `npm test` |
| Run tests (single run, CI mode) | `npm run test:run` |
| Type check | `npm run typecheck` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Dependency audit | `npm audit --audit-level=high` |

## Cross-IDE Memory (Mem0)

This project uses Mem0 via MCP for cross-IDE persistent memory. Configured in `.claude/mcp.json`. Same memory pool is accessible in Claude Code, Antigravity, Windsurf, Replit, Cursor — anywhere with MCP support and the same `MEM0_API_KEY` + `MEM0_DEFAULT_USER_ID`.

Agents (PRODUCT, ARCHITECT, TEST, DEV, PROFESSOR, REVIEWER) search Mem0 as a pre-flight step. To recall project context manually at any time:

```
Use the Mem0 search_memory tool to find context about [topic].
```

To explicitly store a new fact:

```
Use the Mem0 add_memory tool to remember: [fact].
```

## Environment Variables

Document every env var the project uses. Never edit `.env` directly — only `.env.example` plus this section.

| Variable | Purpose | Required | Default |
|---|---|---|---|
| `MEM0_API_KEY` | Mem0 cross-IDE memory | Yes | — |
| `MEM0_DEFAULT_USER_ID` | Mem0 user identity (same across all machines) | Yes | — |
| `DATABASE_URL` | Primary DB connection string | Yes | — |
| [add more] | | | |

## File Structure

```
src/
├── app/                # Next.js App Router (pages and API routes)
│   ├── api/            # API route handlers
│   ├── layout.tsx      # Root layout — contains global theme/font settings
│   └── globals.css     # Global CSS variables
├── components/         # Reusable UI components
├── lib/                # Utilities and adapters
│   ├── db.ts           # Database singleton
│   ├── storage.ts      # localStorage adapter with key constants
│   ├── logger.ts       # Structured logger setup
│   ├── validators/     # Zod schemas per API route
│   └── models/         # Mongoose schemas (if using Mongoose)
├── services/           # Service layer — fetches, validates, transforms
├── store/              # State management (Context or otherwise)
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type exports
└── __tests__/          # All test files
    ├── unit/
    ├── integration/
    ├── contract/       # API contract tests
    └── a11y/           # Accessibility-focused tests

docs/                   # Workflow communication files
├── SPRINT_*_BACKLOG.md
├── FEATURE_REQUIREMENTS.md
├── ARCHITECTURE_DESIGN.md
├── IMPLEMENTATION_PLAN.md
├── adrs/               # ADR-NNNN-*.md per non-trivial decision
├── TEST_SPEC.md
├── IMPLEMENTATION_NOTES.md
├── AUDIT_REPORT.md
├── TECH_DEBT.md
├── CODE_EXPLAINER.md
├── ui-mocks/
└── prototypes/
```

## Performance Budgets

Document budgets here so REVIEWER can enforce them.

- **Initial route JS bundle**: 250KB gzipped (Next.js First Load JS per route)
- **Time-to-interactive on simulated 3G**: <1.5s
- **API p95 response time**: <300ms for read routes, <500ms for write routes

## Hard Rules (apply to every agent, every session)

### Code Conventions
- **No file > 200 lines.** Split anything approaching the cap.
- **Tailwind utility classes only** — no inline `style={{}}` or `<style>` tags unless no utility expresses the rule.
- **No `console.log` in `src/`** outside test files. Use the project logger.
- **No `// TODO`, `// FIXME`, or placeholder mock data** in production code.
- **Commits in conventional commits format**: `feat(scope): description (TASK-ID)`.
- **One commit per TASK from IMPLEMENTATION_PLAN.md.**

### Test Discipline (ATDD)
- **Tests written BEFORE implementation** (TEST agent runs before DEV).
- **DEV never modifies tests** — code is fixed to match tests. Enforced by PreToolUse hook.
- **Every AC has at least one test.** Every NFR has at least one test. REVIEWER enforces.
- **Three test tiers required for any API-bearing sprint**: unit, integration, contract.

### Data Layer Rules
- **No DB/ORM imports in components.** All data flows through `src/services/*`.
- **Every `Model.find()` on user-data collections has a filter.** No unbounded queries.
- **No N+1 queries** — never `findById` inside `.map`/`for`/`forEach`. Batch with `$in` or pre-fetch.
- **Atomic ops for counters and sets**: `$inc` + `$addToSet` in a single `findByIdAndUpdate`.
- **Indexed fields**: any field used as a query filter has `index: true`.
- **Pagination guard**: every list-returning API route ends with `.limit(100)`.

### API Route Rules
- **`await connectDB()` is always the first line** of every API handler.
- **Every handler wrapped in try/catch** returning `{ error: 'Internal server error' }` with status 500 on failure.
- **Every handler validates request body with Zod** before doing anything with it.
- **Every state-changing route considered for idempotency** — payment/email/notification routes MUST have idempotency keys.
- **No secrets in client code** — `process.env.*` for secrets only on the server side.

### React Rules
- **Every `useEffect` has an explicit dependency array.**
- **Every `useEffect` with `fetch` uses `AbortController`** and `return () => controller.abort()` in cleanup.
- **Every data-fetching component has loading + error + empty states.**
- **Every page route has an error boundary** (`error.tsx` in Next.js App Router).
- **All form `<input>`s have an associated `<label>`** (or `aria-label`).
- **All icon-only buttons have `aria-label`.**
- **Submit buttons disabled during in-flight requests** (race-condition safety).

### Service Layer Rules
- **Validate before fetch** — service functions for POST/PATCH validate required fields and throw before calling `fetch()`.
- **Never swallow errors** — re-throw on non-OK responses.
- **Log structured context on errors** — `logger.error({ userId, requestId, errorType }, message)`, never `console.error(err)`.

### Storage Rules
- **Every `localStorage.getItem` has a null-check fallback.**
- **Every `JSON.parse` is wrapped in try/catch.**
- **Storage keys are constants from `src/lib/storage.ts`** — never magic strings.

### Time / Timezone Rules
- **Store times as ISO strings or epoch timestamps with explicit UTC.** Never `new Date('2026-06-06')` (locale-dependent).
- **Format times at the rendering boundary**, not in the data model.

## Global UI Infrastructure (mandatory for ARCHITECT and DEV awareness)

These are the global settings that must be preserved across any layout rewrite. ARCHITECT documents them in every sprint's design doc; DEV re-verifies them after touching `layout.tsx`, `tailwind.config.*`, or `globals.css`.

- Theme mode: `<html className="dark">` in `src/app/layout.tsx:[line]`
- Body font: `className={inter.className}` (or equivalent) in `src/app/layout.tsx:[line]`
- CSS variables: `--primary`, `--background`, `--foreground`, etc. in `src/app/globals.css:[lines]`
- Tailwind config: extended colors and tokens in `tailwind.config.ts:[lines]`

(Customize the bullet points to match this project's actual layout file. Update whenever you add a new global setting.)

## Prototype Reference Files

Replit prototype components live in `docs/prototypes/`. When building any component that has a corresponding prototype listed in the sprint backlog's UI Reference section:

### Agent reading order
1. Read `docs/PORTFOLIO_CONTENT.md` for locked copy first
2. Read the prototype file for visual/structural patterns
3. View the `docs/ui-mocks/` screenshot for visual target
4. Build the production component to match the screenshot using patterns from the prototype

### What to extract from a prototype
- Tailwind utility class combinations (especially `glass-card`, responsive grid patterns, color token references like `text-primary`, `border-primary/50`)
- JSX structure and semantic HTML choices (which elements are used for which purposes)
- Responsive breakpoint patterns (`md:`, `lg:` variants)
- Animation and transition classes if present
- Icon usage patterns (lucide-react component names and sizing)

### What NOT to carry over
- Hardcoded copy — all text comes from PORTFOLIO_CONTENT.md, never from the prototype
- Vite-specific imports or patterns (`import.meta`, `createRoot` from `react-dom/client`)
- Fabricated data (invented project names, fake metrics, placeholder company names)
- The `AISandbox.tsx` component — this is explicitly removed from the portfolio
- Replit file naming — use the production component names defined in PORTFOLIO_IA.md

### Prototype → Production name mapping
| Replit prototype file | Production component name |
|---|---|
| `Hero.tsx` | `Hero.tsx` (unchanged) |
| `Nav.tsx` | `Nav.tsx` (unchanged) |
| `TechnicalDNA.tsx` | `HowIWork.tsx` |
| `FeaturedProjects.tsx` | `SelectedWork.tsx` |
| `CareerTrajectory.tsx` | `CareerTrajectory.tsx` (unchanged) |
| `SkillsTools.tsx` | `Skills.tsx` |
| `Timeline.tsx` | `Experience.tsx` |
| `Education.tsx` | `Education.tsx` (unchanged) |
| `TheBridge.tsx` | `About.tsx` |
| `BeyondTheWork.tsx` | `BeyondTheWork.tsx` (unchanged) |
| `Footer.tsx` | `Footer.tsx` (unchanged) |
| `TeamsRetro.tsx` | `TeamsRetroSkeleton.tsx` |

### For future sprints
When new Replit prototype components are added to `docs/prototypes/`, update this mapping table and add the prototype path to the relevant epic's UI Reference section in the sprint backlog before running `/product`.

### REVIEWER check
REVIEWER must verify that every component with a prototype reference in the sprint backlog was actually read by DEV (visible in IMPLEMENTATION_NOTES.md pre-flight section). If a prototype existed but was not read, flag it as a workflow violation even if the visual output looks correct.


## Naming Conventions

- **Components**: PascalCase (`FeedbackCard.tsx`)
- **Hooks**: camelCase starting with `use` (`useRetroStore`)
- **Services**: camelCase, suffix `Service` (`feedbackService.ts`)
- **Types/Interfaces**: PascalCase (`FeedbackItem`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Files in `src/lib/`**: kebab-case (`storage.ts`, `connect-db.ts`)
- **Test files**: same name as file under test + `.test.tsx` (unit/integration) or `.contract.test.ts`

## The Six Agents (workflow reference)

This project uses the MAWv6 multi-agent workflow. Subagent definitions are in `.claude/agents/`. Skill entry points in `.claude/skills/`. Invoke via slash commands:

| Slash Command | Agent | Role |
|---|---|---|
| `/product` | PRODUCT | Translate backlog → formal requirements + NFRs |
| `/architect` | ARCHITECT | Design + plan + API contracts + ADRs |
| `/test` | TEST | Write failing tests (unit + integration + contract + NFR) |
| `/dev` | DEV | Implement until tests pass; one commit per task |
| `/professor` | PROFESSOR | Plain-English code explanation + failure modes |
| `/reviewer` | REVIEWER | 28-point audit |
| `/sprint-status` | — | Show current pipeline state |

Order is sacrosanct. TEST runs **before** DEV. Each agent communicates with the next via documents in `docs/`.

## Model Recommendations

- **Reasoning-heavy roles** (PRODUCT, ARCHITECT, DEV, REVIEWER): Opus 4.6+ / 4.7 / 4.8 — 1M context, strongest reasoning
- **Execution roles** (TEST, PROFESSOR): Sonnet 4.6+ — 1M context, sufficient cognition, lower cost

Model is set in each agent file's frontmatter (`model: opus` or `model: sonnet` resolves to the current version). Override session-wide via `/model` in Claude Code if needed.

## When the Human Says...

- **"Run sprint N"** → start with `/product` and wait for review between each step
- **"What's the status?"** → run `/sprint-status`
- **"Fix this bug"** → out of sprint workflow. Acceptable to make a direct edit, but log it in `docs/IMPLEMENTATION_NOTES.md` and re-run the test suite + lint before committing
