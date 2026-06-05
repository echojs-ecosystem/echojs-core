import { createRouteView } from "@echojs-ecosystem/router";

import { QueryView } from "./ui/query.view.js";

export const queryPage = createRouteView({
  name: "query",
  view: QueryView,
});
