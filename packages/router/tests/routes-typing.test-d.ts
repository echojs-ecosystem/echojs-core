import { assertType, describe, expectTypeOf, it } from "vitest";
import { createLayoutView } from "../src/core/create-layout-view.js";
import { createRouteView } from "../src/core/create-route-view.js";
import { createRoute } from "../src/core/create-route.js";
import { createRouter } from "../src/core/create-router.js";
import { createRoutes } from "../src/core/create-routes.js";

describe("router.routes typing", () => {
  it("infers named routes from route config name + page", () => {
    const home = createRouteView({ name: "home", view: () => null });
    const usersLayout = createLayoutView({ name: "users-layout", view: () => null });
    const usersList = createRouteView({ name: "users-list", view: () => null });
    const user = createRouteView({
      name: "user",
      view: () => null,
    });
    const legacy = createRoute<"legacy-user", { id: string }>("legacy-user");

    const routes = createRoutes([
      { path: "/", name: "home", routeView: home },
      {
        path: "/users",
        name: "users",
        layoutView: usersLayout,
        children: [
          { path: "/", name: "users-list", routeView: usersList },
          { path: ":id", name: "user", routeView: user },
        ],
      },
      { path: "/user/:id", name: "legacy-user", route: legacy },
    ]);

    const router = createRouter({
      history: "memory",
      routes,
    });

    type Routes = typeof router.routes;

    expectTypeOf(router.routes.home).toEqualTypeOf(home);
    expectTypeOf(router.routes["users-list"]).toEqualTypeOf(usersList);
    expectTypeOf(router.routes.user).toEqualTypeOf(user);
    expectTypeOf(router.routes.user.go).toBeFunction();
    expectTypeOf(router.routes["legacy-user"]).toEqualTypeOf(legacy);

    assertType<keyof Routes>("home");
    assertType<keyof Routes>("user");
    assertType<keyof Routes>("users-list");
  });
});
