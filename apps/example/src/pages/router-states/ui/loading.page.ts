import { createRouteView } from "@echojs-ecosystem/router";
import { p } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";

export const routerLoadingPage = createRouteView({
  name: "router-loading",
  view: () => p({ class: "router-page router-page--loading" }, () => i18n.t("common.loadingPage")),
});
