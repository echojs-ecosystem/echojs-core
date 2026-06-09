---
title: timeout
description: One-shot delayed callback with start/stop control.
package: '@echojs-ecosystem/utils'
keywords: [timeout, utils]
---

@echojs-ecosystem/utils/timeout

## Usage

```ts
import { timeout } from '@echojs-ecosystem/utils/timeout'

const t = timeout(() => console.log('done'), 1000)
t.start()
t.stop()
t.dispose()
```

## Type Declarations

```ts
export const timeout: (callback: () => void, delay: number) => {
  start: () => void
  stop: () => void
  restart: () => void
  pending: () => boolean
  $pending: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `callback` | `() => void` | — | Runs after delay |
| `delay` | `number` | — | Milliseconds |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `start()` | `void` | Schedule callback (not auto-started) |
| `stop()` / `restart()` | `void` | Cancel or reschedule |
| `pending()` | `boolean` | Timer is active |
| `dispose()` | `void` | Clear timer |

### SSR

`start()` is a no-op on the server.
