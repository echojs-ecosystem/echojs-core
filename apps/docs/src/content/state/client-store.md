---
title: Client store
description: Shared in-memory client state with createStore, actions, and optional persist.
keywords: [createStore, persist, session, theme]
---

# Client store

**Client store** is **mutable state that lives only in the browser** and is shared across routes or features: theme, sidebar collapsed, session snapshot, wizard step not in the URL. It uses `@echojs-ecosystem/store` (signals under the hood) — not server cache ([server state](/docs/state/server-state)) and not field trees ([form state](/docs/state/form-state)).

## When to use a store

| Use `createStore` | Do not use store |
| --- | --- |
| Session / auth profile | API product catalog |
| Theme, density, locale override | Route param `:id` |
| Cross-route UI prefs | Form inputs before submit |
| Cart id (client-held) | Paginated list from API |

> [!RECOMMENDATION]
> Default to [local UI state](/docs/state/local-ui-state) in a model. Promote to store only when a second unrelated module must read the same value.

## Basic store

```ts
import { createStore, withActions } from "@echojs-ecosystem/store";

export const themeStore = createStore<"light" | "dark">("dark", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === "dark" ? "light" : "dark")),
  }),
);

themeStore.value();
themeStore.toggle();
```

Subscribe for side effects: `themeStore.changed.watch(...)`.

## Derived reads

```ts
import { computed } from "@echojs-ecosystem/reactivity";

export const $isLoggedIn = computed(() => authTokenStore.value() != null);
```

Computed bridges store → router guards and views without duplicating token in another store.

## Persist (`@echojs-ecosystem/persist`)

Survive reload — **still client state**, hydrated from storage:

```ts
import { withLocalStorage, withCookie } from "@echojs-ecosystem/persist";

export const authTokenStore = createStore<string | null>(null).extend(
  withCookie({ key: "echojs-access-token", path: "/", sameSite: "lax" }),
);

export const authUserStore = createStore<AuthUser | null>(null).extend(
  withLocalStorage({ key: "echojs-auth-user" }),
);
```

On logout, pause persist → clear → resume (see [Authentication](/docs/guides/authentication)).

Form fields can use persist too — that is still [form state](/docs/state/form-state), not a global store pattern.

## Store vs server state after login

```ts
// Client store — who is logged in
authUserStore.set(user);

// Server state — fetch their orders
const orders = ordersQuery.with(() => ({ userId: user.id }));
```

Invalidate queries on logout; clear stores in one place.

## vs URL state

| Store | URL |
| --- | --- |
| Not shareable by link | Bookmarkable |
| Rich objects | Serialized scalars/enums |
| Private prefs | Public filters |

If marketing wants `?utm=...` tracked, URL state or router query — not a hidden store.

## Related

- [State overview](/docs/state/overview)
- [Store package](/docs/packages/store/usage)
- [Persist package](/docs/packages/persist/usage)
- Example session — `apps/example/src/entities/session/auth-store.ts`
