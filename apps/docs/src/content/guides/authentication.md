---
title: Authentication
description:
  Session stores, persisted tokens, route guards, and login flows in EchoJS
  SPAs.
keywords: [auth, session, guards, persist, cookie]
---

# Authentication

EchoJS has no built-in auth server — you integrate your API and keep **session
state** in stores, **persistence** in `@echojs-ecosystem/persist`, and **access
control** in the router. `apps/example` demonstrates a mock login you can replace
with real endpoints.

> [!TIP] Session reads use `computed` and stores — see
> [Reactivity](/docs/guides/reactivity). Guards read `$isLoggedIn.value()` the
> same way as any reactive guard.

## End-to-end flow

```
Login form submit → API → token + user stores → persist adapters
       ↓
createRouter guards read $isLoggedIn
       ↓
Authenticated queries attach Bearer token → 401 → logout + redirect
```

| Step            | Layer        | Guide                          |
| --------------- | ------------ | ------------------------------ |
| Collect credentials | Form     | [Forms](/docs/guides/forms)    |
| Call API        | Model/mutation | [Data fetching](/docs/guides/data-fetching) |
| Store session   | Store + persist | this guide                  |
| Block routes    | Router guards | [Routing](/docs/guides/routing) |

## Session shape

Split **token** (credential) and **user** (profile):

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

Place session module in **`entities/session/`** — imported by guards, shell
widgets, and API layers.

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

Wire login in a page model:

```ts
const res = await authLoginForm.submit(async (value) => {
  const ok = await api.login(value.email, value.password)
  if (!ok) throw new Error('Invalid credentials')
  mockLogin({ email: value.email, password: value.password })
})
if (res.ok) homePage.go()
```

Example: `apps/example/src/pages/auth/login/`.

## Protect routes

Declare guards in `createRouter`:

```ts
import type { GuardRouteOptions } from '@echojs-ecosystem/router'
import { $isLoggedIn } from '@entities/session/index.js'
import { authLoginPage } from '@pages/auth/login/auth-login.page.js'
import { settingsPage } from '@pages/workspace/settings/workspace-settings.page.js'

export const appGuards: GuardRouteOptions[] = [
  {
    route: settingsPage,
    canOpen: () => $isLoggedIn.value(),
    otherwise: authLoginPage,
  },
]

createRouter({
  routes: appRoutes,
  guards: appGuards,
})
```

Keep guard definitions in `app/router/guards.ts` and pass the array into `createRouter`.

### `beforeLoad` gate

For data-heavy protected areas, combine guard with loader:

```ts
beforeLoad: async () => {
  if (!$isLoggedIn.value()) throw redirect(authLoginPage)
  await sessionQuery.prefetch()
}
```

See [Routing](/docs/guides/routing#beforeload-and-route-data).

## Auth layout routes

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
])
```

Public auth shell without app sidebar — redirect authenticated users away via
`redirectWhenAuthorized` or layout `beforeLoad`.

## Authenticated API calls

Centralize headers in network client or query defaults:

```ts
queryFn: async ({ signal }) => {
  const token = authTokenStore.value()
  const res = await fetch('/api/me', {
    signal,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (res.status === 401) {
    logout()
    throw new Error('Unauthorized')
  }
  return res.json()
}
```

On logout:

- Clear session stores (with persist pause).
- `queryClient.clear()` or invalidate user-scoped keys.
- Navigate to login with `authLoginPage.go({ replace: true })`.

## UI session block

Shell widgets read `$authUser` / `$isLoggedIn`:

```ts
Show(
  () => $isLoggedIn.value(),
  () => UserMenu({ user: $authUser.value()! }),
  () => NavLink({ to: authLoginPage, children: 'Sign in' })
)
```

See `apps/example/src/widgets/docs-shell/docs-sidebar.ts`.

## Token refresh (optional)

Pattern for short-lived access + refresh token (server-mediated):

1. Access token in memory or short-lived cookie.
2. Refresh via httpOnly cookie endpoint — not in localStorage.
3. On 401, single-flight refresh then retry query; on failure, `logout()`.

Implement in network middleware — [Network HTTP](/docs/packages/network-http).

## SSR and OAuth

This guide targets **client SPAs** (`createEchoApp` + `history: 'browser'`).
SSR and OAuth redirects depend on your host. Exchange authorization codes
**server-side**; SPA receives session via cookie or short-lived token.

## Checklist

1. `entities/session/` — stores, `$isLoggedIn`, `logout`.
2. Persist adapters with pause/clear on logout.
3. Login form + model submit ([Forms](/docs/guides/forms)).
4. Guards registered at router startup.
5. API layer attaches token; 401 triggers logout.
6. Query cache cleared on logout.

## Related

- [Reactivity](/docs/guides/reactivity) — `$isLoggedIn` computed
- [Routing](/docs/guides/routing) — guards, auth routes
- [Forms](/docs/guides/forms) — login form
- [Data fetching](/docs/guides/data-fetching) — 401, mutations
- [Persist](/docs/packages/persist)
- Example — `apps/example/src/entities/session/`,
  `entities/__routes__/guards.ts`
