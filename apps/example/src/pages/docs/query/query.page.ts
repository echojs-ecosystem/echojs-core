import { createRouteView } from "@echojs/router";

import { QueryView } from "./ui/query.view.js";

export const queryPage = createRouteView({
  name: "query",
  view: QueryView,
});
