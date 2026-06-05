import { guardRoute } from "@echojs-ecosystem/router";
import { $isLoggedIn } from "@entities/session/index.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { accountPage } from "@pages/docs/account/account.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";

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
