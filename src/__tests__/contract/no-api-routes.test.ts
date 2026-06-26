/**
 * Sprint 0 — Contract tier: No API routes exist
 * Written by TEST agent on 2026-06-25 — ATDD.
 *
 * ARCHITECTURE_DESIGN.md §4 explicitly states:
 * "None. Sprint 0 has zero API routes and zero server route handlers."
 * "The contract-test tier is not applicable to Sprint 0."
 *
 * This file documents that absence and asserts the structural invariant:
 * no route handlers may exist under app/api/ in Sprint 0.
 *
 * When Sprint 1 or later introduces API routes, this file gains real contract
 * tests using supertest against those handlers. At that point, install
 * supertest: npm install -D supertest @types/supertest
 */

import * as fs from 'fs'
import * as path from 'path'

describe('AC-0.8 / ARCHITECTURE §4: No API routes in Sprint 0', () => {
  const apiDir = path.join(process.cwd(), 'app', 'api')

  it('app/api directory does not exist (no API routes in Sprint 0)', () => {
    const exists = fs.existsSync(apiDir)
    expect(exists).toBe(false)
  })
})
