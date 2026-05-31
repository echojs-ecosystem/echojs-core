import { createRouteView } from "@echojs/router";
import { p } from "@echojs/hyperdom";
import { i18n } from "@app/i18n/index.js";

export const routerLoadingPage = createRouteView({
  name: "router-loading",
  view: () => p({ class: "router-page router-page--loading" }, () => i18n.t("common.loadingPage")),
});
