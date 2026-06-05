import { createRouteView } from "@echojs-ecosystem/router";

import { StateView } from "./ui/state.view.js";

export const statePage = createRouteView({
  name: "state",
  view: StateView,
});
