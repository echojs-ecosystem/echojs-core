---
title: Strict Context
description: setStrictContextChecks, isInViewContext, isInModelContext — UI construction guardrails.
package: "@echojs-ecosystem/hyperdom"
---

# Strict Context

HyperDOM can enforce that UI construction runs inside the correct scope. Default is **enabled** (`strictContextChecks = true`).

## Exports

```ts
function setStrictContextChecks(enabled: boolean): void
function getStrictContextChecks(): boolean
function isInViewContext(): boolean
function isInModelContext(): boolean
```

## setStrictContextChecks

```ts
import { setStrictContextChecks } from "@echojs-ecosystem/hyperdom";

setStrictContextChecks(true);  // default
```

EchoJS apps typically set this via `createEchoApp({ strictContextChecks: true })`.

## Context guards

| Export | `true` when |
| --- | --- |
| `isInViewContext()` | Inside `createView` or active render |
| `isInModelContext()` | Inside `createModel` factory |

Useful for assertions in shared utilities.

## What strict mode guards

| API | Error if outside scope |
| --- | --- |
| `h()` | `h() called outside of view/render context` |
| lifecycle `mount()` | `mount() called outside of view/render context` |

## Valid scopes

- `createView((vm) => …)` callback
- View passed to `render()` / `mount()`
- Active cleanup scope during tree activation

## See also

- [Guides: Important Defaults](/docs/packages/hyperdom/guides/important-defaults)
- [createView](/docs/packages/hyperdom/api/create-view)
- [createModel](/docs/packages/hyperdom/api/create-model)
