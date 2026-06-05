import { beforeEach, describe, expect, it } from "vitest";
import { createRoute } from "./create-route";
import { createRouter } from "./create-router";
import { getRouterInternal } from "./router";
import { clearGuards } from "../operators/guard";
import { signal } from "@echojs-ecosystem/reactivity";
import { r } from "../test-utils";

describe("authorizationGuard", () => {
  beforeEach(() => clearGuards());

  it("allows only guest paths when unauthorized", () => {
    const home = createRoute("home");
    const login = createRoute("login");
    const settings = createRoute("settings");
    const $auth = signal(false);
    const router = createRouter({
      routes: [r("/", home), r("/login", login), r("/settings", settings)],
      history: "memory",
      authorizationGuard: {
        isAuthorized: () => $auth.value(),
        allowedUnauthorizedPaths: ["/login", "/"],
        redirectTo: "/login",
      },
    });

    router.start();
    router.navigate("/settings");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");
    expect(settings.$isOpened.peek()).toBe(false);
  });

  it("redirects authorized user away from guest paths", () => {
    const login = createRoute("login");
    const dashboard = createRoute("dashboard");
    const $auth = signal(true);
    const router = createRouter({
      routes: [r("/login", login), r("/dashboard", dashboard)],
      history: { type: "memory", initial: "/login" },
      authorizationGuard: {
        isAuthorized: () => $auth.value(),
        allowedUnauthorizedPaths: ["/login"],
        redirectWhenAuthorized: "/dashboard",
      },
    });

    router.start();
    expect(getRouterInternal(router).history.getLocation()).toBe("/dashboard");
    expect(dashboard.$isOpened.peek()).toBe(true);
  });

  it("resolves redirectTo from a function", () => {
    const home = createRoute("home");
    const login = createRoute("login");
    const settings = createRoute("settings");
    const $auth = signal(false);
    const router = createRouter({
      routes: [r("/", home), r("/login", login), r("/settings", settings)],
      history: "memory",
      authorizationGuard: {
        isAuthorized: () => $auth.value(),
        allowedUnauthorizedPaths: ["/login", "/"],
        redirectTo: ({ pathname }) => (pathname.startsWith("/settings") ? "/login" : "/"),
      },
    });

    router.start();
    router.navigate("/settings");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");
  });

  it("resolves redirectWhenAuthorized from a function", () => {
    const login = createRoute("login");
    const dashboard = createRoute("dashboard");
    const profile = createRoute("profile");
    const $auth = signal(true);
    const router = createRouter({
      routes: [r("/login", login), r("/dashboard", dashboard), r("/profile", profile)],
      history: { type: "memory", initial: "/login" },
      authorizationGuard: {
        isAuthorized: () => $auth.value(),
        allowedUnauthorizedPaths: ["/login"],
        redirectWhenAuthorized: (): "/profile" => "/profile",
      },
    });

    router.start();
    expect(getRouterInternal(router).history.getLocation()).toBe("/profile");
  });

  it("skips redirect when target equals current path", () => {
    const login = createRoute("login");
    const $auth = signal(false);
    const router = createRouter({
      routes: [r("/login", login)],
      history: { type: "memory", initial: "/login" },
      authorizationGuard: {
        isAuthorized: () => $auth.value(),
        allowedUnauthorizedPaths: ["/login"],
        redirectTo: "/login",
      },
    });

    router.start();
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");
    expect(login.$isOpened.peek()).toBe(true);
  });
});
