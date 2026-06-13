---
title: Utils
description:
  Signal-native browser utilities for EchoJS — plain function names, SSR-safe,
  tree-shakeable subpath imports.
package: '@echojs-ecosystem/utils'
keywords: [windowSize, clipboard, debounce, composables]
---

:::package-overview utils

:::install @echojs-ecosystem/utils

## Key APIs

| Export | Role |
| ------ | ---- |
| [`windowSize`](/docs/packages/utils/api/window-size) | Viewport width/height signals |
| [`clipboard`](/docs/packages/utils/api/clipboard) | Read/write clipboard with permissions |
| [`debounce`](/docs/packages/utils/api/debounce) | Debounced signal or callback |
| [`mediaQuery`](/docs/packages/utils/api/media-query) | Reactive `matchMedia` breakpoint |
| [`eventListener`](/docs/packages/utils/api/event-listener) | DOM events with auto cleanup |

## Common patterns

- Import from **subpaths** — `@echojs-ecosystem/utils/window-size` — so unused
  utils never land in the bundle.
- Call **`.dispose()`** when a util is created in a model that can unmount.
- Prefer utils over raw `addEventListener` in effects — disposal is built in.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Installation](/docs/packages/utils/installation) | Package install & subpath imports |
| [Functions](/docs/packages/utils/functions) | Full index by category — links to each util page |

Each util page follows: **Usage** → **Type Declarations** → **API** (see [activeElement](/docs/packages/utils/api/active-element) for the reference layout).
