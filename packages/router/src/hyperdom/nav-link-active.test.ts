import { beforeEach, describe, expect, it } from "vitest";
import { createRouteView } from "../core/create-route-view";
import { createRouter } from "../core/create-router";
import { createRoutes } from "../core/create-routes";
import { clearGuards } from "../operators/guard";
import { isNavLinkActive } from "./nav-link-active";

describe("isNavLinkActive", () => {
  beforeEach(() => clearGuards());

  it("exact matches only opened route", () => {
    const home = createRouteView({ name: "home", view: () => "home" });
    const user = createRouteView<{ id: string }>({ name: "user", view: () => "user" });
    const router = createRouter({
      history: "memory",
      routes: createRoutes([
        { path: "/", name: "home", routeView: home },
        { path: "/users/:id", name: "user", routeView: user },
      ]),
    });
    router.start();
    router.navigate("/users/1");

    expect(isNavLinkActive(home, { match: "exact" })).toBe(false);
    expect(isNavLinkActive(user, { match: "exact" })).toBe(true);
  });

  it("partial matches URL prefix for sibling routes", () => {
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
    router.navigate("/blog/hello");

    expect(isNavLinkActive(blogIndex, { match: "partial" })).toBe(true);
    expect(isNavLinkActive(blogPost, { match: "partial" })).toBe(true);
  });
});
