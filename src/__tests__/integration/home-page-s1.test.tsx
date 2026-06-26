/**
 * Sprint 1 — Integration tests for the full home page (app/page.tsx)
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV assembles all 10 sections in app/page.tsx.
 *
 * AC refs: Locked section order (FEATURE_REQUIREMENTS intro), AC-2.2, AC-3.1, AC-4.1,
 *          AC-5.1, AC-6.1, AC-7.1, AC-8.1, AC-9.1, AC-10.1, AC-11.1
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §3–§12
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock Next.js navigation so Nav (client component) renders
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// ---------------------------------------------------------------------------
// Full home page renders all 10 sections
// ---------------------------------------------------------------------------
describe('Home page renders all 10 sections', () => {
  it('renders without throwing', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('renders the Hero section h1 headline', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Bridging Product Strategy and Technical Execution')
  })

  it('AC-2.2: renders "How I Work" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /How I Work/i })).toBeInTheDocument()
  })

  it('AC-3.1: renders "Selected Work" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /Selected Work/i })).toBeInTheDocument()
  })

  it('AC-4.1: renders "Career Trajectory" section heading (NOT "Career History")', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Career Trajectory' })
    ).toBeInTheDocument()
    expect(screen.queryByText(/Career History/i)).toBeNull()
  })

  it('AC-5.1: renders "Skills & Tools" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /Skills & Tools/i })).toBeInTheDocument()
  })

  it('AC-6.1: renders "Experience" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /Experience/i })).toBeInTheDocument()
  })

  it('AC-7.1: renders "Education" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /Education/i })).toBeInTheDocument()
  })

  it('AC-8.1: renders "The Bridge" section heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /The Bridge/i })).toBeInTheDocument()
  })

  it('AC-9.1: renders "Beyond the Work" section heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Beyond the Work/i })
    ).toBeInTheDocument()
  })

  it("AC-10.1: renders \"Let's talk\" section heading", () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /Let's talk/i })).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Locked section order — sections appear in the correct DOM sequence
// ---------------------------------------------------------------------------
describe('Locked section order: 10 sections render in the mandated sequence', () => {
  it('all 10 section h2 headings render and appear in the correct order', () => {
    render(<Home />)

    // Collect all h2 headings from the document in DOM order
    const h2s = Array.from(document.querySelectorAll('h2')).map(
      (el) => el.textContent ?? ''
    )

    // The locked order (§FEATURE_REQUIREMENTS intro):
    // 1. Hero (h1 — no h2)
    // 2. HowIWork
    // 3. SelectedWork
    // 4. CareerTrajectory
    // 5. Skills
    // 6. Experience
    // 7. Education
    // 8. About (The Bridge)
    // 9. BeyondTheWork
    // 10. ContactCTA

    const sectionHeadings = [
      'How I Work',
      'Selected Work',
      'Career Trajectory',
      'Skills & Tools',
      'Experience',
      'Education',
      'The Bridge',
      'Beyond the Work',
      "Let's talk",
    ]

    sectionHeadings.forEach((heading) => {
      expect(h2s.some((h) => h.includes(heading))).toBe(true)
    })

    // Verify order by checking index positions
    const howIWorkIdx = h2s.findIndex((h) => h.includes('How I Work'))
    const selectedWorkIdx = h2s.findIndex((h) => h.includes('Selected Work'))
    const careerIdx = h2s.findIndex((h) => h.includes('Career Trajectory'))
    const skillsIdx = h2s.findIndex((h) => h.includes('Skills & Tools'))
    const experienceIdx = h2s.findIndex((h) => h.includes('Experience'))
    const educationIdx = h2s.findIndex((h) => h.includes('Education'))
    const bridgeIdx = h2s.findIndex((h) => h.includes('The Bridge'))
    const beyondIdx = h2s.findIndex((h) => h.includes('Beyond the Work'))
    const contactIdx = h2s.findIndex((h) => h.includes("Let's talk"))

    expect(howIWorkIdx).toBeLessThan(selectedWorkIdx)
    expect(selectedWorkIdx).toBeLessThan(careerIdx)
    expect(careerIdx).toBeLessThan(skillsIdx)
    expect(skillsIdx).toBeLessThan(experienceIdx)
    expect(experienceIdx).toBeLessThan(educationIdx)
    expect(educationIdx).toBeLessThan(bridgeIdx)
    expect(bridgeIdx).toBeLessThan(beyondIdx)
    expect(beyondIdx).toBeLessThan(contactIdx)
  })
})

// ---------------------------------------------------------------------------
// AC-11.1: No "AI Intelligence Center" anywhere on the home page
// ---------------------------------------------------------------------------
describe('AC-11.1: AI Intelligence Center is completely absent', () => {
  it('AC-11.1: "AI Intelligence Center" text does NOT appear on the home page', () => {
    render(<Home />)
    expect(screen.queryByText(/AI Intelligence Center/i)).toBeNull()
  })

  it('AC-11.1: no fake chat input exists on the home page', () => {
    render(<Home />)
    // The AISandbox component from Replit renders an input — it must be gone
    const chatInputs = document.querySelectorAll('input[placeholder*="Ask"]')
    expect(chatInputs).toHaveLength(0)
  })

  it('AC-3.7: "NeuroMetrics Dashboard" does NOT appear on the home page', () => {
    render(<Home />)
    expect(screen.queryByText(/NeuroMetrics Dashboard/i)).toBeNull()
  })

  it('AC-3.7: "Agentic Orchestration Engine" does NOT appear on the home page', () => {
    render(<Home />)
    expect(screen.queryByText(/Agentic Orchestration Engine/i)).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Single h1 — Hero is the only h1 on the page
// ---------------------------------------------------------------------------
describe('Accessibility: exactly one h1 on the home page', () => {
  it('exactly one h1 element is present (Hero headline only)', () => {
    render(<Home />)
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
  })
})
