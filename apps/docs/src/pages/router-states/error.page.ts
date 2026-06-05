import { createRouteView } from "@echojs/router";
import { RouterErrorView } from "@entities/router-states/ui/error.view.js";

export const routerErrorPage = createRouteView({
  name: "router-error",
  view: ({ error }) => RouterErrorView({ error }),
});
