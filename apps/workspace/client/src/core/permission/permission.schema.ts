import type { AdminOrder, AdminUser } from '@echojs-ecosystem/workspace-shared'

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
