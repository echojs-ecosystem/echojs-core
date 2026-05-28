import { createRouteView } from "@echojs/router";
import { $isLoggedIn } from "@app/router/auth.js";
import { getModule } from "@app/config/lab-modules.js";
import { legacyUserRoute } from "@entities/__routes__/legacy.routes.js";
import { USERS } from "@entities/user/index.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";
import { catalogVariantPage } from "@pages/workspace/catalog/catalog-variant.page.js";
import { filesPage } from "@pages/workspace/files/workspace-files.page.js";
import { slowPage } from "@pages/workspace/slow/workspace-slow.page.js";
import { userPage } from "@pages/workspace/users/user-detail.page.js";
import { usersListPage } from "@pages/workspace/users/users-list.page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import type { Child } from "@echojs/hyperdom";
import {
  button,
  code,
  div,
  h4,
  li,
  p,
  pre,
  section,
  Show,
  span,
  strong,
  ul,
} from "@pages/workspace/ui/common.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getModule("workspace")!;

const demoCard = (title: string, body: Child): Child =>
  section({ class: "workspace-card" }, [h4(null, title), body]);

const actionRow = (...buttons: Child[]): Child =>
  div({ class: "workspace-card__actions" }, buttons);

export const workspaceHomePage = createRouteView({
  name: "workspace-home",
  view: () =>
    div({ class: "page workspace-home" }, [
      ModuleHeader(meta),
      p({ class: "page__hint" }, "Используйте боковую навигацию workspace справа → для сценариев продукта."),

      demoCard("Пользователи и профили", [
        p(null, "Список, карточка с query tab, replace без перезагрузки layout."),
        actionRow(
          button({ "on:click": () => usersListPage.go() }, "Список"),
          button({
            "on:click": () => userPage.go({ id: "1" }, { query: { tab: "profile" } }),
          }, "User #1"),
        ),
      ]),

      demoCard("Организации и спринты", [
        actionRow(
          button({
            "on:click": () =>
              workspaceSprintPage.go(
                { orgId: "acme", teamId: "platform", sprintId: "s24" },
                { query: { tab: "board" } },
              ),
          }, "Acme / S24"),
          button({
            "on:click": () =>
              workspaceSprintPage.go(
                { orgId: "north", teamId: "ops", sprintId: "ops-3" },
                { query: { tab: "retro" } },
              ),
          }, "North / retro"),
        ),
      ]),

      demoCard("Каталог", [
        actionRow(
          button({
            "on:click": () =>
              catalogVariantPage.go(
                {
                  categoryId: "electronics",
                  productId: "phone",
                  variantId: "128gb",
                },
                { query: { tab: "specs" } },
              ),
          }, "Phone specs"),
          button({
            "on:click": () =>
              catalogVariantPage.go(
                { categoryId: "home", productId: "lamp", variantId: "rgb" },
                { query: { tab: "order" } },
              ),
          }, "Lamp order"),
        ),
      ]),

      demoCard("Служебное", [
        actionRow(
          button({ "on:click": () => settingsPage.go({}) }, "Настройки (guard)"),
          button({ "on:click": () => slowPage.go({}) }, "Slow load"),
          button({ "on:click": () => filesPage.go({ "*": "docs/readme.md" }) }, "Files *"),
          button({ "on:click": () => legacyUserRoute.go({ id: "3" }) }, "Legacy redirect"),
        ),
      ]),

      demoCard("Состояние", [
        p(null, [
          "Авторизация: ",
          strong(null, () => ($isLoggedIn.value() ? "да" : "нет")),
        ]),
        Show(
          () => !$isLoggedIn.value(),
          () =>
            p({ class: "router-muted" }, [
              "Раздел настроек требует входа — ",
              button({ type: "button", "on:click": () => authLoginPage.go({}) }, "войти"),
            ]),
        ),
        pre({ class: "workspace-card__code" }, () =>
          JSON.stringify(
            {
              users: USERS.length,
              sample: USERS[0]?.name,
            },
            null,
            2,
          ),
        ),
      ]),
    ]),
});

