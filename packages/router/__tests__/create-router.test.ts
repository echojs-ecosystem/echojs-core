import { beforeEach, describe, expect, it } from "vitest";
import { createRoute } from "../src/core/create-route";
import { createRouter } from "../src/core/create-router";
import { createMemoryHistory } from "../src/histories/memory-history";
import { clearGuards } from "../src/operators/guard";
import { r } from "./helpers";

describe("createRouter", () => {
  beforeEach(() => clearGuards());

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
});
