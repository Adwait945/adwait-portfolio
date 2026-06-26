/**
 * Sprint 1 — Unit tests for components/home/Experience.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/Experience.tsx.
 *
 * AC refs: AC-6.1, AC-6.2, AC-6.3, AC-6.4, NFR-6.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §8
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Experience from '@/components/home/Experience'

// ---------------------------------------------------------------------------
// AC-6.1: Section heading and subhead verbatim
// ---------------------------------------------------------------------------
describe('AC-6.1: Experience heading and subhead render verbatim', () => {
  it('AC-6.1: renders "Experience" as h2 section heading', () => {
    render(<Experience />)
    const heading = screen.getByRole('heading', { level: 2, name: /Experience/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-6.1: renders subhead verbatim from PORTFOLIO_CONTENT.md §8', () => {
    render(<Experience />)
    expect(
      screen.getByText(
        '14 years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare.'
      )
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-6.2: Six experience entries render in order
// ---------------------------------------------------------------------------
describe('AC-6.2: all six experience entries render', () => {
  it('AC-6.2: Entry 1 — 7-Eleven company name appears', () => {
    render(<Experience />)
    expect(screen.getByText(/7-Eleven/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 2 — Wells Fargo company name appears', () => {
    render(<Experience />)
    expect(screen.getByText(/Wells Fargo/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 3 — USAA company name appears', () => {
    render(<Experience />)
    expect(screen.getByText(/USAA/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 4 — Freeman Company name appears', () => {
    render(<Experience />)
    expect(screen.getByText(/Freeman Company/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 5 — FedEx company name appears', () => {
    render(<Experience />)
    expect(screen.getByText(/FedEx/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 6 — Earlier block (Aperia Solutions) appears', () => {
    render(<Experience />)
    expect(screen.getByText(/Aperia Solutions/)).toBeInTheDocument()
  })

  it('AC-6.2: Entry 6 — Earlier block includes Techgene Solutions', () => {
    render(<Experience />)
    expect(screen.getByText(/Techgene Solutions/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-6.3: Key role titles and FedNow keyword from §8
// ---------------------------------------------------------------------------
describe('AC-6.3: entry content contains key verbatim phrases', () => {
  it('AC-6.3: Entry 1 role is "Senior Product Owner | Technical Product Lead"', () => {
    render(<Experience />)
    expect(
      screen.getByText(/Senior Product Owner \| Technical Product Lead/)
    ).toBeInTheDocument()
  })

  it('AC-6.3: Entry 2 mentions FedNow (exact from §8)', () => {
    render(<Experience />)
    expect(screen.getByText(/FedNow/)).toBeInTheDocument()
  })

  it('AC-6.3: 7-Eleven entry mentions "10,000-store rollout"', () => {
    render(<Experience />)
    expect(screen.getByText(/10,000-store rollout/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-6.4: "Full work history →" link at bottom
// ---------------------------------------------------------------------------
describe('AC-6.4: Full work history link renders correctly', () => {
  it('AC-6.4: "Full work history →" link is present', () => {
    render(<Experience />)
    const link = screen.getByRole('link', { name: /Full work history/i })
    expect(link).toBeInTheDocument()
  })

  it('AC-6.4: Full work history link points to PM-Technical PDF', () => {
    render(<Experience />)
    const link = screen.getByRole('link', { name: /Full work history/i })
    expect(link).toHaveAttribute('href', '/resumes/Adwait_Mulye_PM-Technical.pdf')
  })

  it('AC-6.4: Full work history link opens in new tab with noopener', () => {
    render(<Experience />)
    const link = screen.getByRole('link', { name: /Full work history/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

// ---------------------------------------------------------------------------
// NFR-6.A: Heading hierarchy
// ---------------------------------------------------------------------------
describe('NFR-6.A: Experience heading hierarchy is correct', () => {
  it('NFR-6.A: section heading uses h2', () => {
    render(<Experience />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('NFR-6.A: entry role/company headings use h3', () => {
    render(<Experience />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s.length).toBeGreaterThanOrEqual(6)
  })
})
