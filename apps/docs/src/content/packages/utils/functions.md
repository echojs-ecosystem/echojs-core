---
title: Functions
description: Index of all @echojs-ecosystem/utils utilities by category.
package: '@echojs-ecosystem/utils'
---

# Functions

Plain camelCase utilities — no `use*` prefix. Each function returns getters, optional `$signals`, and `dispose()` when it registers browser side effects.

:::install @echojs-ecosystem/utils

## Sensors

| Function | Description |
| -------- | ----------- |
| [windowSize](/docs/packages/utils/api/window-size) | Viewport `width` / `height` |
| [mediaQuery](/docs/packages/utils/api/media-query) | CSS media query `matches` |
| [breakpoints](/docs/packages/utils/api/breakpoints) | Named breakpoint helpers |
| [mouse](/docs/packages/utils/api/mouse) | Pointer `x`, `y`, `sourceType` |
| [scroll](/docs/packages/utils/api/scroll) | Scroll offset + `isScrolling` |
| [network](/docs/packages/utils/api/network) | Connection + online state |
| [online](/docs/packages/utils/api/online) | `navigator.onLine` |
| [idle](/docs/packages/utils/api/idle) | User idle detection |
| [geolocation](/docs/packages/utils/api/geolocation) | GPS coords |
| [hotkeys](/docs/packages/utils/api/hotkeys) | Keyboard combos |
| [keyPress](/docs/packages/utils/api/key-press) | Single key state |
| [pageLeave](/docs/packages/utils/api/page-leave) | Pointer left the page |

## Browser

| Function | Description |
| -------- | ----------- |
| [activeElement](/docs/packages/utils/api/active-element) | `document.activeElement` |
| [clipboard](/docs/packages/utils/api/clipboard) | Copy to clipboard |
| [documentTitle](/docs/packages/utils/api/document-title) | `document.title` |
| [favicon](/docs/packages/utils/api/favicon) | Favicon href |
| [colorScheme](/docs/packages/utils/api/color-scheme) | Light / dark / auto |
| [eventListener](/docs/packages/utils/api/event-listener) | Event listener helper |
| [documentVisibility](/docs/packages/utils/api/document-visibility) | Tab visibility |
| [devicePixelRatio](/docs/packages/utils/api/device-pixel-ratio) | DPR signal |
| [fullscreen](/docs/packages/utils/api/fullscreen) | Fullscreen API |
| [permission](/docs/packages/utils/api/permission) | Permissions API |
| [cssVar](/docs/packages/utils/api/css-var) | CSS variables |

## Timing

| Function | Description |
| -------- | ----------- |
| [timeout](/docs/packages/utils/api/timeout) | One-shot delay |
| [interval](/docs/packages/utils/api/interval) | Repeating timer |
| [debounce](/docs/packages/utils/api/debounce) | Debounce signal / fn |
| [throttle](/docs/packages/utils/api/throttle) | Throttle signal / fn |

## State

| Function | Description |
| -------- | ----------- |
| [toggle](/docs/packages/utils/api/toggle) | Boolean state |
| [counter](/docs/packages/utils/api/counter) | Numeric counter |
| [boolean](/docs/packages/utils/api/boolean) | Alias of `toggle` |
| [previous](/docs/packages/utils/api/previous) | Previous signal value |
| [localStorage](/docs/packages/utils/api/local-storage) | Persisted state |
| [hash](/docs/packages/utils/api/hash) | `location.hash` sync |

## DOM

| Function | Description |
| -------- | ----------- |
| [elementSize](/docs/packages/utils/api/element-size) | Element dimensions |
| [resizeObserver](/docs/packages/utils/api/resize-observer) | Resize callback |
| [intersectionObserver](/docs/packages/utils/api/intersection-observer) | In-viewport state |
| [clickOutside](/docs/packages/utils/api/click-outside) | Outside click handler |
| [hover](/docs/packages/utils/api/hover) | Hover state |
| [focus](/docs/packages/utils/api/focus) | Focus state |

## Core

| Module | Description |
| ------ | ----------- |
| [is](/docs/packages/utils/api/is) | Type guards subpath |
