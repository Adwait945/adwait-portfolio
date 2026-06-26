/**
 * Sprint 0 — Accessibility (NFR-1.A) tests for Hero component
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/Hero.tsx.
 *
 * NFR-1.A: WCAG 2.1 AA. Single <h1>, keyboard-activatable CTAs, visible focus
 * indicators, <html lang="en">, aria-hidden on decorative icons.
 *
 * Uses jest-axe for automated accessibility auditing.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Hero from '@/components/home/Hero'

expect.extend(toHaveNoViolations)

// ---------------------------------------------------------------------------
// NFR-1.A: Automated axe scan — zero violations
// ---------------------------------------------------------------------------
describe('NFR-1.A: jest-axe automated scan on Hero', () => {
  it('NFR-1.A: Hero has zero accessibility violations (axe WCAG 2.1 AA)', async () => {
    const { container } = render(<Hero />)
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    })
    expect(results).toHaveNoViolations()
  })
})

// ---------------------------------------------------------------------------
// NFR-1.A: Single top-level heading
// ---------------------------------------------------------------------------
describe('NFR-1.A: Single <h1> per page', () => {
  it('NFR-1.A: exactly one h1 element is present in Hero output', () => {
    render(<Hero />)
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
  })

  it('NFR-1.A: no h2–h6 elements are rendered inside Hero (Hero has only one heading level)', () => {
    render(<Hero />)
    // In Sprint 0, Hero has exactly one heading — the h1.
    // No sub-headings should be present inside the component.
    for (let level = 2; level <= 6; level++) {
      const subHeadings = screen.queryAllByRole('heading', { level: level as 2 | 3 | 4 | 5 | 6 })
      expect(subHeadings).toHaveLength(0)
    }
  })
})

// ---------------------------------------------------------------------------
// NFR-1.A: CTA anchors are keyboard-activatable
// Anchor elements are natively keyboard-activatable via Enter.
// We verify they render as <a> elements (not <div>/<span> with onClick).
// ---------------------------------------------------------------------------
describe('NFR-1.A: CTA elements are native anchors (keyboard-activatable)', () => {
  it('NFR-1.A: primary CTA is a native <a> element', () => {
    render(<Hero />)
    const primaryCta = screen.getByRole('link', { name: /View Featured Work/i })
    expect(primaryCta.tagName.toLowerCase()).toBe('a')
  })

  it('NFR-1.A: secondary CTA is a native <a> element', () => {
    render(<Hero />)
    const secondaryCta = screen.getByRole('link', { name: /How I Build/i })
    expect(secondaryCta.tagName.toLowerCase()).toBe('a')
  })
})

// ---------------------------------------------------------------------------
// NFR-1.A: ArrowRight icon is aria-hidden (decorative)
// ---------------------------------------------------------------------------
describe('NFR-1.A: Decorative icon is aria-hidden', () => {
  it('NFR-1.A: SVG icon inside primary CTA has aria-hidden="true"', () => {
    render(<Hero />)
    const primaryCta = screen.getByRole('link', { name: /View Featured Work/i })
    // lucide-react renders SVG; it must carry aria-hidden="true" per NFR-1.A and AC-0.7
    const svgs = primaryCta.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
    svgs.forEach((svg) => {
      expect(svg.getAttribute('aria-hidden')).toBe('true')
    })
  })
})

// ---------------------------------------------------------------------------
// NFR-1.A: No role="button" on non-button elements
// (CTAs must use <a>, not <div role="button"> — the latter breaks keyboard nav)
// ---------------------------------------------------------------------------
describe('NFR-1.A: No faux-button roles in Hero', () => {
  it('NFR-1.A: no elements with role="button" exist in Hero (CTAs are links, not buttons)', () => {
    render(<Hero />)
    const buttonRoles = document.querySelectorAll('[role="button"]')
    expect(buttonRoles).toHaveLength(0)
  })
})
