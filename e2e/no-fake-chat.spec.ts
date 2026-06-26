/**
 * E2E-11: No "AI Intelligence Center" fake chat on any page
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * AC-11.1: AISandbox / fake chat interface is completely absent from all pages.
 */

import { test, expect } from '@playwright/test'

const allRoutes = ['/', '/work/teams-retro', '/artifacts', '/git', '/writing']

for (const route of allRoutes) {
  test(`E2E-11 / AC-11.1: no "AI Intelligence Center" text on ${route}`, async ({ page }) => {
    await page.goto(route)
    const aiText = page.getByText(/AI Intelligence Center/i)
    await expect(aiText).toHaveCount(0)
  })

  test(`E2E-11 / AC-11.1: no "Technical Twin ONLINE" status badge on ${route}`, async ({ page }) => {
    await page.goto(route)
    const badgeText = page.getByText(/Technical Twin ONLINE/i)
    await expect(badgeText).toHaveCount(0)
  })

  test(`E2E-11 / AC-11.1: no fake chat input field on ${route}`, async ({ page }) => {
    await page.goto(route)
    // AISandbox renders an input — its placeholder text identifies it
    const chatInput = page.locator('input[placeholder*="Ask"]')
    await expect(chatInput).toHaveCount(0)
  })
}
