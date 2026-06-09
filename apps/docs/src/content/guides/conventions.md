---
title: Conventions
description:
  Naming and file layout for signals, stores, queries, forms, models, views, and
  routes in EchoJS apps.
keywords: [naming, conventions, signals, stores, createModel, createView]
---

# Conventions

EchoJS apps stay readable when every layer uses the **same naming shape**. The
tables below match `apps/docs`, `apps/example`, and package guides — follow them
in new code and refactors.

> [!TIP] Conventions encode the ideas in [Reactivity](/docs/guides/reactivity)
> and [Architecture](/docs/architecture/feature-first) — naming should make the
> layer obvious at a glance.

## Quick reference

| Layer          | Variable / export                   | Type / factory      | File                           |
| -------------- | ----------------------------------- | ------------------- | ------------------------------ |
| **Signal**     | `$count`, `$tab`, `$isOpen`         | `signal()`          | inside `*.model.ts`            |
| **Computed**   | `$fullName`, `$isLoggedIn`          | `computed()`        | model or next to stores        |
| **Effect**     | — (inline in model)                 | `effect()`          | model, rarely store bootstrap  |
| **Store**      | `themeStore`, `authTokenStore`      | `createStore()`     | `entities/**/\*-store.ts`      |
| **Query**      | `listUsersQuery`, `docContentQuery` | `createQuery()`     | `features/**/api/*.queries.ts` |
| **Mutation**   | `updateProfileMutation`             | `createMutation()`  | `features/**/api/*.mutations.ts` |
| **Form**       | `loginForm`, `authLoginForm`        | `createForm()`      | `features/**/model/*-form.ts`  |
| **Model**      | `createHomeModel`                   | `createModel()`     | `**/model/*.model.ts`          |
| **View**       | `HomeView`                          | `createView()`      | `**/ui/*.view.ts`              |
| **Page route** | `homePage`                          | `createRouteView()` | `**/pages/**/*.page.ts`        |
| **VM type**    | `HomeVM`, `CounterVM`               | —                   | `**/types/*.types.ts`          |

## Folder layout

From [Project Structure](/docs/getting-started/project-structure):

```
src/
  app/           # bootstrap, providers, global routes wiring
  pages/         # route-level composition
  widgets/       # reusable UI blocks (no business rules)
  features/      # vertical slices (model + ui + api)
  entities/      # shared domain (session, routes, doc-article)
  shared/        # pure utils, styles
  core/          # app-specific infra (content, seo) — docs only
```

| Layer    | May import from              | Must not import from   |
| -------- | ---------------------------- | ---------------------- |
| `pages`  | widgets, features, entities  | other pages            |
| `widgets`| features, entities, shared   | pages, app             |
| `features`| entities, shared            | pages, widgets         |
| `entities`| shared, other entities       | pages, features        |

Run `@echojs-ecosystem/architect` in CI to enforce — see
[Architect](/docs/packages/architect).

## Signals — `$name`

Writable reactive cells use a **`$` prefix** on the variable name:

```ts
const $count = signal(0)
const $tab = signal<'code' | 'preview'>('code')
const $isOpen = signal(false)
```

Expose signals on the VM when views read them directly, or hide behind accessors
— **keep `$` on the signal variable inside the model**.

## Computed — `$name`

```ts
const $fullName = computed(() => `${$first.value()} ${$last.value()}`)
export const $isLoggedIn = computed(() => authTokenStore.value() != null)
```

Prefer `computed()` over `effect()` + manual sync for derived values.

## Stores — `nameStore`

Module-level stores end with **`Store`**:

```ts
export const themeStore = createStore<'light' | 'dark'>('dark', {
  name: 'theme',
})
export const authTokenStore = createStore<string | null>(null, {
  name: 'auth-token',
})
```

| Do                         | Don't                              |
| -------------------------- | ---------------------------------- |
| `cartStore`, `sessionStore`| `$cart`, `cart`, `CartStore`       |
| One store per domain       | One mega `appStore`                |
| `{ name: 'auth-token' }`   | Anonymous stores in shared modules |

File: **`auth-store.ts`**, **`theme-store.ts`** under `entities/` or `app/`.

## Queries and mutations

**Queries** — `camelCase` + `Query` in `*.queries.ts`:

```ts
export const listUsersQuery = createQuery<User[]>({
  name: 'users-list',
  queryKey: () => ['api', 'users'] as const,
  queryFn: () => fetchUsers(),
})
```

**Mutations** — `camelCase` + `Mutation` in `*.mutations.ts` or same API file:

```ts
export const updateProfileMutation = createMutation({
  name: 'update-profile',
  mutationFn: (body) => patchProfile(body),
})
```

Use `.with(() => params)` in models — keep query/mutation at module scope.

## Forms — `nameForm`

```ts
export const authLoginForm = createForm(fields, {
  name: 'AuthLoginForm',
  validationSchema: loginSchema,
})
```

Field keys match API property names. Form **`name`** uses PascalCase for devtools.

## Models, views, pages

| Piece                  | Pattern                        | Example                      |
| ---------------------- | ------------------------------ | ---------------------------- |
| Model factory          | `create` + `Feature` + `Model` | `createHomeModel`            |
| View component         | `Feature` + `View`             | `HomeView`                   |
| Route export           | `feature` + `Page`             | `homePage`, `docArticlePage` |
| VM type                | `Feature` + `VM`               | `HomeVM`                     |
| Props type             | `Feature` + `Props`            | `CodeBlockProps`             |
| `createModel` name arg | `"FeatureModel"`               | `"HomeModel"`                |
| `createView` name arg  | `"FeatureView"`                | `"HomeView"`                 |

```
pages/home/
  model/home.model.ts
  ui/home.view.ts
  types/home.types.ts
  home.page.ts
```

## Public API — `index.ts`

Each slice exports through **`index.ts`** — no deep imports from sibling files:

```ts
// features/search/index.ts
export { SearchView } from './ui/search.view'
export { createSearchModel } from './model/search.model'
```

Architect flags `@features/search/ui/search.view` from outside the slice.

## Actions and accessors

| Kind            | Naming              | Example                                 |
| --------------- | ------------------- | --------------------------------------- |
| VM actions      | verb, imperative    | `increment`, `toggle`, `submit`, `copy` |
| Boolean readers | `is` / `has` + noun | `isCodeTabActive`, `isLoggedIn`         |
| Value readers   | noun or `activeX`   | `activeCodeTab`, `count`                |

Avoid `handleClick` on the VM — name the **intent** (`submit`, `openMenu`).

## Imports

| Pattern              | Example                                      |
| -------------------- | -------------------------------------------- |
| Package subpath      | `@echojs-ecosystem/reactivity`               |
| App alias            | `@features/search`, `@entities/session`      |
| Relative in slice    | `./model/home.model.js`                      |
| `.js` extension      | Required in TS sources for ESM resolution    |

Utils use **plain function names** (`windowSize`, not `useWindowSize`) — see
[Utils philosophy](/docs/packages/utils/guides/philosophy).

## Debug `name` options

```ts
createStore(0, { name: 'counter' })
createForm(fields, { name: 'AuthLoginForm' })
createModel(factory, 'CounterModel')
createView(render, 'CounterView')
createQuery({ name: 'users-list', ... })
```

## Docs repo extras

`apps/docs` adds:

| Path                    | Role                              |
| ----------------------- | --------------------------------- |
| `core/content/nav/`     | Sidebar + route `contentId` list  |
| `content/**/*.md`       | Markdown articles                 |
| `entities/doc-article/` | Doc page model + renderer         |

New doc page: markdown under `content/` + entry in
`core/content/nav/sections/*.ts`.

## Checklist for new features

1. Folder under `features/<name>/` with `model/`, `ui/`, optional `api/`.
2. Export public API from `index.ts`.
3. Page in `pages/` composes feature — route in `entities/__routes__/`.
4. Naming matches tables above.
5. Run `echo-architect lint` before PR.

## Related

- [Reactivity](/docs/guides/reactivity) — signals in models
- [Models](/docs/architecture/models) — VM design
- [Feature first](/docs/architecture/feature-first) — slice boundaries
- [Project Structure](/docs/getting-started/project-structure)
- [State overview](/docs/state/overview)
- [AGENTS.md](/docs/agents/agents) — docs repo rules
