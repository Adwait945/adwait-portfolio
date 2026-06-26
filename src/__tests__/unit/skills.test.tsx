/**
 * Sprint 1 — Unit tests for components/home/Skills.tsx
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements components/home/Skills.tsx.
 *
 * AC refs: AC-5.1, AC-5.3, AC-5.4, AC-5.5, AC-5.6, AC-5.7, NFR-5.A
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §7
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Skills from '@/components/home/Skills'

// ---------------------------------------------------------------------------
// AC-5.1: Section heading "Skills & Tools"
// ---------------------------------------------------------------------------
describe('AC-5.1: Skills section heading renders verbatim', () => {
  it('AC-5.1: renders h2 with text "Skills & Tools"', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', { level: 2, name: /Skills & Tools/i })
    expect(heading).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-5.3: Card 1 — Product Management skills verbatim
// ---------------------------------------------------------------------------
describe('AC-5.3: Card 1 Product Management skills render', () => {
  it('AC-5.3: renders "Product Management" card heading', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', { level: 3, name: /Product Management/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-5.3: renders "Product vision & roadmap" in dot-separated list', () => {
    render(<Skills />)
    expect(screen.getByText(/Product vision & roadmap/)).toBeInTheDocument()
  })

  it('AC-5.3: renders "Design systems" — present in §7 Group 1 (not in prototype)', () => {
    render(<Skills />)
    expect(screen.getByText(/Design systems/)).toBeInTheDocument()
  })

  it('AC-5.3: renders "GTM coordination"', () => {
    render(<Skills />)
    expect(screen.getByText(/GTM coordination/)).toBeInTheDocument()
  })

  it('AC-5.3: renders "OKRs & success metrics"', () => {
    render(<Skills />)
    expect(screen.getByText(/OKRs & success metrics/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-5.4: Card 2 — Technical Depth skills verbatim
// ---------------------------------------------------------------------------
describe('AC-5.4: Card 2 Technical Depth skills render', () => {
  it('AC-5.4: renders "Technical Depth" card heading', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', { level: 3, name: /Technical Depth/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-5.4: renders "Databricks Lakehouse" — §7 Group 2 item', () => {
    render(<Skills />)
    expect(screen.getByText(/Databricks Lakehouse/)).toBeInTheDocument()
  })

  it('AC-5.4: renders "Java Spring Boot"', () => {
    render(<Skills />)
    expect(screen.getByText(/Java Spring Boot/)).toBeInTheDocument()
  })

  it('AC-5.4: renders "ETL pipelines"', () => {
    render(<Skills />)
    expect(screen.getByText(/ETL pipelines/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-5.5: Card 3 — AI & GenAI Tooling skills verbatim
// ---------------------------------------------------------------------------
describe('AC-5.5: Card 3 AI & GenAI Tooling skills render', () => {
  it('AC-5.5: renders "AI & GenAI Tooling" card heading', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', { level: 3, name: /AI & GenAI Tooling/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-5.5: renders "Mem0 MCP cross-IDE memory"', () => {
    render(<Skills />)
    expect(screen.getByText(/Mem0 MCP cross-IDE memory/)).toBeInTheDocument()
  })

  it('AC-5.5: renders "AI-assisted prototyping" — §7 Group 3 (not in prototype)', () => {
    render(<Skills />)
    expect(screen.getByText(/AI-assisted prototyping/)).toBeInTheDocument()
  })

  it('AC-5.5: renders "RAG architecture"', () => {
    render(<Skills />)
    expect(screen.getByText(/RAG architecture/)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-5.6: Card 4 — Delivery & Tools skills verbatim
// ---------------------------------------------------------------------------
describe('AC-5.6: Card 4 Delivery & Tools skills render', () => {
  it('AC-5.6: renders "Delivery & Tools" card heading', () => {
    render(<Skills />)
    const heading = screen.getByRole('heading', { level: 3, name: /Delivery & Tools/i })
    expect(heading).toBeInTheDocument()
  })

  it('AC-5.6: renders "SAFe at enterprise scale"', () => {
    render(<Skills />)
    expect(screen.getByText(/SAFe at enterprise scale/)).toBeInTheDocument()
  })

  it('AC-5.6: renders "Cross-functional leadership"', () => {
    render(<Skills />)
    expect(screen.getByText(/Cross-functional leadership/)).toBeInTheDocument()
  })

  it('AC-5.6: renders "Effective in both structured-program and autonomous-team models"', () => {
    render(<Skills />)
    expect(
      screen.getByText(/Effective in both structured-program and autonomous-team models/)
    ).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// NFR-5.A: Heading hierarchy — h2 section, h3 cards
// ---------------------------------------------------------------------------
describe('NFR-5.A: Skills heading hierarchy is correct', () => {
  it('NFR-5.A: exactly one h2 (section heading)', () => {
    render(<Skills />)
    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s).toHaveLength(1)
  })

  it('NFR-5.A: exactly four h3 card headings', () => {
    render(<Skills />)
    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s).toHaveLength(4)
  })
})
