/**
 * Site configuration — typed aggregator.
 *
 * Sprint 0 keys (name/role/headline/subheadline/email/social/hero) are preserved
 * verbatim. Sprint 1 content is composed from lib/content/* modules so each file
 * stays under the 200-line cap (NFR-G.SL). All visible copy is transcribed
 * verbatim from docs/PORTFOLIO_CONTENT.md v3 (NFR-G.CP).
 */
import type { SiteConfig } from "@/lib/site-config-types";
import { routes, nav, footer } from "@/lib/content/nav-footer";
import {
  howIWork,
  selectedWork,
  careerTrajectory,
  skills,
  experience,
  education,
  about,
  beyondTheWork,
  contact,
} from "@/lib/content/home";
import { teamsRetro, technicalTwin } from "@/lib/content/teams-retro";
import { stubs } from "@/lib/content/stubs";
import { meta } from "@/lib/content/meta";

export type { SiteConfig } from "@/lib/site-config-types";
export * from "@/lib/site-config-types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adwaitmulye.com";

export const siteConfig: SiteConfig = {
  name: "Adwait Mulye",
  role: "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER",
  headline: "Bridging Product Strategy and Technical Execution",
  subheadline:
    "14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.",
  email: "adwaitmulye@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/adwait-mulye-0b708818a/",
  githubUrl: "https://github.com/Adwait945",
  hero: {
    eyebrow: "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER",
    headlineLead: "Bridging Product Strategy ",
    headlineMuted: "and",
    headlineTrailing: " ",
    headlineAccent: "Technical Execution",
    primaryCta: { label: "View Featured Work", href: "/work/teams-retro" },
    secondaryCta: { label: "How I Build", href: "#how-i-work" },
  },
  routes,
  ogImage: "/opengraph.jpg",
  siteUrl: SITE_URL,
  nav,
  footer,
  howIWork,
  selectedWork,
  careerTrajectory,
  skills,
  experience,
  education,
  about,
  beyondTheWork,
  contact,
  teamsRetro,
  technicalTwin,
  stubs,
  meta,
};
