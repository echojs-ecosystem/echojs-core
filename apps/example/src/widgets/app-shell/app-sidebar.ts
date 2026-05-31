import { NavLink } from "@echojs/router/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { aside, button, div, nav, p, Show } from "@echojs/hyperdom";
import { platformModules } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
import type { TKey } from "@app/i18n/keys.js";
import { $authUser, $isLoggedIn, logout } from "@app/router/auth.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { dashboardPage } from "@pages/dashboard/dashboard.page.js";
import { accountPage } from "@pages/account/account.page.js";
import { formsPage } from "@pages/forms/forms.page.js";
import { formsNestedPage } from "@pages/forms/nested/forms-nested.page.js";
import { persistencePage } from "@pages/persistence/persistence.page.js";
import { queryPage } from "@pages/query/query.page.js";
import { reactivityPage } from "@pages/reactivity/reactivity.page.js";
import { statePage } from "@pages/state/state.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";
import { LocaleSwitcher } from "@widgets/locale-switcher/locale-switcher.js";
import type { AnyPage } from "@echojs/router";

const navLink = (page: AnyPage, labelKey: TKey): Child =>
  NavLink({
    to: page,
    activeClass: "app-shell__link--active",
    class: "app-shell__link",
    children: () => i18n.t(labelKey),
  });

const sectionTitle = (titleKey: TKey): Child =>
  p({ class: "app-shell__section-title" }, () => i18n.t(titleKey));

const platformPageById: Record<string, AnyPage> = {
  reactivity: reactivityPage,
  forms: formsPage,
  "forms-nested": formsNestedPage,
  state: statePage,
  persistence: persistencePage,
  query: queryPage,
};

export const AppSidebar = (): Child =>
  aside({ class: "app-shell__sidebar" }, [
    div({ class: "app-shell__brand" }, [
      NavLink({
        to: dashboardPage,
        class: "app-shell__brand-link",
        children: [
          p({ class: "app-shell__logo" }, "◉"),
          div(null, [
            p({ class: "app-shell__brand-name" }, () => i18n.t("shell.brandName")),
            p({ class: "app-shell__brand-tag" }, () => i18n.t("shell.brandTag")),
          ]),
        ],
      }),
    ]),
    LocaleSwitcher(),
    nav({ class: "app-shell__nav" }, [
      sectionTitle("shell.sectionApp"),
      navLink(dashboardPage, "shell.overview"),
      navLink(accountPage, "shell.account"),
      sectionTitle("shell.sectionPlatform"),
      ...platformModules.map((m) => navLink(platformPageById[m.id]!, m.titleKey)),
      sectionTitle("shell.sectionProduct"),
      navLink(workspaceHomePage, "shell.workspace"),
    ]),
    div({ class: "app-shell__session" }, [
      Show(
        () => $isLoggedIn.value(),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, () => i18n.t("common.session")),
            p({ class: "app-shell__session-user" }, () => $authUser.value()?.name ?? i18n.t("common.user")),
            button(
              { type: "button", class: "secondary app-shell__session-btn", "on:click": logout },
              () => i18n.t("common.logout"),
            ),
          ]),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, () => i18n.t("common.guest")),
            button(
              { type: "button", class: "app-shell__session-btn", "on:click": () => authLoginPage.go({}) },
              () => i18n.t("common.login"),
            ),
          ]),
      ),
    ]),
  ]);
