/**
 * Sprint 1 — Unit tests for components/layout/Nav.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/layout/Nav.tsx.
 *
 * AC refs: AC-1.1, AC-1.2, AC-1.4, AC-1.5, AC-UI-1.1, AC-UI-1.2, NFR-1.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §2
 */

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '@/components/layout/Nav'

// Mock Next.js navigation hooks used by Nav
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// ---------------------------------------------------------------------------
// AC-1.1: Nav renders site name "Adwait Mulye"
// ---------------------------------------------------------------------------
describe('AC-1.1: Nav renders site name and links', () => {
  it('AC-1.1: renders "Adwait Mulye" as the brand link', () => {
    render(<Nav />)
    const brandLink = screen.getByRole('link', { name: /Adwait Mulye/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('AC-1.1: renders "Home" nav link', () => {
    render(<Nav />)
    // Nav may hide center links on mobile — we look for the element, not visibility
    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.1: renders "Teams Retro" nav link', () => {
    render(<Nav />)
    const teamsRetroLinks = screen.getAllByText('Teams Retro')
    expect(teamsRetroLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.1: renders "Artifacts" nav link', () => {
    render(<Nav />)
    const artifactsLinks = screen.getAllByText('Artifacts')
    expect(artifactsLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.1: renders "Git" nav link', () => {
    render(<Nav />)
    const gitLinks = screen.getAllByText('Git')
    expect(gitLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.1: renders "Writing" nav link', () => {
    render(<Nav />)
    const writingLinks = screen.getAllByText('Writing')
    expect(writingLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.1: renders a "Resume" button', () => {
    render(<Nav />)
    const resumeButton = screen.getByText('Resume')
    expect(resumeButton).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-1.2: Resume dropdown exposes exactly two resume options
// ---------------------------------------------------------------------------
describe('AC-1.2: Resume dropdown has PM-Technical and TPM options', () => {
  it('AC-1.2: "PM-Technical" resume option exists in DOM (may be hidden)', () => {
    render(<Nav />)
    // Resume dropdown items may be in the DOM even when closed
    const pmLinks = screen.getAllByText(/PM-Technical/i)
    expect(pmLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.2: "TPM" resume option exists in DOM (may be hidden)', () => {
    render(<Nav />)
    const tpmLinks = screen.getAllByText(/^TPM$/i)
    expect(tpmLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('AC-1.2: PM-Technical resume links to correct PDF path', () => {
    render(<Nav />)
    const pmLinks = screen.getAllByRole('link', { name: /PM-Technical/i })
    expect(pmLinks.length).toBeGreaterThan(0)
    expect(pmLinks[0]).toHaveAttribute('href', '/resumes/Adwait_Mulye_PM-Technical.pdf')
  })

  it('AC-1.2: TPM resume links to correct PDF path', () => {
    render(<Nav />)
    const tpmLinks = screen.getAllByRole('link', { name: /^TPM$/i })
    expect(tpmLinks.length).toBeGreaterThan(0)
    expect(tpmLinks[0]).toHaveAttribute('href', '/resumes/Adwait_Mulye_TPM.pdf')
  })

  it('AC-1.2: resume PDF links open in a new tab with noopener noreferrer', () => {
    render(<Nav />)
    const pmLinks = screen.getAllByRole('link', { name: /PM-Technical/i })
    expect(pmLinks[0]).toHaveAttribute('target', '_blank')
    expect(pmLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

// ---------------------------------------------------------------------------
// AC-1.4: Mobile hamburger button present with correct aria-label
// ---------------------------------------------------------------------------
describe('AC-1.4: hamburger button has correct aria-label', () => {
  it('AC-1.4: hamburger button has aria-label "Open navigation menu"', () => {
    render(<Nav />)
    const hamburger = screen.getByRole('button', { name: /Open navigation menu/i })
    expect(hamburger).toBeInTheDocument()
  })

  it('AC-1.4: hamburger button toggles mobile menu open state', () => {
    render(<Nav />)
    const hamburger = screen.getByRole('button', { name: /Open navigation menu/i })
    // Before click: mobile menu is closed (hamburger aria-expanded = false)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(hamburger)
    // After click: aria-expanded toggles
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })
})

// ---------------------------------------------------------------------------
// NFR-1.A: Accessibility — no inline styles
// ---------------------------------------------------------------------------
describe('NFR-1.A / NFR-G.ST: Nav has no inline style attributes', () => {
  it('NFR-G.ST: nav element has no inline style attribute', () => {
    render(<Nav />)
    const nav = document.querySelector('nav')
    expect(nav).not.toBeNull()
    expect(nav!.getAttribute('style')).toBeNull()
  })
})
