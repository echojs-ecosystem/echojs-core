import { beforeEach, describe, expect, it } from "vitest";
import { createRoute } from "../src/core/create-route.js";
import { createRouter } from "../src/core/create-router.js";
import { getRouterInternal } from "../src/core/router.js";
import { guardRoute, clearGuards } from "../src/operators/guard.js";
import { r } from "./helpers.js";

describe("guardRoute", () => {
  beforeEach(() => clearGuards());

  it("redirects when canOpen is false", () => {
    const privateRoute = createRoute("private");
    const login = createRoute("login");
    let allowed = false;

    guardRoute({
      route: privateRoute,
      canOpen: () => allowed,
      otherwise: login,
    });

    const router = createRouter({
      routes: [r("/private", privateRoute), r("/login", login)],
      history: "memory",
    });

    router.start();
    router.navigate("/private");
    expect(getRouterInternal(router).history.getLocation()).toBe("/login");

    allowed = true;
    router.navigate("/private");
    expect(privateRoute.$isOpened.peek()).toBe(true);
  });
});
