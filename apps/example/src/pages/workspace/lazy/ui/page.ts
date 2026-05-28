import { createLazyRouteView } from "@echojs/router";
import { div } from "@echojs/hyperdom";

export const lazyPage = createLazyRouteView({
  name: "lazy",
  view: () => import("./lazy-chunk.view.ts"),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, "Загрузка lazy-чанка…"),
});
