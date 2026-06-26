/**
 * Shared type definitions for the site configuration.
 * Kept separate so content modules can import types without circular deps.
 */

export type Cta = { label: string; href: string };
export type NavLink = { label: string; href: string };

export type Routes = {
  home: string;
  teamsRetro: string;
  artifacts: string;
  git: string;
  writing: string;
};

export type ResumeLink = { label: string; href: string };

export type NavConfig = {
  brand: { label: string; href: string };
  links: NavLink[];
  resumeLabel: string;
  resumes: ResumeLink[];
};

export type FooterConfig = {
  colophon: string;
  siteMap: NavLink[];
  social: { label: string; href: string; ariaLabel: string }[];
  bottomLine: string;
};

export type Pillar = {
  icon: "Target" | "Code2" | "BrainCircuit";
  title: string;
  body: string;
  tags: { label: string; subLabel?: string }[];
};
export type HowIWork = { heading: string; subhead: string; pillars: Pillar[] };

export type WorkCard = {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: string[];
  quote?: string;
  stack?: string[];
  cta: { label: string; href?: string; disabled: boolean };
  placeholder: boolean;
  imageAlt?: string;
};
export type SelectedWork = { heading: string; subhead: string; cards: WorkCard[] };

export type CareerBlock = { label: string; body: string };
export type CareerTrajectory = {
  heading: string;
  intro: string;
  blocks: CareerBlock[];
  emphasisPre: string;
  emphasisBold: string;
  emphasisPost: string;
  primaryResume: Cta;
  secondaryResume: Cta;
  safeNotePre: string;
  safeNoteLinkLabel: string;
  safeNotePost: string;
  safeNoteHref: string;
};

export type SkillGroup = { heading: string; skills: string };
export type Skills = { heading: string; groups: SkillGroup[] };

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
};
export type Experience = {
  heading: string;
  subhead: string;
  entries: ExperienceEntry[];
  historyLink: Cta;
};

export type EducationEntry = { degree: string; institution: string; year: string };
export type Education = { heading: string; entries: EducationEntry[] };

export type About = {
  heading: string;
  paragraph1: string;
  para2Pre: string;
  para2Bold: string;
  para2Post: string;
  paragraph3: string;
};

export type BeyondTheWork = { heading: string; paragraph: string };

export type ContactCTA = {
  heading: string;
  line1: string;
  line2: string;
  buttons: {
    label: "LinkedIn" | "GitHub" | "Email";
    href: string;
    primary: boolean;
    external: boolean;
  }[];
};

export type Metric = { value: string; label: string };
export type RetroSection = { heading: string; body: string };
export type TeamsRetro = {
  backLabel: string;
  eyebrow: string;
  heading: string;
  subhead: string;
  metrics: Metric[];
  sections: RetroSection[];
  demoHeading: string;
  demoText: string;
  links: Cta[];
};

export type TechnicalTwin = {
  heading: string;
  badge: string;
  body: string;
  note: string;
};

export type PageMeta = { title: string; description: string; path: string };

export type StubContent = {
  eyebrow: string;
  title: string;
  blurb: string;
  statusNote: string;
};

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
    subheadline?: string;
    headlineLead: string;
    headlineMuted: string;
    headlineTrailing: string;
    headlineAccent: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  routes: Routes;
  ogImage: string;
  siteUrl: string;
  nav: NavConfig;
  footer: FooterConfig;
  howIWork: HowIWork;
  selectedWork: SelectedWork;
  careerTrajectory: CareerTrajectory;
  skills: Skills;
  experience: Experience;
  education: Education;
  about: About;
  beyondTheWork: BeyondTheWork;
  contact: ContactCTA;
  teamsRetro: TeamsRetro;
  technicalTwin: TechnicalTwin;
  stubs: { artifacts: StubContent; git: StubContent; writing: StubContent };
  meta: {
    home: PageMeta;
    teamsRetro: PageMeta;
    artifacts: PageMeta;
    git: PageMeta;
    writing: PageMeta;
  };
};
