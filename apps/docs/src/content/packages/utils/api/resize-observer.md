---
title: resizeObserver
description: Low-level `ResizeObserver` on a reactive target.
package: '@echojs-ecosystem/utils'
keywords: [resizeObserver, utils]
---

@echojs-ecosystem/utils/resize-observer

## Usage

```ts
import { resizeObserver } from '@echojs-ecosystem/utils/resize-observer'

const ro = resizeObserver($el, (entries) => {
  console.log(entries[0]?.contentRect)
})
ro.dispose()
```

## Type Declarations

```ts
export type ResizeObserverTarget = Element | null | undefined

export const resizeObserver: (
  target: MaybeSignalOrGetter<ResizeObserverTarget>,
  callback: ResizeObserverCallback,
) => { dispose: () => void }
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeSignalOrGetter<Element>` | — | Observed element |
| `callback` | `ResizeObserverCallback` | — | Resize handler |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `dispose()` | `void` | Disconnect observer |
