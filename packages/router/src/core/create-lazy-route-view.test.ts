import { describe, expect, it } from "vitest";
import { createLazyRouteView } from "./create-lazy-route-view";
import { createRouteView } from "./create-route-view";
import { createRouter } from "./create-router";
import { getPageState } from "./page";
import { isLazyRouteView } from "./lazy-view";

describe("createLazyRouteView", () => {
  it("marks page as lazy and loads default export on navigation", async () => {
    let loadCount = 0;

    const lazyPage = createLazyRouteView({
      name: "lazy",
      view: async () => {
        loadCount += 1;
        return {
          default: () => "lazy-content",
        };
      },
      loadingView: () => "loading-chunk",
    });

    const home = createRouteView({ name: "home", view: () => "home" });

    const router = createRouter({
      history: { type: "memory", initial: "/lazy" },
      routes: [
        { path: "/lazy", name: "lazy", routeView: lazyPage },
        { path: "/home", name: "home", routeView: home },
      ],
    });

    expect(isLazyRouteView(lazyPage)).toBe(true);
    expect(getPageState(lazyPage).view).toBeUndefined();

    router.start();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(loadCount).toBe(1);
    expect(getPageState(lazyPage).view).toBeTypeOf("function");
    expect(router.View()).toBe("lazy-content");
  });

  it("shows loadingView while chunk is loading", async () => {
    let resolveImport!: () => void;
    const importGate = new Promise<void>((resolve) => {
      resolveImport = resolve;
    });

    const lazyPage = createLazyRouteView({
      name: "lazy",
      view: async () => {
        await importGate;
        return { default: () => "done" };
      },
      loadingView: () => "chunk-loading",
    });

    const router = createRouter({
      history: { type: "memory", initial: "/" },
      routes: [{ path: "/", name: "lazy", routeView: lazyPage }],
    });

    router.start();
    expect(router.View()).toBe("chunk-loading");

    resolveImport();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(router.View()).toBe("done");
  });

  it("caches loaded view on revisit", async () => {
    let loadCount = 0;
    const lazyPage = createLazyRouteView({
      name: "lazy",
      view: async () => {
        loadCount += 1;
        return { default: () => "ok" };
      },
    });
    const home = createRouteView({ name: "home", view: () => null });

    const router = createRouter({
      history: { type: "memory", initial: "/" },
      routes: [
        { path: "/", name: "lazy", routeView: lazyPage },
        { path: "/home", name: "home", routeView: home },
      ],
    });

    router.start();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(loadCount).toBe(1);

    router.go("/home");
    await new Promise((resolve) => setTimeout(resolve, 0));
    router.go("/");
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(loadCount).toBe(1);
  });
});
