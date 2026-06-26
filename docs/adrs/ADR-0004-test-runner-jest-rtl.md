# ADR-0004: Jest + React Testing Library (via next/jest) as the test runner
_Date: 2026-06-25 · Status: Accepted · Sprint: 0_

## Context
The sprint requires 5 component tests (T-0.1–T-0.5) written before implementation (ATDD). The project has no test toolchain yet. CLAUDE.md references `npm test` / `npm run test:run` and a three-tier test strategy (unit/integration/contract) for API-bearing sprints. The backlog's TEST prompt allows "Jest + React Testing Library (preferred) or Vitest." We must pick one and stand it up for an App Router project.

## Options Considered
1. **Jest + RTL via `next/jest`** — Pros: official Next.js integration (`next/jest` `createJestConfig`) auto-wires the SWC transform, CSS stubbing, env vars, and `next/font` mocking; RTL is the de-facto standard for React component tests; CLAUDE.md already names `jest` semantics. Cons: Jest config is slightly heavier than Vitest; ESM edge cases occasionally need config.
2. **Vitest + RTL** — Pros: fast, Vite-native, ESM-first. Cons: no first-party Next.js integration; `next/font`, `next/image`, and Server Component handling need manual shims; diverges from the `next/jest` happy path; more setup risk for an App Router project.
3. **Playwright component testing** — Pros: real browser. Cons: heavier, slower, overkill for 5 text-assertion unit tests; Playwright E2E is explicitly out of scope for Sprint 0.

## Decision
Use **Jest + React Testing Library configured through `next/jest`**. Add `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@types/jest`. Config: `testEnvironment: "jsdom"`, `moduleNameMapper` mirroring the `@/* → ./*` alias, `setupFilesAfterEnv` importing `jest-dom`. Scripts: `test`, `test:run`, `typecheck`.

## Consequences
- Positive: Lowest-friction path for Next.js App Router; standard RTL ergonomics; `moduleNameMapper` keeps `@/`-imports resolving; ready to extend to integration tests in Sprint 1.
- Negative: When API routes arrive (Sprint 2+), contract tests may want a separate harness (e.g., supertest or route-handler invocation) layered on top of Jest — a known, additive follow-up.
- Follow-ups: Sprint 1+ adds `src/__tests__/unit`, `/integration`, `/contract`, `/a11y` subfolders under the same Jest runner. The `moduleNameMapper` must stay in sync with `tsconfig` `paths`.
