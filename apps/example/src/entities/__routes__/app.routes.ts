import { createRoutes } from "@echojs/router";
import { shellLayoutPage } from "@app/layout/shell-layout.page.js";
import { dashboardPage } from "@pages/dashboard/ui/page.js";
import { reactivityPage } from "@pages/reactivity/ui/page.js";
import { formsPage } from "@pages/forms/ui/page.js";
import { formsNestedPage } from "@pages/forms/nested/ui/page.js";
import { statePage } from "@pages/state/ui/page.js";
import { persistencePage } from "@pages/persistence/ui/page.js";
import { accountPage } from "@pages/account/ui/page.js";
import { authShellLayoutPage } from "@pages/auth/layout/ui/page.js";
import { authLoginPage } from "@pages/auth/login/ui/page.js";
import { authSignupPage } from "@pages/auth/signup/ui/page.js";
import { workspaceHomePage } from "@pages/workspace/home/ui/page.js";
import { workspaceLayoutPage } from "@pages/workspace/layout/ui/workspace-layout.page.js";
import { filesPage } from "@pages/workspace/files/ui/page.js";
import { settingsPage } from "@pages/workspace/settings/ui/page.js";
import { slowPage } from "@pages/workspace/slow/ui/page.js";
import { lazyPage } from "@pages/workspace/lazy/ui/page.js";
import { usersListPage } from "@pages/workspace/users/list/ui/page.js";
import { userPage } from "@pages/workspace/users/detail/ui/page.js";
import { usersLayoutPage } from "@pages/workspace/users/layout/ui/page.js";
import { workspaceOrgLayoutPage } from "@pages/workspace/org/layout/ui/page.js";
import { workspaceTeamLayoutPage } from "@pages/workspace/team/layout/ui/page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/ui/page.js";
import { catalogCategoryLayoutPage } from "@pages/workspace/catalog/category-layout/ui/page.js";
import { catalogProductLayoutPage } from "@pages/workspace/catalog/product-layout/ui/page.js";
import { catalogVariantPage } from "@pages/workspace/catalog/variant/ui/page.js";
import {
  legacyExample1Route,
  legacyExample3Route,
  legacyExample4Route,
  legacyPersistRoute,
  legacyStoreRoute,
  legacyUserRoute,
} from "@entities/__routes__/legacy.routes.js";

export const appRoutes = createRoutes([
  {
    path: "/auth",
    name: "auth",
    layoutView: authShellLayoutPage,
    children: [
      { path: "login", name: "auth-login", routeView: authLoginPage },
      { path: "signup", name: "auth-signup", routeView: authSignupPage },
    ],
  },
  {
    path: "/",
    name: "lab",
    layoutView: shellLayoutPage,
    children: [
      { path: "/", name: "dashboard", routeView: dashboardPage },
      { path: "reactivity", name: "reactivity", routeView: reactivityPage },
      { path: "forms", name: "forms", routeView: formsPage },
      { path: "forms/nested", name: "forms-nested", routeView: formsNestedPage },
      { path: "state", name: "state", routeView: statePage },
      { path: "persistence", name: "persistence", routeView: persistencePage },
      { path: "account", name: "account", routeView: accountPage },
      { path: "example1", name: "legacy-example1", route: legacyExample1Route },
      { path: "example3", name: "legacy-example3", route: legacyExample3Route },
      { path: "example4", name: "legacy-example4", route: legacyExample4Route },
      { path: "store", name: "legacy-store", route: legacyStoreRoute },
      { path: "persist", name: "legacy-persist", route: legacyPersistRoute },
      {
        path: "workspace",
        name: "workspace",
        layoutView: workspaceLayoutPage,
        children: [
          { path: "/", name: "workspace-home", routeView: workspaceHomePage },
          {
            path: "users",
            name: "users",
            layoutView: usersLayoutPage,
            children: [
              { path: "/", name: "users-list", routeView: usersListPage },
              { path: ":id", name: "user", routeView: userPage },
            ],
          },
          {
            path: "workspace/:orgId",
            name: "workspace-org",
            layoutView: workspaceOrgLayoutPage,
            children: [
              {
                path: "team/:teamId",
                name: "workspace-team",
                layoutView: workspaceTeamLayoutPage,
                children: [
                  {
                    path: "sprint/:sprintId",
                    name: "workspace-sprint",
                    routeView: workspaceSprintPage,
                  },
                ],
              },
            ],
          },
          {
            path: "catalog/:categoryId",
            name: "catalog-category",
            layoutView: catalogCategoryLayoutPage,
            children: [
              {
                path: "product/:productId",
                name: "catalog-product",
                layoutView: catalogProductLayoutPage,
                children: [
                  {
                    path: "variant/:variantId",
                    name: "catalog-variant",
                    routeView: catalogVariantPage,
                  },
                ],
              },
            ],
          },
          { path: "settings", name: "settings", routeView: settingsPage },
          { path: "slow", name: "slow", routeView: slowPage },
          { path: "lazy", name: "lazy", routeView: lazyPage },
          { path: "files/*", name: "files", routeView: filesPage },
          { path: "user/:id", name: "legacy-user", route: legacyUserRoute },
        ],
      },
    ],
  },
]);
