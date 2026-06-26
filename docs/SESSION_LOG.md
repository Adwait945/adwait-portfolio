# Session Log

Append-only. One entry per session. Updated before every `/clear` or end-of-day.
Read by Claude at the start of every session via CLAUDE.md.

---

## 2026-06-25 / 2026-06-26 — Sprint 0 + Sprint 1 (APPROVED)

### Sprint status
- Sprint 0: APPROVED, committed, pushed (`02d6916`)
- Sprint 1: APPROVED, committed, pushed (`0977cbf`)
- Both ran the full MAW pipeline: PRODUCT → ARCHITECT → TEST → DEV → PROFESSOR → REVIEWER

### Live decisions and judgment calls

**T-0.2 fix (Sprint 0)**
The TEST agent wrote a `getByText` predicate that matched multiple DOM elements (body, div, h1 all share headline textContent). Fixed by adding `element.tagName !== 'H1'` guard. This was a coordinator fix, not a DEV test modification.

**ARCHITECT session hit usage limit mid-run (Sprint 1)**
The first ARCHITECT agent invocation returned "You've hit your session limit" with only 370 tokens used — but all output files were already written before the limit hit. Verified by checking file sizes and content. Safe to proceed; no re-run needed.

**home-page.test.tsx "all links href='#'" (Sprint 0 → Sprint 1 collision)**
Sprint-0 integration test asserted every link in `<Home />` points to `#`. Sprint 1 added `SelectedWork` with a real `/work/teams-retro` link, breaking this assertion. Resolution:
- Restored the test to HEAD (did not quietly weaken it)
- Updated `site-config.ts` Hero CTAs to real hrefs (see below)
- Replaced the broken assertion with specific CTA href assertions
- Documented in ADR-0009

**Hero CTA hrefs — DEBT-0.2 resolved (Sprint 1)**
Sprint-0 CTAs were `href="#"` placeholders. Sprint-1 ACs and E2E specs require:
- Primary CTA "View Featured Work" → `/work/teams-retro` (E2E-2)
- Secondary CTA "How I Build" → `#how-i-work` (E2E-3, AC-2.1)
Updated in `lib/site-config.ts:47-48`. Sprint-0 unit tests that locked hrefs to `'#'` were self-labelled "Sprint 0 placeholder" — legitimately retired and updated to real hrefs. See ADR-0009.

**Sprint-0 placeholder tests updated (coordinator action)**
`src/__tests__/unit/site-config.test.ts:79-89` and `src/__tests__/unit/hero.test.tsx:82-93` were updated to assert real Sprint-1 hrefs. This was a coordinator-level retirement of explicitly temporary assertions, NOT a DEV test modification. Descriptions updated to "(Sprint 1 — DEBT-0.2 resolved)".

**REVIEWER first verdict was REJECTED (Sprint 1)**
7 FAILs on first pass — primary issues were the test edit and Hero CTA contradiction. All resolved in coordinator pass. Re-audit returned APPROVED with 24 PASS / 0 FAIL / 4 N/A.

### Open manual steps (still pending)
- `public/resumes/Adwait_Mulye_PM-Technical.pdf` — not yet added
- `public/resumes/Adwait_Mulye_TPM.pdf` — not yet added
- `public/opengraph.jpg` — created (1200×630, dark navy, correct title), not yet added to repo
- `NEXT_PUBLIC_SITE_URL` — not yet set in Vercel (hardcoded fallback `https://adwaitmulye.com` active)
- Vercel deployed but custom domain `adwaitmulye.com` not yet connected (purchased from Namecheap, 2yr)
- Playwright E2E (8 specs in `e2e/`) not yet run — needs `npm run dev` then `npm run test:e2e`

### Tech debt open items
- DEBT-0.3: Next.js framework CVEs (`next@14.2.35`) — must clear before public launch
- DEBT-1.6: `test:run` excludes Playwright — E2E runs via `npm run test:e2e` separately
- DEBT-1.9: IMPLEMENTATION_NOTES Sprint-1 narrative is stale vs shipped state

### What's next
- Sprint 2: Teams Retro case study (deep content, MongoDB Atlas seeded demo)
- Before Sprint 2: add resume PDFs + opengraph.jpg to `public/`, connect Vercel custom domain

### Test suite state at close of session
- Jest: 284 / 284 passing (22 suites)
- Playwright: config + 8 specs written, not yet run against live server
- TypeScript: 0 errors
- Build: clean, 11 static routes, 96.8 kB First Load JS
