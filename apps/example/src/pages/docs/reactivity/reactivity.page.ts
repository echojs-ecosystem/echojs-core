import { createRouteView } from "@echojs/router";

import { ReactivityView } from "./ui/reactivity.view.js";

export const reactivityPage = createRouteView({
  name: "reactivity",
  view: ReactivityView,
});
