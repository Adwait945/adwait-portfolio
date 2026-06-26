# Tech Debt Register

Tracks deliberate deferrals and known shortcuts. Each item: ID, sprint introduced, description, why deferred, and the sprint that should address it. ARCHITECT logs new debt each sprint; REVIEWER may add findings.

| ID | Introduced | Description | Why deferred | Resolve by |
|---|---|---|---|---|
| DEBT-0.1 | Sprint 0 | Hero ships with no entrance animations. The Replit prototype uses `framer-motion` (fade/slide); no Sprint 0 AC requires motion. | Keeps Hero a zero-JS Server Component; avoids a client bundle before any AC needs it. | Sprint 1+ (only if a backlog AC requests animation; add as a Client wrapper or CSS) |
| DEBT-0.2 | Sprint 0 | Both Hero CTAs link to `#` placeholders. `PORTFOLIO_CONTENT.md` §3 specifies `/teams-retro` (primary) and `#how-i-work` (secondary). | AC-0.7 explicitly mandates `#` placeholders for the smoke-test sprint; real targets need routes/sections that do not exist yet. | Sprint 1 (wire real CTA targets once Teams Retro route and How I Work section exist) |
| DEBT-0.3 | Sprint 0 | `npm audit` reports 4 high + 18 moderate vulnerabilities, all in the scaffold's `next@14.2.35` and its transitive `postcss` (DoS, cache poisoning, App Router XSS, SSRF advisories). None introduced by Sprint 0 code (`lucide-react` is clean). | Fix requires a breaking `next` major upgrade (`npm audit fix --force` installs `next@16.x`), out of Sprint 0 smoke-test scope. | Dedicated security/upgrade sprint — bump Next.js to a patched release and re-run full regression before the portfolio goes public. **Severity: high (deferred).** |

## Notes
- No pre-existing debt was carried into Sprint 0 (first sprint).
- Sprint 0 introduced no DB, no API routes, and no auth, so no data-layer or security debt exists yet.
- DEBT-0.3 logged by REVIEWER during the Sprint 0 audit. It did not block APPROVAL because no NEW high/critical CVE was introduced this sprint, but it must be cleared before any public deploy.

---

## Sprint 1 — 2026-06-26 (REVIEWER findings)

These are items that are acceptable as-is but suboptimal. They are distinct from the blocking FAILs in `AUDIT_REPORT.md` (which must be fixed before approval) and from ARCHITECT-logged DEBT-1.1–1.4 (route-path mismatch, Teams Retro `#` links, placeholder image tints, omitted framer-motion).

- **DEBT-1.5 — Sprint-0 href lock blocks Sprint-1 CTA repoint.** `src/__tests__/unit/site-config.test.ts:80,88` and `unit/hero.test.tsx:86,93` assert `hero.*Cta.href === '#'`, directly contradicting the Sprint-1 requirement to repoint to `/work/teams-retro` and `#how-i-work`. **Location:** those test lines + `lib/site-config.ts:47-48`. **Suggested fix:** ARCHITECT/TEST relax the Sprint-0 href assertions to label-only (or scope them to Sprint 0) so DEV can satisfy AC-2.1/AC-3.3 without a test edit. **Severity:** high (currently a blocker; becomes debt once the immediate fix lands).
- **DEBT-1.6 — `test:run` does not include Playwright.** `package.json` `test:run` is `jest --ci`; the E2E tier (`e2e/*.spec.ts`) is orphaned from the single CI gate that NFR-11.E2E names. **Location:** `package.json` scripts. **Suggested fix:** composite `test:run` = `jest --ci && playwright test`, or a documented two-command CI gate invoked together. **Severity:** medium.
- **DEBT-1.7 — Footer social icons use generic glyphs (Briefcase/Code2/Mail) since lucide-react dropped brand glyphs.** Accessible names are correct via `aria-label`, but the visual no longer reads as LinkedIn/GitHub. **Location:** `components/layout/Footer.tsx:8-12`. **Suggested fix:** add a small inline brand-SVG set or `simple-icons` for LinkedIn/GitHub. **Severity:** low.
- **DEBT-1.8 — `next/font/google` fetches fonts at build time.** Build currently depends on network access to Google Fonts; an offline/locked-down CI will fail font collection. **Location:** `app/layout.tsx:2,10-26`. **Suggested fix:** vendor the font files locally via `next/font/local` for hermetic builds. **Severity:** low.

## Sprint 1 RE-AUDIT — 2026-06-26 (REVIEWER findings)

- **DEBT-1.5 — RESOLVED.** The Sprint-0 href lock that blocked the CTA repoint is closed. `lib/site-config.ts:47-48` now points to `/work/teams-retro` and `#how-i-work`; `unit/site-config.test.ts:79-89`, `unit/hero.test.tsx:82-93`, and `integration/home-page.test.tsx:50-61` assert the real values; decision recorded in ADR-0009. No longer a blocker.
- **DEBT-1.9 — IMPLEMENTATION_NOTES Sprint-1 narrative is stale.** The "Decisions / Deviations" and "Known Issues" sections still state "Hero CTAs NOT repointed (TASK-1.13b skipped)" and "1 Jest failure (expected)", which the applied fixes and ADR-0009 have superseded (now 284/284 green, CTAs repointed). **Location:** `docs/IMPLEMENTATION_NOTES.md:80-110`. **Suggested fix:** DEV appends a short "Sprint 1 — session 2 (post-fix)" addendum so the notes match the shipped state; harmless as-is since code/tests/ADR are authoritative. **Severity:** low.
- **DEBT-1.6 (carried, still open) — `test:run` excludes Playwright.** `package.json` `test:run` is `jest --ci`; `test:e2e` (`playwright test`) is a separate gate requiring a live server (TASK-1.19). Accepted for Sprint 1 APPROVED, but a single composite CI gate is preferable. **Severity:** medium.
