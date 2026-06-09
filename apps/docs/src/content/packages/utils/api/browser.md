---
title: Browser
description: Document, clipboard, theme, and event listener utilities.
package: '@echojs-ecosystem/utils'
---

# Browser

Import: `@echojs-ecosystem/utils/<kebab-name>`

| Utility | Import | Summary |
| ------- | ------ | ------- |
| `clipboard` | `clipboard` | Async `copy(text)` |
| `documentTitle` | `document-title` | `document.title` sync |
| `favicon` | `favicon` | `<link rel="icon">` href |
| `colorScheme` | `color-scheme` | `light` / `dark` / `auto` |
| `eventListener` | `event-listener` | Low-level listener helper |
| `documentVisibility` | `document-visibility` | Tab visible / hidden |
| `devicePixelRatio` | `device-pixel-ratio` | `devicePixelRatio` |
| `fullscreen` | `fullscreen` | Fullscreen API |
| `activeElement` | `active-element` | `document.activeElement` |
| `permission` | `permission` | Permissions API |
| `cssVar` | `css-var` | CSS custom properties |

---

## clipboard

```ts
function clipboard(): {
  copy: (text: string) => Promise<void>
  text: () => string
  copied: () => boolean   // true for ~2s after success
  error: () => unknown
  $text, $copied, $error
  dispose: () => void
}
```

Requires secure context + `navigator.clipboard`. Throws on server.
[Example](/docs/packages/utils/examples/clipboard).

---

## documentTitle

```ts
function documentTitle(initial?: string)
```

| Method | Description |
| ------ | ----------- |
| `set(title)` | Updates `document.title` |
| `value()` | Current title signal |

Restores the previous title on `dispose()`.

---

## favicon

```ts
function favicon(defaultHref?: string)
```

Reads and updates the first `<link rel="icon">` (creates one if missing).

---

## colorScheme

```ts
function colorScheme(initial?: 'light' | 'dark' | 'auto')
```

| Method | Description |
| ------ | ----------- |
| `value()` | Current preference |
| `set(scheme)` | Set and apply to `document.documentElement` |
| `toggle()` | Flip between light and dark |

Sets `data-color-scheme` on `<html>`. Listens to `prefers-color-scheme` when
mode is `auto`.

---

## eventListener

Re-export of the core helper:

```ts
function eventListener(
  target: MaybeEventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): { dispose: () => void }
```

Supports reactive targets. Used internally by most browser composables.

---

## documentVisibility

```ts
function documentVisibility()
```

| Return | Description |
| ------ | ----------- |
| `value()` | `'visible' \| 'hidden' \| 'prerender'` |
| `visible()` | `value() === 'visible'` |
| `hidden()` | `value() === 'hidden'` |

Syncs on `visibilitychange`.

---

## devicePixelRatio

```ts
function devicePixelRatio(options?: { window?: Window })
```

Tracks `window.devicePixelRatio` via `resize` (not `matchMedia` resolution).

---

## fullscreen

```ts
function fullscreen(target?: MaybeSignalOrGetter<Element | null>)
```

| Method | Description |
| ------ | ----------- |
| `enter()` | `requestFullscreen()` on target (default `<html>`) |
| `exit()` | `document.exitFullscreen()` |
| `toggle()` | Enter or exit based on current state |
| `isFullscreen()` | Whether an element is fullscreen |

---

## activeElement

```ts
function activeElement()
```

Tracks `document.activeElement` on `focusin` / `focusout`. Returns
`element()` and `$element` (typed as `Element | null`).

---

## permission

```ts
function permission(name: PermissionName)
```

| Return | Type |
| ------ | ---- |
| `state()` | `PermissionState \| 'unsupported'` |
| `supported()` | Whether Permissions API query succeeded |

Queries on mount; listens to `change` on the `PermissionStatus`.

---

## cssVar

```ts
function cssVar(
  name: string,
  target?: HTMLElement,
  defaultValue?: string
)
```

Reads via `getComputedStyle`, writes via `style.setProperty`. Scoped to an
element or `:root` when target is omitted.
