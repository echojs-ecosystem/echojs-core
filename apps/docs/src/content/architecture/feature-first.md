---
title: Feature First
description: Organize EchoJS code by user-facing features with clear public APIs.
keywords: [feature-first, fsd, folders, structure]
---

# Feature First

**Feature-first** means the primary unit of organization is a **user capability** (“search docs”, “toggle theme”, “run query demo”), not a technical type (`components/`, `hooks/`, `utils/` at the repo root).

## What counts as a feature

A feature folder answers: *what can the user do here?*

```
features/query-demo/
  api/           # fetchers, keys (optional)
  model/         # createQueryDemoModel
  ui/            # QueryDemoView, playground
```

Good feature names: `docs-search`, `reactivity-counter`, `locale-switcher`.

Poor splits: `buttons/`, `hooks/`, `api/` at the top level without a user story.

## Pages vs features vs widgets

| Layer | Question | Example |
| --- | --- | --- |
| **Page** | What route is this? | `pages/sponsors/sponsors.page.ts` |
| **Widget** | What UI block appears on multiple routes? | `widgets/site-header` |
| **Feature** | What behavior can we reuse or test in isolation? | `features/query-demo` |

**Pages compose** widgets and features. They should stay thin:

```ts
// pages/doc/doc.page pattern (conceptual)
createRouteView({
  name: "doc-article",
  view: () => bindModelViewWith(props, createDocArticleModel, DocArticleView),
});
```

## Public API of a feature

Expose a single entry when other layers need the feature:

```ts
// features/query-demo/index.ts
export { QueryDemo } from "./ui/query-demo.view.js";
```

Consumers import `@features/query-demo`, not deep paths into `model/`.

> [!WARNING]
> Deep imports (`@features/query-demo/model/...`) bypass the feature boundary and make refactors painful.

## Colocation rules

Keep everything that changes together in one folder:

- Types used only by the feature → `types/` inside the feature
- Styles scoped to the feature → `constants/` or `*.styles.ts` next to views
- Tests (when added) → beside the module they cover

Move to `core/` only when **two or more** features/pages need the same helper.

## Widgets that are “almost features”

`widgets/code-block` has its own model (Shiki, copy) because it is reused on home and doc pages. That is fine: **widget ≈ feature shared across routes**.

Rule of thumb:

- One route only → lean toward **page-local** `ui/` + `model/`
- Two+ routes → **widget** or **feature** with `index.ts` export

## Anti-patterns

| Smell | Fix |
| --- | --- |
| `shared/components/Button.tsx` grows without bound | Split by feature or move to `@echojs-ecosystem/ui` |
| Page imports another page | Extract shared logic to feature/widget |
| Feature imports `pages/` | Invert dependency — page should import feature |
| God `app/store.ts` | Feature-local models + query |

## Reference layouts

| Repo | What to copy |
| --- | --- |
| `apps/docs` | MV pages, widgets, content pipeline |
| `apps/example` | Hub + module routes, `features/*` demos |
