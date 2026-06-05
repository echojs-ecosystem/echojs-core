import { NavLink } from "@echojs-ecosystem/router/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { article, button, div, footer, h1, header, nav, p } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { hubPage } from "@pages/hub/hub.page.js";

export const AuthShellLayoutView = ({ outlet }: { outlet: () => Child }): Child =>
  div({ class: "auth-screen" }, [
    div({ class: "auth-screen__panel" }, [
      header(null, [
        h1(null, () => i18n.t("auth.layoutTitle")),
        p({ class: "auth-screen__lead" }, () => i18n.t("auth.layoutLead")),
      ]),
      nav({ class: "auth-screen__tabs" }, [
        NavLink({
          to: authLoginPage,
          activeClass: "auth-screen__tab--active",
          class: "auth-screen__tab",
          children: () => i18n.t("auth.loginTab"),
        }),
        NavLink({
          to: authSignupPage,
          activeClass: "auth-screen__tab--active",
          class: "auth-screen__tab",
          children: () => i18n.t("auth.signupTab"),
        }),
      ]),
      article({ class: "auth-screen__card" }, outlet() as Child),
      footer({ class: "auth-screen__footer" }, [
        button(
          {
            type: "button",
            class: "secondary",
            onClick: () => hubPage.go({}),
          },
          () => i18n.t("auth.backHome"),
        ),
      ]),
    ]),
  ]);
