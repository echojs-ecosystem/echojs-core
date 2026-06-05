import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { div, h1, p } from "@echojs-ecosystem/hyperdom";
import { routerStateStyles } from "@entities/router-states/ui/router-states.view.styles.js";

const state = routerStateStyles();

export type RouterErrorViewProps = {
  error: unknown;
};

export const RouterErrorView = createView(
  (props: RouterErrorViewProps): Child =>
    div({ class: state.page() }, [
      h1({ class: state.title() }, "Something went wrong"),
      p({ class: state.body() }, () => String(props.error ?? "Unknown error")),
    ]),
  "RouterErrorView",
);
