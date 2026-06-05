import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { NavLink } from "@echojs-ecosystem/router/hyperdom";
import { div, h1, p } from "@echojs-ecosystem/hyperdom";
import { homePage } from "@app/router/page-links.js";
import { routerStateStyles } from "@entities/router-states/ui/router-states.view.styles.js";

const state = routerStateStyles();

export const RouterNotFoundView = createView(
  (_vm: void): Child =>
    div({ class: state.page() }, [
      h1({ class: state.title() }, "404"),
      p({ class: state.body() }, "This page does not exist."),
      p({ class: state.linkWrap() }, [
        NavLink({
          to: homePage,
          class: state.link(),
          children: "Back to home",
        }),
      ]),
    ]),
  "RouterNotFoundView",
);
