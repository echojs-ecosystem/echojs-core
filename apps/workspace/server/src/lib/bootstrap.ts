import type { BootstrapPayload, WorkspaceRole } from '@echojs-ecosystem/workspace-shared'

import { db } from '../data/store'

const roleTemplates: Record<
  WorkspaceRole,
  BootstrapPayload['permissionSnapshot']['rules']
> = {
  admin: {
    dashboard: { view: true },
    user: { read: true, update: true, delete: true },
    order: { read: true, refund: true },
    catalog: { read: true, edit: true, delete: true },
    settings: { read: true, update: true },
  },
  manager: {
    dashboard: { view: true },
    user: { read: true, update: true, delete: false },
    order: { read: true, refund: true },
    catalog: { read: true, edit: true, delete: false },
    settings: { read: true, update: false },
  },
  viewer: {
    dashboard: { view: true },
    user: { read: true, update: false, delete: false },
    order: { read: true, refund: false },
    catalog: { read: true, edit: false, delete: false },
    settings: { read: true, update: false },
  },
}

export const buildBootstrap = (role: WorkspaceRole = 'manager'): BootstrapPayload => {
  const openOrders = db.orders.filter((o) => o.status !== 'refunded').length
  const activeUsers = db.users.filter((u) => u.status === 'active').length
  const revenue = db.orders.reduce((sum, o) => sum + o.total, 0)

  return {
    role,
    stats: {
      openOrders,
      activeUsers,
      revenue,
      serverTime: new Date().toISOString(),
    },
    permissionSnapshot: {
      version: 1,
      ready: true,
      rules: roleTemplates[role],
    },
  }
}
