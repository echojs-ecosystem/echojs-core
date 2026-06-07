---
title: Authentication
description:
  Session stores, persisted tokens, route guards, and login flows in EchoJS
  SPAs.
keywords: [auth, session, guardRoute, authorizationGuard, persist, cookie]
---

# Authentication

EchoJS has no built-in auth server — you integrate your API and keep **session
state** in stores, **persistence** in `@echojs-ecosystem/persist`, and **access
control** in the router. `apps/example` demonstrates a mock login you can
replace with real endpoints.

## Session shape

Split **token** (credential) and **user** (profile) so you can clear or refresh
them independently:

```ts
import { computed } from '@echojs-ecosystem/reactivity'
import { createStore } from '@echojs-ecosystem/store'
import { withCookie, withLocalStorage } from '@echojs-ecosystem/persist'

export type AuthUser = { id: string; email: string; name: string }

export const authTokenStore = createStore<string | null>(null, {
  name: 'auth-token',
}).extend(
  withCookie({
    key: 'echojs-access-token',
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  })
)

export const authUserStore = createStore<AuthUser | null>(null, {
  name: 'auth-user',
}).extend(withLocalStorage({ key: 'echojs-auth-user' }))

export const $isLoggedIn = computed(() => authTokenStore.value() != null)
export const $authUser = computed(() => authUserStore.value())
```

| Store | Storage        | Typical content                                            |
| ----- | -------------- | ---------------------------------------------------------- |
| Token | HTTP cookie    | JWT or session id (httpOnly set server-side when possible) |
| User  | `localStorage` | Display name, roles, avatar URL                            |

> [!DANGER] Never store refresh tokens or secrets in client-readable storage
> without threat modeling. Prefer **httpOnly** cookies set by your backend for
> primary session credentials.

## Login and logout

```ts
export const mockLogin = (input: { email: string; password: string }): void => {
  const email = input.email.trim()
  const token = `mock.${btoa(email)}.${Date.now()}`

  authTokenStore.set(token)
  authUserStore.set({
    id: `user-${email}`,
    email,
    name: email.split('@')[0] || 'User',
  })
}

export const logout = (): void => {
  void (async () => {
    authTokenStore.persist.pause()
    authUserStore.persist.pause()
    try {
      authTokenStore.set(null)
      authUserStore.set(null)
      await Promise.all([
        authTokenStore.persist.clear(),
        authUserStore.persist.clear(),
      ])
    } finally {
      authTokenStore.persist.resume()
      authUserStore.persist.resume()
    }
  })()
}
```

Wire login submit in a page model:

```ts
const res = await authLoginForm.submit(async (value) => {
  const ok = await api.login(value.email, value.password)
  if (!ok) throw new Error('Invalid credentials')
  mockLogin({ email: value.email, password: value.password })
})
if (res.ok) homePage.go()
```

Forms: [Forms guide](/docs/guides/forms). Example page:
`apps/example/src/pages/auth/login/`.

## Protect routes

### `guardRoute` (recommended for a few pages)

```ts
import { guardRoute } from '@echojs-ecosystem/router'
import { $isLoggedIn } from '@entities/session/index.js'
import { authLoginPage } from '@pages/auth/login/auth-login.page.js'
import { settingsPage } from '@pages/workspace/settings/workspace-settings.page.js'

guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
})
```

Load guards from `entities/__routes__/guards.ts` when the router module imports.

### `authorizationGuard` (app-wide)

```ts
createRouter({
  routes: appRoutes,
  authorizationGuard: {
    isAuthorized: () => $isLoggedIn.value(),
    allowedUnauthorizedPaths: ['/', '/auth/login', '/auth/signup'],
    redirectTo: '/auth/login',
    redirectWhenAuthorized: '/',
  },
})
```

Use for “entire app behind login” with a small public allowlist.

## Auth layout routes

Group login/signup under a shared shell:

```ts
export const appRoutes = createRoutes([
  {
    path: '/auth',
    name: 'auth',
    layoutView: authShellLayoutPage,
    children: [
      { path: 'login', name: 'auth-login', routeView: authLoginPage },
      { path: 'signup', name: 'auth-signup', routeView: authSignupPage },
    ],
  },
  // …
])
```

## Authenticated API calls

Attach the token in query/mutation `queryFn` or a thin `fetch` wrapper:

```ts
queryFn: async ({ signal }) => {
  const token = authTokenStore.value();
  const res = await fetch("/api/me", {
    signal,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }
  return res.json();
},
```

Invalidate user queries on logout; optional `beforeLoad` redirect if session is
missing.

## UI session block

Shell widgets can read `$authUser` / `$isLoggedIn` and call `authLoginPage.go()`
or `logout()` — see `apps/example/src/widgets/docs-shell/docs-sidebar.ts`.

## SSR and OAuth

This guide targets **client SPAs** (`createEchoApp` + `history: "browser"`). SSR
and OAuth redirects depend on your host (Node, edge, static). Keep callback URLs
on the server; exchange code for tokens server-side when possible.

## Related

- [Routing](/docs/guides/routing) — guards, auth routes
- [Persist](/docs/packages/persist/overview)
- [Forms](/docs/guides/forms)
- [Data fetching](/docs/guides/data-fetching) — 401 handling
- Example — `apps/example/src/entities/session/`,
  `entities/__routes__/guards.ts`
