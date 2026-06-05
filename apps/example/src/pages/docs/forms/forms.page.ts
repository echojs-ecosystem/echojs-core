import { createRouteView } from "@echojs-ecosystem/router";

import { FormsView } from "./ui/forms.view.js";

export const formsPage = createRouteView({
  name: "forms",
  view: FormsView,
});
