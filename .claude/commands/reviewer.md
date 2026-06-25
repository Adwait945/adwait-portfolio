---
name: reviewer
description: Run the REVIEWER agent — final 28-point audit covering workflow compliance, build & quality gates, React/frontend quality, and data & architecture integrity. Verdict is APPROVED or REJECTED. Also appends tech debt entries to docs/TECH_DEBT.md. Use this skill as the final gate before shipping a sprint.
allowed-tools: Read, Glob, Grep, Bash, Write, Task
---

Use the **reviewer** subagent to run the 28-point audit against the completed sprint.

The agent reads every upstream doc, identifies all new and modified files in `src/`, runs the full test/type-check/build/lint/audit suite, and grades the sprint on 28 criteria across four categories:
1. Workflow Compliance (AC, NFR, plan, anti-hallucination, naming, architecture, prototype fidelity, ADRs)
2. Build & Quality Gates (build, styling, tests, types, dependency security, bundle size)
3. React / Frontend Quality (hooks, security, a11y, performance, error boundaries, race conditions)
4. Data & Architecture Integrity (storage, empty/error/loading states, component size, input validation, idempotency, observability, timezone safety, async UI consistency)

Verdict is binary: **APPROVED** (zero FAIL items) or **REJECTED** (one or more FAIL items). Output is `docs/AUDIT_REPORT.md`. Additionally, the agent appends tech debt entries to `docs/TECH_DEBT.md` for anything that passed audit but is suboptimal.

If REJECTED, the agent lists exactly what needs to be fixed with file paths and line numbers. The fix path is usually: re-run `/dev` with a focused prompt naming the specific failed audit items, then re-run this skill.

If Mem0 MCP is connected, the subagent searches it for prior audit findings and recurring failure patterns before starting.

After the agent completes, report the verdict prominently, the PASS/FAIL/N/A counts, tech debt entries added, and — if REJECTED — the list of required fixes. If APPROVED, suggest the commit + push commands.
