---
title: localStorage
description: Persist and sync a value with `localStorage`.
package: '@echojs-ecosystem/utils'
keywords: [localStorage, utils]
---

@echojs-ecosystem/utils/local-storage

## Usage

```ts
import { localStorage as storage } from '@echojs-ecosystem/utils/local-storage'

const prefs = storage('echo:prefs', { theme: 'light' })
prefs.set({ theme: 'dark' })
prefs.remove()
prefs.dispose()
```

## Type Declarations

```ts
export interface LocalStorageOptions<T> {
  storage?: Storage
  serialize?: (value: T) => string
  deserialize?: (raw: string) => T
}

export const localStorage: <T>(
  key: string,
  initial: T,
  options?: LocalStorageOptions<T>,
) => {
  value: () => T
  set: (next: T) => void
  remove: () => void
  $value: Signal<T>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | Storage key |
| `initial` | `T` | — | Default when missing |
| `options.storage` | `Storage` | `localStorage` | Custom storage area |
| `options.serialize` | `(T) => string` | JSON.stringify | Custom encode |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` / `set()` | `T` | Read / write value |
| `remove()` | `void` | Delete key, reset to initial |
| `dispose()` | `void` | Remove `storage` event listener |

### SSR

Reads `initial` only — no `localStorage` on server.
