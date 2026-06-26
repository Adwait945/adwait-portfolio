/**
 * E2E-9: Zero console errors on all 5 routes
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * NFR-1.O: Console errors on any route are a test failure.
 */

import { test, expect } from '@playwright/test'

const routes = ['/', '/work/teams-retro', '/artifacts', '/git', '/writing']

for (const route of routes) {
  test(`E2E-9: zero console errors on ${route}`, async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto(route)
    // Wait for any lazy hydration to complete
    await page.waitForLoadState('networkidle')

    expect(consoleErrors).toHaveLength(0)
  })
}
