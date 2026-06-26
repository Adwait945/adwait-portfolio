/**
 * Sprint 1 — Unit tests for components/layout/Footer.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/layout/Footer.tsx.
 *
 * AC refs: AC-1.6, AC-1.7, AC-1.8, AC-UI-1.3, NFR-1.A, NFR-1.S
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §17
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/Footer'

// ---------------------------------------------------------------------------
// AC-1.6: Footer renders three-column layout with correct content
// ---------------------------------------------------------------------------
describe('AC-1.6: Footer renders copyright/colophon text', () => {
  it('AC-1.6: renders copyright text verbatim from PORTFOLIO_CONTENT.md §17', () => {
    render(<Footer />)
    expect(
      screen.getByText(
        '© 2026 Adwait Mulye. Built end-to-end with Next.js, Tailwind, and my own MAW agentic workflow.'
      )
    ).toBeInTheDocument()
  })

  it('AC-1.6: renders "Home" in the site map center column', () => {
    render(<Footer />)
    // Site map links distinct from nav — find within footer
    const container = document.querySelector('footer')
    expect(container).not.toBeNull()
    expect(container!.textContent).toContain('Home')
  })

  it('AC-1.6: renders "Teams Retro" in the site map center column', () => {
    render(<Footer />)
    const container = document.querySelector('footer')
    expect(container!.textContent).toContain('Teams Retro')
  })

  it('AC-1.6: renders "Artifacts" in the site map center column', () => {
    render(<Footer />)
    const container = document.querySelector('footer')
    expect(container!.textContent).toContain('Artifacts')
  })

  it('AC-1.6: renders "Git" in the site map center column', () => {
    render(<Footer />)
    const container = document.querySelector('footer')
    expect(container!.textContent).toContain('Git')
  })

  it('AC-1.6: renders "Writing" in the site map center column', () => {
    render(<Footer />)
    const container = document.querySelector('footer')
    expect(container!.textContent).toContain('Writing')
  })
})

// ---------------------------------------------------------------------------
// AC-1.7: Footer social icon links have exact aria-labels
// ---------------------------------------------------------------------------
describe('AC-1.7: Footer social icon links carry exact aria-label values', () => {
  it('AC-1.7: LinkedIn icon link has aria-label="LinkedIn profile"', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn profile' })
    expect(linkedinLink).toBeInTheDocument()
  })

  it('AC-1.7: GitHub icon link has aria-label="GitHub profile"', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: 'GitHub profile' })
    expect(githubLink).toBeInTheDocument()
  })

  it('AC-1.7: Email icon link has aria-label="Email Adwait"', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: 'Email Adwait' })
    expect(emailLink).toBeInTheDocument()
  })

  it('NFR-1.S: LinkedIn and GitHub links carry rel="noopener noreferrer"', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn profile' })
    const githubLink = screen.getByRole('link', { name: 'GitHub profile' })
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('NFR-1.S: LinkedIn and GitHub links open in a new tab', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn profile' })
    const githubLink = screen.getByRole('link', { name: 'GitHub profile' })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('AC-1.7: Email link uses mailto href', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: 'Email Adwait' })
    expect(emailLink).toHaveAttribute('href', 'mailto:adwaitmulye@gmail.com')
  })
})

// ---------------------------------------------------------------------------
// AC-1.8: Footer bottom line renders exact text
// ---------------------------------------------------------------------------
describe('AC-1.8: Footer bottom line renders verbatim text', () => {
  it('AC-1.8: bottom line renders "Plano, TX · Built 2026 · v1.0" verbatim', () => {
    render(<Footer />)
    expect(screen.getByText('Plano, TX · Built 2026 · v1.0')).toBeInTheDocument()
  })
})
