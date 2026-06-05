import { createRoutes } from "@echojs-ecosystem/router";
import { hubPage } from "@pages/hub/hub.page.js";
import { authShellLayoutPage } from "@pages/auth/layout/auth-shell-layout.page.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { docsRoutes } from "@entities/__routes__/docs.routes.js";
import { legacyPathRedirectRoutes } from "@entities/__routes__/path-redirects.js";
import { workspaceRoutes } from "@entities/__routes__/workspace.routes.js";

export const appRoutes = createRoutes([
  {
    path: "/auth",
    name: "auth",
    layoutView: authShellLayoutPage,
    children: [
      { path: "login", name: "auth-login", routeView: authLoginPage },
      { path: "signup", name: "auth-signup", routeView: authSignupPage },
    ],
  },
  { path: "/", name: "hub", routeView: hubPage },
  ...docsRoutes,
  ...workspaceRoutes,
  ...legacyPathRedirectRoutes,
]);
