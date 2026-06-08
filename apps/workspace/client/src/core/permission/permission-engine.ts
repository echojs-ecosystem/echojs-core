import {
  createPermission,
  createPermissionTemplate,
  type PermissionInstance,
} from '@echojs-ecosystem/permission'
import type { AdminOrder, AdminUser, BootstrapPayload, WorkspaceRole } from '@echojs-ecosystem/workspace-shared'

export type AppPermissionSchema = {
  dashboard: ['view']
  user: ['read', { name: 'update'; type: AdminUser }, { name: 'delete'; type: AdminUser }]
  order: [
    'read',
    { name: 'update'; type: AdminOrder },
    { name: 'delete'; type: AdminOrder },
    { name: 'refund'; type: AdminOrder },
  ]
  catalog: ['read', 'edit', 'delete']
  settings: ['read', 'update']
}

export const adminTemplate = createPermissionTemplate<AppPermissionSchema>({
  dashboard: { view: true },
  user: { read: true, update: true, delete: true },
  order: { read: true, update: true, delete: true, refund: true },
  catalog: { read: true, edit: true, delete: true },
  settings: { read: true, update: true },
})

export const managerTemplate = createPermissionTemplate<AppPermissionSchema>({
  dashboard: { view: true },
  user: {
    read: true,
    update: (user) => user.role !== 'admin',
    delete: false,
  },
  order: {
    read: true,
    update: true,
    delete: (order) => order.status !== 'shipped',
    refund: (order) => order.status === 'paid',
  },
  catalog: { read: true, edit: true, delete: false },
  settings: { read: true, update: false },
})

export const viewerTemplate = createPermissionTemplate<AppPermissionSchema>({
  dashboard: { view: true },
  user: { read: true, update: false, delete: false },
  order: { read: true, update: false, delete: false, refund: false },
  catalog: { read: true, edit: false, delete: false },
  settings: { read: true, update: false },
})

const templates: Record<WorkspaceRole, ReturnType<typeof createPermissionTemplate<AppPermissionSchema>>> = {
  admin: adminTemplate,
  manager: managerTemplate,
  viewer: viewerTemplate,
}

export const appPermission: PermissionInstance<AppPermissionSchema> =
  createPermission<AppPermissionSchema>()

export const applyRolePermissions = (role: WorkspaceRole): void => {
  appPermission.setup(templates[role])
}

export const hydratePermissionFromBootstrap = (payload: BootstrapPayload): void => {
  appPermission.hydrate(payload.permissionSnapshot)
  applyRolePermissions(payload.role)
}
