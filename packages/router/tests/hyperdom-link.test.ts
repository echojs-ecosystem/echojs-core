/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { h, render } from "@echojs/hyperdom";
import { createRoute } from "../src/core/create-route.js";
import { createRouter } from "../src/core/create-router.js";
import { getRouterInternal } from "../src/core/router.js";
import { Link } from "../src/hyperdom/Link.js";
import { NavLink } from "../src/hyperdom/NavLink.js";
import { clearGuards } from "../src/operators/guard.js";
import { r } from "./helpers.js";

describe("Link", () => {
  beforeEach(() => clearGuards());

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

  it("supports plain href", () => {
    const container = document.createElement("div");
    render(Link({ href: "/external", children: "External" }), container);
    expect(container.querySelector("a")!.getAttribute("href")).toBe("/external");
  });
});

describe("NavLink", () => {
  beforeEach(() => clearGuards());

  it("applies activeClass reactively", async () => {
    const home = createRoute("home");
    const user = createRoute<"user", { id: string }>("user");
    const router = createRouter({
      routes: [r("/", home), r("/users/:id", user)],
      history: "memory",
    });
    router.start();

    const container = document.createElement("div");
    render(
      h("div", null, [
        NavLink({ to: home, activeClass: "active", children: "Home" }),
        NavLink({ to: user, params: { id: "1" }, activeClass: "active", children: "User" }),
      ]),
      container,
    );

    const links = container.querySelectorAll("a");
    expect(links[0]!.className).toContain("active");
    expect(links[1]!.className).not.toContain("active");

    router.navigate("/users/1");
    await Promise.resolve();
    expect(links[0]!.className).not.toContain("active");
    expect(links[1]!.className).toContain("active");
  });
});
