import { createLazyRouteView } from "@echojs/router";
import { div } from "@echojs/hyperdom";
import { i18n } from "@app/i18n/index.js";

export const lazyPage = createLazyRouteView({
  name: "lazy",
  view: () => import("./ui/lazy-chunk.view.ts"),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, () => i18n.t("workspace.lazy.loading")),
});
