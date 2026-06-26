/**
 * E2E-10: Teams Retro page tests
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * E2E-10: All 4 metric numbers present on /work/teams-retro
 *
 * AC refs: AC-11.2, AC-11.3, AC-UI-11.1, AC-UI-11.2
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §14
 */

import { test, expect } from '@playwright/test'

// E2E-10: All four metric numbers render correctly
test('E2E-10: /work/teams-retro loads without 404', async ({ page }) => {
  const response = await page.goto('/work/teams-retro')
  expect(response?.status()).not.toBe(404)
})

test('E2E-10: metric "5,055" is visible on /work/teams-retro', async ({ page }) => {
  await page.goto('/work/teams-retro')
  await expect(page.getByText('5,055')).toBeVisible()
})

test('E2E-10: metric "87/87" is visible on /work/teams-retro', async ({ page }) => {
  await page.goto('/work/teams-retro')
  await expect(page.getByText('87/87')).toBeVisible()
})

test('E2E-10: metric "44" is visible on /work/teams-retro', async ({ page }) => {
  await page.goto('/work/teams-retro')
  await expect(page.getByText('44')).toBeVisible()
})

test('E2E-10: metric "~20–30 hrs" is visible on /work/teams-retro', async ({ page }) => {
  await page.goto('/work/teams-retro')
  await expect(page.getByText('~20–30 hrs')).toBeVisible()
})

test('E2E-10: "Teams Retro" heading is visible as h1', async ({ page }) => {
  await page.goto('/work/teams-retro')
  await expect(
    page.getByRole('heading', { level: 1, name: /Teams Retro/i })
  ).toBeVisible()
})

test('AC-11.1: "AI Intelligence Center" does NOT appear on /work/teams-retro', async ({ page }) => {
  await page.goto('/work/teams-retro')
  const aiText = page.getByText(/AI Intelligence Center/i)
  await expect(aiText).toHaveCount(0)
})

test('AC-UI-11.3: "← Back to home" link is present and links to /', async ({ page }) => {
  await page.goto('/work/teams-retro')
  const backLink = page.getByRole('link', { name: /Back to home/i })
  await expect(backLink).toBeVisible()
  await expect(backLink).toHaveAttribute('href', '/')
})
