---
title: activeElement
description: Signal-native tracking of `document.activeElement` on `focusin` / `focusout`.
package: '@echojs-ecosystem/utils'
keywords: [activeElement, focus, browser]
---

@echojs-ecosystem/utils/active-element

## Usage

:::util-demo active-element

```ts
import { activeElement } from '@echojs-ecosystem/utils/active-element'

const active = activeElement()
active.value()
active.$value
active.dispose()
```

## Type Declarations

```ts
import type { ReadonlySignal } from '@echojs-ecosystem/reactivity'

export interface ActiveElementResult {
  value: () => Element | null
  $value: ReadonlySignal<Element | null>
  dispose: () => void
}

export const activeElement: () => ActiveElementResult
```

## API

### Returns

`activeElement()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `Element \| null` | Current `document.activeElement` (non-tracking read via `peek`) |
| `$value` | `ReadonlySignal<Element \| null>` | Reactive signal for bindings |
| `dispose()` | `void` | Remove `focusin` / `focusout` listeners |

### SSR

On the server `value()` is `null` — no listeners until the client.

### Related

- [focus](/docs/packages/utils/api/focus)
- [eventListener](/docs/packages/utils/api/event-listener)
