/**
 * Content module — Stub pages (§16).
 * Verbatim copy from docs/PORTFOLIO_CONTENT.md v3. Do not paraphrase.
 */
import type { StubContent } from "@/lib/site-config-types";

export const stubs: {
  artifacts: StubContent;
  git: StubContent;
  writing: StubContent;
} = {
  artifacts: {
    eyebrow: "ARTIFACTS",
    title: "Functional & Technical Artifacts",
    blurb:
      "Sanitized artifacts from recent engagements — best-in-class acceptance criteria examples, a synthesized system design doc, a technical risk assessment, and a business translation framework. Drawn from real work; published with all employer-identifying material removed.",
    statusNote: "Coming in Sprint 3.",
  },
  git: {
    eyebrow: "GIT · WORKFLOWS",
    title: "Code & Workflows",
    blurb:
      "Annotated GitHub walkthrough — pinned repos, curated forks and stars with notes on what each taught me, the six-persona Multi-Agent Workflow (MAW) writeup, and what I'm continuously studying. The point isn't the volume of code; it's the judgment behind which code is worth my time.",
    statusNote: "Coming in Sprint 3.",
  },
  writing: {
    eyebrow: "WRITING",
    title: "Writing",
    blurb:
      "Pieces on AI-native delivery, requirements quality, and the gap between business and engineering. Cross-posted from LinkedIn and other platforms.",
    statusNote:
      'First two pieces coming in Sprint 4 — "A quarter of work in three weekends: what the MAW workflow actually does" and "Plain-English translation as a PMT skill."',
  },
};
