import { createRouteView } from "@echojs/router";
import type { AnyPage } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { button, code, div, h3, li, p, section, Show, ul } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { labModules, platformModules } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
import { $authUser, $isLoggedIn } from "@app/router/auth.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { accountPage } from "@pages/account/account.page.js";
import { formsPage } from "@pages/forms/forms.page.js";
import { formsNestedPage } from "@pages/forms/nested/forms-nested.page.js";
import { persistencePage } from "@pages/persistence/persistence.page.js";
import { queryPage } from "@pages/query/query.page.js";
import { reactivityPage } from "@pages/reactivity/reactivity.page.js";
import { statePage } from "@pages/state/state.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";

const labPageById: Record<string, AnyPage> = {
  reactivity: reactivityPage,
  forms: formsPage,
  "forms-nested": formsNestedPage,
  state: statePage,
  persistence: persistencePage,
  query: queryPage,
  workspace: workspaceHomePage,
  account: accountPage,
};

const ModuleCard = (meta: (typeof labModules)[0]): Child =>
  section({ class: "dashboard-card" }, [
    p({ class: "dashboard-card__package" }, code(null, meta.package)),
    h3(null, () => i18n.t(meta.titleKey)),
    p({ class: "dashboard-card__desc" }, () => i18n.t(meta.descriptionKey)),
    NavLink({
      to: labPageById[meta.id]!,
      class: "dashboard-card__link",
      children: () => i18n.t("common.openModule"),
    }),
  ]);

export const dashboardPage = createRouteView({
  name: "dashboard",
  view: () =>
    div({ class: "page dashboard" }, [
      section({ class: "dashboard-hero" }, [
        h3(null, () => i18n.t("dashboard.heroTitle")),
        p(null, () => i18n.t("dashboard.heroBody")),
        Show(
          () => $isLoggedIn.value(),
          () =>
            p({ class: "dashboard-hero__session" }, [
              () =>
                i18n.t("dashboard.loggedInAs", {
                  email: $authUser.value()?.email ?? "",
                }),
            ]),
          () =>
            div({ class: "dashboard-hero__actions" }, [
              p(null, () => i18n.t("dashboard.loginHint")),
              button(
                { type: "button", "on:click": () => authLoginPage.go({}) },
                () => i18n.t("common.login"),
              ),
            ]),
        ),
      ]),
      section({ class: "dashboard-section" }, [
        p({ class: "dashboard-section__title" }, () => i18n.t("dashboard.sectionPlatform")),
        div({ class: "dashboard-grid" }, platformModules.map(ModuleCard)),
      ]),
      section({ class: "dashboard-section" }, [
        p({ class: "dashboard-section__title" }, () => i18n.t("dashboard.sectionProduct")),
        div({ class: "dashboard-grid" }, [
          ModuleCard(labModules.find((m) => m.id === "workspace")!),
          ModuleCard(labModules.find((m) => m.id === "account")!),
        ]),
      ]),
      section({ class: "dashboard-note" }, [
        p(null, () => i18n.t("dashboard.quickLinks")),
        ul(null, [
          li(null, [
            NavLink({ to: workspaceHomePage, children: () => i18n.t("dashboard.linkWorkspace") }),
          ]),
          li(null, [
            NavLink({ to: accountPage, children: () => i18n.t("dashboard.linkAccount") }),
          ]),
        ]),
      ]),
    ]),
});
