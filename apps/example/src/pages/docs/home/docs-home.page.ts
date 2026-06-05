import { createRouteView } from "@echojs-ecosystem/router";

import { DocsHomeView } from "./ui/docs-home.view.js";

export const docsHomePage = createRouteView({
  name: "docs-home",
  view: DocsHomeView,
});
