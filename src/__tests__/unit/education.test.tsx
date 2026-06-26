/**
 * Sprint 1 — Unit tests for components/home/Education.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/Education.tsx.
 *
 * AC refs: AC-7.1, AC-7.3, AC-7.4, AC-7.5, NFR-7.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §9
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Education from '@/components/home/Education'

// ---------------------------------------------------------------------------
// AC-7.1: Section heading "Education"
// ---------------------------------------------------------------------------
describe('AC-7.1: Education section heading renders', () => {
  it('AC-7.1: renders "Education" as section heading', () => {
    render(<Education />)
    const heading = screen.getByRole('heading', { name: /Education/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-7.3: Two entries render verbatim from §9
// ---------------------------------------------------------------------------
describe('AC-7.3: Two education entries render verbatim from §9', () => {
  it('AC-7.3: Entry 1 degree "Master of Science, Management Information Systems"', () => {
    render(<Education />)
    expect(
      screen.getByText(/Master of Science, Management Information Systems/)
    ).toBeInTheDocument()
  })

  it('AC-7.3: Entry 1 institution "University of Houston–Clear Lake"', () => {
    render(<Education />)
    expect(screen.getByText(/University of Houston–Clear Lake/)).toBeInTheDocument()
  })

  it('AC-7.3: Entry 1 year "2010"', () => {
    render(<Education />)
    expect(screen.getByText(/2010/)).toBeInTheDocument()
  })

  it('AC-7.3: Entry 2 degree "Bachelor of Engineering, Electronics"', () => {
    render(<Education />)
    expect(screen.getByText(/Bachelor of Engineering, Electronics/)).toBeInTheDocument()
  })

  it('AC-7.3: Entry 2 institution "University of Mumbai, India"', () => {
    render(<Education />)
    expect(screen.getByText(/University of Mumbai, India/)).toBeInTheDocument()
  })

  it('AC-7.3: Entry 2 year "2007"', () => {
    render(<Education />)
    expect(screen.getByText(/2007/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-7.4: No glass-card treatment
// ---------------------------------------------------------------------------
describe('AC-7.4: Education uses no glass-card styling', () => {
  it('AC-7.4: no element has the "glass-card" class', () => {
    render(<Education />)
    const glassCards = document.querySelectorAll('.glass-card')
    expect(glassCards).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// AC-7.5: No icons or university logos
// ---------------------------------------------------------------------------
describe('AC-7.5: No icons in Education section', () => {
  it('AC-7.5: no <img> elements rendered (no university logos)', () => {
    render(<Education />)
    const images = document.querySelectorAll('img')
    expect(images).toHaveLength(0)
  })
})
