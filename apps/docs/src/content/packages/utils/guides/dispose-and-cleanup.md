---
title: Dispose & Cleanup
description: Teardown listeners, timers, and observers from utils composables.
package: '@echojs-ecosystem/utils'
---

# Dispose & Cleanup

Any composable that registers browser listeners, timers, or observers exposes
`dispose()`.

## Basic usage

```ts
const size = windowSize()

// when the feature unmounts or model is destroyed:
size.dispose()
```

## Grouping with createCleanupScope

```ts
import { createCleanupScope } from '@echojs-ecosystem/utils'
import { windowSize } from '@echojs-ecosystem/utils/window-size'
import { online } from '@echojs-ecosystem/utils/online'

const scope = createCleanupScope()

const size = windowSize()
const online = online()

scope.add(() => size.dispose())
scope.add(() => online.dispose())

// later
scope.dispose()
```

## With @echojs-ecosystem/reactivity scope

Inside `scope()` from reactivity, prefer `cleanup()` for nested teardown. Utils
`dispose()` is standalone and does not require an active reactivity scope.

## Idempotent dispose

Calling `dispose()` twice is safe — subsequent calls are no-ops.
