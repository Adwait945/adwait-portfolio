/**
 * Sprint 1 — Unit tests for components/home/ContactCTA.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/ContactCTA.tsx.
 *
 * AC refs: AC-10.1, AC-10.2, AC-10.3, AC-10.4, AC-10.5, NFR-10.A, NFR-10.S
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §12
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ContactCTA from '@/components/home/ContactCTA'

// ---------------------------------------------------------------------------
// AC-10.1: Section heading "Let's talk"
// ---------------------------------------------------------------------------
describe("AC-10.1: ContactCTA heading renders verbatim", () => {
  it("AC-10.1: renders \"Let's talk\" as section h2 heading", () => {
    render(<ContactCTA />)
    const heading = screen.getByRole('heading', { level: 2, name: /Let's talk/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-10.2: Two body lines render verbatim from §12
// ---------------------------------------------------------------------------
describe('AC-10.2: ContactCTA body lines render verbatim from §12', () => {
  it('AC-10.2: body line 1 renders verbatim from §12', () => {
    render(<ContactCTA />)
    expect(
      screen.getByText(
        'Open to PM-Technical, Product TPM, Senior TPM, and Senior/Principal PM roles at companies investing in technical product leadership and AI-native delivery.'
      )
    ).toBeInTheDocument()
  })

  it('AC-10.2: body line 2 renders verbatim from §12', () => {
    render(<ContactCTA />)
    expect(
      screen.getByText('Plano-based; flexible on hybrid and remote.')
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-10.3: Three equal-width buttons render
// ---------------------------------------------------------------------------
describe('AC-10.3: ContactCTA renders three contact buttons', () => {
  it('AC-10.3: renders LinkedIn link', () => {
    render(<ContactCTA />)
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedinLink).toBeInTheDocument()
  })

  it('AC-10.3: renders GitHub link', () => {
    render(<ContactCTA />)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toBeInTheDocument()
  })

  it('AC-10.3: renders Email link', () => {
    render(<ContactCTA />)
    const emailLink = screen.getByRole('link', { name: /Email/i })
    expect(emailLink).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-10.4: LinkedIn/GitHub hrefs from siteConfig; Email is mailto
// ---------------------------------------------------------------------------
describe('AC-10.4: ContactCTA button hrefs are correct', () => {
  it('AC-10.4: LinkedIn href is the LinkedIn profile URL from siteConfig', () => {
    render(<ContactCTA />)
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adwait-mulye-0b708818a/'
    )
  })

  it('AC-10.4: GitHub href is the GitHub profile URL from siteConfig', () => {
    render(<ContactCTA />)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Adwait945')
  })

  it('AC-10.4: Email href is mailto:adwaitmulye@gmail.com', () => {
    render(<ContactCTA />)
    const emailLink = screen.getByRole('link', { name: /Email/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:adwaitmulye@gmail.com')
  })
})

// ---------------------------------------------------------------------------
// AC-10.5: LinkedIn and GitHub open in new tab with noopener noreferrer
// ---------------------------------------------------------------------------
describe('AC-10.5: External links carry target="_blank" rel="noopener noreferrer"', () => {
  it('AC-10.5: LinkedIn link opens in new tab with noopener noreferrer', () => {
    render(<ContactCTA />)
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i })
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('AC-10.5: GitHub link opens in new tab with noopener noreferrer', () => {
    render(<ContactCTA />)
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

// ---------------------------------------------------------------------------
// NFR-10.A: All three contact elements are <a> tags, not <button>
// ---------------------------------------------------------------------------
describe('NFR-10.A: ContactCTA links are <a> elements', () => {
  it('NFR-10.A: all three contact links render as <a> elements', () => {
    render(<ContactCTA />)
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i })
    const githubLink = screen.getByRole('link', { name: /GitHub/i })
    const emailLink = screen.getByRole('link', { name: /Email/i })
    expect(linkedinLink.tagName).toBe('A')
    expect(githubLink.tagName).toBe('A')
    expect(emailLink.tagName).toBe('A')
  })
})
