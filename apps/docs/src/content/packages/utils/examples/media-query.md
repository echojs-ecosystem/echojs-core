---
title: Media Query
description: React to CSS media queries with mediaQuery.
package: '@echojs-ecosystem/utils'
---

# Media Query

Track `prefers-color-scheme`, breakpoints, or any valid media string.

```ts
import { mediaQuery } from '@echojs-ecosystem/utils/media-query'

const prefersDark = mediaQuery('(prefers-color-scheme: dark)')
const isWide = mediaQuery('(min-width: 1024px)')

if (prefersDark.matches()) {
  applyDarkTheme()
}

// HyperDOM — bind the signal
prefersDark.$matches

prefersDark.dispose()
```

## With colorScheme

`colorScheme('auto')` already listens to `prefers-color-scheme`. Use
`mediaQuery` when you only need a boolean flag without mutating
`document.documentElement`.

## SSR

On the server `matches()` is `false` until the client runs `matchMedia`. Do not
rely on media query results for critical SSR markup — use CSS or hydrate on the
client.
