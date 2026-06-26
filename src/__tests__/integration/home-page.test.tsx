/**
 * Sprint 0 — Integration tests for app/page.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements app/page.tsx rendering only <Hero />.
 *
 * AC refs: AC-0.8, AC-UI-1.10
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// ---------------------------------------------------------------------------
// AC-0.8: app/page.tsx renders Hero as its sole content
// ---------------------------------------------------------------------------
describe('AC-0.8: Home page renders Hero as sole content', () => {
  it('AC-0.8: Home page renders without throwing', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('AC-0.8: Home page contains exactly one h1 (the Hero headline)', () => {
    render(<Home />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
  })

  it('AC-0.8: Hero eyebrow text is present in the page', () => {
    render(<Home />)
    expect(
      screen.getByText('PRODUCT MANAGER, TECHNICAL · TECHNICAL PROGRAM MANAGER')
    ).toBeInTheDocument()
  })

  it('AC-0.8: Hero sub-headline is present in the page', () => {
    render(<Home />)
    expect(
      screen.getByText(
        '14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.'
      )
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-UI-1.10: Nav is NOT present in Sprint 0
// ---------------------------------------------------------------------------
describe('AC-UI-1.10: Nav component is NOT rendered in Sprint 0', () => {
  it('AC-UI-1.10: no <nav> element in the page', () => {
    render(<Home />)
    const nav = document.querySelector('nav')
    expect(nav).toBeNull()
  })

  it('AC-UI-1.10: "Adwait Mulye" site name link is not rendered as navigation', () => {
    render(<Home />)
    // The mock shows a name in the upper-left (Nav), which must NOT appear in Sprint 0.
    // We check that the only links present are the Hero CTAs (pointing to "#").
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '#')
    })
  })
})
