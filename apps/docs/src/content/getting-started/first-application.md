---
title: First Application
description: Bootstrap an EchoJS SPA with createEchoApp, providers, and client-side routing.
---

# First Application

This walkthrough mirrors `apps/docs` and `apps/example`: one HTML shell, one mount target, providers registered on `createEchoApp()`, and the router as the root view.

## 1. HTML entry

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My EchoJS App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/app/main.ts"></script>
  </body>
</html>
```

## 2. Main entry

`src/app/main.ts` loads global styles and calls bootstrap:

```ts
import "./styles/global.css";
import { bootstrap } from "./bootstrap.js";

void bootstrap();
```

## 3. Bootstrap with providers

`src/app/bootstrap.ts`:

```ts
import { createEchoApp } from "@echojs/framework/app";
import {
  queryProvider,
  routerProvider,
  uiProvider,
} from "./providers/index.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(routerProvider)
    .mount("#app");
```

`createEchoApp()`:

- awaits async `setup()` hooks on providers (when `awaitProviders` is true, default)
- resolves the **root view** from the router provider (or a custom `view` option)
- calls HyperDOM `render()` into `#app`
- returns `dispose()` for teardown

> [!NOTE]
> Order matters when providers depend on each other — register query/theme before router if routes read them in `beforeLoad`.

## 4. Router provider

`src/app/providers/router.ts` (simplified):

```ts
import { createRouterProvider } from "@echojs/router/hyperdom";
import { appRouter } from "../entities/__routes__/router.js";

export const routerProvider = createRouterProvider(appRouter);
```

`createRouterProvider` calls `router.start()` and exposes `router.View` as the app root.

## 5. Define routes

`src/entities/__routes__/app.routes.ts`:

```ts
import { createRoutes } from "@echojs/router";
import { homePage } from "@pages/home/home.page.js";

export const appRoutes = createRoutes([
  { path: "/", name: "home", routeView: homePage },
]);
```

```ts
// src/entities/__routes__/router.ts
import { createRouter } from "@echojs/router/hyperdom";
import { appRoutes } from "./app.routes.js";

export const appRouter = createRouter({
  history: "browser",
  routes: appRoutes,
});
```

## 6. First page (Model + View)

`src/pages/home/home.page.ts`:

```ts
import { createRouteView } from "@echojs/router";
import { bindModelView } from "@shared/ui/bind-model-view.js";
import { createHomeModel } from "./model/home.model.js";
import { HomeView } from "./ui/home.view.js";

export const homePage = createRouteView({
  name: "home",
  view: () => bindModelView(createHomeModel, HomeView),
});
```

`createHomeModel` returns signals and actions; `HomeView` receives the VM and returns HyperDOM nodes.

## 7. Navigate in the UI

```ts
import { NavLink } from "@echojs/router/hyperdom";
import { aboutPage } from "@pages/about/about.page.js";

NavLink({
  to: aboutPage,
  activeClass: "is-active",
  class: "nav-link",
  children: "About",
});
```

`NavLink` prevents default navigation and calls `aboutPage.go()` — **SPA navigation without a full reload**.

## 8. Run locally

```bash
bun install
bun run dev
```

Open the dev server URL from Vite. You should see client-side transitions when using `NavLink`.

## Try the lab

The `apps/example` project adds Hub → Docs Example / Workspace modules with nested layouts and lazy routes:

```bash
bun run dev --filter example
```
