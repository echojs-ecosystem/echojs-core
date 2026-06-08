/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import { div, main, nav, render, type Child } from "@echojs-ecosystem/hyperdom";
import { createLayoutView } from "./create-layout-view";
import { createRoute } from "./create-route";
import { createRoutes } from "./create-routes";
import { createRouteView } from "./create-route-view";
import { createRouter } from "./create-router";
import { NavLink } from "../hyperdom/NavLink";
import { clearGuards } from "../operators/guard";

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

describe("router view layout shell", () => {
  beforeEach(() => clearGuards());

  it("keeps layout DOM mounted when navigating between child routes", async () => {
    const pageA = createRouteView({
      name: "docs-a",
      view: () => div({ "data-testid": "page-a" }, "Page A"),
    });

    const pageB = createRouteView({
      name: "docs-b",
      view: () => div({ "data-testid": "page-b" }, "Page B"),
    });

    const shellLayout = createLayoutView({
      name: "docs-shell",
      view: ({ outlet }) =>
        div({ "data-testid": "docs-shell" }, [
          nav({ "data-testid": "docs-nav" }, [
            NavLink({ to: pageA, activeClass: "active", children: "A" }),
            NavLink({ to: pageB, activeClass: "active", children: "B" }),
          ]),
          main({ "data-testid": "docs-main" }, () => outlet() as Child),
        ]) as Child,
    });

    const router = createRouter({
      history: "memory",
      routes: [
        {
          path: "/docs",
          name: "docs",
          layoutView: shellLayout,
          children: [
            { path: "a", name: "docs-a", routeView: pageA },
            { path: "b", name: "docs-b", routeView: pageB },
          ],
        },
      ],
    });

    router.start();
    router.navigate("/docs/a");
    await flush();

    const container = document.createElement("div");
    render(router.View as () => Child, container);
    await flush();

    const shell = container.querySelector('[data-testid="docs-shell"]');
    const navEl = container.querySelector('[data-testid="docs-nav"]');
    expect(shell).not.toBeNull();
    expect(navEl).not.toBeNull();
    expect(container.querySelector('[data-testid="page-a"]')).not.toBeNull();

    router.navigate("/docs/b");
    await flush();
    await Promise.resolve();

    expect(container.querySelector('[data-testid="docs-shell"]')).toBe(shell);
    expect(container.querySelector('[data-testid="docs-nav"]')).toBe(navEl);
    expect(container.querySelector('[data-testid="page-b"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="page-a"]')).toBeNull();
  });

  it("drops layout shell from the DOM when leaving the layout route", async () => {
    const home = createRouteView({
      name: "home",
      view: () => div({ "data-testid": "home-page" }, "Home"),
    });

    const doc = createRouteView({
      name: "doc",
      view: () => div({ "data-testid": "doc-page" }, "Doc"),
    });

    const shellLayout = createLayoutView({
      name: "shell",
      view: ({ outlet }) =>
        div({ "data-testid": "shell" }, [
          nav({ "data-testid": "shell-nav" }, "Nav"),
          main(null, () => outlet() as Child),
        ]) as Child,
    });

    const router = createRouter({
      history: "memory",
      routes: [
        { path: "/", name: "home", routeView: home },
        {
          path: "/docs",
          name: "docs",
          layoutView: shellLayout,
          children: [{ path: "page", name: "doc", routeView: doc }],
        },
      ],
    });

    router.start();
    router.navigate("/docs/page");
    await flush();

    const container = document.createElement("div");
    render(router.View as () => Child, container);
    await flush();

    expect(container.querySelector('[data-testid="shell-nav"]')).not.toBeNull();

    router.navigate("/");
    await flush();

    expect(container.querySelector('[data-testid="shell-nav"]')).toBeNull();
    expect(container.querySelector('[data-testid="home-page"]')).not.toBeNull();
  });

  it("restores layout shell when returning to the same layout", async () => {
    const home = createRouteView({
      name: "home",
      view: () => div({ "data-testid": "home-page" }, "Home"),
    });

    const doc = createRouteView({
      name: "doc",
      view: () => div({ "data-testid": "doc-page" }, "Doc"),
    });

    const shellLayout = createLayoutView({
      name: "shell",
      view: ({ outlet }) =>
        div({ "data-testid": "shell" }, [
          nav({ "data-testid": "shell-nav" }, "Nav"),
          main(null, () => outlet() as Child),
        ]) as Child,
    });

    const router = createRouter({
      history: "memory",
      routes: [
        { path: "/", name: "home", routeView: home },
        {
          path: "/docs",
          name: "docs",
          layoutView: shellLayout,
          children: [{ path: "page", name: "doc", routeView: doc }],
        },
      ],
    });

    router.start();
    router.navigate("/docs/page");
    await flush();

    const container = document.createElement("div");
    render(router.View as () => Child, container);
    await flush();

    expect(container.querySelector('[data-testid="shell-nav"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="doc-page"]')).not.toBeNull();

    router.navigate("/");
    await flush();
    expect(container.querySelector('[data-testid="shell-nav"]')).toBeNull();

    router.navigate("/docs/page");
    await flush();
    await Promise.resolve();

    expect(container.querySelector('[data-testid="shell-nav"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="doc-page"]')).not.toBeNull();
  });

  it("renders nested pages under a path-only route segment", async () => {
    const blogSection = createRoute("blog-section");
    const blogIndex = createRouteView({
      name: "blog-index",
      view: () => div({ "data-testid": "blog-index" }, "Blog"),
    });
    const blogPost = createRouteView({
      name: "blog-post",
      view: () => div({ "data-testid": "blog-post" }, "Post"),
    });

    const shellLayout = createLayoutView({
      name: "docs-shell",
      view: ({ outlet }) =>
        div({ "data-testid": "docs-shell" }, [main(null, () => outlet() as Child)]) as Child,
    });

    const router = createRouter({
      history: "memory",
      routes: createRoutes([
        {
          path: "/docs",
          name: "docs",
          layoutView: shellLayout,
          children: [
            {
              path: "blog",
              name: "blog-section",
              route: blogSection,
              children: [
                { path: "/", name: "blog-index", routeView: blogIndex },
                { path: ":slug", name: "blog-post", routeView: blogPost },
              ],
            },
          ],
        },
      ]),
    });

    router.start();
    router.navigate("/docs/blog");
    await flush();

    const container = document.createElement("div");
    render(router.View as () => Child, container);
    await flush();

    expect(container.querySelector('[data-testid="docs-shell"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="blog-index"]')).not.toBeNull();

    router.navigate("/docs/blog/hello");
    await flush();
    await Promise.resolve();

    expect(container.querySelector('[data-testid="blog-post"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="blog-index"]')).toBeNull();
  });
});
