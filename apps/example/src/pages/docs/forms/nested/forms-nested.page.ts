import { createRouteView } from "@echojs/router";

import { FormsNestedView } from "./ui/forms-nested.view.js";

export const formsNestedPage = createRouteView({
  name: "forms-nested",
  view: FormsNestedView,
});
