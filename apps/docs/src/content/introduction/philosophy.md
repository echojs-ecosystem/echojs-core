---
title: Philosophy
description:
  Design principles behind EchoJS — signals, explicit boundaries, and composable
  providers.
---

# Philosophy

EchoJS is opinionated on **structure** and **reactivity**, and flexible on
**product features**. These principles show up in every package and in how we
build `apps/docs` and `apps/example`.

## 1. Signals are the source of truth

UI is a function of state. State changes should propagate **surgically**:

- `signal` — mutable source
- `computed` — derived, cached
- `effect` — side effects (DOM, fetch triggers, logging)

HyperDOM views read signals when rendering; the runtime does not diff a virtual
tree to find what changed.

## 2. Model and View are separate

**Model** (`createModel`) owns signals, effects, and actions — the “view model”
(VM).

**View** (`createView`) maps a VM to HyperDOM `Child` trees — no business rules,
no fetchers.

```ts
// Model — state + behavior
export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  return { $count, increment: () => $count.update((n) => n + 1) }
}, 'CounterModel')

// View — presentation only
export const CounterView = createView(
  (vm: CounterVM): Child =>
    button({ onClick: vm.increment }, () => String(vm.$count.value())),
  'CounterView'
)
```

Routes glue them with `createComponent` at the page layer (see
[Why not JSX](/docs/introduction/why-not-jsx)).

> [!RECOMMENDATION] Keep views dumb. If you reach for `signal()` inside
> `createView`, move that logic into a model.

## 3. Features are vertical slices

A **feature** is everything needed for one user-facing capability (query demo,
locale switcher, doc search). It may expose:

- `model/` — VM factory
- `ui/` — views
- `api/` — fetchers (optional)

Pages **compose** features; widgets **reuse** them across pages. Shared code
never imports from pages.

## 4. Providers compose at the root

Cross-cutting services (router, query client, theme, i18n) register once:

```ts
createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .use(uiProvider)
  .use(i18nProvider)
  .use(routerProvider)
  .mount('#app')
```

Child views resolve dependencies through provider context — not through global
singletons sprinkled in features.

## 5. Routes are data, not components

`@echojs-ecosystem/router` exposes route objects with signals (`$isOpened`,
`$params`, `$query`). Navigation is `page.go()` / `NavLink`, not stringly-typed
path concatenation in views.

Layouts nest with `outlet()`; data loading uses `beforeLoad` on the route
definition.

## 6. Documentation eats its own cooking

The docs app is the reference implementation: markdown in `src/content/`, MV
pages, provider bootstrap, and the same sidebar conventions we describe in For
agents → AGENTS.md.

## Trade-offs we accept

| Choice                     | Benefit                        | Cost                                   |
| -------------------------- | ------------------------------ | -------------------------------------- |
| No VDOM                    | Predictable update cost        | Ecosystem is younger than React        |
| Strict contexts (optional) | Fail fast on missing providers | Slightly more boilerplate at bootstrap |
| Feature-first folders      | Scales in monorepos            | Learning curve for newcomers           |

## Related

- Architecture overview (stage 2)
- Model & View — `/docs/agents/model-and-view`
- First Application — `/docs/getting-started/first-application`
