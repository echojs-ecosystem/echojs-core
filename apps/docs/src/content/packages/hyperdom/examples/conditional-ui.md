---
title: Conditional UI
description: Show helper for login vs dashboard branches.
package: '@echojs-ecosystem/hyperdom'
---

# Conditional UI

Use `Show` when a boolean signal drives which branch renders — cleaner than
inline `() => cond ? a() : b()` for named regions.

## Problem

Switch between two UI branches when `$loggedIn` changes, without re-mounting the
whole page.

## Code

```ts
import { Show, div } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

const $loggedIn = signal(false)

const app = () =>
  div(null, [
    Show(
      () => $loggedIn.value(),
      () => dashboard(),
      () => loginForm()
    ),
  ])
```

Omit the third argument when no fallback is needed:

```ts
Show(
  () => $hasError.value(),
  () => errorBanner()
)
```

## With createView

```ts
export const AppView = createView(
  (vm) =>
    main(null, [
      Show(
        () => vm.isLoggedIn(),
        () => vm.dashboard(),
        () => vm.loginForm()
      ),
    ]),
  'AppView'
)
```

## Takeaways

- All three callbacks are getters — dependencies track automatically
- `Show` returns `() => Child` — valid as a direct child
- For simple inline ternaries, `() => ($open.value() ? panel() : null)` also
  works — see
  [Reactive Children](/docs/packages/hyperdom/guides/reactive-children)

## Related

- [Guides: Show & List](/docs/packages/hyperdom/guides/show-and-list)
- [API: Show](/docs/packages/hyperdom/api/show)
