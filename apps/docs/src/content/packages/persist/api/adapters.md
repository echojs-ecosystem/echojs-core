---
title: Adapters
description: Low-level create*StorageAdapter factories.
package: '@echojs-ecosystem/persist'
keywords: [Adapters, persist]
---

@echojs-ecosystem/persist

## Usage

```ts
const adapter = {
  kind: 'custom',
  getItem: (key) => external.get(key),
  setItem: (key, value) => external.set(key, value),
  removeItem: (key) => external.delete(key),
}

createStore(0).extend(withStorage(adapter, { key: 'counter' }))
```

## Type Declarations

```ts
const adapter = {
  kind: 'custom',
  getItem: (key) => external.get(key),
  setItem: (key, value) => external.set(key, value),
  removeItem: (key) => external.delete(key),
}

createStore(0).extend(withStorage(adapter, { key: 'counter' }))
```

## API
