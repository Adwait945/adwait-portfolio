---
name: professor
description: Run the PROFESSOR agent — writes plain-English explanations of every file DEV just created or modified, accessible to a beginner. Each file explanation ends with a "What could go wrong" subsection naming the most likely failure modes. Appends to docs/CODE_EXPLAINER.md. Use this skill after each DEV session.
allowed-tools: Read, Glob, Grep, Write, Task
---

Use the **professor** subagent to write plain-English explanations of every file DEV created or modified in the latest session.

The agent reads `docs/IMPLEMENTATION_NOTES.md` to identify touched files, then explains each at a beginner-friendly level — covering what each file IS, what it DOES, why it EXISTS, how it CONNECTS, a real-world analogy, and **what could go wrong** (the most likely failure modes a future maintainer should look at first).

Output is **appended** to `docs/CODE_EXPLAINER.md` as a new "Sprint N — Session X" section. Prior sections are preserved.

This is a read-only role. The agent will not modify any code.

If Mem0 MCP is connected, the subagent searches it for code-explanation style preferences before starting.

After the agent completes, summarize: number of files explained, and confirm CODE_EXPLAINER.md was appended (not overwritten).
