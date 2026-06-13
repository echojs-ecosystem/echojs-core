import { createPermissionTemplate } from '@echojs-ecosystem/permission'

import type { AppPermissionSchema } from './permission.schema'

export const viewerTemplate = createPermissionTemplate<AppPermissionSchema>({
  dashboard: { view: true },
  user: { read: true, update: false, delete: false },
  order: { read: true, update: false, delete: false, refund: false },
  catalog: { read: true, edit: false, delete: false },
  settings: { read: true, update: false },
})
