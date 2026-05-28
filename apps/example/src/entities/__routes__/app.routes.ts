import { createRoutes } from "@echojs/router";
import { shellLayoutPage } from "@app/layout/shell-layout.page.js";
import { dashboardPage } from "@pages/dashboard/dashboard.page.js";
import { reactivityPage } from "@pages/reactivity/reactivity.page.js";
import { formsPage } from "@pages/forms/forms.page.js";
import { formsNestedPage } from "@pages/forms/nested/forms-nested.page.js";
import { statePage } from "@pages/state/state.page.js";
import { persistencePage } from "@pages/persistence/persistence.page.js";
import { accountPage } from "@pages/account/account.page.js";
import { authShellLayoutPage } from "@pages/auth/layout/auth-shell-layout.page.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { authSignupPage } from "@pages/auth/signup/auth-signup.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";
import { workspaceLayoutPage } from "@pages/workspace/layout/ui/workspace-layout.page.js";
import { filesPage } from "@pages/workspace/files/workspace-files.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";
import { slowPage } from "@pages/workspace/slow/workspace-slow.page.js";
import { lazyPage } from "@pages/workspace/lazy/workspace-lazy.page.js";
import { usersListPage } from "@pages/workspace/users/users-list.page.js";
import { userPage } from "@pages/workspace/users/user-detail.page.js";
import { usersLayoutPage } from "@pages/workspace/users/users-layout.page.js";
import { workspaceOrgLayoutPage } from "@pages/workspace/org/workspace-org-layout.page.js";
import { workspaceTeamLayoutPage } from "@pages/workspace/team/workspace-team-layout.page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import { catalogCategoryLayoutPage } from "@pages/workspace/catalog/catalog-category-layout.page.js";
import { catalogProductLayoutPage } from "@pages/workspace/catalog/catalog-product-layout.page.js";
import { catalogVariantPage } from "@pages/workspace/catalog/catalog-variant.page.js";
import { workspaceProductsPage } from "@pages/workspace/products/workspace-products.page.js";
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
          { path: "products", name: "workspace-products", routeView: workspaceProductsPage },
          { path: "slow", name: "slow", routeView: slowPage },
          { path: "lazy", name: "lazy", routeView: lazyPage },
          { path: "files/*", name: "files", routeView: filesPage },
          { path: "user/:id", name: "legacy-user", route: legacyUserRoute },
        ],
      },
    ],
  },
]);
