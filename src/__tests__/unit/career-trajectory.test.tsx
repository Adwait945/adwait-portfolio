/**
 * Sprint 1 — Unit tests for components/home/CareerTrajectory.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/CareerTrajectory.tsx.
 *
 * AC refs: AC-4.1, AC-4.2, AC-4.3, AC-4.4, AC-4.5, AC-4.6, NFR-4.A, NFR-4.S
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §6
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CareerTrajectory from '@/components/home/CareerTrajectory'

// ---------------------------------------------------------------------------
// AC-4.1: Section heading is EXACTLY "Career Trajectory" — not "Career History"
// ---------------------------------------------------------------------------
describe('AC-4.1: CareerTrajectory heading is exactly "Career Trajectory"', () => {
  it('AC-4.1: renders h2 with exact text "Career Trajectory"', () => {
    render(<CareerTrajectory />)
    const heading = screen.getByRole('heading', { level: 2, name: 'Career Trajectory' })
    expect(heading).toBeInTheDocument()
  })

  it('AC-4.1: heading is NOT "Career History"', () => {
    render(<CareerTrajectory />)
    expect(screen.queryByText(/Career History/i)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// AC-4.2: Intro line verbatim
// ---------------------------------------------------------------------------
describe('AC-4.2: intro line renders verbatim', () => {
  it("AC-4.2: renders intro line verbatim from §6", () => {
    render(<CareerTrajectory />)
    expect(
      screen.getByText("Three resumes, because I've held three lenses on the same craft.")
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-4.3: Three sub-blocks render verbatim labels
// ---------------------------------------------------------------------------
describe('AC-4.3: three sub-block labels render verbatim', () => {
  it('AC-4.3: renders "SAFe Product Owner." label', () => {
    render(<CareerTrajectory />)
    expect(screen.getByText(/SAFe Product Owner\./)).toBeInTheDocument()
  })

  it('AC-4.3: renders "Technical Program Manager." label', () => {
    render(<CareerTrajectory />)
    expect(screen.getByText(/Technical Program Manager\./)).toBeInTheDocument()
  })

  it('AC-4.3: renders "Product Manager, Technical." label', () => {
    render(<CareerTrajectory />)
    expect(screen.getByText(/Product Manager, Technical\./)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-4.4: Emphasis line with "AI-Native PM" bold within italic
// ---------------------------------------------------------------------------
describe('AC-4.4: emphasis line renders with AI-Native PM bold', () => {
  it('AC-4.4: emphasis line contains "AI-Native PM" text', () => {
    render(<CareerTrajectory />)
    expect(screen.getByText(/AI-Native PM/)).toBeInTheDocument()
  })

  it('AC-4.4: emphasis line contains the full italic copy', () => {
    render(<CareerTrajectory />)
    expect(
      screen.getByText(/using agentic workflows as the operating layer, not as a feature/)
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-4.5: Two resume download buttons
// ---------------------------------------------------------------------------
describe('AC-4.5: two resume download buttons render correctly', () => {
  it('AC-4.5: "Download PM-Technical Resume" link is present', () => {
    render(<CareerTrajectory />)
    const link = screen.getByRole('link', { name: /Download PM-Technical Resume/i })
    expect(link).toBeInTheDocument()
  })

  it('AC-4.5: PM-Technical resume links to correct PDF path', () => {
    render(<CareerTrajectory />)
    const link = screen.getByRole('link', { name: /Download PM-Technical Resume/i })
    expect(link).toHaveAttribute('href', '/resumes/Adwait_Mulye_PM-Technical.pdf')
  })

  it('AC-4.5: "Download TPM Resume" link is present', () => {
    render(<CareerTrajectory />)
    const link = screen.getByRole('link', { name: /Download TPM Resume/i })
    expect(link).toBeInTheDocument()
  })

  it('AC-4.5: TPM resume links to correct PDF path', () => {
    render(<CareerTrajectory />)
    const link = screen.getByRole('link', { name: /Download TPM Resume/i })
    expect(link).toHaveAttribute('href', '/resumes/Adwait_Mulye_TPM.pdf')
  })

  it('AC-4.5: resume links open in a new tab with rel="noopener noreferrer"', () => {
    render(<CareerTrajectory />)
    const pmLink = screen.getByRole('link', { name: /Download PM-Technical Resume/i })
    const tpmLink = screen.getByRole('link', { name: /Download TPM Resume/i })
    expect(pmLink).toHaveAttribute('target', '_blank')
    expect(pmLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(tpmLink).toHaveAttribute('target', '_blank')
    expect(tpmLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('NFR-4.A: resume links are <a> elements (not <button>)', () => {
    render(<CareerTrajectory />)
    const pmLink = screen.getByRole('link', { name: /Download PM-Technical Resume/i })
    expect(pmLink.tagName).toBe('A')
  })
})

// ---------------------------------------------------------------------------
// AC-4.6: SAFe note renders below buttons with "Email me" mailto link
// ---------------------------------------------------------------------------
describe('AC-4.6: SAFe note renders with correct mailto link', () => {
  it('AC-4.6: SAFe note text is present', () => {
    render(<CareerTrajectory />)
    expect(
      screen.getByText(/Looking for a SAFe Product Owner conversation/i)
    ).toBeInTheDocument()
  })

  it('AC-4.6: "Email me" link points to correct mailto', () => {
    render(<CareerTrajectory />)
    const emailLink = screen.getByRole('link', { name: /Email me/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:adwaitmulye@gmail.com')
  })
})
