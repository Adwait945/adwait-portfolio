export type SiteConfig = {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineMuted: string;
    headlineTrailing: string;
    headlineAccent: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

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
    primaryCta: { label: "View Featured Work", href: "#" },
    secondaryCta: { label: "How I Build", href: "#" },
  },
};
