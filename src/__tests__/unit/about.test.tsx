/**
 * Sprint 1 — Unit tests for components/home/About.tsx (The Bridge)
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/About.tsx.
 *
 * AC refs: AC-8.1, AC-8.2, AC-8.3, AC-8.4, NFR-8.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §10
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import About from '@/components/home/About'

// ---------------------------------------------------------------------------
// AC-8.1: Section heading is "The Bridge"
// ---------------------------------------------------------------------------
describe('AC-8.1: About (The Bridge) section heading renders verbatim', () => {
  it('AC-8.1: renders "The Bridge" as section h2 heading', () => {
    render(<About />)
    const heading = screen.getByRole('heading', { level: 2, name: /The Bridge/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-8.2: Three paragraphs including "AI-native PM" bold in para 2
// ---------------------------------------------------------------------------
describe('AC-8.2: About paragraphs render verbatim with bold AI-native PM', () => {
  it('AC-8.2: Paragraph 1 contains key phrase from §10', () => {
    render(<About />)
    expect(
      screen.getByText(/the gap between what business leaders want and what engineering ships/)
    ).toBeInTheDocument()
  })

  it('AC-8.2: Paragraph 2 contains "AI-native PM" text', () => {
    render(<About />)
    expect(screen.getByText(/AI-native PM/)).toBeInTheDocument()
  })

  it('AC-8.2: Paragraph 2 mentions six-persona agentic workflow', () => {
    render(<About />)
    expect(screen.getByText(/six-persona agentic workflow/)).toBeInTheDocument()
  })

  it('AC-8.2: Paragraph 2 mentions "PRODUCT · ARCHITECT · TEST · DEV · PROFESSOR · REVIEWER"', () => {
    render(<About />)
    expect(
      screen.getByText(/PRODUCT · ARCHITECT · TEST · DEV · PROFESSOR · REVIEWER/)
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-8.3: Paragraph 3 renders with exact wording — no variation
// ---------------------------------------------------------------------------
describe('AC-8.3: Paragraph 3 renders with exact wording from §10', () => {
  it('AC-8.3: renders paragraph 3 with exact text from PORTFOLIO_CONTENT.md §10', () => {
    render(<About />)
    expect(
      screen.getByText(
        'The Product Owner foundation has been built. The technical depth is where I\'ve been heading the entire time. This site is a working artifact of both.'
      )
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-8.4: No glass-card, no background panel
// ---------------------------------------------------------------------------
describe('AC-8.4: About uses no glass-card or background panel', () => {
  it('AC-8.4: no element has the "glass-card" class', () => {
    render(<About />)
    const glassCards = document.querySelectorAll('.glass-card')
    expect(glassCards).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// NFR-8.A: Heading hierarchy — section uses h2
// ---------------------------------------------------------------------------
describe('NFR-8.A: About heading hierarchy is correct', () => {
  it('NFR-8.A: section heading is h2', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
