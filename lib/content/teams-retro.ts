/**
 * Content module — Teams Retro skeleton (§14) and Technical Twin (§13).
 * Verbatim copy from docs/PORTFOLIO_CONTENT.md v3. Do not paraphrase.
 */
import type { TeamsRetro, TechnicalTwin } from "@/lib/site-config-types";

export const teamsRetro: TeamsRetro = {
  backLabel: "← Back to home",
  eyebrow: "CASE STUDY · PRODUCT · AI-NATIVE BUILD",
  heading: "Teams Retro",
  subhead:
    "A real-time team retrospective app built end-to-end with a six-persona agentic workflow in three weekends.",
  metrics: [
    { value: "5,055", label: "lines of production TypeScript" },
    { value: "87/87", label: "Jest tests passing" },
    { value: "44", label: "Playwright E2E test cases" },
    { value: "~20–30 hrs", label: "across three weekends" },
  ],
  sections: [
    { heading: "What it is", body: "[Full product overview — coming in Sprint 2]" },
    { heading: "How it was built", body: "[MAW workflow walkthrough — coming in Sprint 2]" },
    {
      heading: "System Design",
      body: "[Architecture, data models, API contracts — coming in Sprint 2]",
    },
  ],
  demoHeading: "See it live",
  demoText: "Live seeded demo + Loom walkthrough — coming in Sprint 2",
  links: [
    { label: "View on GitHub →", href: "#" },
    { label: "Watch Loom →", href: "#" },
    { label: "Live Demo →", href: "#" },
  ],
};

export const technicalTwin: TechnicalTwin = {
  heading: "Technical Twin",
  badge: "in development",
  body: "A conversational AI assistant trained on this portfolio's public content — case studies, artifacts, and writing. Ask it anything you'd ask me in a first-round interview: what I've shipped, how I approach system design, what I think about AI-native delivery. It won't hallucinate about my record because it only knows what's on this site.",
  note: "Building this in Sprint 5.",
};
