import { createRouteView } from "@echojs/router";
import { div } from "@echojs/hyperdom";

export const routerLoadingPage = createRouteView({
  name: "router-loading",
  view: () => div({ class: "router-state router-state--loading" }, "Загрузка страницы…"),
});
