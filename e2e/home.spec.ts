/**
 * E2E-1, E2E-2, E2E-3: Home page smoke tests
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * These tests MUST FAIL until DEV implements all 10 sections and app/page.tsx.
 *
 * E2E-1: / hero headline visible (AC carryover from Sprint 0)
 * E2E-2: Hero primary CTA navigates to /work/teams-retro
 * E2E-3: "How I Build" CTA scrolls #how-i-work into viewport
 *
 * AC refs: AC-2.1, AC-3.3, AC-11.1, DEBT-0.2 fix
 */

import { test, expect } from '@playwright/test'

// E2E-1: Home page loads and hero headline is visible
test('E2E-1: / loads and hero headline "Bridging Product Strategy and Technical Execution" is visible', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 1, name: /Bridging Product Strategy and Technical Execution/i })
  ).toBeVisible()
})

// E2E-2: Hero primary CTA navigates to /work/teams-retro
test('E2E-2: Hero primary CTA "View Featured Work" navigates to /work/teams-retro', async ({ page }) => {
  await page.goto('/')
  const cta = page.getByRole('link', { name: /View Featured Work/i })
  await expect(cta).toBeVisible()
  await cta.click()
  await expect(page).toHaveURL('/work/teams-retro')
})

// E2E-3: "How I Build" secondary CTA scrolls to #how-i-work section
test('E2E-3: "How I Build" CTA smooth-scrolls #how-i-work into viewport', async ({ page }) => {
  await page.goto('/')
  const cta = page.getByRole('link', { name: /How I Build/i })
  await expect(cta).toBeVisible()
  await cta.click()
  // Wait for the section to appear in viewport
  const howIWorkSection = page.locator('#how-i-work')
  await expect(howIWorkSection).toBeVisible()
})

// AC-11.1: No "AI Intelligence Center" text on the home page
test('AC-11.1: "AI Intelligence Center" text does NOT appear on the home page', async ({ page }) => {
  await page.goto('/')
  const aiText = page.getByText(/AI Intelligence Center/i)
  await expect(aiText).toHaveCount(0)
})

// AC-3.7: No fabricated project names on the home page
test('AC-3.7: "NeuroMetrics Dashboard" does NOT appear on the home page', async ({ page }) => {
  await page.goto('/')
  const fakeText = page.getByText(/NeuroMetrics Dashboard/i)
  await expect(fakeText).toHaveCount(0)
})

test('AC-3.7: "Agentic Orchestration Engine" does NOT appear on the home page', async ({ page }) => {
  await page.goto('/')
  const fakeText = page.getByText(/Agentic Orchestration Engine/i)
  await expect(fakeText).toHaveCount(0)
})

// AC-2.2: "How I Work" section heading is visible on the page
test('AC-2.2: "How I Work" section heading is visible on the home page', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 2, name: /How I Work/i })
  ).toBeVisible()
})

// AC-10.1: "Let's talk" section heading is visible on the page
test("AC-10.1: \"Let's talk\" section heading is visible on the home page", async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 2, name: /Let's talk/i })
  ).toBeVisible()
})
