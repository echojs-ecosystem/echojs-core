import { createRouteView } from "@echojs/router";

import { AuthLoginView } from "./ui/auth-login.view.js";

export const authLoginPage = createRouteView({
  name: "auth-login",
  view: AuthLoginView,
});
