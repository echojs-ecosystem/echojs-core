---
title: Important Defaults
description:
  Execution model, strict context, and design constraints for
  @echojs-ecosystem/hyperdom.
package: '@echojs-ecosystem/hyperdom'
---

# Important Defaults

HyperDOM turns a **view tree** into real DOM nodes. Dynamic parts are function
children or reactive props backed by `@echojs-ecosystem/reactivity`. These
defaults shape how EchoJS apps behave.

## No virtual DOM

HyperDOM does **not** diff a virtual tree. Reactive children and props register
**effects** that update only the DOM nodes that changed. There is no
reconciliation layer.

| In HyperDOM                   | Not in HyperDOM                  |
| ----------------------------- | -------------------------------- |
| Direct DOM creation           | Virtual DOM / patch algorithm    |
| Fine-grained reactive updates | Full subtree re-render           |
| `render()` + `dispose()`      | Implicit unmount without cleanup |

## Strict context checks (default on)

`setStrictContextChecks(true)` is the default. `h()` and lifecycle `mount()`
must run inside a **view** or **render** scope — not at module top level.

```ts
// ❌ throws in strict mode
const sidebar = div(null, 'Menu')

// ✅ inside createView or render()
export const SidebarView = createView(() => div(null, 'Menu'), 'SidebarView')
```

EchoJS apps typically enable this via
`createEchoApp({ strictContextChecks: true })`. See
[Strict Context](/docs/packages/hyperdom/api/strict-context).

## Reactivity dependency

HyperDOM peers on `@echojs-ecosystem/reactivity`. Function children and reactive
props read signals via `.value()` and subscribe automatically. Views rarely call
`effect()` directly — HyperDOM wires effects for you.

See
[Reactivity: HyperDOM Integration](/docs/packages/reactivity/guides/hyperdom-integration).

## EchoJS conventions (not runtime requirements)

| Pattern           | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `createModel`     | Signals and actions live in the model factory         |
| `createView`      | View runs inside view context; no fetch in `.view.ts` |
| `createComponent` | Binds model + view into a callable component          |

The runtime accepts plain functions as components — conventions are enforced in
docs and example apps for consistency.

## Primitives render nothing

`true`, `false`, `null`, and `undefined` children produce no DOM output. Use
them to conditionally omit nodes without extra wrappers.

## JSX (future)

HyperDOM is designed so a future JSX compiler can target `h()`, `Show`, and
`List`. Today EchoJS docs and apps use TypeScript + DSL tags.

## Not in this package

- JSX compiler (planned separately)
- Router integration — use `@echojs-ecosystem/router/hyperdom`

## Next steps

- [Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl) — building UI
  trees
- [Reactive Children](/docs/packages/hyperdom/guides/reactive-children) —
  dynamic regions
- [Rendering & Teardown](/docs/packages/hyperdom/guides/rendering-and-teardown)
  — mount and dispose
