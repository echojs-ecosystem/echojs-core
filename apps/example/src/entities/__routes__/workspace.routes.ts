import { createRoutes } from "@echojs-ecosystem/router";
import { workspaceLayoutPage } from "@pages/workspace/layout/ui/workspace-layout.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";
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
import { legacyUserRoute } from "@entities/__routes__/legacy.routes.js";

export const workspaceRoutes = createRoutes([
  {
    path: "/workspace",
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
]);
