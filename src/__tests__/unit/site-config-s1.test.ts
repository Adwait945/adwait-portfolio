/**
 * Sprint 1 — Unit tests for extended lib/site-config.ts (Sprint 1 fields)
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements the Sprint 1 extension of lib/site-config.ts.
 * Sprint 0 site-config tests continue to pass (separate file, unchanged).
 *
 * AC refs: AC-1.0 (config shape), AC-1.1, AC-1.6, AC-4.1, AC-4.5, AC-11.3, NFR-G.CP
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §2, §4–§17
 */

import { siteConfig } from '@/lib/site-config'

// ---------------------------------------------------------------------------
// Sprint 1 nav config
// ---------------------------------------------------------------------------
describe('AC-1.1: siteConfig.nav has brand and all five nav links', () => {
  it('AC-1.1: siteConfig.nav exists', () => {
    expect(siteConfig).toHaveProperty('nav')
    expect(siteConfig.nav).toBeDefined()
  })

  it('AC-1.1: nav brand label is "Adwait Mulye"', () => {
    expect(siteConfig.nav.brand.label).toBe('Adwait Mulye')
  })

  it('AC-1.1: nav brand href is "/"', () => {
    expect(siteConfig.nav.brand.href).toBe('/')
  })

  it('AC-1.1: nav has exactly five center links', () => {
    expect(siteConfig.nav.links).toHaveLength(5)
  })

  it('AC-1.1: nav links include "Home"', () => {
    const labels = siteConfig.nav.links.map((l: { label: string; href: string }) => l.label)
    expect(labels).toContain('Home')
  })

  it('AC-1.1: nav links include "Teams Retro"', () => {
    const labels = siteConfig.nav.links.map((l: { label: string; href: string }) => l.label)
    expect(labels).toContain('Teams Retro')
  })

  it('AC-1.1: nav links include "Artifacts"', () => {
    const labels = siteConfig.nav.links.map((l: { label: string; href: string }) => l.label)
    expect(labels).toContain('Artifacts')
  })

  it('AC-1.1: nav links include "Git"', () => {
    const labels = siteConfig.nav.links.map((l: { label: string; href: string }) => l.label)
    expect(labels).toContain('Git')
  })

  it('AC-1.1: nav links include "Writing"', () => {
    const labels = siteConfig.nav.links.map((l: { label: string; href: string }) => l.label)
    expect(labels).toContain('Writing')
  })

  it('AC-1.1: nav resumeLabel is "Resume"', () => {
    expect(siteConfig.nav.resumeLabel).toBe('Resume')
  })

  it('AC-1.2: nav has exactly two resume options', () => {
    expect(siteConfig.nav.resumes).toHaveLength(2)
  })

  it('AC-1.2: PM-Technical resume href is correct', () => {
    const pmResume = siteConfig.nav.resumes.find(
      (r: { label: string; href: string }) => r.label === 'PM-Technical'
    )
    expect(pmResume).toBeDefined()
    expect(pmResume?.href).toBe('/resumes/Adwait_Mulye_PM-Technical.pdf')
  })

  it('AC-1.2: TPM resume href is correct', () => {
    const tpmResume = siteConfig.nav.resumes.find(
      (r: { label: string; href: string }) => r.label === 'TPM'
    )
    expect(tpmResume).toBeDefined()
    expect(tpmResume?.href).toBe('/resumes/Adwait_Mulye_TPM.pdf')
  })
})

// ---------------------------------------------------------------------------
// Sprint 1 footer config
// ---------------------------------------------------------------------------
describe('AC-1.6 / AC-1.7 / AC-1.8: siteConfig.footer has all required fields', () => {
  it('AC-1.6: siteConfig.footer exists', () => {
    expect(siteConfig).toHaveProperty('footer')
    expect(siteConfig.footer).toBeDefined()
  })

  it('AC-1.6: footer.colophon is a non-empty string', () => {
    expect(typeof siteConfig.footer.colophon).toBe('string')
    expect(siteConfig.footer.colophon.length).toBeGreaterThan(0)
  })

  it('AC-1.6: footer.colophon is verbatim from §17', () => {
    expect(siteConfig.footer.colophon).toBe(
      '© 2026 Adwait Mulye. Built end-to-end with Next.js, Tailwind, and my own MAW agentic workflow.'
    )
  })

  it('AC-1.7: footer has three social links', () => {
    expect(siteConfig.footer.social).toHaveLength(3)
  })

  it('AC-1.7: LinkedIn aria-label is "LinkedIn profile"', () => {
    const linkedin = siteConfig.footer.social.find(
      (s: { label: string; href: string; ariaLabel: string }) => s.label === 'LinkedIn'
    )
    expect(linkedin?.ariaLabel).toBe('LinkedIn profile')
  })

  it('AC-1.7: GitHub aria-label is "GitHub profile"', () => {
    const github = siteConfig.footer.social.find(
      (s: { label: string; href: string; ariaLabel: string }) => s.label === 'GitHub'
    )
    expect(github?.ariaLabel).toBe('GitHub profile')
  })

  it('AC-1.7: Email aria-label is "Email Adwait"', () => {
    const email = siteConfig.footer.social.find(
      (s: { label: string; href: string; ariaLabel: string }) => s.label === 'Email'
    )
    expect(email?.ariaLabel).toBe('Email Adwait')
  })

  it('AC-1.8: footer.bottomLine is "Plano, TX · Built 2026 · v1.0"', () => {
    expect(siteConfig.footer.bottomLine).toBe('Plano, TX · Built 2026 · v1.0')
  })
})

// ---------------------------------------------------------------------------
// Routes config
// ---------------------------------------------------------------------------
describe('ARCH DEBT-1.1: siteConfig.routes has correct paths', () => {
  it('routes.home is "/"', () => {
    expect(siteConfig.routes.home).toBe('/')
  })

  it('routes.teamsRetro is "/work/teams-retro" (DEBT-1.1)', () => {
    expect(siteConfig.routes.teamsRetro).toBe('/work/teams-retro')
  })

  it('routes.artifacts is "/artifacts"', () => {
    expect(siteConfig.routes.artifacts).toBe('/artifacts')
  })

  it('routes.git is "/git"', () => {
    expect(siteConfig.routes.git).toBe('/git')
  })

  it('routes.writing is "/writing"', () => {
    expect(siteConfig.routes.writing).toBe('/writing')
  })
})

// ---------------------------------------------------------------------------
// Sprint 1 section configs — spot-checks for key fields
// ---------------------------------------------------------------------------
describe('NFR-G.CP: Sprint 1 section configs are present and non-empty', () => {
  it('howIWork.heading is "How I Work"', () => {
    expect(siteConfig.howIWork.heading).toBe('How I Work')
  })

  it('selectedWork.heading is "Selected Work"', () => {
    expect(siteConfig.selectedWork.heading).toBe('Selected Work')
  })

  it('careerTrajectory.heading is "Career Trajectory"', () => {
    expect(siteConfig.careerTrajectory.heading).toBe('Career Trajectory')
  })

  it('skills.heading is "Skills & Tools"', () => {
    expect(siteConfig.skills.heading).toBe('Skills & Tools')
  })

  it('experience.heading is "Experience"', () => {
    expect(siteConfig.experience.heading).toBe('Experience')
  })

  it('education.heading is "Education"', () => {
    expect(siteConfig.education.heading).toBe('Education')
  })

  it('about.heading is "The Bridge"', () => {
    expect(siteConfig.about.heading).toBe('The Bridge')
  })

  it('beyondTheWork.heading is "Beyond the Work"', () => {
    expect(siteConfig.beyondTheWork.heading).toBe('Beyond the Work')
  })

  it("contact.heading is \"Let's talk\"", () => {
    expect(siteConfig.contact.heading).toBe("Let's talk")
  })

  it('AC-11.3: teamsRetro.metrics has exactly four entries', () => {
    expect(siteConfig.teamsRetro.metrics).toHaveLength(4)
  })

  it('AC-11.3: first metric value is "5,055"', () => {
    expect(siteConfig.teamsRetro.metrics[0].value).toBe('5,055')
  })

  it('AC-11.3: second metric value is "87/87"', () => {
    expect(siteConfig.teamsRetro.metrics[1].value).toBe('87/87')
  })

  it('AC-11.3: third metric value is "44"', () => {
    expect(siteConfig.teamsRetro.metrics[2].value).toBe('44')
  })

  it('AC-11.3: fourth metric value is "~20–30 hrs"', () => {
    expect(siteConfig.teamsRetro.metrics[3].value).toBe('~20–30 hrs')
  })

  it('stubs.artifacts exists with non-empty title', () => {
    expect(siteConfig.stubs.artifacts.title.length).toBeGreaterThan(0)
  })

  it('stubs.git exists with non-empty title', () => {
    expect(siteConfig.stubs.git.title.length).toBeGreaterThan(0)
  })

  it('stubs.writing exists with non-empty title', () => {
    expect(siteConfig.stubs.writing.title.length).toBeGreaterThan(0)
  })
})
