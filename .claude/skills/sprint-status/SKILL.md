---
name: sprint-status
description: Show the current state of the sprint pipeline — which agents have run, which docs exist, what the next step is. Reports on the test suite status and any unchecked items in the implementation plan. Read-only.
allowed-tools: Read, Bash, Glob
---

Check the state of the current sprint pipeline. For each expected document, report whether it exists, when it was last modified, and a one-line summary of its current state.

1. Run: `ls -la docs/SPRINT_*_BACKLOG.md docs/FEATURE_REQUIREMENTS.md docs/ARCHITECTURE_DESIGN.md docs/IMPLEMENTATION_PLAN.md docs/TEST_SPEC.md docs/IMPLEMENTATION_NOTES.md docs/CODE_EXPLAINER.md docs/AUDIT_REPORT.md docs/TECH_DEBT.md 2>/dev/null`

2. Run: `ls -la docs/adrs/ 2>/dev/null` to count ADRs.

3. For `IMPLEMENTATION_PLAN.md`, count: `grep -c "^- \[ \]" docs/IMPLEMENTATION_PLAN.md` (unchecked) and `grep -c "^- \[x\]" docs/IMPLEMENTATION_PLAN.md` (completed).

4. For `AUDIT_REPORT.md`, grep for the verdict line.

5. Run the test suite using the project's test command (check CLAUDE.md). Report pass/fail counts split by tier if possible.

6. Based on what exists and what doesn't, recommend the next slash command/skill to run. Order: `/product` → `/architect` → `/test` → `/dev` → `/professor` → `/reviewer`.

Report concisely as a table or short status block. Do not modify any files.
