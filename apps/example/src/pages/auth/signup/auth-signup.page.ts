import { createRouteView } from "@echojs/router";

import { AuthSignupView } from "./ui/auth-signup.view.js";

export const authSignupPage = createRouteView({
  name: "auth-signup",
  view: AuthSignupView,
});
