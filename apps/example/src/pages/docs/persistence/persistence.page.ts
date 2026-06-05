import { createRouteView } from "@echojs-ecosystem/router";

import { PersistenceView } from "./ui/persistence.view.js";

export const persistencePage = createRouteView({
  name: "persistence",
  view: PersistenceView,
});
