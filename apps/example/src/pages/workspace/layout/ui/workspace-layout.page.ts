import { createLayoutView } from "@echojs/router";
import type { AnyPage } from "@echojs/router";
import { h, type Child } from "@echojs/hyperdom";
import { appRouter } from "@app/router/index.js";
import { $isLoggedIn } from "@app/router/auth.js";
import { $activePageTitle } from "@app/router/model.js";
import { USERS } from "@entities/user/index.js";
import { catalogVariantPage } from "@pages/workspace/catalog/catalog-variant.page.js";
import { filesPage } from "@pages/workspace/files/workspace-files.page.js";
import { slowPage } from "@pages/workspace/slow/workspace-slow.page.js";
import { lazyPage } from "@pages/workspace/lazy/workspace-lazy.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";
import { userPage } from "@pages/workspace/users/user-detail.page.js";
import { usersListPage } from "@pages/workspace/users/users-list.page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";
import { workspaceProductsPage } from "@pages/workspace/products/workspace-products.page.js";
import {
  aside,
  button,
  div,
  h4,
  nav,
  p,
  pre,
  section,
  Show,
  ul,
  li,
} from "@pages/workspace/ui/common.js";

const trackedPages: AnyPage[] = [
  workspaceHomePage,
  usersListPage,
  userPage,
  settingsPage,
  slowPage,
  lazyPage,
  filesPage,
  workspaceSprintPage,
  catalogVariantPage,
  workspaceProductsPage,
];

const navGroup = (title: string, items: Child[]): Child =>
  div({ class: "workspace-subnav__group" }, [
    p({ class: "workspace-subnav__title" }, title),
    ul(null, items),
  ]);

const navItem = (
  page: AnyPage,
  label: string,
  opts?: { params?: Record<string, string>; query?: Record<string, string> },
): Child => {
  const params = opts?.params ?? {};
  const query = opts?.query;

  return li(null, [
    h(
      "a",
      {
        class: "workspace-subnav__link",
        href: () =>
          appRouter.resolve(page, params, {
            query: query as Record<string, unknown> | undefined,
          }),
        "on:click:prevent": () => {
          page.go(params as never, { query: query as never });
        },
      },
      label,
    ),
  ]);
};

export const workspaceLayoutPage = createLayoutView({
  name: "workspace-layout",
  view: ({ outlet }) =>
    div({ class: "workspace-shell" }, [
      nav({ class: "workspace-subnav" }, [
        p({ class: "workspace-subnav__heading" }, () => $activePageTitle.value()),
        navGroup("Обзор", [navItem(workspaceHomePage, "Старт workspace")]),
        navGroup("Команда", [
          navItem(usersListPage, "Пользователи"),
          navItem(userPage, "Профиль #1", { params: { id: "1" }, query: { tab: "profile" } }),
        ]),
        navGroup("Спринты", [
          navItem(workspaceSprintPage, "Acme / S24", {
            params: { orgId: "acme", teamId: "platform", sprintId: "s24" },
            query: { tab: "board" },
          }),
          navItem(workspaceSprintPage, "North / Ops", {
            params: { orgId: "north", teamId: "ops", sprintId: "ops-3" },
            query: { tab: "overview" },
          }),
        ]),
        navGroup("Каталог", [
          navItem(catalogVariantPage, "Phone 128GB", {
            params: { categoryId: "electronics", productId: "phone", variantId: "128gb" },
            query: { tab: "specs" },
          }),
          navItem(catalogVariantPage, "Заказ лампы", {
            params: { categoryId: "home", productId: "lamp", variantId: "rgb" },
            query: { tab: "order" },
          }),
          navItem(workspaceProductsPage, "Товары (URL state)"),
        ]),
        navGroup("Ещё", [
          navItem(settingsPage, "Настройки"),
          navItem(slowPage, "Медленная загрузка"),
          navItem(lazyPage, "Lazy chunk"),
          navItem(filesPage, "Файлы", { params: { "*": "docs/readme.md" } }),
        ]),
        Show(
          () => !$isLoggedIn.value(),
          () => p({ class: "workspace-subnav__hint" }, "Настройки доступны после входа."),
        ),
      ]),
      div({ class: "workspace-shell__content" }, outlet() as Child),
      aside({ class: "workspace-shell__debug" }, [
        h4(null, "Router"),
        pre(null, () => {
          const active = trackedPages.find((page) => page.$isOpened.value());
          return JSON.stringify(
            {
              page: active?.name ?? null,
              path: active?.$path.value() ?? null,
              params: active?.$params.value() ?? null,
              query: active?.$query.value() ?? null,
            },
            null,
            2,
          );
        }),
        button(
          {
            type: "button",
            class: "secondary",
            "on:click": () => {
              const user = USERS[Math.floor(Math.random() * USERS.length)]!;
              userPage.go({ id: user.id }, { query: { tab: "profile" } });
            },
          },
          "Random user",
        ),
      ]),
    ]) as Child,
});
