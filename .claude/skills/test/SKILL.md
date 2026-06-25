---
name: test
description: Run the TEST agent — writes FAILING tests before DEV writes any code (Acceptance Test-Driven Development). Produces tests across three tiers (unit, integration, contract) plus NFR tests. Writes docs/TEST_SPEC.md mapping every AC and NFR to test cases. Use this skill after /architect has produced design + plan + API contracts.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, Task
---

Use the **test** subagent to write failing tests for the sprint using Acceptance Test-Driven Development.

Confirm `docs/FEATURE_REQUIREMENTS.md`, `docs/ARCHITECTURE_DESIGN.md`, and `docs/IMPLEMENTATION_PLAN.md` all exist before invoking.

The agent will:
1. Install the test runner if not present (defaults to Vitest + React Testing Library + supertest for JS/TS projects)
2. Write `docs/TEST_SPEC.md` mapping every AC, AC-UI, and NFR to one or more tests across three tiers
3. Write actual test files in `src/__tests__/`:
   - Unit tests (functions, components in isolation)
   - Integration tests (component + store + service flows)
   - Contract tests (real HTTP requests to API routes, verified against ARCHITECT's contracts)
   - NFR tests (accessibility checks, observability logger calls, etc.)
4. Run the test suite and verify every test FAILS

If the Mem0 MCP server is connected, the subagent will search it for prior testing conventions before starting.

After the agent completes, paste the test summary line (e.g. "Tests: 23 failed, 0 passed") split by tier, and confirm all ACs/NFRs are covered.

If any test PASSES at this stage, that's a bug — the agent will investigate and fix.
