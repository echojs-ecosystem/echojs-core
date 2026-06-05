import { createRouteView } from "@echojs/router";
import { RouterNotFoundView } from "@entities/router-states/ui/not-found.view.js";
import { applySeo } from "@shared/seo/apply-seo.js";

export const routerNotFoundPage = createRouteView({
  name: "not-found",
  view: () => {
    applySeo({ title: "Page not found", path: window.location.pathname, noindex: true });
    return RouterNotFoundView();
  },
});
