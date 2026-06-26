/**
 * Playwright E2E configuration
 * Created by TEST agent on 2026-06-25 — Sprint 1
 *
 * ADR-0006: Playwright chosen for E2E (real browser, real HTTP, real routes).
 * Jest + RTL handles unit/integration; Playwright handles the 12 E2E tests.
 *
 * testDir is set to the top-level e2e/ directory per the task spec.
 */

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-360',
      use: {
        ...devices['Galaxy S9+'],
        viewport: { width: 360, height: 800 },
      },
    },
  ],

  // Build + start the Next.js app before E2E tests
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
