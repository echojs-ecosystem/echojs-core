import { createRouteView } from "@echojs/router";
import { div, p } from "@echojs/hyperdom";
import { routerStateStyles } from "@shared/styles/index.js";

const state = routerStateStyles();

export const routerLoadingPage = createRouteView({
  name: "router-loading",
  view: () =>
    div({ class: state.center() }, [p({ class: state.message() }, "Loading…")]),
});
