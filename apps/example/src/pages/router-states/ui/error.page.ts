import { createRouteView } from "@echojs/router";
import { div, span, strong } from "@echojs/hyperdom";
import { i18n } from "@app/i18n/index.js";

export const routerErrorPage = createRouteView({
  name: "router-error",
  view: ({ error }) =>
    div({ class: "router-state router-state--error" }, [
      strong(null, () => i18n.t("common.error", { message: "" })),
      span(null, () => String(error)),
    ]),
});
