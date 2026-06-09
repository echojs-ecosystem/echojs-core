---
title: Extensions
description: Extensions — Extensions API.
package: '@echojs-ecosystem/store'
keywords: [Extensions, store]
---

@echojs-ecosystem/store

## Usage

```ts
withActions({
  increment: (store) => () => store.update((v) => v + 1),
  add: (store) => (n: number) => store.update((v) => v + n),
})
```

## Type Declarations

```ts
withActions({
  increment: (store) => () => store.update((v) => v + 1),
  add: (store) => (n: number) => store.update((v) => v + n),
})
```

## API
