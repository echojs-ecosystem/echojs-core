---
title: Views
description:
  createView, createComponent, composition, reactive markup, and view
  anti-patterns.
keywords: [createView, createComponent, Show, List, composition, HyperDOM]
---

# Views

Decision rules for HyperDOM views and composition.

## Always use `createView`

```ts
export const CounterView = createView(
  (vm: CounterVM): Child =>
    button({ onClick: vm.increment }, () => String(vm.count())),
  'CounterView'
)
```

`createView` enables strict context checks — `h()`, `mount()`, and nested
components must run inside view context. Pass **`displayName`** (second arg) for
devtools and errors.

## Glue: `createComponent`

```ts
// Widget export (no props)
export const ThemeToggle = (): Child =>
  createComponent(createThemeToggleModel, ThemeToggleView)()

// Widget with props
export const CodeBlock = (props: CodeBlockProps): Child =>
  createComponent(() => createCodeBlockModel(props), CodeBlockView)()

// Page
export const homePage = createRouteView({
  name: 'home',
  view: () => createComponent(createHomeModel, HomeView)(),
})
```

`bindModelView` / `bindModelViewWith` in older apps are thin wrappers — prefer
`createComponent` in new code.

## Compose views, don't inflate one file

Split by **layout region** or **reuse boundary**:

```
ui/
  home.view.ts              # sections, passes vm down
  home-code-showcase.view.ts
  home-compare-card.view.ts # props-only, no model
```

| Child view              | Receives        | Model?        |
| ----------------------- | --------------- | ------------- |
| `HomeCodeShowcaseView`  | `HomeVM`        | Parent model  |
| `HomeCompareCardView`   | `CompareCardProps` | None (presentational) |
| `ThemeToggleView`       | `ThemeToggleVM` | Own model via `createComponent` |

Call child views as functions: `HomeCompareCardView({ tone, data })`.

## Reactive markup

| Pattern | When |
| ------- | ---- |
| `() => vm.count()` as child | Single text or node that tracks signals |
| `Show(() => cond, then, fallback)` | Conditional regions |
| `List(() => items, (item) => …)` | Arrays |
| `class: () => cn(base, active && activeClass)` | Reactive classes |
| `NavLink({ to: page, class: …, activeClass: … })` | Route-aware links |

Read signals **inside** reactive children (`() => …`), not only during the
initial `createView` call, so HyperDOM can subscribe to updates.

## Anti-patterns

```ts
// BAD — signal in view
const $open = signal(false)

// BAD — fetch in view
effect(() => fetch('/api').then(setState))

// BAD — export raw function without createView
export const BadView = (vm: VM) => div(null, '…')

// GOOD — all state in model, view renders VM
export const GoodView = createView((vm) => div(null, vm.label()), 'GoodView')
```

## Related

- [Models](/docs/best-practices/models) — VM design and lifetime
- [Styling](/docs/best-practices/styling) — `*.view.styles.ts`
- [Models & components](/docs/packages/hyperdom/guides/models-and-components) — HyperDOM factories
- [Overview](/docs/best-practices/overview)
