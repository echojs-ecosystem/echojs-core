import { createPermissionTemplate } from '@echojs-ecosystem/permission'

import type { AppPermissionSchema } from './permission.schema'

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
