/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@echojs/hyperdom";
import { createRouteView } from "../src/core/create-route-view.js";
import { createRouter } from "../src/core/create-router.js";
import { clearGuards } from "../src/operators/guard.js";

describe("router.view()", () => {
  beforeEach(() => clearGuards());

  it("renders active page component", async () => {
    const home = createRouteView({
      name: "home",
      view: () => "home-content",
    });

    const router = createRouter({
      routes: [{ path: "/", name: "home", routeView: home }],
      history: "memory",
    });

    router.start();

    const container = document.createElement("div");
    render(router.view() as () => import("@echojs/hyperdom").Child, container);
    await Promise.resolve();

    expect(container.textContent).toContain("home-content");
  });
});
