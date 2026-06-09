---
title: online
description: Simple `navigator.onLine` reactive wrapper.
package: '@echojs-ecosystem/utils'
keywords: [online, utils]
---

@echojs-ecosystem/utils/online

## Usage

```ts
import { online } from '@echojs-ecosystem/utils/online'

const connection = online()
connection.value()
connection.dispose()
```

## Type Declarations

```ts
export const online: () => {
  value: () => boolean
  $value: Signal<boolean>
  dispose: () => void
}
```

## API

### Returns

`online()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `boolean` | Whether the browser is online |
| `$value` | `Signal<boolean>` | Reactive online state |
| `dispose()` | `void` | Remove `online` / `offline` listeners |
