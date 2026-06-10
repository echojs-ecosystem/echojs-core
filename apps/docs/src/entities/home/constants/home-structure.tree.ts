import type { StructureTreeNode } from '@entities/home/constants/home-structure.types'

/** Folders first (keep layer order), then files (A→Z). */
const sortTreeChildren = (nodes: StructureTreeNode[]): StructureTreeNode[] => {
  const folders = nodes.filter((node) => node.kind === 'folder')
  const files = nodes
    .filter((node) => node.kind === 'file')
    .sort((a, b) => a.name.localeCompare(b.name))

  return [...folders, ...files].map((node) =>
    node.children
      ? { ...node, children: sortTreeChildren(node.children) }
      : node
  )
}

const rawStructureTree: StructureTreeNode[] = [
  {
    id: 'root',
    name: 'echojs-app',
    kind: 'folder',
    children: [
      { id: 'pkg', name: 'package.json', kind: 'file' },
      { id: 'architect', name: 'architect.config.ts', kind: 'file' },
      { id: 'index', name: 'index.html', kind: 'file' },
      { id: 'vite', name: 'vite.config.ts', kind: 'file' },
      {
        id: 'src',
        name: 'src',
        kind: 'folder',
        children: [
          {
            id: 'app',
            name: 'app',
            kind: 'folder',
            children: [
              { id: 'app-main', name: 'main.ts', kind: 'file' },
              { id: 'app-bootstrap', name: 'bootstrap.ts', kind: 'file' },
              {
                id: 'app-router',
                name: 'router',
                kind: 'folder',
                children: [
                  { id: 'routes-index', name: 'index.ts', kind: 'file' },
                  { id: 'routes-app', name: 'app.routes.ts', kind: 'file' },
                ],
              },
              {
                id: 'app-providers',
                name: 'providers',
                kind: 'folder',
                children: [{ id: 'app-prov-index', name: 'index.ts', kind: 'file' }],
              },
            ],
          },
          {
            id: 'pages',
            name: 'pages',
            kind: 'folder',
            children: [
              {
                id: 'pages-home',
                name: 'home',
                kind: 'folder',
                children: [
                  { id: 'pages-home-page', name: 'home.page.ts', kind: 'file' },
                  {
                    id: 'pages-home-model',
                    name: 'model',
                    kind: 'folder',
                    children: [{ id: 'pages-home-model', name: 'home.model.ts', kind: 'file' }],
                  },
                  {
                    id: 'pages-home-ui',
                    name: 'ui',
                    kind: 'folder',
                    children: [{ id: 'pages-home-view', name: 'home.view.ts', kind: 'file' }],
                  },
                ],
              },
              {
                id: 'pages-workspace',
                name: 'workspace',
                kind: 'folder',
                children: [
                  { id: 'ws-layout', name: 'workspace.layout.ts', kind: 'file' },
                  {
                    id: 'ws-dashboard',
                    name: 'dashboard',
                    kind: 'folder',
                    children: [
                      { id: 'ws-dashboard-page', name: 'dashboard.page.ts', kind: 'file' },
                      {
                        id: 'ws-dashboard-model-dir',
                        name: 'model',
                        kind: 'folder',
                        children: [
                          { id: 'ws-dashboard-model', name: 'dashboard.model.ts', kind: 'file' },
                        ],
                      },
                      {
                        id: 'ws-dashboard-ui-dir',
                        name: 'ui',
                        kind: 'folder',
                        children: [
                          { id: 'ws-dashboard-view', name: 'dashboard.view.ts', kind: 'file' },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'ws-settings',
                    name: 'settings',
                    kind: 'folder',
                    children: [
                      { id: 'ws-settings-page', name: 'settings.page.ts', kind: 'file' },
                      {
                        id: 'ws-settings-model-dir',
                        name: 'model',
                        kind: 'folder',
                        children: [
                          { id: 'ws-settings-model', name: 'settings.model.ts', kind: 'file' },
                        ],
                      },
                      {
                        id: 'ws-settings-ui-dir',
                        name: 'ui',
                        kind: 'folder',
                        children: [
                          { id: 'ws-settings-view', name: 'settings.view.ts', kind: 'file' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'widgets',
            name: 'widgets',
            kind: 'folder',
            children: [
              {
                id: 'widgets-shell',
                name: 'app-shell',
                kind: 'folder',
                children: [
                  { id: 'shell-layout', name: 'app-shell.layout.ts', kind: 'file' },
                  {
                    id: 'widgets-shell-ui',
                    name: 'ui',
                    kind: 'folder',
                    children: [
                      { id: 'shell-header', name: 'app-header.view.ts', kind: 'file' },
                      { id: 'shell-sidebar', name: 'app-sidebar.view.ts', kind: 'file' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'features',
            name: 'features',
            kind: 'folder',
            children: [
              {
                id: 'features-search',
                name: 'search',
                kind: 'folder',
                children: [
                  {
                    id: 'features-search-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [{ id: 'feat-search-model', name: 'search.model.ts', kind: 'file' }],
                  },
                  {
                    id: 'features-search-ui-dir',
                    name: 'ui',
                    kind: 'folder',
                    children: [{ id: 'feat-search-view', name: 'search.view.ts', kind: 'file' }],
                  },
                ],
              },
              {
                id: 'features-login',
                name: 'login-form',
                kind: 'folder',
                children: [
                  {
                    id: 'features-login-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [
                      { id: 'feat-login-model', name: 'login-form.model.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'features-login-ui-dir',
                    name: 'ui',
                    kind: 'folder',
                    children: [
                      { id: 'feat-login-view', name: 'login-form.view.ts', kind: 'file' },
                    ],
                  },
                ],
              },
              {
                id: 'features-theme',
                name: 'theme-toggle',
                kind: 'folder',
                children: [
                  {
                    id: 'features-theme-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [
                      { id: 'feat-theme-model', name: 'theme-toggle.model.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'features-theme-ui-dir',
                    name: 'ui',
                    kind: 'folder',
                    children: [
                      { id: 'feat-theme-view', name: 'theme-toggle.view.ts', kind: 'file' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'entities',
            name: 'entities',
            kind: 'folder',
            children: [
              {
                id: 'entities-routes',
                name: '__routes__',
                kind: 'folder',
                children: [{ id: 'routes-entity', name: 'workspace.routes.ts', kind: 'file' }],
              },
              {
                id: 'entities-session',
                name: 'session',
                kind: 'folder',
                children: [
                  {
                    id: 'entities-session-model',
                    name: 'model',
                    kind: 'folder',
                    children: [{ id: 'entity-session', name: 'session.store.ts', kind: 'file' }],
                  },
                ],
              },
              {
                id: 'entities-user',
                name: 'user',
                kind: 'folder',
                children: [
                  {
                    id: 'entities-user-api',
                    name: 'api',
                    kind: 'folder',
                    children: [
                      { id: 'entity-users-api', name: 'users.api.ts', kind: 'file' },
                      { id: 'entity-users-query', name: 'users.query.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'entities-user-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [{ id: 'entity-user-model', name: 'user.model.ts', kind: 'file' }],
                  },
                ],
              },
              {
                id: 'entities-product',
                name: 'product',
                kind: 'folder',
                children: [
                  {
                    id: 'entities-product-api',
                    name: 'api',
                    kind: 'folder',
                    children: [
                      { id: 'entity-users-infinite', name: 'products.infinite.ts', kind: 'file' },
                    ],
                  },
                ],
              },
              {
                id: 'entities-counter',
                name: 'counter',
                kind: 'folder',
                children: [
                  { id: 'counter-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'counter-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [
                      { id: 'counter-model', name: 'counter.model.ts', kind: 'file' },
                      { id: 'counter-test', name: 'counter.model.test.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'counter-ui-dir',
                    name: 'ui',
                    kind: 'folder',
                    children: [{ id: 'counter-view', name: 'counter.view.ts', kind: 'file' }],
                  },
                ],
              },
            ],
          },
          {
            id: 'core',
            name: 'core',
            kind: 'folder',
            children: [
              {
                id: 'core-providers-dir',
                name: 'providers',
                kind: 'folder',
                children: [
                  { id: 'core-providers', name: 'index.ts', kind: 'file' },
                  { id: 'core-query', name: 'query.ts', kind: 'file' },
                  { id: 'core-router', name: 'router.ts', kind: 'file' },
                  { id: 'core-ui', name: 'ui.ts', kind: 'file' },
                  { id: 'core-i18n', name: 'i18n.ts', kind: 'file' },
                  { id: 'core-store', name: 'store.ts', kind: 'file' },
                ],
              },
              {
                id: 'core-api',
                name: 'api',
                kind: 'folder',
                children: [{ id: 'core-http', name: 'http.ts', kind: 'file' }],
              },
              {
                id: 'core-i18n-dir',
                name: 'i18n',
                kind: 'folder',
                children: [{ id: 'core-i18n-json', name: 'en.json', kind: 'file' }],
              },
              {
                id: 'core-hooks',
                name: 'hooks',
                kind: 'folder',
                children: [{ id: 'core-media', name: 'use-breakpoint.ts', kind: 'file' }],
              },
              {
                id: 'core-styles',
                name: 'styles',
                kind: 'folder',
                children: [{ id: 'core-cn', name: 'cn.ts', kind: 'file' }],
              },
            ],
          },
        ],
      },
    ],
  },
]

/** FSD tree — app → pages → widgets → features → entities → core */
export const structureTree = sortTreeChildren(rawStructureTree)
