import { createView, type Child } from "@echojs/hyperdom";
import { div, p } from "@echojs/hyperdom";
import { routerStateStyles } from "@entities/router-states/ui/router-states.view.styles.js";

const state = routerStateStyles();

export const RouterLoadingView = createView(
  (_vm: void): Child =>
    div({ class: state.center() }, [p({ class: state.message() }, "Loading…")]),
  "RouterLoadingView",
);
