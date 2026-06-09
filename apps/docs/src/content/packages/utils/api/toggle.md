---
title: toggle
description: Boolean state with `on`, `off`, `toggle`, `set`.
package: '@echojs-ecosystem/utils'
keywords: [toggle, utils]
---

@echojs-ecosystem/utils/toggle

## Usage

```ts
import { toggle } from '@echojs-ecosystem/utils/toggle'

const panel = toggle(false)
panel.on()
panel.toggle()
panel.value()
```

## Type Declarations

```ts
export const toggle: (initial?: boolean) => {
  value: () => boolean
  on: () => void
  off: () => void
  toggle: () => void
  set: (next: boolean) => void
  $value: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `boolean` | `false` | Starting value |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `boolean` | Current state |
| `on` / `off` / `toggle` / `set` | `void` | Mutate state |
| `dispose()` | `void` | No-op |
