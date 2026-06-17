import { describe, expect, it } from "vitest";
import { createLayoutView } from "./create-layout-view";
import { createRouteView } from "./create-route-view";
import { buildNamedRoutes } from "./build-named-routes";

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
