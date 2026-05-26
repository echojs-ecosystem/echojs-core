import { createRouteView } from "@echojs/router";
import { div, span, strong } from "@echojs/hyperdom";

export const routerErrorPage = createRouteView({
  name: "router-error",
  view: ({ error }) =>
    div({ class: "router-state router-state--error" }, [
      strong(null, "Ошибка: "),
      span(null, () => String(error)),
    ]),
});
