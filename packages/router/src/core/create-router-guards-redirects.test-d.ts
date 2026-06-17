import { describe, expectTypeOf, it } from "vitest";

import { createLayoutView } from "./create-layout-view";
import { createRoute } from "./create-route";
import { createRouteView } from "./create-route-view";
import { createRouter } from "./create-router";
import type { GuardRouteOptions } from "./guard-registry";
import type { RedirectOptions, TypedRedirectOptions } from "./redirect-registry";

describe("createRouter guards typing", () => {
  it("accepts guards for route, layout, and page routes", () => {
    const login = createRouteView({ name: "login", view: () => null });
    const dashboard = createRouteView({ name: "dashboard", view: () => null });
    const adminLayout = createLayoutView({
      name: "admin",
      view: ({ outlet }) => outlet(),
    });
    const settings = createRouteView({ name: "settings", view: () => null });

    const guards = [
      {
        route: adminLayout,
        canOpen: () => true,
        otherwise: login,
      },
      {
        route: settings,
        canOpen: () => false,
        otherwise: login,
      },
      {
        route: login,
        canOpen: () => true,
        otherwise: dashboard,
      },
    ] as const satisfies readonly GuardRouteOptions[];

    createRouter({
      history: "memory",
      routes: [
        { path: "/login", name: "login", routeView: login },
        { path: "/dashboard", name: "dashboard", routeView: dashboard },
        {
          path: "/admin",
          name: "admin",
          layoutView: adminLayout,
          children: [{ path: "settings", name: "settings", routeView: settings }],
        },
      ],
      guards,
    });
  });

  it("types GuardRouteOptions route fields as AnyRoute", () => {
    const gate = createRoute("gate");
    const target = createRouteView({ name: "target", view: () => null });

    const options: GuardRouteOptions = {
      route: gate,
      canOpen: () => true,
      otherwise: target,
    };

    expectTypeOf(options.route).toMatchTypeOf<GuardRouteOptions["route"]>();
    expectTypeOf(options.otherwise).toMatchTypeOf<GuardRouteOptions["otherwise"]>();
  });
});

describe("createRouter redirects typing", () => {
  it("accepts redirect from createRoute to createRouteView", () => {
    const rootRoute = createRoute("root");
    const dashboard = createRouteView({ name: "dashboard", view: () => null });

    const redirects = [
      {
        from: rootRoute,
        to: dashboard,
      },
    ] as const satisfies readonly RedirectOptions[];

    createRouter({
      history: "memory",
      routes: [
        { path: "/", name: "root", route: rootRoute },
        { path: "/dashboard", name: "dashboard", routeView: dashboard },
      ],
      redirects,
    });
  });

  it("accepts readonly redirect arrays in createRouter options", () => {
    const oldRoute = createRoute("old");
    const newRoute = createRoute("new");

    const appRedirects = [{ from: oldRoute, to: newRoute }] as const;

    createRouter({
      history: "memory",
      routes: [
        { path: "/old", name: "old", route: oldRoute },
        { path: "/new", name: "new", route: newRoute },
      ],
      redirects: appRedirects,
    });
  });

  it("infers mapParams with TypedRedirectOptions", () => {
    const oldRoute = createRoute<"old", { id: string }>("old");
    const newRoute = createRoute<"new", { userId: string }>("new");

    const rule = {
      from: oldRoute,
      to: newRoute,
      mapParams: ({ id }) => ({ userId: id }),
    } satisfies TypedRedirectOptions<
      { id: string },
      Record<string, never>,
      { userId: string },
      Record<string, never>
    >;

    expectTypeOf(rule.mapParams!).parameter(0).toEqualTypeOf<{ id: string }>();
    expectTypeOf(rule.mapParams!).returns.toEqualTypeOf<{ userId: string }>();

    createRouter({
      history: "memory",
      routes: [
        { path: "/old/:id", name: "old", route: oldRoute },
        { path: "/new/:userId", name: "new", route: newRoute },
      ],
      redirects: [rule],
    });
  });

  it("types addRedirect like static redirects option", () => {
    const from = createRoute("from");
    const to = createRouteView({ name: "to", view: () => null });
    const router = createRouter({
      history: "memory",
      routes: [
        { path: "/from", name: "from", route: from },
        { path: "/to", name: "to", routeView: to },
      ],
    });

    expectTypeOf(router.addRedirect).parameter(0).toEqualTypeOf<RedirectOptions>();
    expectTypeOf(router.addRedirect({ from, to })).toEqualTypeOf<() => void>();
  });
});
