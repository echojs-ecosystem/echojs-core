---
title: Example
description: Auth session persistence with cookie and localStorage.
package: "@echojs/persist"
---

# Example — Persist

## Auth session (`apps/example`)

```ts
import { createStore } from "@echojs/store";
import { withCookie, withLocalStorage } from "@echojs/persist";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export const authTokenStore = createStore<string | null>(null, { name: "auth-token" }).extend(
  withCookie({
    key: "echojs-access-token",
    path: "/",
    sameSite: "lax",
    secure: false,
  }),
);

export const authUserStore = createStore<AuthUser | null>(null, { name: "auth-user" }).extend(
  withLocalStorage({
    key: "echojs-auth-user",
  }),
);
```

## Login / logout

```ts
export const mockLogin = (input: { email: string; password: string; name?: string }): void => {
  const email = input.email.trim();
  authTokenStore.set(`mock.${btoa(email)}.${Date.now()}`);
  authUserStore.set({
    id: `user-${email}`,
    email,
    name: input.name?.trim() || email.split("@")[0] || "User",
  });
};

export const logout = (): void => {
  void (async () => {
    authTokenStore.persist.pause();
    authUserStore.persist.pause();
    try {
      authTokenStore.set(null);
      authUserStore.set(null);
      await Promise.all([
        authTokenStore.persist.clear(),
        authUserStore.persist.clear(),
      ]);
    } finally {
      authTokenStore.persist.resume();
      authUserStore.persist.resume();
    }
  })();
};
```

## Theme in localStorage (minimal)

```ts
import { createStore } from "@echojs/store";
import { withLocalStorage } from "@echojs/persist";

export const themeStore = createStore("dark" as "dark" | "light").extend(
  withLocalStorage({ key: "app-theme", version: 1 }),
);
```

## Manual hydrate

```ts
const draft = createStore("").extend(
  withLocalStorage({ key: "draft", hydrate: false }),
);

await draft.persist.hydrate();
draft.set("Hello");
await draft.persist.save();
```

## Live app

| Resource | Path |
| --- | --- |
| Auth | `apps/example/src/entities/session/auth-store.ts` |
| Account demo | `apps/example` docs → account / persistence pages |

## See also

- Store Example — `/docs/packages/store/example`
- Usage — `/docs/packages/persist/usage`
