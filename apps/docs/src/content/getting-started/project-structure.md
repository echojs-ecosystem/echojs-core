---
title: Project Structure
description:
  Feature-first folder layout for EchoJS apps — app, pages, widgets, features,
  entities, core.
---

# Project Structure

EchoJS apps in this monorepo follow **feature-first** layering. The goal is
simple imports: upper layers depend on lower layers, never the reverse.

## Layer diagram

```
app/           → bootstrap, router, global CSS
pages/         → route entries (*.page.ts) + page-local MV
widgets/       → composite UI (header, sidebar, doc renderer)
features/      → user stories (search, theme toggle, query demo)
entities/      → routes, domain types, shared route tables
core/          → providers, styles, content engine, SEO, utilities
content/       → markdown sources (docs site only)
```

## `app/` — shell

| File                 | Role                                          |
| -------------------- | --------------------------------------------- |
| `main.ts`            | Entry: CSS + `bootstrap()`                    |
| `bootstrap.ts`       | `createEchoApp().use(...).mount()`            |
| `router-provider.ts` | Wires `appRouter` into `createRouterProvider` |
| `styles/global.css`  | Tailwind / tokens                             |

App-wide providers live in `core/providers/` — not inside individual pages.

## `pages/` — routes

One folder per screen or layout:

```
pages/home/
  constants/     # optional static copy, code samples
  types/         # HomeVM, props
  model/         # createHomeModel
  ui/            # HomeView (+ sub-views)
  home.page.ts   # createRouteView + bindModelView
```

`*.page.ts` is the only file the router imports directly.

Layouts use `createLayoutView` and render `outlet()` for child routes.

## `widgets/` — shared composition

Cross-page UI: site header, docs sidebar, code blocks, footer sections. Widgets
may have their own model/view pair (`widgets/code-block/`).

## `features/` — focused capability

Example from `apps/example`:

```
features/query-demo/
  api/
  model/
  ui/
```

Features are imported by pages or widgets — not by `core/`.

## `entities/` — routing & domain

```
entities/__routes__/
  app.routes.ts
  docs.routes.ts
  router.ts
  doc-pages.ts
```

Keep path tables and `createRouter` wiring out of views.

## `core/` — lowest app layer

- `providers/` — query, UI, i18n, theme (import via `@core/providers/index.js`)
- `styles/` — `tailwind-variants` (`tv()`) helpers (`cn()`)
- `ui/bind-model-view.ts` — page glue helper
- `content/` — nav config, markdown loader (docs)
- `seo/` — meta tags and document title helpers

## `content/` (documentation app)

Markdown files map 1:1 to URLs via `contentId` (`guides/routing` →
`/docs/guides/routing`). Nav lives in `core/content/nav.ts`.

## Path aliases

`apps/docs/tsconfig.json` defines:

| Alias         | Points to        |
| ------------- | ---------------- |
| `@app/*`      | `src/app/*`      |
| `@pages/*`    | `src/pages/*`    |
| `@widgets/*`  | `src/widgets/*`  |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@core/*`     | `src/core/*`     |

Use the same aliases in Vite (`resolve.alias`) so imports match TypeScript.

## Dependency rules

| From       | May import                            |
| ---------- | ------------------------------------- |
| `pages`    | widgets, features, entities, core     |
| `widgets`  | features, entities, core              |
| `features` | entities, core                        |
| `entities` | core                                  |
| `core`     | packages (`@echojs-ecosystem/*`) only |

> [!WARNING] Do not import `pages/` from `features/` or `widgets/`. Lift shared
> logic to `features/` or `core/`.

## Reference repos

| App            | Purpose                           |
| -------------- | --------------------------------- |
| `apps/docs`    | Production docs + MV reference    |
| `apps/example` | Hub, docs module, workspace, auth |
