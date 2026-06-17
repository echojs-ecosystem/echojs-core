import {
  createPermission,
  createPermissionCheck,
  createPermissionTemplate,
  type PermissionInstance,
} from '@echojs-ecosystem/permission'
import type { BootstrapPayload, WorkspaceRole } from '@echojs-ecosystem/workspace-shared'

import type { AppPermissionSchema } from './permission.schema'
import { adminTemplate } from './permission.template.admin'
import { managerTemplate } from './permission.template.manager'
import { viewerTemplate } from './permission.template.viewer'

const templates: Record<
  WorkspaceRole,
  ReturnType<typeof createPermissionTemplate<AppPermissionSchema>>
> = {
  admin: adminTemplate,
  manager: managerTemplate,
  viewer: viewerTemplate,
}

export const appPermission: PermissionInstance<AppPermissionSchema> =
  createPermission<AppPermissionSchema>()

export const PermissionCheck = createPermissionCheck(appPermission)

export const applyRolePermissions = (role: WorkspaceRole): void => {
  appPermission.setup(templates[role])
}

export const hydratePermissionFromBootstrap = (payload: BootstrapPayload): void => {
  appPermission.hydrate(payload.permissionSnapshot)
  applyRolePermissions(payload.role)
}
