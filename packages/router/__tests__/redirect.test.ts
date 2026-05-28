import { beforeEach, describe, expect, it } from "vitest";
import { createRoute } from "../src/core/create-route";
import { createRouter } from "../src/core/create-router";
import { getRouterInternal } from "../src/core/router";
import { redirect } from "../src/operators/redirect";
import { clearGuards } from "../src/operators/guard";
import { r } from "./helpers";

describe("redirect", () => {
  beforeEach(() => clearGuards());

  it("redirects on open", () => {
    const oldRoute = createRoute<"old", { id: string }>("old");
    const newRoute = createRoute<"new", { id: string }>("new");

    redirect({
      from: oldRoute,
      to: newRoute,
      mapParams: ({ id }) => ({ id }),
    });

    const router = createRouter({
      routes: [r("/old/:id", oldRoute), r("/new/:id", newRoute)],
      history: "memory",
    });

    router.start();
    router.navigate("/old/5");
    expect(getRouterInternal(router).history.getLocation()).toBe("/new/5");
    expect(newRoute.$isOpened.peek()).toBe(true);
  });
});
