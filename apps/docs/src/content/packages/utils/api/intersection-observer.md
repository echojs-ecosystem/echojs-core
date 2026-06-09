---
title: intersectionObserver
description: Track whether an element intersects the viewport.
package: '@echojs-ecosystem/utils'
keywords: [intersectionObserver, utils]
---

@echojs-ecosystem/utils/intersection-observer

## Usage

```ts
import { intersectionObserver } from '@echojs-ecosystem/utils/intersection-observer'

const vis = intersectionObserver($el, { threshold: 0.5 })
vis.isIntersecting()
vis.entry()
vis.dispose()
```

## Type Declarations

```ts
export type IntersectionTarget = Element | null | undefined

export interface IntersectionObserverResult {
  isIntersecting: () => boolean
  entry: () => IntersectionObserverEntry | null
  $isIntersecting: ReadonlySignal<boolean>
  $entry: ReadonlySignal<IntersectionObserverEntry | null>
  dispose: () => void
}

export const intersectionObserver: (
  target: MaybeSignalOrGetter<IntersectionTarget>,
  options?: IntersectionObserverInit,
) => IntersectionObserverResult
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeSignalOrGetter<Element>` | — | Observed element |
| `options` | `IntersectionObserverInit` | — | Observer options |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `isIntersecting()` | `boolean` | Latest intersection flag |
| `entry()` | `IntersectionObserverEntry \| null` | Latest entry |
| `dispose()` | `void` | Disconnect observer |
