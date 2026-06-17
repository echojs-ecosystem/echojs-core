import { signal } from "@echojs-ecosystem/reactivity";

import { createLayoutView } from "../core/create-layout-view";
import { createRoute } from "../core/create-route";
import { createRouteView } from "../core/create-route-view";
import { createRouter } from "../core/create-router";
import { getRouterInternal } from "../core/router";
import { describe, expect, it } from "vitest";

describe("createRouter guards", () => {
  it("redirects when canOpen is false", () => {
    const privateRoute = createRoute("private");
    const login = createRoute("login");
    let allowed = false;

    const router = createRouter({
      routes: [
        { path: "/private", name: "private", route: privateRoute },
        { path: "/login", name: "login", route: login },
      ],
      history: "memory",
      guards: [
        {
          route: privateRoute,
          canOpen: () => allowed,
          otherwise: login,
        },
      ],
    });

    router.start();
    router.go("/private");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");

    allowed = true;
    router.go("/private");
    expect(privateRoute.$isOpened.peek()).toBe(true);
  });

  it("allows navigation when canOpen is true", () => {
    const dashboard = createRoute("dashboard");
    const login = createRoute("login");

    const router = createRouter({
      routes: [
        { path: "/dashboard", name: "dashboard", route: dashboard },
        { path: "/login", name: "login", route: login },
      ],
      history: "memory",
      guards: [{ route: dashboard, canOpen: () => true, otherwise: login }],
    });

    router.start();
    router.go("/dashboard");
    expect(dashboard.$isOpened.peek()).toBe(true);
    expect(getRouterInternal(router).history.getLocation()).toBe("/dashboard");
  });

  it("layout guard protects all nested child routes", () => {
    const login = createRouteView({ name: "login", view: () => "login" });
    const adminLayout = createLayoutView({
      name: "admin",
      view: ({ outlet }) => outlet(),
    });
    const orders = createRouteView({ name: "orders", view: () => "orders" });
    const $auth = signal(false);

    const router = createRouter({
      history: "memory",
      routes: [
        { path: "/login", name: "login", routeView: login },
        {
          path: "/admin",
          name: "admin",
          layoutView: adminLayout,
          children: [{ path: "orders", name: "orders", routeView: orders }],
        },
      ],
      guards: [{ route: adminLayout, canOpen: () => $auth.value(), otherwise: login }],
    });

    router.start();
    router.go("/admin/orders");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");
    expect(orders.$isOpened.peek()).toBe(false);

    $auth.set(true);
    router.go("/admin/orders");
    expect(orders.$isOpened.peek()).toBe(true);
    expect(getRouterInternal(router).history.getLocation()).toBe("/admin/orders");
  });

  it("login guard redirects authenticated users away from guest route", () => {
    const login = createRouteView({ name: "login", view: () => "login" });
    const dashboard = createRouteView({ name: "dashboard", view: () => "dashboard" });
    const $auth = signal(true);

    const router = createRouter({
      history: { type: "memory", initial: "/login" },
      routes: [
        { path: "/login", name: "login", routeView: login },
        { path: "/dashboard", name: "dashboard", routeView: dashboard },
      ],
      guards: [{ route: login, canOpen: () => !$auth.value(), otherwise: dashboard }],
    });

    router.start();
    expect(getRouterInternal(router).history.getLocation()).toBe("/dashboard");
    expect(dashboard.$isOpened.peek()).toBe(true);
  });

  it("runs parent layout guard before leaf guard", () => {
    const login = createRouteView({ name: "login", view: () => "login" });
    const adminLayout = createLayoutView({
      name: "admin",
      view: ({ outlet }) => outlet(),
    });
    const settings = createRouteView({ name: "settings", view: () => "settings" });
    const $auth = signal(true);
    let canOpenSettings = false;

    const router = createRouter({
      history: "memory",
      routes: [
        { path: "/login", name: "login", routeView: login },
        {
          path: "/admin",
          name: "admin",
          layoutView: adminLayout,
          children: [{ path: "settings", name: "settings", routeView: settings }],
        },
      ],
      guards: [
        { route: adminLayout, canOpen: () => $auth.value(), otherwise: login },
        { route: settings, canOpen: () => canOpenSettings, otherwise: login },
      ],
    });

    router.start();
    router.go("/admin/settings");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");

    canOpenSettings = true;
    router.go("/admin/settings");
    expect(settings.$isOpened.peek()).toBe(true);
  });

  it("unregister guard stops redirecting", () => {
    const privateRoute = createRoute("private");
    const login = createRoute("login");

    const router = createRouter({
      routes: [
        { path: "/private", name: "private", route: privateRoute },
        { path: "/login", name: "login", route: login },
      ],
      history: "memory",
    });

    const unregister = router.addGuard({
      route: privateRoute,
      canOpen: () => false,
      otherwise: login,
    });

    router.start();
    router.go("/private");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");

    unregister();
    router.go("/private");
    expect(privateRoute.$isOpened.peek()).toBe(true);
  });

  it("isolates guards per router instance", () => {
    const a = createRoute("a");
    const b = createRoute("b");
    const gate = createRoute("gate");

    const routerA = createRouter({
      routes: [
        { path: "/a", name: "a", route: a },
        { path: "/gate", name: "gate", route: gate },
      ],
      history: "memory",
      guards: [{ route: a, canOpen: () => false, otherwise: gate }],
    });

    const routerB = createRouter({
      routes: [{ path: "/b", name: "b", route: b }],
      history: "memory",
    });

    routerA.start();
    routerB.start();

    routerA.go("/a");
    routerB.go("/b");

    expect(getRouterInternal(routerA).history.getLocation()).toBe("/gate");
    expect(b.$isOpened.peek()).toBe(true);
  });
});
