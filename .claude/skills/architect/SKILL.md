---
name: architect
description: Run the ARCHITECT agent — designs the technical solution for docs/FEATURE_REQUIREMENTS.md. Produces docs/ARCHITECTURE_DESIGN.md (with API contracts, migration strategy, Global UI Infrastructure section), docs/IMPLEMENTATION_PLAN.md (Jira-style task checklist), and one docs/adrs/ADR-NNNN-*.md per non-trivial decision. Use this skill after /product has finalized requirements.
allowed-tools: Read, Glob, Grep, Write, Task
---

Use the **architect** subagent to design the technical solution for `docs/FEATURE_REQUIREMENTS.md`.

Confirm `FEATURE_REQUIREMENTS.md` exists before invoking. The agent will produce:
1. `docs/ARCHITECTURE_DESIGN.md` — component inventory, data flow, **API contracts** for any route, **migration strategy** for DB changes, **Global UI Infrastructure** section, NFR implementation notes
2. `docs/IMPLEMENTATION_PLAN.md` — Jira-style `[ ]` checklist DEV will execute
3. `docs/adrs/ADR-NNNN-[slug].md` — one per non-trivial decision

Pay attention to the **Global UI Infrastructure** section — it names every global setting (theme classes, fonts, CSS variables) that must survive any rewrite. This prevents the "layout.tsx rewrite silently dropped dark mode" class of bug.

If the Mem0 MCP server is connected, the subagent will search it for prior architectural decisions and patterns before starting.

After the agent completes, summarize: component count, total tasks in the plan, API contracts documented, ADRs written, any breaking-change risks called out, and confirm all output files exist.
