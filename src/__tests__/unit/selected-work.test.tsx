/**
 * Sprint 1 — Unit tests for components/home/SelectedWork.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/SelectedWork.tsx.
 *
 * AC refs: AC-3.1, AC-3.3, AC-3.4, AC-3.5, AC-3.6, AC-3.7, NFR-3.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §5
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SelectedWork from '@/components/home/SelectedWork'

// ---------------------------------------------------------------------------
// AC-3.1: Section heading and subhead verbatim
// ---------------------------------------------------------------------------
describe('AC-3.1: SelectedWork heading and subhead render verbatim', () => {
  it('AC-3.1: renders "Selected Work" as the section heading', () => {
    render(<SelectedWork />)
    const heading = screen.getByRole('heading', { level: 2, name: /Selected Work/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-3.1: renders subhead "Real shipped artifacts. No fabricated metrics."', () => {
    render(<SelectedWork />)
    expect(
      screen.getByText('Real shipped artifacts. No fabricated metrics.')
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-3.3: Card 1 (Teams Retro) content verbatim
// ---------------------------------------------------------------------------
describe('AC-3.3: Card 1 Teams Retro renders verbatim content', () => {
  it('AC-3.3: renders eyebrow "PRODUCT · AI-NATIVE BUILD"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('PRODUCT · AI-NATIVE BUILD')).toBeInTheDocument()
  })

  it('AC-3.3: renders "Teams Retro" as card h3 title', () => {
    render(<SelectedWork />)
    const heading = screen.getByRole('heading', { level: 3, name: /Teams Retro/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-3.3: renders tech stack "Next.js 14 · TypeScript · MongoDB Atlas · Jest · Playwright · Tailwind"', () => {
    render(<SelectedWork />)
    expect(
      screen.getByText('Next.js 14 · TypeScript · MongoDB Atlas · Jest · Playwright · Tailwind')
    ).toBeInTheDocument()
  })

  it('AC-3.3: CTA "Read the case study →" links to /work/teams-retro', () => {
    render(<SelectedWork />)
    const ctaLink = screen.getByRole('link', { name: /Read the case study/i })
    expect(ctaLink).toBeInTheDocument()
    // Route per ARCHITECTURE_DESIGN DEBT-1.1: /work/teams-retro
    expect(ctaLink).toHaveAttribute('href', '/work/teams-retro')
  })
})

// ---------------------------------------------------------------------------
// AC-3.4: Four metric lines render with exact values
// ---------------------------------------------------------------------------
describe('AC-3.4: Teams Retro card four metric lines render verbatim', () => {
  it('AC-3.4: renders "5,055 lines of production TypeScript across 48 files"', () => {
    render(<SelectedWork />)
    expect(
      screen.getByText('5,055 lines of production TypeScript across 48 files')
    ).toBeInTheDocument()
  })

  it('AC-3.4: renders "87/87 Jest unit tests passing"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('87/87 Jest unit tests passing')).toBeInTheDocument()
  })

  it('AC-3.4: renders "44 Playwright end-to-end test cases"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('44 Playwright end-to-end test cases')).toBeInTheDocument()
  })

  it('AC-3.4: renders "Zero @ts-nocheck escapes"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('Zero @ts-nocheck escapes')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-3.5: Card 2 placeholder content verbatim
// ---------------------------------------------------------------------------
describe('AC-3.5: Card 2 Functional & Technical Artifacts placeholder', () => {
  it('AC-3.5: renders eyebrow "ARTIFACTS · IN PROGRESS"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('ARTIFACTS · IN PROGRESS')).toBeInTheDocument()
  })

  it('AC-3.5: renders "Functional & Technical Artifacts" as h3 title', () => {
    render(<SelectedWork />)
    const heading = screen.getByRole('heading', {
      level: 3,
      name: /Functional & Technical Artifacts/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('AC-3.5: CTA "Coming in Sprint 3 →" is NOT a link or button', () => {
    render(<SelectedWork />)
    const ctaSpans = screen.getAllByText(/Coming in Sprint 3/i)
    ctaSpans.forEach((el) => {
      expect(el.tagName).not.toBe('A')
      expect(el.tagName).not.toBe('BUTTON')
    })
  })
})

// ---------------------------------------------------------------------------
// AC-3.6: Card 3 placeholder content verbatim
// ---------------------------------------------------------------------------
describe('AC-3.6: Card 3 Code & Workflows placeholder', () => {
  it('AC-3.6: renders eyebrow "GIT · IN PROGRESS"', () => {
    render(<SelectedWork />)
    expect(screen.getByText('GIT · IN PROGRESS')).toBeInTheDocument()
  })

  it('AC-3.6: renders "Code & Workflows" as h3 title', () => {
    render(<SelectedWork />)
    const heading = screen.getByRole('heading', { level: 3, name: /Code & Workflows/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-3.7: Fabricated strings are ABSENT
// ---------------------------------------------------------------------------
describe('AC-3.7: Fabricated strings are completely absent from SelectedWork', () => {
  it('AC-3.7: "NeuroMetrics Dashboard" does NOT appear anywhere', () => {
    render(<SelectedWork />)
    expect(screen.queryByText(/NeuroMetrics Dashboard/i)).toBeNull()
  })

  it('AC-3.7: "Agentic Orchestration Engine" does NOT appear anywhere', () => {
    render(<SelectedWork />)
    expect(screen.queryByText(/Agentic Orchestration Engine/i)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// NFR-3.A: Heading hierarchy
// ---------------------------------------------------------------------------
describe('NFR-3.A: SelectedWork heading hierarchy', () => {
  it('NFR-3.A: section heading is h2', () => {
    render(<SelectedWork />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('NFR-3.A: three h3 card title headings are present', () => {
    render(<SelectedWork />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s.length).toBeGreaterThanOrEqual(3)
  })
})
