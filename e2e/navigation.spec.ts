/**
 * E2E-4, E2E-12: Navigation tests
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * E2E-4: All 5 nav links navigate to correct routes, no 404
 * E2E-12: "Adwait Mulye" brand name appears in nav on every page
 *
 * AC refs: AC-1.1, AC-1.5, AC-UI-1.2, AC-11.5, AC-11.6, AC-11.7
 */

import { test, expect } from '@playwright/test'

// E2E-4: All five nav links navigate without 404
test('E2E-4: "Home" nav link navigates to / without 404', async ({ page }) => {
  await page.goto('/artifacts')
  // Find a nav link pointing to home
  const homeLink = page.locator('nav').getByRole('link', { name: /^Home$/i }).first()
  await homeLink.click()
  await expect(page).toHaveURL('/')
  await expect(page).not.toHaveTitle(/404/)
})

test('E2E-4: "Teams Retro" nav link navigates to /work/teams-retro without 404', async ({ page }) => {
  await page.goto('/')
  const teamsRetroLink = page.locator('nav').getByRole('link', { name: /Teams Retro/i }).first()
  await teamsRetroLink.click()
  await expect(page).toHaveURL('/work/teams-retro')
  await expect(page).not.toHaveTitle(/404/)
})

test('E2E-4: "Artifacts" nav link navigates to /artifacts without 404', async ({ page }) => {
  await page.goto('/')
  const artifactsLink = page.locator('nav').getByRole('link', { name: /^Artifacts$/i }).first()
  await artifactsLink.click()
  await expect(page).toHaveURL('/artifacts')
  await expect(page).not.toHaveTitle(/404/)
})

test('E2E-4: "Git" nav link navigates to /git without 404', async ({ page }) => {
  await page.goto('/')
  const gitLink = page.locator('nav').getByRole('link', { name: /^Git$/i }).first()
  await gitLink.click()
  await expect(page).toHaveURL('/git')
  await expect(page).not.toHaveTitle(/404/)
})

test('E2E-4: "Writing" nav link navigates to /writing without 404', async ({ page }) => {
  await page.goto('/')
  const writingLink = page.locator('nav').getByRole('link', { name: /^Writing$/i }).first()
  await writingLink.click()
  await expect(page).toHaveURL('/writing')
  await expect(page).not.toHaveTitle(/404/)
})

// E2E-12: "Adwait Mulye" brand link appears in nav on every page
const allRoutes = ['/', '/work/teams-retro', '/artifacts', '/git', '/writing']

for (const route of allRoutes) {
  test(`E2E-12: "Adwait Mulye" appears in nav on ${route}`, async ({ page }) => {
    await page.goto(route)
    const brandLink = page.locator('nav').getByRole('link', { name: /Adwait Mulye/i })
    await expect(brandLink).toBeVisible()
  })
}
