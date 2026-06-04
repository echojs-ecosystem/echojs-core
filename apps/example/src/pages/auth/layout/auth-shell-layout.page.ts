import { createLayoutView } from "@echojs/router";

import { AuthShellLayoutView } from "./ui/auth-shell-layout.view.js";

export const authShellLayoutPage = createLayoutView({
  name: "auth-shell",
  view: AuthShellLayoutView,
});
