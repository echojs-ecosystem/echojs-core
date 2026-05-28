import { createLayoutView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { article, button, code, div, footer, h1, header, nav, p } from "@echojs/hyperdom";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { dashboardPage } from "@pages/dashboard/dashboard.page.js";

export const authShellLayoutPage = createLayoutView({
  name: "auth-shell",
  view: ({ outlet }) =>
    div({ class: "auth-screen" }, [
      div({ class: "auth-screen__panel" }, [
        header(null, [
          h1(null, "EchoJS Auth"),
          p({ class: "auth-screen__lead" }, [
            "Вход в ",
            "EchoJS Lab",
            ". Сессия сохраняется через ",
            code(null, "@echojs/persist"),
            " (cookie + localStorage).",
          ]),
        ]),
        nav({ class: "auth-screen__tabs" }, [
          NavLink({
            to: authLoginPage,
            activeClass: "auth-screen__tab--active",
            class: "auth-screen__tab",
            children: "Вход",
          }),
          NavLink({
            to: authSignupPage,
            activeClass: "auth-screen__tab--active",
            class: "auth-screen__tab",
            children: "Регистрация",
          }),
        ]),
        article({ class: "auth-screen__card" }, outlet() as Child),
        footer({ class: "auth-screen__footer" }, [
          button(
            {
              type: "button",
              class: "secondary",
              "on:click": () => dashboardPage.go({}),
            },
            "← На главную",
          ),
        ]),
      ]),
    ]) as Child,
});

