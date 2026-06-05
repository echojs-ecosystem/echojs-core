import { createRouteView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { div, h1, p } from "@echojs/hyperdom";
import { homePage } from "@pages/home/home.page.js";
import { applySeo } from "@shared/seo/apply-seo.js";
import { routerStateStyles } from "@shared/styles/index.js";

const state = routerStateStyles();

export const routerNotFoundPage = createRouteView({
  name: "not-found",
  view: () => {
    applySeo({ title: "Page not found", path: window.location.pathname, noindex: true });
    return div({ class: state.page() }, [
      h1({ class: state.title() }, "404"),
      p({ class: state.body() }, "This page does not exist."),
      p({ class: state.linkWrap() }, [
        NavLink({
          to: homePage,
          class: state.link(),
          children: "Back to home",
        }),
      ]),
    ]);
  },
});
