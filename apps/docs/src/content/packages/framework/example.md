---
title: Examples
description: createEchoApp bootstrap patterns from apps/docs and apps/example.
package: '@echojs-ecosystem/framework'
---

# Examples

Focused wiring patterns for real EchoJS apps. Each example shows provider
registration and bootstrap entry points.

> [!tip] Live reference implementations: `apps/docs/src/app/bootstrap.ts`,
> `apps/example/src/app/bootstrap.ts`.

## Pick an example

| Example                                                      | Teaches                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [Minimal App](/docs/packages/framework/examples/minimal-app) | Query + router providers, `body` attributes              |
| [With Router](/docs/packages/framework/examples/with-router) | Custom `resolveRoot` — docs chrome outside `router.View` |
| [With Query](/docs/packages/framework/examples/with-query)   | Full docs site provider stack                            |
| [With i18n](/docs/packages/framework/examples/with-i18n)     | `createProvider` theme wrapper                           |

## Teardown

All examples return a disposer from `mount()`:

```ts
const dispose = await bootstrap()
dispose()
```

## Related

- [Guides & Concepts](/docs/packages/framework/guides/important-defaults)
- [Functions](/docs/packages/framework/functions)
