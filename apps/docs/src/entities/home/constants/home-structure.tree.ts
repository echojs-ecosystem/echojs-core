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

const sliceDirs = (
  modelFile: { id: string; name: string },
  viewFile: { id: string; name: string },
  componentFile?: { id: string; name: string }
): StructureTreeNode[] => {
  const dirs: StructureTreeNode[] = [
    {
      id: `${modelFile.id}-dir`,
      name: 'model',
      kind: 'folder',
      children: [{ id: modelFile.id, name: modelFile.name, kind: 'file' }],
    },
    {
      id: `${viewFile.id}-dir`,
      name: 'view',
      kind: 'folder',
      children: [{ id: viewFile.id, name: viewFile.name, kind: 'file' }],
    },
  ]

  if (componentFile) {
    dirs.unshift({
      id: `${componentFile.id}-dir`,
      name: 'component',
      kind: 'folder',
      children: [{ id: componentFile.id, name: componentFile.name, kind: 'file' }],
    })
  }

  return dirs
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
                  { id: 'routes-workspace', name: 'workspace.routes.ts', kind: 'file' },
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
                  { id: 'pages-home-index', name: 'index.ts', kind: 'file' },
                  { id: 'pages-home-page', name: 'home.page.ts', kind: 'file' },
                  ...sliceDirs(
                    { id: 'pages-home-model', name: 'home.model.ts' },
                    { id: 'pages-home-view', name: 'home.view.ts' },
                    { id: 'pages-home-component', name: 'home.component.ts' }
                  ),
                ],
              },
              {
                id: 'pages-workspace',
                name: 'workspace',
                kind: 'folder',
                children: [
                  { id: 'ws-index', name: 'index.ts', kind: 'file' },
                  { id: 'ws-layout', name: 'workspace.layout.ts', kind: 'file' },
                  {
                    id: 'ws-dashboard',
                    name: 'dashboard',
                    kind: 'folder',
                    children: [
                      { id: 'ws-dashboard-index', name: 'index.ts', kind: 'file' },
                      { id: 'ws-dashboard-page', name: 'dashboard.page.ts', kind: 'file' },
                      ...sliceDirs(
                        { id: 'ws-dashboard-model', name: 'dashboard.model.ts' },
                        { id: 'ws-dashboard-view', name: 'dashboard.view.ts' },
                        {
                          id: 'ws-dashboard-component',
                          name: 'dashboard.component.ts',
                        }
                      ),
                    ],
                  },
                  {
                    id: 'ws-settings',
                    name: 'settings',
                    kind: 'folder',
                    children: [
                      { id: 'ws-settings-index', name: 'index.ts', kind: 'file' },
                      { id: 'ws-settings-page', name: 'settings.page.ts', kind: 'file' },
                      ...sliceDirs(
                        { id: 'ws-settings-model', name: 'settings.model.ts' },
                        { id: 'ws-settings-view', name: 'settings.view.ts' },
                        {
                          id: 'ws-settings-component',
                          name: 'settings.component.ts',
                        }
                      ),
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
                    id: 'widgets-shell-view',
                    name: 'view',
                    kind: 'folder',
                    children: [
                      { id: 'shell-header', name: 'app-header.view.ts', kind: 'file' },
                      { id: 'shell-sidebar', name: 'app-sidebar.view.ts', kind: 'file' },
                    ],
                  },
                ],
              },
              {
                id: 'widgets-data-table',
                name: 'data-table',
                kind: 'folder',
                children: [
                  { id: 'widget-data-table-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'widgets-data-table-view',
                    name: 'view',
                    kind: 'folder',
                    children: [
                      {
                        id: 'widget-data-table-compound',
                        name: 'data-table.compound.ts',
                        kind: 'file',
                      },
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
                  { id: 'feat-search-index', name: 'index.ts', kind: 'file' },
                  ...sliceDirs(
                    { id: 'feat-search-model', name: 'search.model.ts' },
                    { id: 'feat-search-view', name: 'search.view.ts' },
                    { id: 'feat-search-component', name: 'search.component.ts' }
                  ),
                ],
              },
              {
                id: 'features-login',
                name: 'login-form',
                kind: 'folder',
                children: [
                  { id: 'feat-login-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'features-login-model-dir',
                    name: 'model',
                    kind: 'folder',
                    children: [
                      { id: 'feat-login-form', name: 'login-form.form.ts', kind: 'file' },
                      { id: 'feat-login-model', name: 'login-form.model.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'features-login-view-dir',
                    name: 'view',
                    kind: 'folder',
                    children: [
                      { id: 'feat-login-view', name: 'login-form.view.ts', kind: 'file' },
                    ],
                  },
                  {
                    id: 'features-login-component-dir',
                    name: 'component',
                    kind: 'folder',
                    children: [
                      {
                        id: 'feat-login-component',
                        name: 'login-form.component.ts',
                        kind: 'file',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'features-theme',
                name: 'theme-toggle',
                kind: 'folder',
                children: [
                  { id: 'feat-theme-index', name: 'index.ts', kind: 'file' },
                  ...sliceDirs(
                    { id: 'feat-theme-model', name: 'theme-toggle.model.ts' },
                    { id: 'feat-theme-view', name: 'theme-toggle.view.ts' },
                    {
                      id: 'feat-theme-component',
                      name: 'theme-toggle.component.ts',
                    }
                  ),
                ],
              },
              {
                id: 'features-users-list',
                name: 'users-list',
                kind: 'folder',
                children: [
                  { id: 'feat-users-list-index', name: 'index.ts', kind: 'file' },
                  ...sliceDirs(
                    { id: 'feat-users-list-model', name: 'users-list.model.ts' },
                    { id: 'feat-users-list-view', name: 'users-list.view.ts' },
                    {
                      id: 'feat-users-list-component',
                      name: 'users-list.component.ts',
                    }
                  ),
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
                    id: 'counter-component-dir',
                    name: 'component',
                    kind: 'folder',
                    children: [
                      { id: 'counter-component', name: 'counter.component.ts', kind: 'file' },
                    ],
                  },
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
                    id: 'counter-view-dir',
                    name: 'view',
                    kind: 'folder',
                    children: [
                      { id: 'counter-view', name: 'counter.view.ts', kind: 'file' },
                    ],
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
                id: 'core-async-dir',
                name: 'async',
                kind: 'folder',
                children: [
                  { id: 'core-async-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'core-async-provider',
                    name: 'create-query-provider.ts',
                    kind: 'file',
                  },
                ],
              },
              {
                id: 'core-router-dir',
                name: 'router',
                kind: 'folder',
                children: [
                  { id: 'core-router-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'core-router-provider',
                    name: 'create-router-provider.ts',
                    kind: 'file',
                  },
                ],
              },
              {
                id: 'core-ui-dir',
                name: 'ui',
                kind: 'folder',
                children: [
                  { id: 'core-ui-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'core-ui-provider',
                    name: 'create-ui-provider.ts',
                    kind: 'file',
                  },
                ],
              },
              {
                id: 'core-store-dir',
                name: 'store',
                kind: 'folder',
                children: [
                  { id: 'core-store-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'core-store-provider',
                    name: 'create-store-provider.ts',
                    kind: 'file',
                  },
                ],
              },
              {
                id: 'core-i18n-dir',
                name: 'i18n',
                kind: 'folder',
                children: [
                  { id: 'core-i18n-index', name: 'index.ts', kind: 'file' },
                  {
                    id: 'core-i18n-provider',
                    name: 'create-i18n-provider.ts',
                    kind: 'file',
                  },
                  { id: 'core-i18n-json', name: 'en.json', kind: 'file' },
                ],
              },
              {
                id: 'core-api',
                name: 'api',
                kind: 'folder',
                children: [{ id: 'core-http', name: 'http.ts', kind: 'file' }],
              },
              {
                id: 'core-permission-dir',
                name: 'permission',
                kind: 'folder',
                children: [
                  { id: 'core-permission-engine', name: 'permission-engine.ts', kind: 'file' },
                  { id: 'core-permission-index', name: 'index.ts', kind: 'file' },
                ],
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
