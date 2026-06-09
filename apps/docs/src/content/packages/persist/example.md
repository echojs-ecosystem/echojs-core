---
title: Examples
description:
  Theme persistence and auth session patterns with @echojs-ecosystem/persist.
package: '@echojs-ecosystem/persist'
---

# Examples

Focused patterns for persisting Echo stores. Each example shows **store setup**,
then **lifecycle** (login, logout, manual hydrate).

## Pick an example

| Example                                                      | Teaches                                                          |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| [Theme Store](/docs/packages/persist/examples/theme-store)   | Minimal `withLocalStorage` on a theme store                      |
| [Auth Session](/docs/packages/persist/examples/auth-session) | Cookie token + localStorage profile, logout with `pause`/`clear` |

## Shared pattern

Attach persistence via `.extend()` on a `createStore` instance:

```ts
export const themeStore = createStore('dark').extend(
  withLocalStorage({ key: 'app-theme', version: 1 })
)
```

See [Important Defaults](/docs/packages/persist/guides/important-defaults) for
the persist controller and record envelope.

## Related

- [Guides & Concepts](/docs/packages/persist/guides/important-defaults)
- [Functions](/docs/packages/persist/functions)
- [Store Examples](/docs/packages/store/example)
