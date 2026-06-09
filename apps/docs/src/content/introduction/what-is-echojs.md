---
title: Overview
description:
  What EchoJS is, why teams choose it, core philosophy, and why HyperDOM instead
  of JSX.
keywords: [echojs, signals, hyperdom, philosophy, jsx, framework]
---

# Overview

EchoJS is a **signal-first** frontend platform: fine-grained reactivity, direct
DOM rendering, typed routing, and a provider-based app shell — **without a
virtual DOM**.

**Reactivity** holds state, **HyperDOM** renders it, **Framework** boots the
app, and optional packages (**Router**, **Query**, **Store**, **UI**, …) cover
everything else.

## What is EchoJS

State lives in `@echojs-ecosystem/reactivity`. Views read `signal.value()` (or
computed/effects) and update only what depends on that state.

```ts
import { signal } from '@echojs-ecosystem/reactivity'

const count = signal(0)
count.set(1)
```

@echojs-ecosystem/reactivity

`@echojs-ecosystem/hyperdom` exposes `div`, `button`, `createView`,
`createModel`, and control helpers (`Show`, `List`). There is **no
reconciliation step** over a virtual tree.

```ts
import { button, div } from '@echojs-ecosystem/hyperdom'

div(null, [
  button({ onClick: () => count.update((n) => n + 1) }, () =>
    String(count.value())
  ),
])
```

@echojs-ecosystem/hyperdom

`createEchoApp()` registers router, query, UI, and other services once, then
mounts a single root view.

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'

createEchoApp({ strictContextChecks: true }).use(routerProvider).mount('#app')
```

@echojs-ecosystem/framework

> [!NOTE] The docs site and `apps/example` are real EchoJS apps — not a separate
> demo framework.

### Packages at a glance

| Area                | Package                       |
| ------------------- | ----------------------------- |
| Routing & `NavLink` | `@echojs-ecosystem/router`    |
| Server/async data   | `@echojs-ecosystem/query`     |
| Client store        | `@echojs-ecosystem/store`     |
| URL-bound state     | `@echojs-ecosystem/url-state` |
| Local persistence   | `@echojs-ecosystem/persist`   |
| Components & theme  | `@echojs-ecosystem/ui`        |
| Translations        | `@echojs-ecosystem/i18n`      |

Browse **Packages** in the sidebar for installation and API pages.

## Why EchoJS

Teams usually arrive with one of three goals: **less render overhead**,
**clearer structure as the app grows**, or **one coherent toolkit** instead of
stitching router, query, store, and ad-hoc patterns.

### Problems we target

**Render work that scales with the whole tree** — classic VDOM reconciles large
trees. EchoJS uses **fine-grained signals**: when a value changes, only
subscribers run.

**Architecture drift** — without conventions, shared state leaks and routing
knows too much about UI. EchoJS documents **feature-first layout** and
**dependency flow** (pages → widgets → features → entities → shared).

**Fragmented ecosystem** — routing, async data, URL state, and persistence are
**first-party packages** wired through one `createEchoApp()` pipeline.

### When it is a strong fit

- Greenfield SPAs or internal tools where you control the stack
- Dashboards, admin panels, docs-style apps with long-lived shells
- Teams that want **Model + View** without a virtual DOM
- Monorepos on Bun and TypeScript

### When to stay cautious

- You need React Native or a React-only hiring pool today
- You depend on a React-only component library with no HyperDOM equivalent
- SEO-critical SSR — plan separately; docs today are **client-rendered SPA**

> [!NOTE] See [EchoJS vs React](/docs/comparisons/react) for a side-by-side map.

## Philosophy

EchoJS is opinionated on **structure** and **reactivity**, flexible on **product
features**.

### Signals are the source of truth

- `signal` — mutable source
- `computed` — derived, cached
- `effect` — side effects

HyperDOM reads signals when rendering; there is no virtual tree diff.

### Model and View are separate

**Model** (`createModel`) owns signals, effects, and actions.

**View** (`createView`) maps a VM to HyperDOM — no business rules, no fetchers.

```ts
export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  return { $count, increment: () => $count.update((n) => n + 1) }
}, 'CounterModel')

export const CounterView = createView(
  (vm: CounterVM) =>
    button({ onClick: vm.increment }, () => String(vm.$count.value())),
  'CounterView'
)
```

> [!RECOMMENDATION] Keep views dumb. If you reach for `signal()` inside
> `createView`, move that logic into a model.

### Features are vertical slices

A **feature** is one user-facing capability (locale switcher, doc search). Pages
**compose** features; widgets **reuse** them. Shared code never imports from
pages.

### Providers compose at the root

```ts
createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .use(uiProvider)
  .use(routerProvider)
  .mount('#app')
```

### Routes are data

Route objects expose signals (`$isOpened`, `$params`, `$query`). Navigation is
`page.go()` / `NavLink`. Layouts nest with `outlet()`; data loading uses
`beforeLoad`.

### Trade-offs

| Choice              | Benefit                 | Cost                          |
| ------------------- | ----------------------- | ----------------------------- |
| No VDOM             | Predictable update cost | Younger ecosystem than React  |
| Strict contexts     | Fail fast on missing DI | Slightly more bootstrap code  |
| Feature-first folders | Scales in monorepos | Learning curve for newcomers |

## HyperDOM, not JSX

Apps use **HyperDOM** — TypeScript functions that return real DOM via `h()`,
`createView`, and `Show` / `List`. The official stack **does not use JSX**.

| Question           | Answer                                                              |
| ------------------ | ------------------------------------------------------------------- |
| Is UI imperative?  | **No** — views are declarative (UI follows state)                   |
| Need JSX compiler? | **No** — only `tsc`                                                 |
| Like React JSX?    | Same *goal* (UI = f(state)), different syntax and runtime           |

**Declarative HyperDOM** — you do not patch `textContent` by hand:

```ts
button({ onClick: vm.inc }, () => String(vm.count.value()))
```

The label re-runs when `count` changes. That is declarative binding, not
imperative DOM surgery.

**JSX** optimizes for HTML-like markup and compiler plugins. **HyperDOM**
optimizes for signal subscriptions, full `tsc` checking, no VDOM, and one style
across `apps/docs`, `apps/example`, and package playgrounds.

Choose JSX stacks for React Native, Next RSC, or a mandated `.tsx` org. Choose
Echo + HyperDOM for **signal-first SPAs** in this monorepo with **feature-first**
rules and **explicit** reactive bindings in code review.

> [!TIP] Deep dive: [Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl),
> [Models](/docs/architecture/models),
> [EchoJS vs Solid](/docs/comparisons/solid).

## Next steps

1. [Installation](/docs/getting-started/installation) — install and bootstrap
2. [First Application](/docs/getting-started/first-application) — end-to-end app
3. [Architecture](/docs/architecture/overview) — feature-first rules
4. [Framework](/docs/packages/framework) — `createEchoApp` and providers
