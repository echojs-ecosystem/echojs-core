import { NavLink } from "@echojs-ecosystem/router/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { aside, button, div, nav, p, Show } from "@echojs-ecosystem/hyperdom";
import { docsModules } from "@app/config/docs-modules.js";
import { i18n } from "@app/providers/i18n.js";
import type { TKey } from "@app/providers/i18n.js";
import { $authUser, $isLoggedIn, logout } from "@app/router/auth.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { accountPage } from "@pages/docs/account/account.page.js";
import { docsHomePage } from "@pages/docs/home/docs-home.page.js";
import { formsPage } from "@pages/docs/forms/forms.page.js";
import { formsNestedPage } from "@pages/docs/forms/nested/forms-nested.page.js";
import { persistencePage } from "@pages/docs/persistence/persistence.page.js";
import { queryPage } from "@pages/docs/query/query.page.js";
import { reactivityPage } from "@pages/docs/reactivity/reactivity.page.js";
import { statePage } from "@pages/docs/state/state.page.js";
import { hubPage } from "@pages/hub/hub.page.js";
import { LocaleSwitcher } from "@widgets/locale-switcher/locale-switcher.js";
import type { AnyPage } from "@echojs-ecosystem/router";

const navLink = (page: AnyPage, labelKey: TKey): Child =>
  NavLink({
    to: page,
    activeClass: "app-shell__link--active",
    class: "app-shell__link",
    children: () => i18n.t(labelKey),
  });

const sectionTitle = (titleKey: TKey): Child =>
  p({ class: "app-shell__section-title" }, () => i18n.t(titleKey));

const docsPageById: Record<string, AnyPage> = {
  reactivity: reactivityPage,
  forms: formsPage,
  "forms-nested": formsNestedPage,
  state: statePage,
  persistence: persistencePage,
  query: queryPage,
  account: accountPage,
};

export const DocsSidebar = (): Child =>
  aside({ class: "app-shell__sidebar" }, [
    div({ class: "app-shell__brand" }, [
      NavLink({
        to: docsHomePage,
        class: "app-shell__brand-link",
        children: [
          p({ class: "app-shell__logo" }, "◉"),
          div(null, [
            p({ class: "app-shell__brand-name" }, () => i18n.t("docs.shell.brandName")),
            p({ class: "app-shell__brand-tag" }, () => i18n.t("docs.shell.brandTag")),
          ]),
        ],
      }),
    ]),
    LocaleSwitcher(),
    nav({ class: "app-shell__nav" }, [
      sectionTitle("docs.shell.sectionNav"),
      navLink(hubPage, "docs.shell.hub"),
      navLink(docsHomePage, "docs.shell.overview"),
      navLink(accountPage, "docs.shell.account"),
      sectionTitle("docs.shell.sectionModules"),
      ...docsModules
        .filter((m) => m.id !== "account")
        .map((m) => navLink(docsPageById[m.id]!, m.titleKey)),
    ]),
    div({ class: "app-shell__session" }, [
      Show(
        () => $isLoggedIn.value(),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, () => i18n.t("common.session")),
            p({ class: "app-shell__session-user" }, () => $authUser.value()?.name ?? i18n.t("common.user")),
            button(
              { type: "button", class: "secondary app-shell__session-btn", onClick: logout },
              () => i18n.t("common.logout"),
            ),
          ]),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, () => i18n.t("common.guest")),
            button(
              { type: "button", class: "app-shell__session-btn",
                onClick: () => authLoginPage.go() },
              () => i18n.t("common.login"),
            ),
          ]),
      ),
    ]),
  ]);
