# Samay Mishra — Independent Founder

A premium editorial portfolio for Samay Mishra, known to many as Biraj, and the story behind ZARVORA.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/samay-portfolio/src/App.tsx` — single-page portfolio shell, navigation, founder details, ZARVORA world, capabilities, journey chapters, deferred travel map, future vision, and SEO metadata.
- `artifacts/samay-portfolio/src/components/journey-map.tsx` — lazy-loaded Leaflet/OpenStreetMap renderer with representative journey markers, route styling, and map controls.
- `artifacts/samay-portfolio/src/data/journey-places.ts` — explicit representative coordinates and honest marker roles for selected journey locations.
- `artifacts/samay-portfolio/src/index.css` — shared editorial visual language, responsive layout, ZARVORA palette, timeline, map treatment, vision chapter, motion, and reduced-motion rules.
- `artifacts/samay-portfolio` — deployable Vite web artifact served at `/`.

## Architecture decisions

- The portfolio is presentation-first and intentionally has no backend dependency.
- Founder age is calculated at runtime from 21 June 2005 rather than stored as copy.
- The portrait treatment is identity-safe: it uses a typographic fallback until the real founder portrait is supplied.
- Ornamental depth is CSS-based to keep the editorial experience light and resilient across devices.
- The travel map uses OpenStreetMap through Leaflet and is deferred until the map approaches the viewport; coordinates are representative, not live tracking or a claimed GPS history.

## Product

The site introduces Samay as an independent founder through a long-form editorial narrative, with a featured ZARVORA chapter, six capabilities, a chapter-based founder journey, an India travel atlas, future vision, and contact direction.

## User preferences

- The user wants a sophisticated founder portfolio, not a developer resume, SaaS landing page, or generic startup template.
- The user prefers restrained luxury, editorial typography, honest claims, subtle motion, and responsive accessibility.

## Gotchas

- Do not invent founder credentials, clients, awards, testimonials, or achievements.
- Do not replace the portrait fallback with generated or stock imagery; use the user's supplied portrait when it becomes available.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
