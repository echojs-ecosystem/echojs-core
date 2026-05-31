import { createRouteView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { code, div, h4, li, p, section, ul } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
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
        h4(null, () => i18n.t("persistence.intro")),
        ul(null, [
          li(null, [
            code(null, "withCookie"),
            () => i18n.t("persistence.cookieItem"),
            NavLink({ to: authLoginPage, children: () => i18n.t("persistence.loginLink") }),
            ")",
          ]),
          li(null, [
            code(null, "withLocalStorage"),
            () => i18n.t("persistence.localItem"),
          ]),
          li(null, [
            code(null, "persist(field)"),
            () => i18n.t("persistence.fieldItem"),
            NavLink({ to: accountPage, children: () => i18n.t("persistence.accountLink") }),
          ]),
        ]),
        p({ class: "page__hint" }, () => i18n.t("persistence.hint")),
      ]),
    ]),
});
