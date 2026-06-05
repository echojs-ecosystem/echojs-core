import { createRouteView } from "@echojs-ecosystem/router";

import { ReactivityView } from "./ui/reactivity.view.js";

export const reactivityPage = createRouteView({
  name: "reactivity",
  view: ReactivityView,
});
