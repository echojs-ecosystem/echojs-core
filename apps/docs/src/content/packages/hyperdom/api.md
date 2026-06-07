---
title: API Reference
description: Complete @echojs-ecosystem/hyperdom public API index.
package: '@echojs-ecosystem/hyperdom'
---

# API Reference

Public exports from `@echojs-ecosystem/hyperdom`:

```ts
import {
  h,
  render,
  mount,
  createView,
  createModel,
  createComponent,
  Show,
  List,
  setStrictContextChecks,
  getStrictContextChecks,
  isInViewContext,
  isInModelContext,
  cx,
  on,
  aria,
  data,
  // DSL tags: div, button, span, section, input, ...
} from '@echojs-ecosystem/hyperdom'

import type { Child, Props, Component } from '@echojs-ecosystem/hyperdom'
```

Lifecycle subpath:

```ts
import { mount } from '@echojs-ecosystem/hyperdom/lifecycle/mount'
```

> [!NOTE] `mount` on the main entry is the **app mount helper**. Lifecycle
> `mount` is the **on-insert child hook** — different APIs, same name.

## Core

| Export                                       | Description                                      |
| -------------------------------------------- | ------------------------------------------------ |
| [h](/docs/packages/hyperdom/api/h)           | Hyperscript — intrinsic elements and components  |
| [render](/docs/packages/hyperdom/api/render) | Mount a view into a container; returns `dispose` |
| [mount](/docs/packages/hyperdom/api/mount)   | App mount helper — `{ node, dispose }`           |

## Lifecycle

| Export                                                         | Description                                   |
| -------------------------------------------------------------- | --------------------------------------------- |
| [lifecycle/mount](/docs/packages/hyperdom/api/lifecycle-mount) | After-insert child hook with optional cleanup |

## Model & view

| Export                                                          | Description                          |
| --------------------------------------------------------------- | ------------------------------------ |
| [createView](/docs/packages/hyperdom/api/create-view)           | View factory with view context       |
| [createModel](/docs/packages/hyperdom/api/create-model)         | Model factory with model context     |
| [createComponent](/docs/packages/hyperdom/api/create-component) | Bind model + view into `() => Child` |

## Control flow

| Export                                   | Description                |
| ---------------------------------------- | -------------------------- |
| [Show](/docs/packages/hyperdom/api/show) | Conditional dynamic region |
| [List](/docs/packages/hyperdom/api/list) | Collection dynamic region  |

## Context & helpers

| Export                                                       | Description                        |
| ------------------------------------------------------------ | ---------------------------------- |
| [Strict Context](/docs/packages/hyperdom/api/strict-context) | `setStrictContextChecks`, guards   |
| [DSL Tags](/docs/packages/hyperdom/api/dsl)                  | `div`, `button`, semantic tags, …  |
| [cx](/docs/packages/hyperdom/api/cx)                         | `cx`, `on`, `aria`, `data` helpers |

## Types

| Export                                     | Description                   |
| ------------------------------------------ | ----------------------------- |
| [Types](/docs/packages/hyperdom/api/types) | `Child`, `Props`, `Component` |

## Common errors

| Message                                         | Cause                                  |
| ----------------------------------------------- | -------------------------------------- |
| `h() called outside of view/render context`     | Strict mode + UI built at module scope |
| `mount() called outside of view/render context` | Lifecycle mount not inside a view      |

## Not in this package

- Virtual DOM / reconciliation
- JSX compiler (planned separately)
- Router (`@echojs-ecosystem/router/hyperdom`)

## Guides

Conceptual docs live under
[Guides & Concepts](/docs/packages/hyperdom/guides/important-defaults):

- [Important Defaults](/docs/packages/hyperdom/guides/important-defaults)
- [Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl)
- [Models & Components](/docs/packages/hyperdom/guides/models-and-components)
