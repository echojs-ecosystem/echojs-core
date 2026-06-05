import type { Child } from "@echojs/hyperdom";
import { div, main, nav, render } from "@echojs/hyperdom";
import { createLayoutView, createRouteView, createRoutes } from "@echojs/router";
import { createRouter, NavLink } from "@echojs/router/hyperdom";

const homePage = createRouteView({
  name: "e2e-home",
  view: () => div({ "data-testid": "page-home" }, "Home page"),
});

const docsPageA = createRouteView({
  name: "e2e-docs-a",
  view: () => div({ "data-testid": "page-docs-a" }, "Docs page A"),
});

const docsPageB = createRouteView({
  name: "e2e-docs-b",
  view: () => div({ "data-testid": "page-docs-b" }, "Docs page B"),
});

const shellLayout = createLayoutView({
  name: "e2e-shell",
  view: ({ outlet }) =>
    div({ "data-testid": "docs-shell" }, [
      nav({ "data-testid": "docs-nav" }, [
        NavLink({ to: docsPageA, activeClass: "active", children: "Page A" }),
        NavLink({ to: docsPageB, activeClass: "active", children: "Page B" }),
        NavLink({ to: homePage, activeClass: "active", children: "Exit to home" }),
      ]),
      main({ "data-testid": "docs-main" }, () => outlet() as Child),
    ]) as Child,
});

const router = createRouter({
  history: "browser",
  routes: createRoutes([
    { path: "/", name: "home", routeView: homePage },
    {
      path: "/app",
      name: "app",
      layoutView: shellLayout,
      children: [
        { path: "a", name: "docs-a", routeView: docsPageA },
        { path: "b", name: "docs-b", routeView: docsPageB },
      ],
    },
  ]),
});

router.start();

const root = document.getElementById("app");
if (!root) throw new Error("#app mount target missing");

render(router.view() as () => Child, root);
