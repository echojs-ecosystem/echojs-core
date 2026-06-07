---
title: API Reference
description: Complete @echojs-ecosystem/store public API index.
package: '@echojs-ecosystem/store'
---

# API Reference

Public exports from `@echojs-ecosystem/store`:

```ts
import {
  createStore,
  select,
  combine,
  readonly,
  withActions,
  withDebug,
  withReadonly,
  batch,
} from '@echojs-ecosystem/store'

import type {
  Store,
  ReadonlyStore,
  StoreOptions,
  StoreEvent,
  StoreExtension,
} from '@echojs-ecosystem/store'
```

## Factories

| Export                                               | Description                 |
| ---------------------------------------------------- | --------------------------- |
| [createStore](/docs/packages/store/api/create-store) | Writable reactive store     |
| [select](/docs/packages/store/api/select)            | Derived readonly projection |
| [combine](/docs/packages/store/api/combine)          | Merge multiple stores       |

## Extensions

| Export                                            | Description                                                    |
| ------------------------------------------------- | -------------------------------------------------------------- |
| [Extensions](/docs/packages/store/api/extensions) | `withActions`, `withDebug`, `withReadonly`, custom `.extend()` |

## Readonly

| Export                                        | Description                       |
| --------------------------------------------- | --------------------------------- |
| [readonly](/docs/packages/store/api/readonly) | Readonly view of a writable store |

## Utilities

| Export      | Description                                   |
| ----------- | --------------------------------------------- |
| `batch(fn)` | Re-export from `@echojs-ecosystem/reactivity` |

## Not in this package

| Concern                                     | Package                       |
| ------------------------------------------- | ----------------------------- |
| localStorage / session / cookie / IndexedDB | `@echojs-ecosystem/persist`   |
| URL query sync                              | `@echojs-ecosystem/url-state` |
| Server cache / fetch                        | `@echojs-ecosystem/query`     |

## Guides

Conceptual docs live under
[Guides & Concepts](/docs/packages/store/guides/creating-stores):

- [Creating Stores](/docs/packages/store/guides/creating-stores)
- [Actions](/docs/packages/store/guides/actions)
- [Derived State](/docs/packages/store/guides/derived-state)
