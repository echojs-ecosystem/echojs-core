/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { render } from "@echojs-ecosystem/hyperdom";

import { createRoute } from "../core/create-route";
import { createRouter } from "../core/create-router";
import { getRouterInternal } from "../core/router";
import { r } from "../test-utils";
import { Link } from "./link";

describe("Link", () => {
  it("renders href and navigates on click", async () => {
    const home = createRoute("home");
    const user = createRoute<"user", { id: string }, { tab?: string }>("user");
    const router = createRouter({
      routes: [r("/", home), r("/users/:id", user)],
      history: "memory",
    });
    router.start();

    const container = document.createElement("div");
    render(
      Link({
        to: user,
        params: { id: "42" },
        query: { tab: "profile" },
        children: "User 42",
      }),
      container,
    );

    const anchor = container.querySelector("a")!;
    expect(anchor.getAttribute("href")).toBe("/users/42?tab=profile");

    anchor.click();
    await Promise.resolve();
    expect(getRouterInternal(router).history.getLocation()).toBe("/users/42?tab=profile");
    expect(user.$isOpened.peek()).toBe(true);
  });

  it("supports plain href without programmatic navigation", () => {
    const container = document.createElement("div");
    render(Link({ href: "/external", children: "External" }), container);
    expect(container.querySelector("a")!.getAttribute("href")).toBe("/external");
  });

  it("uses replace navigation when requested", async () => {
    const home = createRoute("home");
    const settings = createRoute("settings");
    const router = createRouter({
      routes: [r("/", home), r("/settings", settings)],
      history: "memory",
    });
    router.start();
    router.go("/");

    const container = document.createElement("div");
    render(Link({ to: settings, replace: true, children: "Settings" }), container);
    container.querySelector("a")!.click();
    await Promise.resolve();

    expect(settings.$isOpened.peek()).toBe(true);
    expect(getRouterInternal(router).history.getLocation()).toBe("/settings");
  });
});
