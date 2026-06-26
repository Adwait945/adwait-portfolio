/**
 * Sprint 0 — Unit tests for lib/site-config.ts
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements lib/site-config.ts.
 *
 * AC refs: AC-0.6, AC-0.9, NFR-1.I, NFR-1.T
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §1 and §3
 */

import { siteConfig } from '@/lib/site-config'

describe('AC-0.6 / NFR-1.I: siteConfig — top-level fields', () => {
  it('AC-0.6: name is "Adwait Mulye"', () => {
    expect(siteConfig.name).toBe('Adwait Mulye')
  })

  it('AC-0.6: email is the correct contact email', () => {
    expect(siteConfig.email).toBe('adwaitmulye@gmail.com')
  })

  it('AC-0.6: linkedinUrl is a non-empty string', () => {
    expect(typeof siteConfig.linkedinUrl).toBe('string')
    expect(siteConfig.linkedinUrl.length).toBeGreaterThan(0)
  })

  it('AC-0.6: githubUrl is a non-empty string', () => {
    expect(typeof siteConfig.githubUrl).toBe('string')
    expect(siteConfig.githubUrl.length).toBeGreaterThan(0)
  })

  it('AC-0.6: subheadline is a non-empty string', () => {
    expect(typeof siteConfig.subheadline).toBe('string')
    expect(siteConfig.subheadline.length).toBeGreaterThan(0)
  })
})

describe('AC-0.6 / AC-0.9 / NFR-1.I: siteConfig.hero — locked Hero copy', () => {
  it('AC-0.6 / AC-0.9: hero.eyebrow matches verbatim value from PORTFOLIO_CONTENT.md §3', () => {
    expect(siteConfig.hero.eyebrow).toBe(
      'PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER'
    )
  })

  it('AC-0.9: headline segments concatenate to exact full headline string', () => {
    const { headlineLead, headlineMuted, headlineTrailing, headlineAccent } =
      siteConfig.hero
    const fullHeadline =
      headlineLead + headlineMuted + headlineTrailing + headlineAccent
    expect(fullHeadline).toBe('Bridging Product Strategy and Technical Execution')
  })

  it('AC-0.9: hero.headlineAccent is "Technical Execution" (the cyan accent span)', () => {
    expect(siteConfig.hero.headlineAccent).toBe('Technical Execution')
  })

  it('AC-0.9: hero.headlineMuted is "and" (the muted gray span)', () => {
    expect(siteConfig.hero.headlineMuted).toBe('and')
  })

  it('AC-0.9 / T-0.5: subheadline matches verbatim from PORTFOLIO_CONTENT.md §3', () => {
    // Accept subheadline from either top-level or hero — DEV may place it on either.
    const sub = siteConfig.subheadline ?? siteConfig.hero?.subheadline ?? ''
    expect(sub).toBe(
      '14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.'
    )
  })

  it('AC-0.9: sub-headline uses em-dash (—) not hyphen (-)', () => {
    const sub = siteConfig.subheadline ?? siteConfig.hero?.subheadline ?? ''
    expect(sub).toContain('—')
    expect(sub).not.toMatch(/\s-\s/)
  })

  it('AC-0.7: hero.primaryCta.label contains "View Featured Work"', () => {
    expect(siteConfig.hero.primaryCta.label).toContain('View Featured Work')
  })

  it('AC-0.7: hero.primaryCta.href is "#" (Sprint 0 placeholder)', () => {
    expect(siteConfig.hero.primaryCta.href).toBe('#')
  })

  it('AC-0.7: hero.secondaryCta.label is "How I Build"', () => {
    expect(siteConfig.hero.secondaryCta.label).toBe('How I Build')
  })

  it('AC-0.7: hero.secondaryCta.href is "#" (Sprint 0 placeholder)', () => {
    expect(siteConfig.hero.secondaryCta.href).toBe('#')
  })
})

describe('NFR-1.I: no hardcoded user-facing strings — siteConfig is the single source', () => {
  it('NFR-1.I: siteConfig.hero object exists with all required keys', () => {
    expect(siteConfig.hero).toBeDefined()
    expect(siteConfig.hero).toHaveProperty('eyebrow')
    expect(siteConfig.hero).toHaveProperty('headlineLead')
    expect(siteConfig.hero).toHaveProperty('headlineMuted')
    expect(siteConfig.hero).toHaveProperty('headlineTrailing')
    expect(siteConfig.hero).toHaveProperty('headlineAccent')
    expect(siteConfig.hero).toHaveProperty('primaryCta')
    expect(siteConfig.hero).toHaveProperty('secondaryCta')
  })
})
