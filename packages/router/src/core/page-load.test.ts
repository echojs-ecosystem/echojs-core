import { describe, expect, it } from "vitest";
import { createLayoutView } from "./create-layout-view";
import { createRouteView } from "./create-route-view";
import { createRouter } from "./create-router";

describe("page-load", () => {
  it("ignores stale beforeLoad after fast navigation", async () => {
    let resolveSlow!: (value: { id: string }) => void;
    const slowPage = createRouteView({
      name: "slow",
      view: () => null,
      beforeLoad: () =>
        new Promise<{ id: string }>((resolve) => {
          resolveSlow = resolve;
        }),
    });

    const fastPage = createRouteView({ name: "fast", view: () => null });

    const router = createRouter({
      routes: [
        { path: "/slow", name: "slow", routeView: slowPage },
        { path: "/fast", name: "fast", routeView: fastPage },
      ],
      history: "memory",
    });

    router.start();
    router.go("/slow");
    router.go("/fast");
    await Promise.resolve();

    resolveSlow({ id: "stale" });
    await Promise.resolve();

    expect(fastPage.$isOpened.peek()).toBe(true);
    expect(slowPage.$data.peek()).toBeNull();
  });

  it("runs layout beforeLoad before page beforeLoad", async () => {
    const order: string[] = [];

    const layout = createLayoutView({
      name: "layout",
      view: () => null,
      beforeLoad: async () => {
        order.push("layout");
        return null;
      },
    });

    const page = createRouteView({
      name: "child",
      view: () => null,
      beforeLoad: async () => {
        order.push("page");
        return null;
      },
    });

    const router = createRouter({
      routes: [
        {
          path: "/app",
          name: "app",
          layoutView: layout,
          children: [{ path: "child", name: "child", routeView: page }],
        },
      ],
      history: "memory",
    });

    router.start();
    router.go("/app/child");
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(order).toEqual(["layout", "page"]);
  });
});
