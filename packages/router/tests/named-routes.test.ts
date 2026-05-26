import { describe, expect, it } from "vitest";
import { createLayoutView } from "../src/core/create-layout-view.js";
import { createRouteView } from "../src/core/create-route-view.js";
import { createRouter } from "../src/core/create-router.js";
import { buildNamedRoutes } from "../src/core/build-named-routes.js";

describe("buildNamedRoutes", () => {
  it("keys routes by config name, not URL path", () => {
    const home = createRouteView({ name: "home", view: () => null });
    const user = createRouteView({ name: "user", view: () => null });

    const map = buildNamedRoutes([
      {
        path: "/router",
        name: "router",
        layoutView: createLayoutView({ name: "router-layout", view: () => null }),
        children: [
          { path: "/", name: "home", routeView: home },
          { path: ":id", name: "user", routeView: user },
        ],
      },
    ]);

    expect(map.home).toBe(home);
    expect(map.user).toBe(user);
    expect(map.router).toBeDefined();
  });

  it("throws on duplicate config name", () => {
    const page = createRouteView({ name: "dup", view: () => null });
    expect(() =>
      buildNamedRoutes([
        { path: "/a", name: "same", routeView: page },
        { path: "/b", name: "same", routeView: page },
      ]),
    ).toThrow(/Duplicate route name "same"/);
  });
});

describe("createRouter.routes", () => {
  it("exposes flat named routes", () => {
    const home = createRouteView({ name: "home", view: () => null });
    const router = createRouter({
      history: "memory",
      routes: [{ path: "/", name: "home", routeView: home }],
    });

    expect(router.routes.home).toBe(home);
  });
});
