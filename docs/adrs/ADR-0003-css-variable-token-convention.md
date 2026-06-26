# ADR-0003: HSL-channel CSS variables with hsl() wrapping in Tailwind
_Date: 2026-06-25 · Status: Accepted · Sprint: 0_

## Context
AC-0.2 enumerates design tokens as raw HSL channel triplets, e.g. `--primary: 190 100% 50%` (no `hsl()` wrapper, no commas). `tailwind.config.ts` (AC-0.3) must map color tokens so utilities like `bg-primary`, `text-primary`, `border-primary/30` work — including the `/opacity` modifier the Hero uses (`border-primary/30`, `border-white/10`, `bg-card/0.5`). The convention chosen here determines whether opacity modifiers function.

## Options Considered
1. **Bare channels in `:root` + `hsl(var(--x))` in Tailwind config (shadcn convention)** — Pros: Tailwind's `<color>/<alpha>` opacity modifier works because Tailwind rewrites to `hsl(var(--x) / <alpha>)`; matches AC-0.2's literal token format; matches shadcn/ui ecosystem the project plans to adopt. Cons: tokens are not directly usable as raw CSS color values without the wrapper (rarely needed).
2. **Full `hsl(...)` values in `:root` (e.g. `--primary: hsl(190 100% 50%)`)** — Pros: directly usable as a CSS color. Cons: **breaks Tailwind opacity modifiers** (`primary/30` would produce `hsl(hsl(...) / 0.3)` — invalid); contradicts AC-0.2's literal format. Disqualifying.
3. **Hex values (`--primary: #00E5FF`)** — Pros: familiar. Cons: no native opacity-modifier support without `color-mix`; contradicts AC-0.2; loses the HSL ergonomics for theming.

## Decision
Define tokens as **bare HSL channel triplets** in `:root` exactly as AC-0.2 specifies, and wrap them as **`hsl(var(--token))`** in `tailwind.config.ts`. The `.glass`/`.glass-card`/`.text-gradient` utilities in `globals.css` likewise use `hsl(var(--token) / <alpha>)`. This makes `border-primary/30`, `border-white/10`, and `bg-card/50`-style opacity modifiers work and aligns with the shadcn/ui convention the project will adopt later.

## Consequences
- Positive: Opacity modifiers work everywhere (critical for the eyebrow's `border-primary/30` and glass effects); literal token format matches AC-0.2; shadcn-compatible for future component adoption.
- Negative: A token used as a raw color outside Tailwind must be wrapped manually in `hsl(...)`. Minor and rare.
- Follow-ups: Any new token added in later sprints follows the same bare-channel convention. REVIEWER verifies the eyebrow and secondary CTA glass render with correct opacity as a regression check on this decision.
