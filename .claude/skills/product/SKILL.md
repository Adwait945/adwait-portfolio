---
name: product
description: Run the PRODUCT agent — translates the latest sprint backlog in docs/SPRINT_*_BACKLOG.md into formal user stories, acceptance criteria, and non-functional requirements written to docs/FEATURE_REQUIREMENTS.md. Use this skill at the start of any sprint after the backlog has been finalized in Claude Projects.
allowed-tools: Read, Glob, Grep, Write, Task
---

Use the **product** subagent to translate the latest sprint backlog into `docs/FEATURE_REQUIREMENTS.md`.

Find the highest-numbered `docs/SPRINT_*_BACKLOG.md`, read any UI mocks in `docs/ui-mocks/` and reference prototypes in `docs/prototypes/`, and produce formal user stories, refined acceptance criteria, AC-UI-* rows for visual requirements, and a Non-Functional Requirements block (performance, accessibility, browser support, i18n, security, observability) per the product agent's instructions.

If the Mem0 MCP server is connected, the subagent will search it for prior project context before starting.

After the agent completes, summarize for the user: which sprint was processed, how many Epics, how many functional ACs, how many AC-UI-* rows, how many NFRs, and confirm the output file exists.
