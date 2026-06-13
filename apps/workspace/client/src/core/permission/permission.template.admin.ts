import { createPermissionTemplate } from '@echojs-ecosystem/permission'

import type { AppPermissionSchema } from './permission.schema'

export const adminTemplate = createPermissionTemplate<AppPermissionSchema>({
  dashboard: { view: true },
  user: { read: true, update: true, delete: true },
  order: { read: true, update: true, delete: true, refund: true },
  catalog: { read: true, edit: true, delete: true },
  settings: { read: true, update: true },
})
