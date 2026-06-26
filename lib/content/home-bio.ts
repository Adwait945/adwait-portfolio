/**
 * Content module — Home sections §8–§12 (Experience, Education, The Bridge,
 * Beyond the Work, Contact). Verbatim copy from docs/PORTFOLIO_CONTENT.md v3.
 */
import type {
  Experience,
  Education,
  About,
  BeyondTheWork,
  ContactCTA,
} from "@/lib/site-config-types";

const EMAIL = "adwaitmulye@gmail.com";
const PM_RESUME = "/resumes/Adwait_Mulye_PM-Technical.pdf";

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
      company: "via Essential Technologies · API Products",
      description:
        "Drove a REST and SOAP API platform for FedEx Office's e-commerce printing channel, including a public API portal enabling commercial customers to embed services in white-labeled apps.",
    },
    {
      period: "2011 – 2016",
      role: "Earlier",
      company: "",
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
