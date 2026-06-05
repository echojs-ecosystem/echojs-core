---
title: Architecture Overview
description: Layers of an EchoJS application — from bootstrap and providers to pages and shared code.
keywords: [architecture, layers, fsd, spa]
---

# Architecture Overview

An EchoJS application is a **client-side SPA** built from a small number of layers. Each layer has a single responsibility; together they replace ad-hoc “components + hooks + context everywhere” with predictable boundaries.

## Layer stack

```
┌─────────────────────────────────────────────┐
│  app/          bootstrap, providers, CSS    │
├─────────────────────────────────────────────┤
│  pages/        routes (*.page.ts) + MV       │
├─────────────────────────────────────────────┤
│  widgets/      composite UI (header, shell) │
├─────────────────────────────────────────────┤
│  features/     user-facing capabilities     │
├─────────────────────────────────────────────┤
│  entities/     routes, domain, doc registry │
├─────────────────────────────────────────────┤
│  core/         providers, styles, content engine  │
└─────────────────────────────────────────────┘
         ▲ imports only upward in this diagram
```

| Layer | Owns | Example in `apps/docs` |
| --- | --- | --- |
| **app** | `createEchoApp`, router wiring, `main.ts` | `bootstrap.ts`, `router-provider.ts` |
| **pages** | Route views, page-level models | `pages/home`, `pages/doc` |
| **widgets** | Reusable sections across pages | `site-header`, `docs-sidebar`, `code-block` |
| **features** | Focused behavior + UI | `docs-search` (if under features) |
| **entities** | Router tables, caches keyed by domain | `entities/__routes__`, `doc-pages.ts` |
| **core** | Providers, design helpers, `bindModelView`, markdown | `core/providers`, `core/styles`, `parse-markdown.ts` |

## Runtime flow

1. **`main.ts`** loads CSS and calls `bootstrap()`.
2. **`createEchoApp()`** runs provider `setup()` hooks (query, UI, i18n, theme, router).
3. **Router provider** starts history and supplies `router.View` as the root (docs app wraps docs chrome around it).
4. **Active route** resolves to a `createRouteView` / `createLayoutView` page.
5. **Page** calls `bindModelView` → model (signals, effects) + view (HyperDOM).
6. **Reactive updates** propagate from signals to bound DOM regions — no full-app reconcile.

```ts
// Simplified spine
createEchoApp()
  .use(queryProvider)
  .use(routerProvider)
  .mount("#app");
// → router.View() → layout → page → bindModelView(model, view)
```

## Layout vs page routes

| Kind | API | Renders |
| --- | --- | --- |
| **Layout** | `createLayoutView` | Shell around `outlet()` — e.g. docs layout (content only; chrome may live outside `router.View` in docs app) |
| **Page** | `createRouteView` | Full screen or nested child — e.g. `DocArticle`, `Home` |

Layouts run `beforeLoad` before children; a failing layout blocks child loads.

## State placement

| State type | Where it lives |
| --- | --- |
| UI selection (tab index, panel open) | Page or widget **model** |
| Server data | `@echojs/query` in model (`createQuery.with`) |
| Global theme / locale | Provider-backed stores (`core/providers`) |
| URL shareable state | `@echojs/url-state` + router query |
| Cross-feature client store | `@echojs/store` (sparingly) |

> [!RECOMMENDATION]
> Prefer feature-local models over a single global store. Promote to `core/` only when two features need the same source of truth.

## Documentation app specifics

`apps/docs` adds:

- **`content/`** — markdown sources (`contentId` → URL)
- **`core/content/nav.ts`** — sidebar + search index
- **`widgets/doc-content`** — renderer, TOC, Shiki code blocks
- **Persistent docs chrome** — sidebar/header outside remounting `router.View` (see `app/router-provider.ts`)

The example lab (`apps/example`) uses the same layers with Hub → Docs module / Workspace instead of marketing home.

## Related topics

- Feature First — how to slice folders
- Providers — `createEchoApp().use(...)`
- Models — `createModel` / `createView`
- Dependency Flow — import rules
