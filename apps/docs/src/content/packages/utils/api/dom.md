---
title: DOM
description: Element size, observers, and interaction utilities.
package: '@echojs-ecosystem/utils'
---

# DOM

Import: `@echojs-ecosystem/utils/<kebab-name>`

| Utility | Import | Summary |
| ------- | ------ | ------- |
| `elementSize` | `element-size` | `width` / `height` of element |
| `resizeObserver` | `resize-observer` | Low-level resize callback |
| `intersectionObserver` | `intersection-observer` | Visibility in viewport |
| `clickOutside` | `click-outside` | Pointer down outside target |
| `hover` | `hover` | Pointer over element |
| `focus` | `focus` | Focus state + `focus()` / `blur()` |

All targets accept [reactive targets](/docs/packages/utils/guides/reactive-targets):
plain element, getter, or signal.

---

## elementSize

```ts
function elementSize(target: MaybeSignalOrGetter<HTMLElement | null>)
```

Uses `ResizeObserver` when available; falls back to `offsetWidth` /
`offsetHeight` on mount. Re-observes when the target signal changes.

| Return | `$width`, `$height`, `width()`, `height()`, `dispose()` |

---

## resizeObserver

```ts
function resizeObserver(
  target: MaybeSignalOrGetter<HTMLElement | null>,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
)
```

Lower-level than `elementSize` — you handle entries in the callback. Returns
`{ dispose }`.

---

## intersectionObserver

```ts
function intersectionObserver(
  target: MaybeSignalOrGetter<HTMLElement | null>,
  options?: IntersectionObserverInit
)
```

| Return | Description |
| ------ | ----------- |
| `isIntersecting()` | Latest intersection boolean |
| `entry()` | Latest `IntersectionObserverEntry \| null` |

---

## clickOutside

```ts
function clickOutside(
  target: MaybeSignalOrGetter<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
)
```

Listens on `document` in capture phase for `mousedown` and `touchstart`. Fires
when the event target is **not** contained in the resolved element.

[Example](/docs/packages/utils/examples/click-outside).

---

## hover

```ts
function hover(target: MaybeSignalOrGetter<HTMLElement | null>)
```

| Return | Description |
| ------ | ----------- |
| `value()` | Whether pointer is over the element |

Uses `mouseenter` / `mouseleave` (no bubbling noise).

---

## focus

```ts
function focus(target: MaybeSignalOrGetter<HTMLElement | null>)
```

| Return | Description |
| ------ | ----------- |
| `focused()` | Whether element has focus |
| `focus()` | `element.focus()` |
| `blur()` | `element.blur()` |

Tracks `focus` / `blur` on the target element.
