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
// AC-UI-1.10: Sprint 1 — Hero CTAs now have real hrefs (DEBT-0.2 resolved).
// Nav lives in layout.tsx and does not render when testing <Home /> in isolation.
// Full nav + link coverage is in layout-s1.test.tsx and home-page-s1.test.tsx.
// ---------------------------------------------------------------------------
describe('AC-UI-1.10: Hero CTAs have real hrefs (Sprint 1)', () => {
  it('AC-UI-1.10: primary CTA links to /work/teams-retro', () => {
    render(<Home />)
    const primaryLink = screen.getByRole('link', { name: /View Featured Work/i })
    expect(primaryLink).toHaveAttribute('href', '/work/teams-retro')
  })

  it('AC-UI-1.10: secondary CTA links to #how-i-work', () => {
    render(<Home />)
    const secondaryLink = screen.getByRole('link', { name: /How I Build/i })
    expect(secondaryLink).toHaveAttribute('href', '#how-i-work')
  })
})
