import { createRouteView } from "@echojs/router";
import type { AnyPage } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { button, code, div, h3, li, p, section, Show, ul } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { labModules, platformModules } from "@app/config/lab-modules.js";
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
    h3(null, meta.title),
    p({ class: "dashboard-card__desc" }, meta.description),
    NavLink({
      to: labPageById[meta.id]!,
      class: "dashboard-card__link",
      children: "Открыть модуль →",
    }),
  ]);

export const dashboardPage = createRouteView({
  name: "dashboard",
  view: () =>
    div({ class: "page dashboard" }, [
      section({ class: "dashboard-hero" }, [
        h3(null, "EchoJS Lab"),
        p(null, [
          "Интерактивное приложение для изучения экосистемы EchoJS. Каждый раздел — ",
          "рабочий функционал",
          ", а не изолированный сниппет: формы сохраняются, сессия переживает перезагрузку, ",
          "workspace ведёт себя как продукт.",
        ]),
        Show(
          () => $isLoggedIn.value(),
          () =>
            p({ class: "dashboard-hero__session" }, [
              "Вы вошли как ",
              code(null, () => $authUser.value()?.email ?? ""),
              ". Токен в cookie, профиль в localStorage.",
            ]),
          () =>
            div({ class: "dashboard-hero__actions" }, [
              p(null, "Войдите, чтобы открыть аккаунт и защищённые разделы workspace."),
              button({ type: "button", "on:click": () => authLoginPage.go({}) }, "Войти"),
            ]),
        ),
      ]),
      section({ class: "dashboard-section" }, [
        p({ class: "dashboard-section__title" }, "Платформа"),
        div({ class: "dashboard-grid" }, platformModules.map(ModuleCard)),
      ]),
      section({ class: "dashboard-section" }, [
        p({ class: "dashboard-section__title" }, "Продукт"),
        div({ class: "dashboard-grid" }, [
          ModuleCard(labModules.find((m) => m.id === "workspace")!),
          ModuleCard(labModules.find((m) => m.id === "account")!),
        ]),
      ]),
      section({ class: "dashboard-note" }, [
        p(null, "Быстрые ссылки:"),
        ul(null, [
          li(null, [NavLink({ to: workspaceHomePage, children: "Workspace — маршруты и layouts" })]),
          li(null, [NavLink({ to: accountPage, children: "Аккаунт — профиль и persist" })]),
        ]),
      ]),
    ]),
});

