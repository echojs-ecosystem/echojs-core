---
title: eventListener
description: Attach a DOM listener with reactive target and `dispose`.
package: '@echojs-ecosystem/utils'
keywords: [eventListener, utils]
---

@echojs-ecosystem/utils/event-listener

## Usage

```ts
import { eventListener } from '@echojs-ecosystem/utils/event-listener'

const { dispose } = eventListener(window, 'resize', onResize, { passive: true })
dispose()
```

## Type Declarations

```ts
export const eventListener: <E extends Event>(
  target: MaybeEventTarget,
  event: string,
  handler: (event: E) => void,
  options?: boolean | AddEventListenerOptions,
) => { dispose: () => void }
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeEventTarget` | — | Element, window, signal, or getter |
| `event` | `string` | — | Event name |
| `handler` | `(event) => void` | — | Listener callback |
| `options` | `AddEventListenerOptions` | — | Passed to `addEventListener` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `dispose()` | `void` | Remove listener |

### SSR

No-op on the server — `dispose` is still safe.
