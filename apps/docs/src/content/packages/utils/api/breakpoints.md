---
title: breakpoints
description: Map viewport width to named breakpoints.
package: '@echojs-ecosystem/utils'
keywords: [breakpoints, utils]
---

@echojs-ecosystem/utils/breakpoints

## Usage

```ts
import { breakpoints } from '@echojs-ecosystem/utils/breakpoints'

const bp = breakpoints({ sm: 640, md: 768, lg: 1024 })
bp.current()           // e.g. "md"
bp.greaterOrEqual('md')
bp.dispose()
```

## Type Declarations

```ts
export type BreakpointsMap = Record<string, number>

export interface BreakpointsOptions {
  breakpoints?: BreakpointsMap
  window?: Window
}

export const breakpoints: (options?: BreakpointsOptions) => {
  current: () => string
  $current: ComputedSignal<string>
  greaterOrEqual: (name: string) => boolean
  smaller: (name: string) => boolean
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options.breakpoints` | `BreakpointsMap` | sm/md/lg/… defaults | Name → min width in px |
| `options.window` | `Window` | `defaultWindow` | Window for `innerWidth` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `current()` | `string` | Largest matching breakpoint name |
| `greaterOrEqual(name)` | `boolean` | `innerWidth >= breakpoints[name]` |
| `smaller(name)` | `boolean` | `innerWidth < breakpoints[name]` |
| `dispose()` | `void` | Remove `resize` listener |
