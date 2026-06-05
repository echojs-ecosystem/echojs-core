/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@echojs-ecosystem/hyperdom";
import { createRouteView } from "../core/create-route-view";
import { createRouter } from "../core/create-router";
import { clearGuards } from "../operators/guard";

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
    render(router.view() as () => import("@echojs-ecosystem/hyperdom").Child, container);
    await Promise.resolve();

    expect(container.textContent).toContain("home-content");
  });
});
