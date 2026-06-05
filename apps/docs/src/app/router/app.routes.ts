import { createRoutes } from "@echojs/router";
import { docsRoutes } from "@app/router/docs.routes.js";
import { homePage } from "@pages/home/home.page.js";
import { sponsorsPage } from "@pages/sponsors/sponsors.page.js";

export const appRoutes = createRoutes([
  { path: "/", name: "home", routeView: homePage },
  { path: "/sponsors", name: "sponsors", routeView: sponsorsPage },
  ...docsRoutes,
]);
