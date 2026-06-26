/**
 * Sprint 0 — Hero component tests (T-0.1 through T-0.5)
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements:
 *   - components/home/Hero.tsx
 *   - lib/site-config.ts
 *
 * Locked copy sourced from docs/PORTFOLIO_CONTENT.md v3 §3.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'

// ---------------------------------------------------------------------------
// T-0.1 — Hero renders without throwing an error
// AC-0.7: Hero component exists and mounts
// ---------------------------------------------------------------------------
describe('T-0.1 | AC-0.7: Hero renders without throwing', () => {
  it('T-0.1: renders without throwing an error', () => {
    expect(() => render(<Hero />)).not.toThrow()
  })
})

// ---------------------------------------------------------------------------
// T-0.2 — Full headline string present in rendered output
// AC-0.7 / AC-0.9 / AC-UI-1.3: "Bridging Product Strategy and Technical Execution"
// ---------------------------------------------------------------------------
describe('T-0.2 | AC-0.7 / AC-0.9: Full headline text', () => {
  it('T-0.2: rendered output contains exact headline "Bridging Product Strategy and Technical Execution"', () => {
    render(<Hero />)
    // The h1 may render via segmented spans; getByRole assembles the accessible name.
    // We look for the full string across the DOM tree.
    expect(
      screen.getByText((_, element) => {
        if (!element || element.tagName !== 'H1') return false
        const text = element.textContent ?? ''
        return (
          text.includes('Bridging Product Strategy') &&
          text.includes('and') &&
          text.includes('Technical Execution')
        )
      })
    ).toBeInTheDocument()
  })

  it('T-0.2b: h1 accessible name includes full headline string', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Bridging Product Strategy and Technical Execution')
  })
})

// ---------------------------------------------------------------------------
// T-0.3 — Eyebrow string present in rendered output
// AC-0.7 / AC-0.9 / AC-UI-1.2: verbatim uppercase eyebrow pill
// ---------------------------------------------------------------------------
describe('T-0.3 | AC-0.7 / AC-0.9: Eyebrow copy', () => {
  it('T-0.3: rendered output contains exact eyebrow text "PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER"', () => {
    render(<Hero />)
    expect(
      screen.getByText('PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER')
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// T-0.4 — Exactly two CTA buttons present
// AC-0.7 / AC-UI-1.5 / AC-UI-1.6: "View Featured Work" and "How I Build"
// ---------------------------------------------------------------------------
describe('T-0.4 | AC-0.7 / AC-UI-1.5 / AC-UI-1.6: CTA buttons', () => {
  it('T-0.4a: "View Featured Work" CTA is present', () => {
    render(<Hero />)
    // CTAs are <a> anchors styled as buttons; getByRole('link') is correct.
    expect(
      screen.getByRole('link', { name: /View Featured Work/i })
    ).toBeInTheDocument()
  })

  it('T-0.4b: "How I Build" CTA is present', () => {
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: /How I Build/i })
    ).toBeInTheDocument()
  })

  it('T-0.4c: exactly two CTA links exist in the Hero', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// T-0.5 — Sub-headline verbatim text
// AC-0.7 / AC-0.9: PORTFOLIO_CONTENT.md §3 sub-headline, verbatim
// ---------------------------------------------------------------------------
describe('T-0.5 | AC-0.7 / AC-0.9: Sub-headline copy', () => {
  it('T-0.5: rendered output contains verbatim sub-headline from PORTFOLIO_CONTENT.md §3', () => {
    render(<Hero />)
    expect(
      screen.getByText(
        '14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.'
      )
    ).toBeInTheDocument()
  })
})
