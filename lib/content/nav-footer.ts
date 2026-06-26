/**
 * Content module — Navigation (§2) and Footer (§17).
 * Verbatim copy from docs/PORTFOLIO_CONTENT.md v3. Do not paraphrase.
 */
import type { NavConfig, FooterConfig, Routes } from "@/lib/site-config-types";

const EMAIL = "adwaitmulye@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/adwait-mulye-0b708818a/";
const GITHUB_URL = "https://github.com/Adwait945";

export const routes: Routes = {
  home: "/",
  teamsRetro: "/work/teams-retro",
  artifacts: "/artifacts",
  git: "/git",
  writing: "/writing",
};

export const nav: NavConfig = {
  brand: { label: "Adwait Mulye", href: "/" },
  links: [
    { label: "Home", href: routes.home },
    { label: "Teams Retro", href: routes.teamsRetro },
    { label: "Artifacts", href: routes.artifacts },
    { label: "Git", href: routes.git },
    { label: "Writing", href: routes.writing },
  ],
  resumeLabel: "Resume",
  resumes: [
    { label: "PM-Technical", href: "/resumes/Adwait_Mulye_PM-Technical.pdf" },
    { label: "TPM", href: "/resumes/Adwait_Mulye_TPM.pdf" },
  ],
};

export const footer: FooterConfig = {
  colophon:
    "© 2026 Adwait Mulye. Built end-to-end with Next.js, Tailwind, and my own MAW agentic workflow.",
  siteMap: nav.links,
  social: [
    { label: "LinkedIn", href: LINKEDIN_URL, ariaLabel: "LinkedIn profile" },
    { label: "GitHub", href: GITHUB_URL, ariaLabel: "GitHub profile" },
    { label: "Email", href: `mailto:${EMAIL}`, ariaLabel: "Email Adwait" },
  ],
  bottomLine: "Plano, TX · Built 2026 · v1.0",
};
