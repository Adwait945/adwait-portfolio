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
