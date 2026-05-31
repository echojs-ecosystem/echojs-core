import { describe, expect, it } from "vitest";
import { createRoute } from "./create-route";
import { flattenRouteTree, matchRouteChain } from "./route-tree";
import type { RouteConfig } from "./types";

describe("route tree", () => {
  it("joinRoutePaths keeps parent when child path is /", async () => {
    const { joinRoutePaths } = await import("./path");
    expect(joinRoutePaths("/", "/")).toBe("/");
    expect(joinRoutePaths("/router", "/")).toBe("/router");
  });

  it("matchRouteChain prefers index child over parent layout at the same path", () => {
    const layout = createRoute("layout");
    const home = createRoute("home");
    const flat = flattenRouteTree([
      { path: "/", route: layout, children: [{ path: "/", route: home }] },
    ] satisfies RouteConfig[]);

    const match = matchRouteChain("/", flat);
    expect(match?.leaf.route).toBe(home);
    expect(match?.chain.map((e) => e.route)).toEqual([layout, home]);
  });

  it("matchRouteChain prefers nested index under layout prefix", () => {
    const layout = createRoute("demo-layout");
    const home = createRoute("demo-home");
    const flat = flattenRouteTree([
      {
        path: "/router",
        route: layout,
        children: [{ path: "/", route: home }],
      },
    ] satisfies RouteConfig[]);

    const match = matchRouteChain("/router", flat);
    expect(match?.leaf.route).toBe(home);
    expect(match?.chain.map((e) => e.route)).toEqual([layout, home]);
  });
});
