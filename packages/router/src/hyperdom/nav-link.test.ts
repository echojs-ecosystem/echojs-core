/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { h, render } from "@echojs-ecosystem/hyperdom";

import { createRoute } from "../core/create-route";
import { createRouteView } from "../core/create-route-view";
import { createRouter } from "../core/create-router";
import { createRoutes } from "../core/create-routes";
import { r } from "../test-utils";
import { NavLink } from "./nav-link";

const flush = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("NavLink", () => {
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

    router.go("/users/1");
    await flush();
    expect(links[0]!.className).not.toContain("active");
    expect(links[1]!.className).toContain("active");
    expect(links[0]!.getAttribute("aria-current")).toBeNull();
    expect(links[1]!.getAttribute("aria-current")).toBe("page");
  });

  it("merges base class with activeClass", async () => {
    const home = createRoute("home");
    const router = createRouter({
      routes: [r("/", home)],
      history: "memory",
    });
    router.start();

    const container = document.createElement("div");
    render(
      NavLink({
        to: home,
        class: "nav-item",
        activeClass: "nav-item-active",
        children: "Home",
      }),
      container,
    );

    const link = container.querySelector("a")!;
    expect(link.className).toContain("nav-item");
    expect(link.className).toContain("nav-item-active");
  });

  it("applies activeClass with match partial on URL prefix", async () => {
    const blogIndex = createRouteView({ name: "blog-index", view: () => "index" });
    const blogPost = createRouteView<{ slug: string }>({
      name: "blog-post",
      view: () => "post",
    });

    const router = createRouter({
      history: "memory",
      routes: createRoutes([
        { path: "/blog", name: "blog-index", routeView: blogIndex },
        { path: "/blog/:slug", name: "blog-post", routeView: blogPost },
      ]),
    });
    router.start();

    const container = document.createElement("div");
    render(
      NavLink({
        to: blogIndex,
        match: "partial",
        activeClass: "active",
        children: "Blog",
      }),
      container,
    );

    const link = container.querySelector("a")!;
    expect(link.className).not.toContain("active");

    router.go("/blog/hello");
    await flush();
    expect(link.className).toContain("active");
  });

  it("applies activeClass from activeOn sibling routes", async () => {
    const blogIndex = createRouteView({ name: "blog-index", view: () => "index" });
    const blogPost = createRouteView<{ slug: string }>({
      name: "blog-post",
      view: () => "post",
    });
    const blogSection = createRoute("blog-section");

    const router = createRouter({
      history: "memory",
      routes: createRoutes([
        {
          path: "/blog",
          name: "blog-section",
          route: blogSection,
          children: [
            { path: "", name: "blog-index", routeView: blogIndex },
            { path: ":slug", name: "blog-post", routeView: blogPost },
          ],
        },
      ]),
    });
    router.start();

    const container = document.createElement("div");
    render(
      NavLink({
        to: blogIndex,
        activeOn: [blogPost],
        activeClass: "active",
        children: "Blog",
      }),
      container,
    );

    const link = container.querySelector("a")!;
    expect(link.className).not.toContain("active");

    router.go("/blog/hello");
    await flush();
    expect(link.className).toContain("active");
    expect(link.getAttribute("aria-current")).toBe("page");
  });
});
