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

## Quick reference

| Layer          | Variable / export                   | Type / factory      | File                           |
| -------------- | ----------------------------------- | ------------------- | ------------------------------ |
| **Signal**     | `$count`, `$tab`, `$isOpen`         | `signal()`          | inside `*.model.ts`            |
| **Computed**   | `$fullName`, `$isLoggedIn`          | `computed()`        | model or next to stores        |
| **Store**      | `themeStore`, `authTokenStore`      | `createStore()`     | `entities/**/\*-store.ts`      |
| **Query**      | `listUsersQuery`, `docContentQuery` | `createQuery()`     | `features/**/api/*.queries.ts` |
| **Form**       | `loginForm`, `authLoginForm`        | `createForm()`      | `features/**/model/*-form.ts`  |
| **Model**      | `createHomeModel`                   | `createModel()`     | `**/model/*.model.ts`          |
| **View**       | `HomeView`                          | `createView()`      | `**/ui/*.view.ts`              |
| **Page route** | `homePage`                          | `createRouteView()` | `**/pages/**/*.page.ts`        |
| **VM type**    | `HomeVM`, `CounterVM`               | —                   | `**/types/*.types.ts`          |

## Signals — `$name`

Writable reactive cells use a **`$` prefix** on the variable name. The prefix
marks “this is a signal” in models, stores, and effects.

```ts
const $count = signal(0)
const $tab = signal<'code' | 'preview'>('code')
const $isOpen = signal(false)
```

Expose signals on the VM when views should read them directly:

```ts
export type CounterVM = {
  $count: Signal<number>
  increment: () => void
}

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  return {
    $count,
    increment: () => $count.update((n) => n + 1),
  }
}, 'CounterModel')
```

You may also hide signals behind accessors (`count: () => number`) when the VM
should stay narrow — but **keep the `$` prefix on the signal variable inside the
model**.

## Computed — `$name`

Derived values use the same **`$` prefix** as signals:

```ts
const $first = signal('Echo')
const $last = signal('JS')
const $fullName = computed(() => `${$first.value()} ${$last.value()}`)

export const $isLoggedIn = computed(() => authTokenStore.value() != null)
```

Prefer `computed()` over manual `effect()` + `signal` when the value is a pure
function of other reactive sources.

## Stores — `nameStore`

Module-level stores end with **`Store`** (camelCase domain + `Store`):

```ts
export const themeStore = createStore<'light' | 'dark'>('dark', {
  name: 'theme',
})
export const authTokenStore = createStore<string | null>(null, {
  name: 'auth-token',
})
export const authUserStore = createStore<AuthUser | null>(null, {
  name: 'auth-user',
})
```

| Do                                    | Don't                              |
| ------------------------------------- | ---------------------------------- |
| `cartStore`, `sessionStore`           | `$cart`, `cart`, `CartStore`       |
| One store per domain concern          | One mega `appStore` for everything |
| `{ name: "auth-token" }` for devtools | Anonymous stores in shared modules |

File name: **`auth-store.ts`**, **`theme-store.ts`** under `entities/` or
`app/`.

## Queries — `nameQuery`

Query definitions are **`camelCase` + `Query`**, usually exported from
`*.queries.ts`:

```ts
export const listUsersQuery = createQuery<User[]>({
  queryKey: () => ['users', 'list'],
  queryFn: () => fetchUsers(),
})

export const docContentQuery = createQuery<
  DocDocument,
  { contentId: ContentId }
>({
  queryKey: (p) => ['doc', p.contentId],
  queryFn: (p) => loadDoc(p.contentId),
})
```

Use `.with(() => params)` in models when the query depends on reactive params —
keep the **query object** at module scope with a stable name.

## Forms — `nameForm`

Form trees are **`camelCase` + `Form`**:

```ts
export const authLoginForm = createForm(
  {
    email: createField(''),
    password: createField(''),
  },
  { name: 'AuthLoginForm', validationSchema: loginSchema }
)
```

Field keys match API / schema property names (`email`, `password`). Form
**`name`** in options uses PascalCase for devtools (`"AuthLoginForm"`).

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

Folder layout (unchanged from
[Project Structure](/docs/getting-started/project-structure)):

```
pages/home/
  model/home.model.ts
  ui/home.view.ts
  types/home.types.ts
  home.page.ts
```

## Actions and accessors

| Kind            | Naming              | Example                                 |
| --------------- | ------------------- | --------------------------------------- |
| VM actions      | verb, imperative    | `increment`, `toggle`, `submit`, `copy` |
| Boolean readers | `is` / `has` + noun | `isCodeTabActive`, `isDarkMode`         |
| Value readers   | noun or `activeX`   | `activeCodeTab`, `count`                |

Avoid `handleClick` on the VM — name the **intent** (`submit`, `openMenu`).

## Debug `name` options

Pass a string **`name`** to stores, forms, and `createModel` / `createView` so
devtools and errors stay traceable:

```ts
createStore(0, { name: 'counter' })
createForm(fields, { name: 'AuthLoginForm' })
createModel(factory, 'CounterModel')
createView(render, 'CounterView')
```

## Related

- [Models](/docs/architecture/models) — VM design
- [Project Structure](/docs/getting-started/project-structure) — folders and
  layers
- [State overview](/docs/state/overview) — where each kind of state belongs
- [AGENTS.md](/docs/agents/agents) — docs repo rules for contributors
