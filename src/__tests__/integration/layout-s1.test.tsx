/**
 * Sprint 1 — Integration tests for app/layout.tsx (Sprint 1 extension)
 * Written by TEST agent on 2026-06-25 — ATDD: tests written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV wires Nav, Footer, and main into layout.tsx.
 *
 * AC refs: AC-1.10, AC-1.11, NFR-G.TH, NFR-G.FN
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Mock Next.js navigation for Nav client component
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Note: RootLayout renders <html> + <body>. When rendered in jsdom,
// the html/body elements may already exist. We test the children structure.
describe('AC-1.10: layout.tsx renders Nav and Footer wrapping children', () => {
  it('AC-1.10: Nav component is present in layout output', () => {
    render(
      <RootLayout>
        <div data-testid="test-children">page content</div>
      </RootLayout>
    )
    const nav = document.querySelector('nav')
    expect(nav).not.toBeNull()
  })

  it('AC-1.10: Footer component is present in layout output', () => {
    render(
      <RootLayout>
        <div data-testid="test-children">page content</div>
      </RootLayout>
    )
    const footer = document.querySelector('footer')
    expect(footer).not.toBeNull()
  })

  it('AC-1.10: children render inside layout', () => {
    render(
      <RootLayout>
        <div data-testid="test-children">page content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// AC-1.11: <main> element with id="main-content" wraps children
// ---------------------------------------------------------------------------
describe('AC-1.11: <main id="main-content"> wraps page children', () => {
  it('AC-1.11: a <main> element with id="main-content" is present', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const main = document.getElementById('main-content')
    expect(main).not.toBeNull()
    expect(main!.tagName).toBe('MAIN')
  })
})

// ---------------------------------------------------------------------------
// AC-1.11: Skip-to-content link present
// ---------------------------------------------------------------------------
describe('AC-1.11: skip-to-content link is in the layout', () => {
  it('AC-1.11: a link with href="#main-content" is present (skip link)', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const skipLink = document.querySelector('a[href="#main-content"]')
    expect(skipLink).not.toBeNull()
  })
})

// ---------------------------------------------------------------------------
// NFR-G.TH: <html> element has the "dark" class
// ---------------------------------------------------------------------------
describe('NFR-G.TH: <html> element carries the "dark" class', () => {
  it('NFR-G.TH: html element has "dark" class for dark theme', () => {
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const html = document.documentElement
    expect(html.classList.contains('dark')).toBe(true)
  })
})
