/**
 * Content module — Home sections §4–§7 (How I Work, Selected Work, Career
 * Trajectory, Skills). Sections §8–§12 are re-exported from home-bio to keep
 * each file under the 200-line cap. Verbatim copy from PORTFOLIO_CONTENT.md v3.
 */
import type {
  HowIWork,
  SelectedWork,
  CareerTrajectory,
  Skills,
} from "@/lib/site-config-types";
import { routes } from "@/lib/content/nav-footer";

const EMAIL = "adwaitmulye@gmail.com";
const PM_RESUME = "/resumes/Adwait_Mulye_PM-Technical.pdf";
const TPM_RESUME = "/resumes/Adwait_Mulye_TPM.pdf";

export const howIWork: HowIWork = {
  heading: "How I Work",
  subhead: "Three things a Big Tech PMT has to do well. Here's what I bring to each.",
  pillars: [
    {
      icon: "Target",
      title: "Product Thinking",
      body: "Defining what to build, why it matters, and how to know it worked. Discovery, requirements decomposition, acceptance criteria that survive sprint 14, and the discipline to say no.",
      tags: [
        { label: "Agile / Scrum" },
        { label: "GTM Strategy" },
        { label: "User Research" },
        { label: "Metrics & KPIs" },
        { label: "PRD Authoring" },
        { label: "WSJF / RICE" },
      ],
    },
    {
      icon: "Code2",
      title: "Engineering Depth",
      body: "Designing systems, reasoning about tradeoffs, and writing production code. APIs and integration contracts, distributed systems, data pipelines, and modern web stacks.",
      tags: [
        {
          label: "System Architecture",
          subLabel:
            "Tradeoffs · Scalability Milestones · Cross-functional Dependencies · Bottlenecks · Execution Risks & Mitigations",
        },
        { label: "TypeScript" },
        { label: "REST / SOAP APIs" },
        { label: "React / Next.js" },
        { label: "Distributed Systems" },
      ],
    },
    {
      icon: "BrainCircuit",
      title: "AI & Systems",
      body: "Treating AI as the operating layer, not a feature. A self-designed six-persona agentic workflow, cross-IDE memory, browser-agent E2E testing, and the discipline to make AI-generated code production-quality.",
      tags: [
        { label: "Multi-Agent Workflows (MAW)" },
        { label: "Claude Code · Windsurf · Antigravity" },
        { label: "Mem0 MCP Memory" },
        { label: "Playwright MCP" },
        { label: "RAG Architecture" },
      ],
    },
  ],
};

export const selectedWork: SelectedWork = {
  heading: "Selected Work",
  subhead: "Real shipped artifacts. No fabricated metrics.",
  cards: [
    {
      eyebrow: "PRODUCT · AI-NATIVE BUILD",
      title: "Teams Retro",
      description:
        "A real-time team retrospective app — feedback feed, gamification engine, time-window analytics, admin moderation — designed, built, tested, and deployed using my own six-persona agentic workflow.",
      metrics: [
        "5,055 lines of production TypeScript across 48 files",
        "87/87 Jest unit tests passing",
        "44 Playwright end-to-end test cases",
        "Zero @ts-nocheck escapes",
      ],
      quote:
        "“A quarter of traditional solo development, compressed into ~20–30 hours across three focused weekends. Roughly 15–30× faster than the baseline a single PM/dev would need to ship the same scope.”",
      stack: ["Next.js 14 · TypeScript · MongoDB Atlas · Jest · Playwright · Tailwind"],
      cta: { label: "Read the case study →", href: routes.teamsRetro, disabled: false },
      placeholder: false,
      imageAlt: "Teams Retro Dashboard",
    },
    {
      eyebrow: "ARTIFACTS · IN PROGRESS",
      title: "Functional & Technical Artifacts",
      description:
        "Sanitized artifacts from recent engagements — best-in-class acceptance criteria, system design doc, technical risk assessment, and a business translation framework.",
      cta: { label: "Coming in Sprint 3 →", disabled: true },
      placeholder: true,
    },
    {
      eyebrow: "GIT · IN PROGRESS",
      title: "Code & Workflows",
      description:
        "GitHub walkthrough, annotated forks and stars, and the six-persona Multi-Agent Workflow (MAW) — the agentic pipeline behind everything on this site.",
      cta: { label: "Coming in Sprint 3 →", disabled: true },
      placeholder: true,
    },
  ],
};

export const careerTrajectory: CareerTrajectory = {
  heading: "Career Trajectory",
  intro: "Three resumes, because I've held three lenses on the same craft.",
  blocks: [
    {
      label: "SAFe Product Owner.",
      body: " Fourteen years grounding in turning ambiguous business intent into shipped software. Discovery loops, requirements quality, dependency management, and the discipline of finishing.",
    },
    {
      label: "Technical Program Manager.",
      body: " The natural expansion: from owning one product to orchestrating delivery across many teams and systems. Architecture-level decisions, integration contracts, and scaling.",
    },
    {
      label: "Product Manager, Technical.",
      body: " Owning a product end-to-end with the technical depth to make the right calls, not just relay them. Where I'm headed next.",
    },
  ],
  emphasisPre: "And increasingly: ",
  emphasisBold: "AI-Native PM",
  emphasisPost:
    " — using agentic workflows as the operating layer, not as a feature. Already shipping this way.",
  primaryResume: { label: "Download PM-Technical Resume", href: PM_RESUME },
  secondaryResume: { label: "Download TPM Resume", href: TPM_RESUME },
  safeNotePre: "Looking for a SAFe Product Owner conversation? ",
  safeNoteLinkLabel: "Email me",
  safeNotePost: " — I keep a separate resume tailored for those engagements.",
  safeNoteHref: `mailto:${EMAIL}`,
};

export const skills: Skills = {
  heading: "Skills & Tools",
  groups: [
    {
      heading: "Product Management",
      skills:
        "Product vision & roadmap · Customer & stakeholder discovery · Requirements decomposition · Acceptance criteria & testable contracts · Edge-case analysis · Prioritization (WSJF, RICE) · OKRs & success metrics · PRD authoring · Design systems · GTM coordination",
    },
    {
      heading: "Technical Depth",
      skills:
        "REST & SOAP APIs · Microservices · Distributed systems · System design & scaling · SQL (complex querying) · Databricks Lakehouse · ETL pipelines · MongoDB / PostgreSQL · JSON / XML data contracts · React · Next.js · Java Spring Boot · Python · CI/CD",
    },
    {
      heading: "AI & GenAI Tooling",
      skills:
        "Custom multi-agent workflow design · Windsurf Cascade · Google Antigravity · Claude Code CLI · Replit · Databricks Genie · Mem0 MCP cross-IDE memory · Playwright MCP browser-agent E2E · RAG architecture · AI-assisted prototyping · Prompt engineering · LLM integration",
    },
    {
      heading: "Delivery & Tools",
      skills:
        "Cross-functional leadership · Dependency & risk management · Agile / Scrum · SAFe at enterprise scale · JIRA · Confluence · Postman · Effective in both structured-program and autonomous-team models",
    },
  ],
};

export { experience, education, about, beyondTheWork, contact } from "@/lib/content/home-bio";
