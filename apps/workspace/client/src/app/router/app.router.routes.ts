import { createRoutes } from '@echojs-ecosystem/framework/router'

import { rootRedirectRoutes } from '@app/router/app.router.redirects'
import { adminLayoutPage } from '@pages/admin/index'
import { authLoginPage } from '@pages/auth/index'
import {
  catalogCategoryLayoutPage,
  catalogProductLayoutPage,
  catalogVariantPage,
} from '@pages/catalog/index'
import { dashboardPage } from '@pages/dashboard/index'
import {
  workspaceOrgLayoutPage,
  workspaceSprintPage,
  workspaceTeamLayoutPage,
} from '@pages/org/index'
import { orderCreatePage, orderEditPage, ordersPage } from '@pages/orders/index'
import { settingsPage } from '@pages/settings/index'
import {
  userCreatePage,
  userDetailPage,
  userEditPage,
  usersLayoutPage,
  usersListPage,
} from '@pages/users/index'

export const appRoutes = createRoutes([
  ...rootRedirectRoutes,
  { path: '/login', name: 'auth-login', routeView: authLoginPage },
  {
    path: '/admin',
    name: 'admin',
    layoutView: adminLayoutPage,
    children: [
      { path: '/', name: 'dashboard', routeView: dashboardPage },
      {
        path: 'users',
        name: 'users',
        layoutView: usersLayoutPage,
        children: [
          { path: '/', name: 'users-list', routeView: usersListPage },
          { path: 'new', name: 'user-create', routeView: userCreatePage },
          { path: ':id/edit', name: 'user-edit', routeView: userEditPage },
          { path: ':id', name: 'user-detail', routeView: userDetailPage },
        ],
      },
      {
        path: 'org/:orgId',
        name: 'workspace-org',
        layoutView: workspaceOrgLayoutPage,
        children: [
          {
            path: 'team/:teamId',
            name: 'workspace-team',
            layoutView: workspaceTeamLayoutPage,
            children: [
              {
                path: 'sprint/:sprintId',
                name: 'workspace-sprint',
                routeView: workspaceSprintPage,
              },
            ],
          },
        ],
      },
      {
        path: 'catalog/:categoryId',
        name: 'catalog-category',
        layoutView: catalogCategoryLayoutPage,
        children: [
          {
            path: 'product/:productId',
            name: 'catalog-product',
            layoutView: catalogProductLayoutPage,
            children: [
              {
                path: 'variant/:variantId',
                name: 'catalog-variant',
                routeView: catalogVariantPage,
              },
            ],
          },
        ],
      },
      { path: 'orders/new', name: 'order-create', routeView: orderCreatePage },
      { path: 'orders/:id/edit', name: 'order-edit', routeView: orderEditPage },
      { path: 'orders', name: 'orders', routeView: ordersPage },
      { path: 'settings', name: 'settings', routeView: settingsPage },
    ],
  },
])
