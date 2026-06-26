/**
 * Content module — Home sections §4–§12.
 * Verbatim copy from docs/PORTFOLIO_CONTENT.md v3. Do not paraphrase.
 */
import type {
  HowIWork,
  SelectedWork,
  CareerTrajectory,
  Skills,
  Experience,
  Education,
  About,
  BeyondTheWork,
  ContactCTA,
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

export const experience: Experience = {
  heading: "Experience",
  subhead:
    "14 years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare.",
  entries: [
    {
      period: "April 2024 – Present",
      role: "Senior Product Owner | Technical Product Lead",
      company: "7-Eleven · via Kforce · Allen, TX",
      description:
        "In-house Fuels Pricing & Sign-Push integration platform — the industry's only major retailer running this fully in-house. Inherited the pod as the 7th lead in five years; rebuilt product definition and delivery from the ground up. Shipped 70+ features across 8 program increments, hit a 10,000-store rollout target a full year ahead of schedule. Avoided ~$1M in headcount cost by modeling capacity and rejecting a proposed team expansion.",
    },
    {
      period: "June 2022 – April 2024",
      role: "Senior Product Owner | Technical Product Manager",
      company: "Wells Fargo · via Kforce · Treasury Payments",
      description:
        "First-wave implementer of the Federal Reserve's FedNow 24/7 instant-payment rail. Owned IRWS requirements and dependencies across 5+ integrating projects. Partnered with engineering on a monolith-to-microservices re-architecture that lifted efficiency 30%, cut API latency 50%, and raised throughput from 100 to 400 TPS.",
    },
    {
      period: "2020 – 2022",
      role: "Program Manager",
      company: "USAA · via Essential Technologies · Model Risk Management",
      description:
        "Coordinated cross-functional dependencies across Product Management, Model Owners, Developers, Implementers, Validators, and Data Warehouse for multiple Model Risk Management programs at a Fortune 100 financial services firm.",
    },
    {
      period: "2018 – 2020",
      role: "Product Owner",
      company: "Freeman Company · via Essential Technologies · Virtual Events Platform",
      description:
        "Led delivery during the pandemic-era pivot to virtual and hybrid events. Sustained ~175 user stories/month across 3–4 concurrent client engagements on a 12-week-per-client cycle.",
    },
    {
      period: "2016 – 2018",
      role: "Systems Analyst",
      company: "FedEx · via Essential Technologies · API Products",
      description:
        "Drove a REST and SOAP API platform for FedEx Office's e-commerce printing channel, including a public API portal enabling commercial customers to embed services in white-labeled apps.",
    },
    {
      period: "2011 – 2016",
      role: "Earlier",
      company: "Aperia Solutions · Techgene Solutions / MedAssets",
      description:
        "Aperia Solutions (Senior Business Analyst, 2013–2016) · Techgene Solutions / MedAssets (Business Analyst, 2011–2013)",
    },
  ],
  historyLink: { label: "Full work history →", href: PM_RESUME },
};

export const education: Education = {
  heading: "Education",
  entries: [
    {
      degree: "Master of Science, Management Information Systems",
      institution: "University of Houston–Clear Lake",
      year: "2010",
    },
    {
      degree: "Bachelor of Engineering, Electronics",
      institution: "University of Mumbai, India",
      year: "2007",
    },
  ],
};

export const about: About = {
  heading: "The Bridge",
  paragraph1:
    "Fourteen years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare have taught me one thing repeatedly: the gap between what business leaders want and what engineering ships is almost always a translation gap, not an effort gap. Most of my career has been spent closing it — turning ambiguous executive intent into testable contracts, dependencies into delivery plans, and architecture decisions into roadmaps a business can stand behind.",
  para2Pre: "What's changed in the last two years is how I work. I now operate as an ",
  para2Bold: "AI-native PM",
  para2Post:
    " — running a self-designed six-persona agentic workflow (PRODUCT · ARCHITECT · TEST · DEV · PROFESSOR · REVIEWER) across Claude Code, Windsurf, and Antigravity, with cross-IDE memory bridging via MCP. I don't talk about AI as a product feature. I use it as my operating layer. I take concepts from whiteboard to working prototype in a weekend, ship 5,000+ lines of tested production code in three, and replace slide-only stakeholder reviews with functioning demos.",
  paragraph3:
    "The Product Owner foundation has been built. The technical depth is where I've been heading the entire time. This site is a working artifact of both.",
};

export const beyondTheWork: BeyondTheWork = {
  heading: "Beyond the Work",
  paragraph:
    "Outside of work, I've played guitar for 25 years — long enough to know that the gap between knowing something and being able to do it under pressure is where most of the real learning happens, and it takes a lot of patience to properly build a skill over time while also excelling at a day job.",
};

export const contact: ContactCTA = {
  heading: "Let's talk",
  line1:
    "Open to PM-Technical, Product TPM, Senior TPM, and Senior/Principal PM roles at companies investing in technical product leadership and AI-native delivery.",
  line2: "Plano-based; flexible on hybrid and remote.",
  buttons: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adwait-mulye-0b708818a/",
      primary: false,
      external: true,
    },
    { label: "GitHub", href: "https://github.com/Adwait945", primary: false, external: true },
    { label: "Email", href: `mailto:${EMAIL}`, primary: true, external: false },
  ],
};
