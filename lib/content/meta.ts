/**
 * Content module — Page metadata (§15).
 * Verbatim copy from docs/PORTFOLIO_CONTENT.md v3. Do not paraphrase.
 */
import type { PageMeta } from "@/lib/site-config-types";
import { routes } from "@/lib/content/nav-footer";

export const meta: {
  home: PageMeta;
  teamsRetro: PageMeta;
  artifacts: PageMeta;
  git: PageMeta;
  writing: PageMeta;
} = {
  home: {
    title: "Adwait Mulye — Product Manager, Technical · TPM",
    description:
      "14 years turning ambiguous business intent into shipped software. PMT / TPM candidate with an AI-native operating model.",
    path: routes.home,
  },
  teamsRetro: {
    title: "Teams Retro — Case Study — Adwait Mulye",
    description:
      "Real-time retrospective app built in 3 weekends: 5,055 lines of TypeScript, 87 Jest tests, 44 Playwright E2E, six-persona agentic workflow.",
    path: routes.teamsRetro,
  },
  artifacts: {
    title: "Functional & Technical Artifacts — Adwait Mulye",
    description:
      "Sanitized artifacts: acceptance criteria examples, system design doc, technical risk assessment, business translation framework.",
    path: routes.artifacts,
  },
  git: {
    title: "Code & Workflows — Adwait Mulye",
    description:
      "GitHub walkthrough, annotated forks and stars, and the six-persona Multi-Agent Workflow (MAW) writeup.",
    path: routes.git,
  },
  writing: {
    title: "Writing — Adwait Mulye",
    description:
      "AI-native delivery, requirements quality, and bridging business and engineering.",
    path: routes.writing,
  },
};
