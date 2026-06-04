import { $isLoggedIn } from "@app/router/auth.js";
import { workspaceModuleMeta } from "@app/config/workspace-module.js";
import { i18n } from "@app/providers/i18n.js";
import type { TKey } from "@app/providers/i18n.js";
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
  div,
  h4,
  p,
  pre,
  section,
  Show,
  strong,
} from "@pages/workspace/ui/common.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const demoCard = (titleKey: TKey, body: Child): Child =>
  section({ class: "workspace-card" }, [
    h4(null, () => i18n.t(titleKey)),
    body,
  ]);

const actionRow = (...buttons: Child[]): Child =>
  div({ class: "workspace-card__actions" }, buttons);

export const WorkspaceHomeView = (): Child =>
  div({ class: "page workspace-home" }, [
    ModuleHeader(workspaceModuleMeta),
    p({ class: "page__hint" }, () => i18n.t("workspace.home.hint")),

    demoCard("workspace.home.usersTitle", [
      p(null, () => i18n.t("workspace.home.usersDesc")),
      actionRow(
        button({ onClick: () => usersListPage.go() }, () => i18n.t("workspace.home.list")),
        button(
          {
            onClick: () => userPage.go({ id: "1" }, { query: { tab: "profile" } }),
          },
          "User #1",
        ),
      ),
    ]),

    demoCard("workspace.home.orgsTitle", [
      actionRow(
        button({
          onClick: () =>
            workspaceSprintPage.go(
              { orgId: "acme", teamId: "platform", sprintId: "s24" },
              { query: { tab: "board" } },
            ),
        }, "Acme / S24"),
        button({
          onClick: () =>
            workspaceSprintPage.go(
              { orgId: "north", teamId: "ops", sprintId: "ops-3" },
              { query: { tab: "retro" } },
            ),
        }, "North / retro"),
      ),
    ]),

    demoCard("workspace.home.catalogTitle", [
      actionRow(
        button({
          onClick: () =>
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
          onClick: () =>
            catalogVariantPage.go(
              { categoryId: "home", productId: "lamp", variantId: "rgb" },
              { query: { tab: "order" } },
            ),
        }, "Lamp order"),
      ),
    ]),

    demoCard("workspace.home.utilityTitle", [
      actionRow(
        button(
          { onClick: () => settingsPage.go({}) },
          () => i18n.t("workspace.home.settingsGuard"),
        ),
        button({ onClick: () => slowPage.go({}) }, "Slow load"),
        button({ onClick: () => filesPage.go({ "*": "docs/readme.md" }) }, "Files *"),
        button({ onClick: () => legacyUserRoute.go({ id: "3" }) }, "Legacy redirect"),
      ),
    ]),

    demoCard("workspace.home.stateTitle", [
      p(null, [
        () => i18n.t("workspace.home.authLabel"),
        " ",
        strong(null, () =>
          i18n.t($isLoggedIn.value() ? "workspace.home.authYes" : "workspace.home.authNo"),
        ),
      ]),
      Show(
        () => !$isLoggedIn.value(),
        () =>
          p({ class: "router-muted" }, [
            () => i18n.t("workspace.home.settingsNeedLogin"),
            button(
              { type: "button", onClick: () => authLoginPage.go({}) },
              () => i18n.t("workspace.home.login"),
            ),
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
  ]);
