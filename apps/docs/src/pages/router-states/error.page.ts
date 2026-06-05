import { createRouteView } from "@echojs/router";
import { div, h1, p } from "@echojs/hyperdom";
import { routerStateStyles } from "@shared/styles/index.js";

const state = routerStateStyles();

export const routerErrorPage = createRouteView({
  name: "router-error",
  view: ({ error }) =>
    div({ class: state.page() }, [
      h1({ class: state.title() }, "Something went wrong"),
      p({ class: state.body() }, () => String(error ?? "Unknown error")),
    ]),
});
