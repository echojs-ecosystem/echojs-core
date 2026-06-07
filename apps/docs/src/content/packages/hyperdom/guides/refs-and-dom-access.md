---
title: Refs & DOM Access
description: Imperative DOM access with ref callbacks and cleanup semantics.
package: '@echojs-ecosystem/hyperdom'
---

# Refs & DOM Access

Use the **`ref`** prop when a view needs imperative DOM access — scroll
position, focus, measuring layout, or bridging to non-HyperDOM libraries.

## Basic `ref`

```ts
nav(
  {
    ref: (el) => {
      if (el) {
        el.scrollTop = savedScroll
      } else {
        persistScroll(savedScroll)
      }
    },
  },
  children
)
```

| Call           | When                                      |
| -------------- | ----------------------------------------- |
| `ref(element)` | Node inserted into the DOM                |
| `ref(null)`    | Node removed — run persistence or cleanup |

## `ref` is not reactive

Unlike `class` or `value`, `ref` is **not** a reactive getter. HyperDOM calls it
on mount and unmount only — not when signals change.

For reactive DOM work based on signal values, use a
[lifecycle mount](/docs/packages/hyperdom/guides/lifecycle-mount) child or read
signals inside the ref callback without expecting re-runs.

## Focus management

```ts
input({
  ref: (el) => {
    if (el && shouldFocus) el.focus()
  },
})
```

Prefer lifecycle `mount()` when setup needs cleanup (e.g. `ResizeObserver`). See
[Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount).

## When to avoid `ref`

Prefer declarative HyperDOM patterns first:

- Reactive props for attributes and classes
- Function children for dynamic content
- `Show` / `List` for control flow

Reach for `ref` when the DOM API has no declarative equivalent.

## Related

- [API: Types — Props](/docs/packages/hyperdom/api/types)
- [Lifecycle Mount](/docs/packages/hyperdom/guides/lifecycle-mount)
