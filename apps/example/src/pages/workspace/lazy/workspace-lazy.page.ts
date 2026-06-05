import { createLazyRouteView } from "@echojs-ecosystem/router";
import { div } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";

export const lazyPage = createLazyRouteView({
  name: "lazy",
  view: () => import("./ui/lazy-chunk.view.ts"),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, () => i18n.t("workspace.lazy.loading")),
});
