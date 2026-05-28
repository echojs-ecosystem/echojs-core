import { createRouteView } from "@echojs/router";
import { Link } from "@echojs/router/hyperdom";
import { div, h4 } from "@echojs/hyperdom";
import { dashboardPage } from "@pages/dashboard/dashboard.page.js";

export const routerNotFoundPage = createRouteView({
  name: "router-not-found",
  view: () =>
    div({ class: "router-page router-page--404" }, [
      h4(null, "404"),
      Link({ to: dashboardPage, children: "На обзор" }),
    ]),
});
