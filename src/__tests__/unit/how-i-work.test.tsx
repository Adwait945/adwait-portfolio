/**
 * Sprint 1 — Unit tests for components/home/HowIWork.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/HowIWork.tsx.
 *
 * AC refs: AC-2.1, AC-2.2, AC-2.4, AC-2.5, AC-2.6, AC-2.7, NFR-2.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §4
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HowIWork from '@/components/home/HowIWork'

// ---------------------------------------------------------------------------
// AC-2.1: Section carries id="how-i-work"
// ---------------------------------------------------------------------------
describe('AC-2.1: HowIWork section has anchor id', () => {
  it('AC-2.1: section element carries id="how-i-work"', () => {
    render(<HowIWork />)
    const section = document.getElementById('how-i-work')
    expect(section).not.toBeNull()
  })
})

// ---------------------------------------------------------------------------
// AC-2.2: Section heading and subhead verbatim from PORTFOLIO_CONTENT.md §4
// ---------------------------------------------------------------------------
describe('AC-2.2: HowIWork heading and subhead render verbatim', () => {
  it('AC-2.2: renders "How I Work" as the section h2 heading', () => {
    render(<HowIWork />)
    const heading = screen.getByRole('heading', { level: 2, name: /How I Work/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-2.2: renders subhead verbatim from PORTFOLIO_CONTENT.md §4', () => {
    render(<HowIWork />)
    expect(
      screen.getByText(
        "Three things a Big Tech PMT has to do well. Here's what I bring to each."
      )
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-2.4: Card 1 — Product Thinking content verbatim
// ---------------------------------------------------------------------------
describe('AC-2.4: Card 1 Product Thinking renders verbatim content', () => {
  it('AC-2.4: renders card 1 title "Product Thinking"', () => {
    render(<HowIWork />)
    const heading = screen.getByRole('heading', { level: 3, name: /Product Thinking/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "Agile / Scrum"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Agile / Scrum')).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "GTM Strategy"', () => {
    render(<HowIWork />)
    expect(screen.getByText('GTM Strategy')).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "User Research"', () => {
    render(<HowIWork />)
    expect(screen.getByText('User Research')).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "Metrics & KPIs"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Metrics & KPIs')).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "PRD Authoring"', () => {
    render(<HowIWork />)
    expect(screen.getByText('PRD Authoring')).toBeInTheDocument()
  })

  it('AC-2.4: renders tag "WSJF / RICE"', () => {
    render(<HowIWork />)
    expect(screen.getByText('WSJF / RICE')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-2.5: Card 2 — Engineering Depth content verbatim
// ---------------------------------------------------------------------------
describe('AC-2.5: Card 2 Engineering Depth renders verbatim content', () => {
  it('AC-2.5: renders card 2 title "Engineering Depth"', () => {
    render(<HowIWork />)
    const heading = screen.getByRole('heading', { level: 3, name: /Engineering Depth/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-2.5: renders "System Architecture" tag', () => {
    render(<HowIWork />)
    expect(screen.getByText(/System Architecture/i)).toBeInTheDocument()
  })

  it('AC-2.5: renders "TypeScript" tag', () => {
    render(<HowIWork />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('AC-2.5: renders "REST / SOAP APIs" tag', () => {
    render(<HowIWork />)
    expect(screen.getByText('REST / SOAP APIs')).toBeInTheDocument()
  })

  it('AC-2.5: renders "React / Next.js" tag', () => {
    render(<HowIWork />)
    expect(screen.getByText('React / Next.js')).toBeInTheDocument()
  })

  it('AC-2.5: renders "Distributed Systems" tag', () => {
    render(<HowIWork />)
    expect(screen.getByText('Distributed Systems')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-2.6: Card 3 — AI & Systems content verbatim
// ---------------------------------------------------------------------------
describe('AC-2.6: Card 3 AI & Systems renders verbatim content', () => {
  it('AC-2.6: renders card 3 title "AI & Systems"', () => {
    render(<HowIWork />)
    const heading = screen.getByRole('heading', { level: 3, name: /AI & Systems/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-2.6: renders tag "Multi-Agent Workflows (MAW)"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Multi-Agent Workflows (MAW)')).toBeInTheDocument()
  })

  it('AC-2.6: renders tag "Claude Code · Windsurf · Antigravity"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Claude Code · Windsurf · Antigravity')).toBeInTheDocument()
  })

  it('AC-2.6: renders tag "Mem0 MCP Memory"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Mem0 MCP Memory')).toBeInTheDocument()
  })

  it('AC-2.6: renders tag "Playwright MCP"', () => {
    render(<HowIWork />)
    expect(screen.getByText('Playwright MCP')).toBeInTheDocument()
  })

  it('AC-2.6: renders tag "RAG Architecture"', () => {
    render(<HowIWork />)
    expect(screen.getByText('RAG Architecture')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// NFR-2.A: Heading hierarchy — h2 for section, h3 for cards
// ---------------------------------------------------------------------------
describe('NFR-2.A: HowIWork heading hierarchy is correct', () => {
  it('NFR-2.A: section heading is h2', () => {
    render(<HowIWork />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('NFR-2.A: three h3 card title headings are present', () => {
    render(<HowIWork />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s.length).toBeGreaterThanOrEqual(3)
  })
})
