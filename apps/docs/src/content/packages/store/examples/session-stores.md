---
title: Session Stores
description: Auth token and user stores with persist extensions from the example app.
package: "@echojs-ecosystem/store"
---

# Session Stores

Authentication state typically lives in module-level stores extended with **`@echojs-ecosystem/persist`** adapters — cookies for tokens, localStorage for preferences.

## Problem

Persist auth tokens across page reloads and clear them on logout without manual storage calls in every action.

## Pattern

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withCookie } from "@echojs-ecosystem/persist";

export const authTokenStore = createStore<string | null>(null, { name: "auth-token" }).extend(
  withCookie({ key: "echojs-access-token", path: "/", sameSite: "lax" }),
);
```

Persist hooks into `set` / `update` / `reset` — writes happen automatically when state changes.

## Logout and persist control

```ts
authTokenStore.reset();
authTokenStore.persist.clear(); // remove from storage
authTokenStore.persist.pause(); // stop syncing temporarily
authTokenStore.persist.resume();
```

## Live reference

| Resource | Path |
| --- | --- |
| Auth stores | `apps/example/src/entities/session/auth-store.ts` |

## See also

- [Persist package](/docs/packages/persist)
- [Persist Example: Auth Session](/docs/packages/persist/examples/auth-session)
- [Guides: HyperDOM Integration](/docs/packages/store/guides/hyperdom-integration)
