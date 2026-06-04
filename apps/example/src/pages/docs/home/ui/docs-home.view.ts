import { NavLink } from "@echojs/router/hyperdom";
import type { AnyPage } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { button, code, div, h3, li, p, section, Show, ul } from "@echojs/hyperdom";
import { docsModules } from "@app/config/docs-modules.js";
import { i18n } from "@app/providers/i18n.js";
import { $authUser, $isLoggedIn } from "@app/router/auth.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { accountPage } from "@pages/docs/account/account.page.js";
import { formsPage } from "@pages/docs/forms/forms.page.js";
import { formsNestedPage } from "@pages/docs/forms/nested/forms-nested.page.js";
import { persistencePage } from "@pages/docs/persistence/persistence.page.js";
import { queryPage } from "@pages/docs/query/query.page.js";
import { reactivityPage } from "@pages/docs/reactivity/reactivity.page.js";
import { statePage } from "@pages/docs/state/state.page.js";
import { hubPage } from "@pages/hub/hub.page.js";

const docsPageById: Record<string, AnyPage> = {
  reactivity: reactivityPage,
  forms: formsPage,
  "forms-nested": formsNestedPage,
  state: statePage,
  persistence: persistencePage,
  query: queryPage,
  account: accountPage,
};

const ModuleCard = (meta: (typeof docsModules)[number]): Child =>
  section({ class: "dashboard-card" }, [
    p({ class: "dashboard-card__package" }, code(null, meta.package)),
    h3(null, () => i18n.t(meta.titleKey)),
    p({ class: "dashboard-card__desc" }, () => i18n.t(meta.descriptionKey)),
    NavLink({
      to: docsPageById[meta.id]!,
      class: "dashboard-card__link",
      children: () => i18n.t("common.openModule"),
    }),
  ]);

export const DocsHomeView = (): Child =>
  div({ class: "page dashboard" }, [
    section({ class: "dashboard-hero" }, [
      h3(null, () => i18n.t("docs.home.heroTitle")),
      p(null, () => i18n.t("docs.home.heroBody")),
      Show(
        () => $isLoggedIn.value(),
        () =>
          p({ class: "dashboard-hero__session" }, [
            () =>
              i18n.t("docs.home.loggedInAs", {
                email: $authUser.value()?.email ?? "",
              }),
          ]),
        () =>
          div({ class: "dashboard-hero__actions" }, [
            p(null, () => i18n.t("docs.home.loginHint")),
            button(
              { type: "button", onClick: () => authLoginPage.go({}) },
              () => i18n.t("common.login"),
            ),
          ]),
      ),
    ]),
    section({ class: "dashboard-section" }, [
      p({ class: "dashboard-section__title" }, () => i18n.t("docs.home.sectionModules")),
      div({ class: "dashboard-grid" }, docsModules.map(ModuleCard)),
    ]),
    section({ class: "dashboard-note" }, [
      p(null, () => i18n.t("docs.home.backHint")),
      ul(null, [
        li(null, [NavLink({ to: hubPage, children: () => i18n.t("docs.home.backToHub") })]),
      ]),
    ]),
  ]);
