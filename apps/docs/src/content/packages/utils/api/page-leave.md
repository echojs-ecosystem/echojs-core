---
title: pageLeave
description: Fire when the pointer leaves the document.
package: '@echojs-ecosystem/utils'
keywords: [pageLeave, utils]
---

@echojs-ecosystem/utils/page-leave

## Usage

```ts
import { pageLeave } from '@echojs-ecosystem/utils/page-leave'

const leave = pageLeave(() => pauseVideo())
leave.dispose()
```

## Type Declarations

```ts
export const pageLeave: (handler: () => void) => { dispose: () => void }
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `handler` | `() => void` | — | Called on `mouseleave` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `dispose()` | `void` | Remove listener |
