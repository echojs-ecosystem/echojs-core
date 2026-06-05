import { createRouteView } from "@echojs-ecosystem/router";

import { AccountView } from "./ui/account.view.js";

export const accountPage = createRouteView({
  name: "account",
  view: AccountView,
});
