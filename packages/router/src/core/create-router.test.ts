import { describe, expect, it } from "vitest";

import { createRouteView } from "./create-route-view";
import { createRoute } from "./create-route";
import { createRouter } from "./create-router";
import { createMemoryHistory } from "../histories/memory-history";
import { r } from "../test-utils";

describe("createRouter", () => {
  it("start/stop syncs routes", () => {
    const home = createRoute("home");
    const router = createRouter({
      routes: [r("/", home)],
      history: "memory",
    });

    router.start();
    expect(home.$isOpened.peek()).toBe(true);

    router.stop();
    expect(home.$isOpened.peek()).toBe(false);
  });

  it("resolve builds route path", () => {
    const user = createRoute<"user", { id: string }>("user");
    const router = createRouter({
      routes: [r("/users/:id", user)],
      history: "memory",
    });
    expect(router.resolve(user, { id: "42" }, { query: { tab: "profile" } })).toBe(
      "/users/42?tab=profile",
    );
  });

  it("accepts RouterHistory instance", () => {
    const home = createRoute("home");
    const history = createMemoryHistory("/hello");
    const router = createRouter({
      routes: [r("/", home)],
      history,
    });
    router.start();
    expect(router.$path.peek()).toBe("/hello");
  });

  it("exposes view() alias", () => {
    const home = createRoute("home");
    const router = createRouter({ routes: [r("/", home)], history: "memory" });
    expect(router.view()).toBe(router.View);
  });

  it("exposes flat named routes", () => {
    const home = createRouteView({ name: "home", view: () => null });
    const router = createRouter({
      history: "memory",
      routes: [{ path: "/", name: "home", routeView: home }],
    });

    expect(router.routes.home).toBe(home);
  });
});