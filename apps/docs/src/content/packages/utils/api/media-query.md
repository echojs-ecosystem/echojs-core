---
title: mediaQuery
description: Track whether a CSS media query currently matches.
package: '@echojs-ecosystem/utils'
keywords: [mediaQuery, utils]
---

@echojs-ecosystem/utils/media-query

## Usage

```ts
import { mediaQuery } from '@echojs-ecosystem/utils/media-query'

const dark = mediaQuery('(prefers-color-scheme: dark)')
if (dark.matches()) { /* … */ }
dark.dispose()
```

## Type Declarations

```ts
export interface MediaQueryOptions {
  window?: Window
}

export const mediaQuery: (
  query: string,
  options?: MediaQueryOptions,
) => {
  matches: () => boolean
  $matches: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `query` | `string` | — | Valid CSS media query string |
| `options.window` | `Window` | `defaultWindow` | Window for `matchMedia` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `matches()` | `boolean` | Whether the query matches now |
| `$matches` | `Signal<boolean>` | Reactive match state |
| `dispose()` | `void` | Remove `change` listener |
