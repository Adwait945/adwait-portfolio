/**
 * E2E-5, E2E-8: Resume download and contact CTA tests
 * Written by TEST agent on 2026-06-25 — ATDD: specs written BEFORE implementation.
 *
 * E2E-5: Resume download links have valid href attributes
 * E2E-8: Three contact buttons have correct hrefs
 *
 * AC refs: AC-1.2, AC-4.5, AC-10.3, AC-10.4, AC-10.5
 * Copy source: docs/PORTFOLIO_CONTENT.md v3 §6, §12
 *
 * Note: Real PDF files must exist in public/resumes/ before this E2E runs.
 * The test asserts link presence and href; actual download is a browser behavior.
 */

import { test, expect } from '@playwright/test'

// E2E-5: Resume links are present and have valid href values
test('E2E-5: "Download PM-Technical Resume" link is present and has correct href', async ({ page }) => {
  await page.goto('/')
  // Resume download buttons appear in CareerTrajectory section
  const pmResumeLink = page.getByRole('link', { name: /Download PM-Technical Resume/i }).first()
  await expect(pmResumeLink).toBeVisible()
  await expect(pmResumeLink).toHaveAttribute('href', '/resumes/Adwait_Mulye_PM-Technical.pdf')
})

test('E2E-5: "Download TPM Resume" link is present and has correct href', async ({ page }) => {
  await page.goto('/')
  const tpmResumeLink = page.getByRole('link', { name: /Download TPM Resume/i }).first()
  await expect(tpmResumeLink).toBeVisible()
  await expect(tpmResumeLink).toHaveAttribute('href', '/resumes/Adwait_Mulye_TPM.pdf')
})

test('E2E-5: PM-Technical resume link opens in a new tab', async ({ page }) => {
  await page.goto('/')
  const pmResumeLink = page.getByRole('link', { name: /Download PM-Technical Resume/i }).first()
  await expect(pmResumeLink).toHaveAttribute('target', '_blank')
  await expect(pmResumeLink).toHaveAttribute('rel', 'noopener noreferrer')
})

// Nav Resume dropdown (AC-1.2)
test('AC-1.2: Nav resume dropdown PM-Technical link has correct href', async ({ page }) => {
  await page.goto('/')
  // The Resume dropdown — links exist in DOM (may be hidden until dropdown opened)
  const navPmLink = page.locator('nav').getByRole('link', { name: /PM-Technical/i }).first()
  await expect(navPmLink).toHaveAttribute('href', '/resumes/Adwait_Mulye_PM-Technical.pdf')
})

// E2E-8: Three contact buttons have correct hrefs
test('E2E-8: LinkedIn contact button has correct href from siteConfig', async ({ page }) => {
  await page.goto('/')
  // Scroll to contact section
  const contactSection = page.locator('section').filter({ hasText: "Let's talk" })
  await contactSection.scrollIntoViewIfNeeded()
  const linkedinLink = contactSection.getByRole('link', { name: /LinkedIn/i })
  await expect(linkedinLink).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/adwait-mulye-0b708818a/'
  )
})

test('E2E-8: GitHub contact button has correct href from siteConfig', async ({ page }) => {
  await page.goto('/')
  const contactSection = page.locator('section').filter({ hasText: "Let's talk" })
  await contactSection.scrollIntoViewIfNeeded()
  const githubLink = contactSection.getByRole('link', { name: /GitHub/i })
  await expect(githubLink).toHaveAttribute('href', 'https://github.com/Adwait945')
})

test('E2E-8: Email contact button has correct mailto href', async ({ page }) => {
  await page.goto('/')
  const contactSection = page.locator('section').filter({ hasText: "Let's talk" })
  await contactSection.scrollIntoViewIfNeeded()
  const emailLink = contactSection.getByRole('link', { name: /Email/i })
  await expect(emailLink).toHaveAttribute('href', 'mailto:adwaitmulye@gmail.com')
})
