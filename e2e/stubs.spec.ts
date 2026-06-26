/**
 * E2E: Stub pages load without 404
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * AC refs: AC-11.5 (/artifacts), AC-11.6 (/git), AC-11.7 (/writing), AC-11.4
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §16
 */

import { test, expect } from '@playwright/test'

// /artifacts
test('AC-11.5: /artifacts loads without 404', async ({ page }) => {
  const response = await page.goto('/artifacts')
  expect(response?.status()).not.toBe(404)
})

test('AC-11.5: /artifacts renders "Functional & Technical Artifacts" h1', async ({ page }) => {
  await page.goto('/artifacts')
  await expect(
    page.getByRole('heading', { level: 1, name: /Functional & Technical Artifacts/i })
  ).toBeVisible()
})

test('AC-11.5: /artifacts status note says "Coming in Sprint 3."', async ({ page }) => {
  await page.goto('/artifacts')
  await expect(page.getByText('Coming in Sprint 3.')).toBeVisible()
})

test('AC-11.5: /artifacts has "← Back to home" link to /', async ({ page }) => {
  await page.goto('/artifacts')
  const backLink = page.getByRole('link', { name: /Back to home/i })
  await expect(backLink).toBeVisible()
  await expect(backLink).toHaveAttribute('href', '/')
})

// /git
test('AC-11.6: /git loads without 404', async ({ page }) => {
  const response = await page.goto('/git')
  expect(response?.status()).not.toBe(404)
})

test('AC-11.6: /git renders "Code & Workflows" h1', async ({ page }) => {
  await page.goto('/git')
  await expect(
    page.getByRole('heading', { level: 1, name: /Code & Workflows/i })
  ).toBeVisible()
})

test('AC-11.6: /git status note says "Coming in Sprint 3."', async ({ page }) => {
  await page.goto('/git')
  await expect(page.getByText('Coming in Sprint 3.')).toBeVisible()
})

// /writing
test('AC-11.7: /writing loads without 404', async ({ page }) => {
  const response = await page.goto('/writing')
  expect(response?.status()).not.toBe(404)
})

test('AC-11.7: /writing renders "Writing" h1', async ({ page }) => {
  await page.goto('/writing')
  await expect(
    page.getByRole('heading', { level: 1, name: /^Writing$/i })
  ).toBeVisible()
})

test('AC-11.7: /writing status note mentions "Sprint 4"', async ({ page }) => {
  await page.goto('/writing')
  await expect(page.getByText(/Sprint 4/i)).toBeVisible()
})

// E2E-11: No "AI Intelligence Center" on any page
const routes = ['/artifacts', '/git', '/writing', '/work/teams-retro']
for (const route of routes) {
  test(`E2E-11: "AI Intelligence Center" does NOT appear on ${route}`, async ({ page }) => {
    await page.goto(route)
    const aiText = page.getByText(/AI Intelligence Center/i)
    await expect(aiText).toHaveCount(0)
  })
}
