# ADR-0007: Resume PDFs hosted as static assets in `public/resumes/`
_Date: 2026-06-25 · Status: Proposed · Sprint: 1_

## Context
The Nav Resume dropdown (AC-1.2), the Career Trajectory download buttons (AC-4.5), and the Experience "Full work history" link (AC-6.4) all point to two resume PDFs: `Adwait_Mulye_PM-Technical.pdf` (primary) and `Adwait_Mulye_TPM.pdf` (secondary). CONTENT §1 specifies the paths `/resumes/Adwait_Mulye_PM-Technical.pdf` and `/resumes/Adwait_Mulye_TPM.pdf`. NFR-1.S and NFR-4.S require the links to reference `/public/resumes/` paths only, with no secrets and `rel="noopener noreferrer"` on new-tab links. There is no auth gate at MVP. We must decide where the PDFs live and how they are served.

## Options Considered
1. **Static files in `public/resumes/`** — Pros: served by Next.js/Vercel CDN at the exact CONTENT paths (`/resumes/...`); zero code; cacheable; works in `target="_blank"`; matches CONTENT §1 verbatim; no DB/API needed (consistent with "no backend at MVP"). Cons: PDFs are public to anyone with the URL (acceptable per MVP scope — these are job-seeking resumes meant to be downloaded).
2. **External URL (Google Drive / S3 link)** — Pros: update without redeploy. Cons: breaks the `/resumes/...` path contract in CONTENT §1; adds a third-party dependency and tracking; new-tab links to external hosts add `rel` complexity and reliability risk; harder to E2E-test (E2E-5).
3. **Auth-gated API route returning the PDF** — Pros: access control. Cons: requires a backend/route handler explicitly out of MVP scope; over-engineered for public resumes; no AC asks for gating.

## Decision
Host both PDFs as **static assets in `public/resumes/`** at the exact CONTENT §1 filenames, served at `/resumes/Adwait_Mulye_PM-Technical.pdf` and `/resumes/Adwait_Mulye_TPM.pdf`. The paths are stored once in `siteConfig` (`nav.resumes`, `careerTrajectory.primaryResume/secondaryResume`, `experience.historyLink`) so no component hardcodes them. The files are placed manually before E2E testing (prerequisite noted in the plan). All new-tab links use `target="_blank" rel="noopener noreferrer"`.

## Consequences
- Positive: matches CONTENT §1 paths exactly; zero backend; CDN-cached; trivially E2E-testable (E2E-5 asserts a 200/download on the path); no secrets.
- Negative: PDFs are publicly accessible by URL (acceptable for resumes); updating a resume requires a commit + redeploy.
- Follow-ups: ensure the two PDFs are committed (or uploaded) before the E2E gate runs; if a private resume is ever needed (e.g., the SAFe resume, currently email-only per CONTENT §6), revisit an auth-gated approach.
