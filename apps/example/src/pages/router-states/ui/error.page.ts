import { createRouteView } from "@echojs-ecosystem/router";
import { div, span, strong } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";

export const routerErrorPage = createRouteView({
  name: "router-error",
  view: ({ error }) =>
    div({ class: "router-state router-state--error" }, [
      strong(null, () => i18n.t("common.error", { message: "" })),
      span(null, () => String(error)),
    ]),
});
