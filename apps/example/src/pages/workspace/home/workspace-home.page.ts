import { createRouteView } from "@echojs/router";

import { WorkspaceHomeView } from "./ui/workspace-home.view.js";

export const workspaceHomePage = createRouteView({
  name: "workspace-home",
  view: WorkspaceHomeView,
});
