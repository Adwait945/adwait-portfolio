/**
 * Sprint 0 — Unit tests for components/home/Hero.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/Hero.tsx.
 *
 * AC refs: AC-0.7, AC-0.9, AC-0.10, AC-UI-1.2 – AC-UI-1.9, NFR-1.A, NFR-1.I, NFR-1.ST
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §3
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'

// ---------------------------------------------------------------------------
// AC-UI-1.2: Eyebrow pill
// ---------------------------------------------------------------------------
describe('AC-UI-1.2: Eyebrow pill styling and content', () => {
  it('AC-UI-1.2: eyebrow element exists with exact locked copy', () => {
    render(<Hero />)
    expect(
      screen.getByText('PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER')
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-UI-1.3: h1 headline — segmented spans
// ---------------------------------------------------------------------------
describe('AC-UI-1.3: Headline — segmented spans for color differentiation', () => {
  it('AC-UI-1.3: a single h1 element is present', () => {
    render(<Hero />)
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
  })

  it('AC-UI-1.3: h1 contains text "Bridging Product Strategy"', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Bridging Product Strategy')
  })

  it('AC-UI-1.3: h1 contains text "and" (muted span)', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('and')
  })

  it('AC-UI-1.3: h1 contains text "Technical Execution" (accent span)', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Technical Execution')
  })

  it('AC-UI-1.3: full headline text assembled from spans matches locked copy', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    // Normalize whitespace — spans may have surrounding spaces
    const text = (h1.textContent ?? '').replace(/\s+/g, ' ').trim()
    expect(text).toBe('Bridging Product Strategy and Technical Execution')
  })
})

// ---------------------------------------------------------------------------
// AC-UI-1.4: Sub-headline paragraph
// ---------------------------------------------------------------------------
describe('AC-UI-1.4: Sub-headline paragraph', () => {
  it('AC-UI-1.4: sub-headline paragraph contains verbatim locked copy', () => {
    render(<Hero />)
    expect(
      screen.getByText(
        '14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.'
      )
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-UI-1.5 / AC-UI-1.6: CTA buttons — rendered as anchor elements
// ---------------------------------------------------------------------------
describe('AC-UI-1.5 / AC-UI-1.6: CTA anchor elements', () => {
  it('AC-UI-1.5: primary CTA is an anchor linking to /work/teams-retro (Sprint 1 — DEBT-0.2 resolved)', () => {
    render(<Hero />)
    const primaryLink = screen.getByRole('link', { name: /View Featured Work/i })
    expect(primaryLink).toBeInTheDocument()
    expect(primaryLink).toHaveAttribute('href', '/work/teams-retro')
  })

  it('AC-UI-1.6: secondary CTA is an anchor linking to #how-i-work (Sprint 1 — DEBT-0.2 resolved)', () => {
    render(<Hero />)
    const secondaryLink = screen.getByRole('link', { name: /How I Build/i })
    expect(secondaryLink).toBeInTheDocument()
    expect(secondaryLink).toHaveAttribute('href', '#how-i-work')
  })

  it('AC-UI-1.5: ArrowRight icon inside primary CTA is aria-hidden (decorative)', () => {
    render(<Hero />)
    const primaryLink = screen.getByRole('link', { name: /View Featured Work/i })
    // The SVG icon must be aria-hidden so screen readers skip it.
    const svgIcons = primaryLink.querySelectorAll('svg')
    svgIcons.forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })
})

// ---------------------------------------------------------------------------
// AC-UI-1.8: Container layout constraints
// ---------------------------------------------------------------------------
describe('AC-UI-1.8: Content block centering', () => {
  it('AC-UI-1.8: a section element wraps the Hero content', () => {
    render(<Hero />)
    const section = document.querySelector('section')
    expect(section).not.toBeNull()
  })
})

// ---------------------------------------------------------------------------
// NFR-1.I: No hardcoded strings in component — all copy from siteConfig
// We verify this structurally by asserting siteConfig is importable and that
// the rendered strings match siteConfig values exactly.
// ---------------------------------------------------------------------------
describe('NFR-1.I: All visible strings sourced from siteConfig', () => {
  it('NFR-1.I: eyebrow matches siteConfig.hero.eyebrow', async () => {
    const { siteConfig } = await import('@/lib/site-config')
    render(<Hero />)
    expect(screen.getByText(siteConfig.hero.eyebrow)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// NFR-1.ST: No inline styles — Tailwind only
// We check the rendered output contains no style attributes on key elements.
// ---------------------------------------------------------------------------
describe('NFR-1.ST: No inline style attributes on structural elements', () => {
  it('NFR-1.ST: <section> has no inline style attribute', () => {
    render(<Hero />)
    const section = document.querySelector('section')
    expect(section?.getAttribute('style')).toBeNull()
  })

  it('NFR-1.ST: <h1> has no inline style attribute', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.getAttribute('style')).toBeNull()
  })
})
