---
title: Reactive Props
description: Function props update DOM attributes and properties when tracked signals change.
package: "@echojs-ecosystem/hyperdom"
---

# Reactive Props

Props can be **static values** or **getters** `() => value`. Function props (except `ref`) register effects and update the DOM when dependencies change.

## Class and state

```ts
button({
  class: () => ($active.value() ? "btn btn--on" : "btn"),
  disabled: () => $pending.value(),
  onClick: submit,
}, "Submit");
```

HyperDOM re-applies the prop when any signal read inside the getter changes.

## Object class maps

`class` accepts strings, arrays, or `{ "token": boolean }` maps — getters work too:

```ts
section(
  { class: () => ({ "is-positive": vm.$count.value() > 0 }) },
  children,
)
```

Combine with `cx()` for Tailwind-style composition. See [Styling & Classes](/docs/packages/hyperdom/guides/styling-and-classes).

## Controlled inputs

Pair reactive `value` with `onInput`:

```ts
input({
  value: () => $query.value(),
  onInput: (e) => $query.set((e.currentTarget as HTMLInputElement).value),
});
```

The `value` getter tracks `$query`; the handler writes back on user input.

## What stays static

Event handlers (`onClick`, `onInput`, …) are typically **plain functions** — not reactive getters. HyperDOM attaches them once and cleans up on unmount.

`ref` is also special: it runs on insert and again with `null` on removal. See [Refs & DOM Access](/docs/packages/hyperdom/guides/refs-and-dom-access).

## Prop modifiers

| Syntax | Meaning |
| --- | --- |
| `.propName` | Set DOM **property** (e.g. `.innerHTML`, `.value`) |
| `^attrName` | Force **attribute** even if a same-named property exists |

```ts
input({ ".value": () => $text.value() });
a({ "^href": () => $url.value() });
```

## Related

- [Events & Handlers](/docs/packages/hyperdom/guides/events-and-handlers)
- [API: Types — Props](/docs/packages/hyperdom/api/types)
