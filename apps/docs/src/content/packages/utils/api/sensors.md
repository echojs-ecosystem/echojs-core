---
title: Sensors
description: Viewport, pointer, scroll, and network sensor composables.
package: '@echojs-ecosystem/utils'
---

# Sensors

Import: `@echojs-ecosystem/utils/<kebab-name>`

| Utility | Import | Summary |
| ------- | ------ | ------- |
| `windowSize` | `window-size` | Viewport `width` / `height` |
| `mediaQuery` | `media-query` | CSS media query `matches` |
| `breakpoints` | `breakpoints` | Named breakpoint `current` |
| `mouse` | `mouse` | Pointer `x`, `y`, `sourceType` |
| `scroll` | `scroll` | Scroll `x`, `y`, `isScrolling` |
| `network` | `network` | Connection + `online` |
| `online` | `online` | `navigator.onLine` |
| `idle` | `idle` | User idle detection |
| `geolocation` | `geolocation` | GPS coords & errors |
| `hotkeys` | `hotkeys` | Keyboard combos (`ctrl+s`) |
| `keyPress` | `key-press` | Single key held state |
| `pageLeave` | `page-leave` | Pointer left the page |

---

## windowSize

```ts
function windowSize(options?: WindowSizeOptions): {
  width: () => number
  height: () => number
  $width: Signal<number>
  $height: Signal<number>
  dispose: () => void
}
```

| Option | Default | Description |
| ------ | ------- | ----------- |
| `initialWidth` | `0` | SSR / pre-hydration width |
| `initialHeight` | `0` | SSR / pre-hydration height |
| `window` | `defaultWindow` | Custom `Window` (pass `undefined` for SSR-only defaults) |

Listens to `resize` on the client. [Example](/docs/packages/utils/examples/window-size).

---

## mediaQuery

```ts
function mediaQuery(query: string, options?: { window?: Window })
```

| Return | Description |
| ------ | ----------- |
| `matches()` | Whether the query currently matches |
| `$matches` | Signal for bindings |

```ts
const isDark = mediaQuery('(prefers-color-scheme: dark)')
```

[Example](/docs/packages/utils/examples/media-query).

---

## breakpoints

```ts
function breakpoints(options?: {
  breakpoints?: Record<string, number>
  window?: Window
})
```

Default breakpoints: `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`, `2xl: 1536`.

| Return | Description |
| ------ | ----------- |
| `current()` | Name of the largest matching breakpoint |
| `greaterOrEqual(name)` | `innerWidth >= breakpoints[name]` |
| `smaller(name)` | `innerWidth < breakpoints[name]` |

---

## mouse

```ts
function mouse(options?: { document?: Document })
```

| Return | Description |
| ------ | ----------- |
| `x()`, `y()` | `clientX` / `clientY` from `mousemove` and `touchmove` |
| `sourceType()` | `'mouse' \| 'touch' \| 'pen' \| null` |

Listens on `document` by default.

---

## scroll

```ts
function scroll(
  target?: MaybeSignalOrGetter<Window | HTMLElement | Document>,
  options?: { idleTimeout?: number }
)
```

| Return | Description |
| ------ | ----------- |
| `x()`, `y()` | Scroll offset |
| `isScrolling()` | `true` while scrolling, clears after `idleTimeout` (default `150` ms) |

Target defaults to `window`. Supports [reactive targets](/docs/packages/utils/guides/reactive-targets).

---

## network

```ts
function network()
```

| Return | Description |
| ------ | ----------- |
| `online()` | `navigator.onLine` |
| `effectiveType()` | `'4g'`, `'3g'`, … from Network Information API |
| `downlink()`, `rtt()`, `saveData()` | Connection metrics when available |

Updates on `online` / `offline` and `connection` `change` events.

---

## online

Simpler alternative to `network` when you only need online status:

```ts
const online = online()
online.value() // boolean
online.$value
```

---

## idle

```ts
function idle(options?: {
  timeout?: number  // default 60_000 ms
  initial?: boolean // default false
})
```

Listens for `mousemove`, `mousedown`, `keydown`, `touchstart`, `scroll` on
`window`.

| Return | Description |
| ------ | ----------- |
| `idle()` | User is idle |
| `active()` | Inverse of `idle()` |
| `reset()` | Reset idle timer |

---

## geolocation

```ts
function geolocation(options?: PositionOptions & { immediate?: boolean })
```

| Return | Description |
| ------ | ----------- |
| `coords()` | `GeolocationCoordinates \| null` |
| `error()` | `GeolocationPositionError \| null` |
| `loading()` | Watch / refresh in progress |
| `start()`, `stop()`, `refresh()` | Control watching |

`immediate` defaults to `true` — starts `watchPosition` on the client.

---

## hotkeys

```ts
function hotkeys(
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  options?: { preventDefault?: boolean; target?: Document | Window }
)
```

Keys use `ctrl+s`, `meta+k`, `shift+?` style strings (parsed via internal
`parseHotkey`). Returns only `{ dispose }` — no state signals.

---

## keyPress

```ts
function keyPress(
  key: string,
  handler?: (event: KeyboardEvent) => void,
  options?: { target?: Document | Window; byCode?: boolean }
)
```

| Return | Description |
| ------ | ----------- |
| `pressed()` | Whether the key is currently held |

Optional `handler` runs on matching `keydown`. Set `byCode: true` to match
`event.code` instead of `event.key`.

---

## pageLeave

```ts
function pageLeave(handler: () => void)
```

Fires when the pointer leaves the document (`mouseleave` on `document`). Returns
`{ dispose }`.
