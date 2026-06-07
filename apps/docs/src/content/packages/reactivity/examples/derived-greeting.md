---
title: Derived Greeting
description: Chain computed signals to derive display strings from form inputs.
package: '@echojs-ecosystem/reactivity'
---

# Derived Greeting

Two input signals feed a **full name** computed, which feeds a **greeting**
computed — no manual sync when fields change.

## Problem

Display derived text (full name, greeting, validation message) that always stays
in sync with editable inputs.

## Model

```ts
import { computed, signal } from '@echojs-ecosystem/reactivity'
import type { ReadonlySignal, Signal } from '@echojs-ecosystem/reactivity'
import { createModel } from '@echojs-ecosystem/hyperdom'

export interface GreetingVM {
  $firstName: Signal<string>
  $lastName: Signal<string>
  $fullName: ReadonlySignal<string>
  $greeting: ReadonlySignal<string>
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

export const createGreetingModel = createModel((): GreetingVM => {
  const $firstName = signal('Echo')
  const $lastName = signal('JS')

  const $fullName = computed(() =>
    `${$firstName.value().trim()} ${$lastName.value().trim()}`.trim()
  )

  const $greeting = computed(() => {
    const name = $fullName.value()
    return name.length > 12
      ? `Long name: ${name}`
      : `Hello, ${name || 'guest'}!`
  })

  return {
    $firstName,
    $lastName,
    $fullName,
    $greeting,
    setFirstName: (value) => $firstName.set(value),
    setLastName: (value) => $lastName.set(value),
  }
}, 'GreetingModel')
```

## View sketch

```ts
input({
  value: () => vm.$firstName.value(),
  onInput: (e) => vm.setFirstName(e.target.value),
})

p(null, () => vm.$greeting.value())
```

Both inputs and the greeting paragraph re-run independently — only affected
nodes update.

## Takeaways

- Stack `computed` values instead of syncing with `effect()`
- Computed getters should be **pure** — no side effects inside
- Export `ReadonlySignal` types for derived fields on the VM

## Related

- [Guides: Computed Values](/docs/packages/reactivity/guides/computed)
- [API: computed](/docs/packages/reactivity/api/computed)
