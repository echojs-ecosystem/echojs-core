import type {
  OrdersListQuery,
  UsersListQuery,
  WorkspaceRole,
} from '@echojs-ecosystem/workspace-shared'

export const apiKeys = {
  health: () => ['workspace', 'health'] as const,
  bootstrap: (role: WorkspaceRole) => ['workspace', 'bootstrap', role] as const,
  dashboardStats: () => ['workspace', 'dashboard-stats'] as const,
  usersRoot: () => ['workspace', 'users'] as const,
  users: (params: UsersListQuery) => ['workspace', 'users', params] as const,
  user: (id: string) => ['workspace', 'user', id] as const,
  ordersRoot: () => ['workspace', 'orders'] as const,
  orders: (params: OrdersListQuery) => ['workspace', 'orders', params] as const,
  order: (id: string) => ['workspace', 'order', id] as const,
} as const
