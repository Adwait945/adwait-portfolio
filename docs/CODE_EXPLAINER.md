# Code Explainer
_Plain-English explanations of every file created or modified in each DEV session. Written by PROFESSOR. Append only — never rewrite existing sections._

---

## Sprint 0 — Session 1 (2026-06-25)
_Written by PROFESSOR after DEV session completed on 2026-06-25_

### Files Explained

---

#### `tailwind.config.ts`

**What it is:** The configuration file that teaches Tailwind CSS (a utility-based styling toolkit — a system where you apply pre-written design rules directly as HTML class names instead of writing custom CSS) which files to scan and which custom design tokens to make available.

**What it does:**

The file opens by importing the `Config` type from Tailwind — this is just a TypeScript (a version of JavaScript with built-in type checking) guard that catches typos in the config shape at edit time, not at runtime.

`darkMode: "class"` tells Tailwind to activate dark-mode styles only when a parent element has the class `dark` on it — as opposed to responding automatically to the user's OS preference. This means the `<html className="dark">` in `layout.tsx` is what actually switches the site into dark mode.

The `content` array lists three glob patterns (file-path wildcards) — `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`, and `./lib/**/*.{ts,tsx}`. Tailwind scans every matched file and collects every class name it finds; it then strips out all class names that were NOT found, keeping the final CSS bundle tiny. If you create a new folder outside these three paths and use Tailwind classes there, those classes will be absent from the production stylesheet.

`theme.extend.colors` maps friendly color names like `background`, `primary`, and `card` to CSS custom properties (CSS variables — reusable named values declared in `:root {}`). The `hsl(var(--background))` syntax means "read the raw hue-saturation-lightness numbers stored in the CSS variable `--background` and pass them to the color function." The actual numbers live in `globals.css`, not here.

`theme.extend.fontFamily` registers three font stacks: `font-sans` (Inter, the body text), `font-display` (Space Grotesk, for headings), and `font-mono` (JetBrains Mono, for code snippets). Each points to a CSS variable like `--font-sans` that `layout.tsx` injects at runtime via Next.js's font loader.

`theme.extend.borderRadius` derives three corner-rounding sizes from the `--radius` CSS variable (set to `0.75rem` in `globals.css`). Using subtraction (`calc(var(--radius) - 2px)`) means changing `--radius` in one place automatically adjusts all three sizes proportionally.

**Why it exists:** Without this file, Tailwind has no knowledge of the project's design token names (`primary`, `background`, `card`, etc.) or custom font stacks. Every component that uses `text-primary`, `bg-background`, or `font-display` would silently produce no style.

**How it connects:** This file is read by Tailwind's build step (via PostCSS, a CSS processing pipeline). It feeds token definitions into the generated stylesheet that every component in `app/` and `components/` relies on. The CSS variable values it references live in `globals.css`. The font variable names it uses are injected by `layout.tsx`.

**Real-world analogy:** Think of this as the brand guidelines manual for a design team — it defines what "primary blue" and "display font" mean so every designer (component) uses the same values without looking them up individually.

**What could go wrong:**
- If a new source folder is added (e.g., `src/sections/`) without updating the `content` array, Tailwind classes used in that folder will be stripped from the production build. The page will look unstyled in production but work fine in development (where Tailwind uses a different, unoptimized mode).
- Changing a color token name here (e.g., renaming `primary` to `accent`) will silently break every component that uses `text-primary`, `bg-primary`, etc. — Tailwind emits no error; the class simply has no effect.
- The `fontFamily` entries depend on CSS variables (`--font-sans`, `--font-display`, `--font-mono`) that are injected dynamically by Next.js's font loader in `layout.tsx`. If those variable names ever drift between the two files, the fonts fall back silently to `system-ui` with no error.
- `darkMode: "class"` means removing `dark` from the `<html>` tag in `layout.tsx` will revert the entire site to a light (effectively unstyled-for-dark) appearance instantly.

---

#### `app/globals.css`

**What it is:** The single global stylesheet that declares the site's design token values and defines three reusable CSS utility classes used across every component.

**What it does:**

The first three lines (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) are Tailwind directives — instructions to the PostCSS build step to inject Tailwind's reset styles, any component-layer rules, and all utility classes at those positions in the final stylesheet.

The `:root {}` block declares eight **CSS custom properties** (named variables that any element on the page can read). These are the raw numbers behind the color token system: for example, `--background: 230 40% 4%` stores the hue (230°, a deep blue), saturation (40%), and lightness (4% — nearly black) of the page background. Notice these are channel triplets with no `hsl()` wrapper — `tailwind.config.ts` wraps them in `hsl(var(...))` when using them. `--radius: 0.75rem` sets the global corner-rounding baseline.

The `@layer base {}` block writes default styles for the `<body>` tag and all heading tags (`h1`–`h6`). `@apply` is a Tailwind shortcut that expands class names into their CSS equivalents — so `@apply font-sans antialiased bg-background text-foreground` gives the body the Inter font, smooth sub-pixel text rendering, the dark background color, and white foreground text. All headings get `font-display` (Space Grotesk) and `tracking-tight` (tighter letter spacing).

The `@layer utilities {}` block defines three reusable class names the design system depends on. `.glass` applies a semi-transparent dark background plus a CSS `backdrop-filter: blur(12px)` — the "frosted glass" look where content behind a panel appears blurred. `.glass-card` extends glass with a faint border and hover transition that brightens the border to the primary color on mouse-over. `.text-gradient` clips a white-to-cyan gradient behind text characters to produce the gradient headline effect; the `color: transparent` line is required because gradient is set as a background, and the text color must be transparent to let the background show through.

**Why it exists:** This file is the single source of truth for every color value, every corner radius, and the three reusable visual effects (glass, glass-card, text-gradient) used site-wide. Without it, the entire visual design collapses — components would render with no background color, no font assignments, and no glass or gradient effects.

**How it connects:** `layout.tsx` imports this file directly (`import "./globals.css"`), which makes it load on every page. `tailwind.config.ts` reads the CSS variable names declared here when it builds the color token mappings. Every component that uses classes like `bg-background`, `text-primary`, `.glass`, or `.glass-card` is ultimately pulling values defined here.

**Real-world analogy:** Think of this as the paint swatches and finish samples in an interior designer's kit — everything else in the project says "use primary blue" or "use the glass finish," and this file is where those are actually defined as real colors and real visual treatments.

**What could go wrong:**
- The `.glass` and `.glass-card` classes use `backdrop-filter: blur()`, which is not supported in some older browsers and requires the `-webkit-backdrop-filter` prefixed version (which is present). If the `-webkit-` line is ever removed, the blur will silently disappear on Safari.
- The `.text-gradient` class requires `color: transparent` to work. If a component overrides the text color via another class applied after (e.g., `text-white`), the gradient will disappear and the text turns white — no error, just a silent visual regression.
- The `:root` block has no `@media (prefers-color-scheme: dark)` variant — the site is always dark regardless of user OS preference, which is intentional given `darkMode: "class"` in `tailwind.config.ts`. Adding an OS-preference media query here without a corresponding light-mode token set would produce a half-themed appearance.
- Removing any `--*` variable from `:root` causes every component that uses the corresponding Tailwind token to render with no color (effectively transparent or browser-default), with no build error.

---

#### `app/layout.tsx`

**What it is:** The root layout file — the single wrapper that Next.js wraps around every page on the site, providing the shared `<html>` shell, font loading, and global metadata (the tab title and description search engines read).

**What it does:**

The imports section pulls in three things: `Metadata` (a TypeScript type from Next.js that shapes the `metadata` export), three font loader functions from `next/font/google` (Next.js's built-in tool for loading Google Fonts in a way that avoids layout shift and privacy leaks), and the global stylesheet.

Each font is configured with three options. `subsets: ["latin"]` limits the downloaded font to Latin characters (reduces file size). `display: "swap"` tells the browser to show fallback system fonts immediately, then swap in the custom font once downloaded — preventing invisible text during load. `variable` assigns a CSS custom property name (`--font-sans`, `--font-display`, `--font-mono`) that Tailwind's font stacks (in `tailwind.config.ts`) reference.

The `metadata` export is a Next.js convention — any `layout.tsx` or `page.tsx` can export this object to set the page's `<title>` tag and `<meta name="description">` content. These are the strings a search engine or browser tab displays.

The `RootLayout` function is a **React component** (a reusable unit of UI that returns HTML-like markup). It receives `children` — a placeholder representing whatever page or nested layout is being rendered inside it. It returns the full `<html>` element. The `className` on `<html>` does three things simultaneously: `dark` enables Tailwind dark mode, and the three `.variable` strings (e.g., `inter.variable`) inject the CSS variable names that make `font-sans`, `font-display`, and `font-mono` resolve to the actual loaded fonts.

**Why it exists:** Next.js requires exactly one root layout. Without it, no page renders — the framework has nowhere to inject the `<html>` and `<body>` tags. It also centralizes concerns that must apply to every page: fonts, the dark class, the tab title, and the global stylesheet import.

**How it connects:** This file imports `globals.css` (making all CSS tokens available site-wide) and wraps every file under `app/` — including `page.tsx` and `error.tsx`. The font variable class names it puts on `<html>` are the values that `tailwind.config.ts`'s `fontFamily` config reads. `app/page.tsx` becomes the `{children}` rendered inside the `<body>` here.

**Real-world analogy:** Think of this as the building's lobby — every visitor (page) must pass through it, and it provides the shared infrastructure (lighting, signage, elevator) that every floor relies on, so each individual floor doesn't have to set those things up itself.

**What could go wrong:**
- The `dark` class on `<html>` must stay for Tailwind dark-mode styles to activate. If it is removed (e.g., during a layout refactor), the entire site switches to an effectively unstyled light appearance with no warning.
- The three `.variable` class names (e.g., `inter.variable`) must stay on `<html>` for the CSS variables `--font-sans`, `--font-display`, and `--font-mono` to exist in the DOM. Removing any one of them causes all components using the corresponding `font-*` Tailwind class to silently fall back to `system-ui`.
- `import "./globals.css"` is the only place the global stylesheet is loaded. Moving or deleting this import removes all color tokens, glass effects, and base typographic rules from every page at once.
- The `metadata` object's `description` field is what appears in Google search result snippets. If it is left stale or truncated past ~160 characters, search engines may auto-generate a less favorable description.

---

#### `lib/site-config.ts`

**What it is:** The single source of truth for all personalised content on the site — names, URLs, copy, and call-to-action labels — defined as typed data so the TypeScript compiler catches any missing or misspelled field.

**What it does:**

The file starts by defining a **type** called `SiteConfig` (a TypeScript construct — a named description of what shape an object must have, checked at compile time rather than runtime). It lists every field the site config object is allowed to contain: top-level strings like `name`, `role`, `headline`, `subheadline`, `email`, `linkedinUrl`, and `githubUrl`, plus a nested `hero` object that holds all the Hero section's specific copy. The `subheadline?` inside `hero` has a `?` suffix, marking it as optional — a field that may or may not be present.

The `hero` sub-object holds the eyebrow label (the small pill badge above the headline), the headline split into four named segments (`headlineLead`, `headlineMuted`, `headlineTrailing`, `headlineAccent`), and two call-to-action objects each with a `label` and `href`. The headline is split rather than stored as one string so the Hero component can apply different colors to different segments (white, grey, and cyan respectively) while keeping the joined text identical to the locked headline copy.

The `siteConfig` constant is the actual data object — it is validated against `SiteConfig` at compile time. All string values match the locked copy from `docs/PORTFOLIO_CONTENT.md`.

Both the type and the constant are `export`-ed, meaning other files can import and use them.

**Why it exists:** Without this file, content values would be scattered as **magic strings** (literal text typed directly inside component files) — impossible to update in one place, invisible to the TypeScript type system, and prone to drift between components. Centralising here means changing a URL or headline requires editing exactly one file.

**How it connects:** `Hero.tsx` imports `siteConfig` directly and destructures (pulls out specific named fields from) `hero` and `subheadline` to populate every visible text element. Future components (Nav, Footer, About) will import the same object for `name`, `email`, `linkedinUrl`, and `githubUrl`. Test files import `siteConfig` to assert that specific fields exist and have the correct values.

**Real-world analogy:** Think of this as the content brief handed to a graphic designer — it lists the exact name, tagline, and button labels to use, so the designer (component) doesn't have to make up or remember any copy themselves.

**What could go wrong:**
- The headline segmentation (`headlineLead + headlineMuted + headlineTrailing + headlineAccent`) must concatenate to exactly the locked headline string. If any segment is edited without updating the others to compensate, the rendered `<h1>` text will drift from the locked copy — tests catch this, but only if they are run.
- The `hero.primaryCta.href` and `hero.secondaryCta.href` are both `"#"` (placeholder anchors). Until real section IDs exist, clicking these buttons scrolls to the top of the page — acceptable for Sprint 0, but a silent UX gap until filled in.
- The `SiteConfig` type marks `hero.subheadline` as optional (`?`). If a future component reads `siteConfig.hero.subheadline` expecting it to be populated and the value was never set (it currently isn't), that component will render an empty string with no error.
- Adding a new required field to the `SiteConfig` type without adding a corresponding value to the `siteConfig` constant will cause a TypeScript compile error — which is the desired behavior (it prevents silent omissions), but it will block the build until fixed.

---

#### `components/home/Hero.tsx`

**What it is:** The Hero section component — the full-screen opening panel of the portfolio that displays the eyebrow label, headline, subheadline paragraph, and two call-to-action buttons.

**What it does:**

The imports bring in two things: `ArrowRight` from `lucide-react` (a library of SVG icons packaged as React components — reusable pieces of UI) and `siteConfig` from `lib/site-config.ts`.

The component function starts with a single destructuring line that pulls `hero` and `subheadline` out of `siteConfig`. This is all the dynamic data the component needs — there are no props (values passed from a parent component); the component reads its data directly from the config.

The return statement describes the visual structure as **JSX** (a syntax that looks like HTML but is actually JavaScript that React converts into real DOM elements). The outermost `<section>` is `min-h-screen` (at least as tall as the viewport) and uses flexbox to center its content vertically and horizontally.

Inside, an absolutely positioned `<div>` with `bg-gradient-to-br from-background via-card to-background` creates a subtle dark gradient overlay across the full section background. This uses Tailwind's built-in gradient utilities with the custom color tokens, so no hex values appear in the component.

The eyebrow `<span>` renders `hero.eyebrow` styled as a small, letter-spaced, monospace pill badge with a faint cyan border and the `.glass` background effect.

The `<h1>` renders in four adjacent segments: `headlineLead` in white, `headlineMuted` ("and") in `text-slate-500` (a muted grey), `headlineTrailing` (a single space for correct word spacing), and `headlineAccent` ("Technical Execution") in `text-primary` (cyan). These four segments together form the full locked headline while allowing per-word color variation.

The `<p>` renders the `subheadline` text in `text-slate-400`.

The CTA (call-to-action) buttons are rendered as plain `<a>` anchor tags, not `<button>` elements, because they navigate to sections of the page (`href="#"`). The primary button gets a glowing cyan background. The secondary button uses the `.glass` class for the frosted-glass look. Both have `focus-visible:ring-*` classes for keyboard accessibility (a visible focus ring when tabbed to).

The `ArrowRight` icon inside the primary CTA has `aria-hidden="true"` — this tells screen readers (assistive software for users who cannot see the screen) to ignore it, since it is decorative.

**Why it exists:** This is the first thing every visitor sees. Without it, the home page renders completely blank. It is also the only component Sprint 0 ships as visible output.

**How it connects:** `app/page.tsx` imports and renders this component as the sole content of the home page. All text content flows in from `lib/site-config.ts`. Styling tokens (`text-primary`, `bg-background`, `.glass`) resolve through `globals.css` and `tailwind.config.ts`. The `ArrowRight` icon is sourced from the `lucide-react` package listed in `package.json`.

**Real-world analogy:** Think of this as the cover page of a printed portfolio book — it is the first impression, contains the designer's name and positioning statement, and has two buttons that say "show me the work" and "tell me how you build," guiding the visitor toward the content they care about most.

**What could go wrong:**
- Both CTA `href` values are `"#"` (placeholder). A visitor clicking "View Featured Work" will not navigate anywhere useful until the `#selected-work` section is built and the `href` updated in `site-config.ts`.
- The gradient overlay `<div>` uses `z-0` and the content container uses `z-10` (layering values). If another element is added to the section without explicit z-index, it could render beneath the gradient overlay and become invisible.
- The `<h1>` uses four sibling segments rather than one string. If `headlineTrailing` (currently a single space character `" "`) is accidentally emptied, the words "and" and "Technical Execution" run together with no space in the rendered output — a very subtle visual bug.
- The component has no loading or error state because it reads from a static config object — but if `siteConfig` is ever refactored to fetch data asynchronously (e.g., from a CMS), the component will need a loading skeleton and error boundary to avoid a blank or crashed hero.

---

#### `app/page.tsx`

**What it is:** The home page route file — the entry point Next.js renders when a visitor lands on the root URL (`/`) of the site.

**What it does:**

The file imports the `Hero` component and exports a single function called `Home`. That function returns `<Hero />` — nothing else.

This is intentional. In Next.js's App Router (the file-based routing system used here), every file named `page.tsx` inside the `app/` directory becomes a URL route. `app/page.tsx` maps to `/`. The file's sole job right now is to mount the Hero section. As more sections are built in later sprints, they will be imported and added here.

**Why it exists:** Next.js requires a `page.tsx` at `app/page.tsx` for the home route to exist. Without it, visiting `/` returns a 404. This file also enforces the architectural rule that pages are thin orchestrators — they import and arrange section components rather than containing visual markup themselves.

**How it connects:** This is the entry point of the rendering chain. Next.js picks it up as the `/` route, wraps it in `app/layout.tsx`, and renders `<Hero />` inside the `<body>`. `Hero.tsx` takes over from there.

**Real-world analogy:** Think of this as the table of contents page in a magazine — it doesn't contain the articles itself, it just tells the printer (Next.js) which articles (components) appear on this page and in what order.

**What could go wrong:**
- This file currently renders only `<Hero />`. Until the remaining section components (SelectedWork, Experience, etc.) are imported and added here, those sections simply do not exist on the page — no error, just missing content.
- If `Hero.tsx` is ever renamed or moved without updating this import path (`@/components/home/Hero`), the build fails with a module-not-found error. The `@/` prefix resolves to the project root via `tsconfig.json`'s path aliases.
- The file has no `export const metadata` — page-level metadata falls back to the root layout's metadata. If this page ever needs a distinct `<title>` (e.g., for SEO A/B tests), a `metadata` export must be added here.

---

#### `app/error.tsx`

**What it is:** The root error boundary page — the fallback UI that Next.js displays automatically whenever an unhandled JavaScript error occurs while rendering any page on the site.

**What it does:**

The first line, `"use client"`, is a Next.js directive (an instruction to the framework) that marks this component as a **Client Component** — meaning it runs in the browser, not on the server. Error boundaries must be client components in Next.js's App Router because they use browser-side React features to catch render errors.

The component accepts two props (values passed by Next.js automatically when an error occurs): `error` (the actual JavaScript Error object, with an optional `digest` field — a server-side error ID for log correlation) and `reset` (a function that tells Next.js to attempt re-rendering the failed page from scratch).

The rendered UI is a centered, full-height page with three elements: a heading ("Something went wrong"), a short explanatory sentence, and a "Try again" button. Clicking the button calls `reset()`. All styling uses the same Tailwind tokens and button classes as the rest of the site so the error page looks visually consistent.

**Why it exists:** Without this file, an unhandled render error in any component causes Next.js to display a generic, unstyled browser error or a blank page. This file ensures that any crash is caught gracefully and the user has a recoverable path — without losing the site's visual design.

**How it connects:** Next.js automatically associates `app/error.tsx` with the root layout, making it the catch-all error boundary for every page under `app/`. It does not need to be imported anywhere — the framework picks it up by filename convention. If a page-level error occurs (e.g., in `page.tsx` or `Hero.tsx`), Next.js unmounts the failed tree and mounts this component instead, passing in the error and reset function.

**Real-world analogy:** Think of this as the "We're sorry, something went wrong" page that airlines show when their check-in kiosk crashes — it does not fix the underlying problem, but it tells the user what happened, keeps the experience on-brand, and gives them a button to try again.

**What could go wrong:**
- The `error` prop (the JavaScript Error object) is received but never displayed to the user — this is correct for production (exposing raw error messages is a security risk), but it means there is no visible information for debugging without opening browser DevTools. If an error occurs during a demo, it will look identical regardless of the root cause.
- The `reset()` function re-attempts rendering from the same code that just failed. If the error is deterministic (e.g., a missing required config value), clicking "Try again" will immediately re-crash and loop. There is no logic to detect repeated failures or redirect the user elsewhere.
- This boundary catches client-side render errors but does NOT catch errors in API routes or server-side data fetching (those return HTTP error responses instead). A future sprint that adds server-fetched data will need per-page `error.tsx` files in the relevant sub-routes if granular recovery is required.

---

#### `package.json` (changes this sprint)

**What it is:** The project's dependency manifest — the file that records every external library the project uses and defines the shorthand commands (scripts) available to run in the terminal.

**What changed this sprint:**

Two scripts were added: `"test": "jest"` runs the full test suite in watch mode; `"test:run": "jest --ci"` runs it once and exits (used in automated pipelines where no interactive terminal is available). The `"typecheck": "tsc --noEmit"` script was also added — it runs the TypeScript compiler purely as a type-checker without generating any output files, used to catch type errors without building.

One production dependency was added: `"lucide-react": "^1.21.0"`. This is the icon library that `Hero.tsx` imports `ArrowRight` from. It is a production dependency (not a dev dependency) because the icons render in the browser for real users — they are not just used during development or testing.

The existing test toolchain (`jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-axe`, and related `@types/*` packages) was already present from the TEST agent session and was not changed.

**Why it exists:** npm (the package manager) reads this file to know which libraries to download when `npm install` is run. The `scripts` block provides aliases so the team can type `npm test` instead of remembering the full `jest` invocation with all flags.

**How it connects:** Every `import` statement in `src/`, `app/`, `components/`, and `lib/` that references a third-party package (e.g., `import { ArrowRight } from "lucide-react"`) depends on that package being listed here and installed in `node_modules/`. The scripts are invoked by CLAUDE.md's command table, CI pipelines, and the REVIEWER agent's audit steps.

**What could go wrong:**
- `lucide-react` is pinned to `^1.21.0` (caret range — compatible updates allowed). A future `npm install` on a new machine could pull in a higher `1.x` version that renames or removes the `ArrowRight` export, breaking the Hero build with a module-not-found error. Pinning to an exact version (`1.21.0`) would prevent this.
- The `"test"` script runs Jest in interactive watch mode, which hangs in CI environments. The `"test:run"` script (with `--ci`) is the correct command for automated pipelines — using the wrong script in CI will cause the pipeline to hang indefinitely.
- `lucide-react` is a production dependency. In a future sprint, if a tree-shaking (dead-code elimination) issue arises and the full icon library ends up in the bundle, the JS bundle size could increase substantially. The current 88 kB First Load JS is well within the 250 kB budget, but this is worth monitoring as more icons are added.
