/**
 * Sprint 1 — Unit tests for components/home/BeyondTheWork.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/BeyondTheWork.tsx.
 *
 * AC refs: AC-9.1, AC-9.2, AC-9.3, AC-9.4, NFR-9.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §11
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BeyondTheWork from '@/components/home/BeyondTheWork'

// ---------------------------------------------------------------------------
// AC-9.1: Section heading "Beyond the Work"
// ---------------------------------------------------------------------------
describe('AC-9.1: BeyondTheWork section heading renders verbatim', () => {
  it('AC-9.1: renders "Beyond the Work" as section h2 heading', () => {
    render(<BeyondTheWork />)
    const heading = screen.getByRole('heading', { level: 2, name: /Beyond the Work/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-9.2: One paragraph verbatim from §11
// ---------------------------------------------------------------------------
describe('AC-9.2: BeyondTheWork paragraph renders verbatim from §11', () => {
  it('AC-9.2: renders the guitar paragraph verbatim', () => {
    render(<BeyondTheWork />)
    expect(
      screen.getByText(
        "Outside of work, I've played guitar for 25 years — long enough to know that the gap between knowing something and being able to do it under pressure is where most of the real learning happens, and it takes a lot of patience to properly build a skill over time while also excelling at a day job."
      )
    ).toBeInTheDocument()
  })

  it('AC-9.2: paragraph mentions "25 years"', () => {
    render(<BeyondTheWork />)
    expect(screen.getByText(/25 years/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-9.3: No glass-card, no icon, no tag chips
// ---------------------------------------------------------------------------
describe('AC-9.3: BeyondTheWork uses plain text treatment', () => {
  it('AC-9.3: no element has the "glass-card" class', () => {
    render(<BeyondTheWork />)
    const glassCards = document.querySelectorAll('.glass-card')
    expect(glassCards).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// AC-9.4: Section contains exactly heading + one paragraph (no extra elements)
// ---------------------------------------------------------------------------
describe('AC-9.4: BeyondTheWork has exactly heading and one paragraph', () => {
  it('AC-9.4: exactly one heading element', () => {
    render(<BeyondTheWork />)
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(1)
  })

  it('AC-9.4: no links in BeyondTheWork section', () => {
    render(<BeyondTheWork />)
    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  it('AC-9.4: no buttons in BeyondTheWork section', () => {
    render(<BeyondTheWork />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// NFR-9.A: Heading hierarchy
// ---------------------------------------------------------------------------
describe('NFR-9.A: BeyondTheWork heading hierarchy is correct', () => {
  it('NFR-9.A: section heading is h2', () => {
    render(<BeyondTheWork />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
