import { describe, expect, it } from "vitest";

import { createRoute } from "../core/create-route";
import { createRouter } from "../core/create-router";
import { getRouterInternal } from "../core/router";
import { r } from "../test-utils";

describe("createRouter redirects", () => {
  it("redirects when source route opens", () => {
    const oldRoute = createRoute<"old", { id: string }>("old");
    const newRoute = createRoute<"new", { id: string }>("new");

    const router = createRouter({
      routes: [r("/old/:id", oldRoute), r("/new/:id", newRoute)],
      history: "memory",
      redirects: [
        {
          from: oldRoute,
          to: newRoute,
          mapParams: ({ id }) => ({ id }),
        },
      ],
    });

    router.start();
    router.go("/old/5");
    expect(getRouterInternal(router).history.getLocation()).toBe("/new/5");
    expect(newRoute.$isOpened.peek()).toBe(true);
  });

  it("supports runtime addRedirect", () => {
    const oldRoute = createRoute("old");
    const newRoute = createRoute("new");

    const router = createRouter({
      routes: [r("/old", oldRoute), r("/new", newRoute)],
      history: "memory",
    });

    router.start();
    const unregister = router.addRedirect({ from: oldRoute, to: newRoute });

    router.go("/old");
    expect(getRouterInternal(router).history.getLocation()).toBe("/new");

    unregister();
    router.go("/old");
    expect(oldRoute.$isOpened.peek()).toBe(true);
  });
});
