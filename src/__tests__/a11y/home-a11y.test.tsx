/**
 * Sprint 1 — Accessibility tests for the full home page
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements all 10 home sections.
 *
 * AC refs: NFR-1.A, NFR-2.A, NFR-3.A, NFR-4.A, NFR-5.A, NFR-6.A,
 *          NFR-7.A, NFR-8.A, NFR-9.A, NFR-10.A, NFR-11.A
 */

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '@/app/page'

expect.extend(toHaveNoViolations)

// Mock Next.js navigation for Nav client component
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// ---------------------------------------------------------------------------
// NFR-*.A: Zero axe accessibility violations on the full home page
// ---------------------------------------------------------------------------
describe('NFR-*.A: Home page has zero axe WCAG 2.1 AA violations', () => {
  it('NFR-*.A: jest-axe reports zero violations on the full home page', async () => {
    const { container } = render(<Home />)
    const results = await axe(container, {
      rules: {
        // color-contrast requires computed styles not available in jsdom
        'color-contrast': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
