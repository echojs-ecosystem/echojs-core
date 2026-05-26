import { guardRoute } from "@echojs/router";
import { $isLoggedIn } from "@entities/session/index.js";
import { authLoginPage } from "@pages/auth/login/ui/page.js";
import { accountPage } from "@pages/account/ui/page.js";
import { settingsPage } from "@pages/workspace/settings/ui/page.js";

guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
});

guardRoute({
  route: accountPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
});
