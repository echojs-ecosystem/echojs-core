import { createRouteView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { code, div, h4, li, p, section, ul } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";
import { accountPage } from "@pages/account/account.page.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";

const meta = getModule("persistence")!;

export const persistencePage = createRouteView({
  name: "persistence",
  view: () =>
    section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      div({ class: "persistence-overview" }, [
        h4(null, "Что реализовано в приложении"),
        ul(null, [
          li(null, [
            code(null, "withCookie"),
            " — access token (см. ",
            NavLink({ to: authLoginPage, children: "вход" }),
            ")",
          ]),
          li(null, [code(null, "withLocalStorage"), " — профиль пользователя и черновики форм"]),
          li(null, [
            code(null, "persist(field)"),
            " — email/remember на login, поля profile на ",
            NavLink({ to: accountPage, children: "аккаунте" }),
          ]),
        ]),
        p({ class: "page__hint" }, [
          "Пакет ",
          code(null, "@echojs/persist"),
          " подключается через ",
          code(null, ".extend()"),
          " — store и form primitives не знают о browser API.",
        ]),
      ]),
    ]),
});

