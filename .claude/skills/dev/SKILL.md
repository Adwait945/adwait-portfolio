---
name: dev
description: Run the DEV agent — implements production code in src/ until all failing tests pass. Executes docs/IMPLEMENTATION_PLAN.md task by task with conventional-commits discipline (one commit per task). Use this skill after /test has produced failing tests. Optional argument names specific TASK-IDs to focus on.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

Use the **dev** subagent to execute the implementation plan and make all failing tests pass.

Confirm upstream docs exist: `FEATURE_REQUIREMENTS.md`, `ARCHITECTURE_DESIGN.md`, `IMPLEMENTATION_PLAN.md`, `TEST_SPEC.md`. Confirm tests in `src/__tests__/` are currently failing.

If the user passed arguments (e.g. "TASK-1 through TASK-4" or "focus on the API route tasks"), pass them through to the subagent.

If no argument was passed, the agent works through `IMPLEMENTATION_PLAN.md` from top to bottom within its target session size:
- ~400–600 new lines on Sonnet 4.5 / Haiku (200K context)
- ~800–1200 new lines on Opus 4.6+/4.7/4.8 or Sonnet 4.6+ (1M context)

If a sprint is larger than one session can handle, the agent stops at a clean breakpoint, writes IMPLEMENTATION_NOTES.md noting where it left off, and tells the user to invoke this skill again with the remaining TASK-IDs.

Key constraints the agent enforces:
- Never modifies test files — fixes code to match tests
- Never alters visual layout from prototypes without documenting why
- Never adds inline styles when Tailwind utilities exist
- Never leaves TODOs, FIXMEs, or placeholder data
- Never edits .env directly — only .env.example with documentation
- Every edit cites file path and line numbers
- One commit per task (conventional commits format)
- Final checks must pass: tests, type check, build, lint, dependency audit

If Mem0 MCP is connected, the subagent searches it for prior implementation patterns before starting.

After the agent completes, report: tasks completed (with TASK-IDs), test results, type check, build, lint, audit results, files created/modified, commits made (short SHAs + messages), and whether more `/dev` sessions are needed.
