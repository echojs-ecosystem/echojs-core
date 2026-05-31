import { createRouter } from "@echojs/router/hyperdom";
import { appRoutes } from "@entities/__routes__/app.routes.js";
import { routerErrorPage } from "@pages/router-states/ui/error.page.js";
import { routerLoadingPage } from "@pages/router-states/ui/loading.page.js";
import { routerNotFoundPage } from "@pages/router-states/ui/not-found.page.js";
import "@entities/__routes__/redirects.js";
import "@entities/__routes__/guards.js";

export const appRouter = createRouter({
  history: "browser",
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
});