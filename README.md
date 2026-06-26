# Adwait Mulye — Portfolio

A personal portfolio site built with Next.js 14 (App Router), TypeScript, and
Tailwind CSS. Dark-theme, server-component-first, AI-native delivery showcase.

## Stack

- **Next.js 14+** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** + shadcn/ui design tokens
- **lucide-react** icons
- **Jest** + React Testing Library (unit / integration / a11y)
- **Playwright** (end-to-end)
- **Vercel** hosting + Web Analytics

## Getting started

```bash
npm install          # install dependencies
npm run dev          # start the dev server at http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in any values you need
(`.env.local` is git-ignored — never commit secrets).

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve the production build
npm test             # Jest in watch mode
npm run test:run     # Jest once (CI mode)
npm run test:e2e     # Playwright end-to-end (requires a built app)
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

## Environment variables

See `.env.example` and the table in `CLAUDE.md`. The only variable the site
itself reads at build time is `NEXT_PUBLIC_SITE_URL` (used for Open Graph tags,
the sitemap, and robots).

## Project layout

```
app/         Next.js routes, layout, sitemap, robots
components/  layout, home sections, teams-retro, shared
lib/         site configuration and verbatim content modules
e2e/         Playwright specs
src/__tests__/  Jest unit, integration, and a11y tests
docs/        multi-agent workflow documents
```
