import { createRouteView } from "@echojs-ecosystem/router";
import { Link } from "@echojs-ecosystem/router";
import { div, h4 } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import { hubPage } from "@pages/hub/hub.page.js";

export const routerNotFoundPage = createRouteView({
  name: "router-not-found",
  view: () =>
    div({ class: "router-page router-page--404" }, [
      h4(null, () => i18n.t("common.notFound")),
      Link({ to: hubPage, children: () => i18n.t("common.toOverview") }),
    ]),
});
