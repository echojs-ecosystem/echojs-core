import { createRouteView } from "@echojs/router";

import { HubView } from "./ui/hub.view.js";

export const hubPage = createRouteView({
  name: "hub",
  view: HubView,
});
