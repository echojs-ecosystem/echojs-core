import { createLazyRouteView } from "@echojs/router";
import { div } from "@echojs/hyperdom";

export const lazyPage = createLazyRouteView({
  name: "lazy",
  view: () => import("@pages/workspace/lazy/ui/lazy-chunk.view.js"),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, "Загрузка lazy-чанка…"),
});
