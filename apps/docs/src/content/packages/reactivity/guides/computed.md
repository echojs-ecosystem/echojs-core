---
title: Computed Values
description:
  Cached derived signals that recompute only when dependencies change.
package: '@echojs-ecosystem/reactivity'
---

# Computed Values

**Computed** signals derive a value from other reactive sources. They cache
results and recompute lazily when invalidated.

## Basic usage

```ts
import { computed, signal } from '@echojs-ecosystem/reactivity'

const $first = signal('Echo')
const $last = signal('JS')
const $fullName = computed(() => `${$first.value()} ${$last.value()}`)

$fullName.value() // "Echo JS" — tracked read
```

`computed` returns a **readonly** signal — no `.set()` / `.update()`.

## Lazy evaluation

A computed does not run its getter until something reads `.value()`. After a
dependency changes, the cached value is marked stale; the getter runs again on
the next read.

```ts
const $a = signal(1)
const $b = computed(() => {
  console.log('recompute')
  return $a.value() * 2
})

// nothing logged yet
$b.value() // logs "recompute", returns 2
$a.set(2)
// still cached until read
$b.value() // logs "recompute", returns 4
```

## Untracked reads inside getters

Use `.peek()` on inputs when you need a snapshot without adding a dependency:

```ts
const $theme = signal<'light' | 'dark'>('light')
const $label = computed(() => {
  const current = $theme.peek() // won't re-run when theme changes
  return `static-${current}`
})
```

## Prefer computed over manual sync

```ts
// Avoid — easy to forget updates
const $total = signal(0)
effect(() => $total.set($a.value() + $b.value()))

// Prefer
const $total = computed(() => $a.value() + $b.value())
```

## Related

- [Signals](/docs/packages/reactivity/guides/signals)
- [API: computed](/docs/packages/reactivity/api/computed)
