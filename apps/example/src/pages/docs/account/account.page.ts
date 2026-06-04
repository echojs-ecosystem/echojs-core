import { createRouteView } from "@echojs/router";

import { AccountView } from "./ui/account.view.js";

export const accountPage = createRouteView({
  name: "account",
  view: AccountView,
});
