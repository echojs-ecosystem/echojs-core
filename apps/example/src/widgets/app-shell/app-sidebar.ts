import { NavLink } from "@echojs/router/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { aside, button, div, nav, p, Show } from "@echojs/hyperdom";
import { platformModules } from "@app/config/lab-modules.js";
import { $authUser, $isLoggedIn, logout } from "@app/router/auth.js";
import { authLoginPage } from "@pages/auth/login/ui/page.js";
import { dashboardPage } from "@pages/dashboard/ui/page.js";
import { accountPage } from "@pages/account/ui/page.js";
import { formsPage } from "@pages/forms/ui/page.js";
import { formsNestedPage } from "@pages/forms/nested/ui/page.js";
import { persistencePage } from "@pages/persistence/ui/page.js";
import { reactivityPage } from "@pages/reactivity/ui/page.js";
import { statePage } from "@pages/state/ui/page.js";
import { workspaceHomePage } from "@pages/workspace/home/ui/page.js";
import type { AnyPage } from "@echojs/router";

const navLink = (page: AnyPage, label: string): Child =>
  NavLink({
    to: page,
    activeClass: "app-shell__link--active",
    class: "app-shell__link",
    children: label,
  });

const sectionTitle = (title: string): Child =>
  p({ class: "app-shell__section-title" }, title);

const platformPageById: Record<string, AnyPage> = {
  reactivity: reactivityPage,
  forms: formsPage,
  "forms-nested": formsNestedPage,
  state: statePage,
  persistence: persistencePage,
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
            p({ class: "app-shell__brand-name" }, "EchoJS Lab"),
            p({ class: "app-shell__brand-tag" }, "интерактивная платформа"),
          ]),
        ],
      }),
    ]),
    nav({ class: "app-shell__nav" }, [
      sectionTitle("Приложение"),
      navLink(dashboardPage, "Обзор"),
      navLink(accountPage, "Аккаунт"),
      sectionTitle("Платформа"),
      ...platformModules.map((m) => navLink(platformPageById[m.id]!, m.title)),
      sectionTitle("Продукт"),
      navLink(workspaceHomePage, "Workspace"),
    ]),
    div({ class: "app-shell__session" }, [
      Show(
        () => $isLoggedIn.value(),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, "Сессия"),
            p({ class: "app-shell__session-user" }, () => $authUser.value()?.name ?? "User"),
            button({ type: "button", class: "secondary app-shell__session-btn", "on:click": logout }, "Выйти"),
          ]),
        () =>
          div(null, [
            p({ class: "app-shell__session-label" }, "Гость"),
            button({ type: "button", class: "app-shell__session-btn", "on:click": () => authLoginPage.go({}) }, "Войти"),
          ]),
      ),
    ]),
  ]);
