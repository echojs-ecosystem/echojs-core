import { createMutation, createQuery, getQueryProvider } from '@echojs-ecosystem/query'
import type {
  AdminOrder,
  AdminUser,
  ApiHealth,
  BootstrapPayload,
  CreateOrderInput,
  CreateUserInput,
  DashboardStats,
  OrdersListQuery,
  OrdersListResponse,
  UpdateOrderInput,
  UpdateUserInput,
  UsersListQuery,
  UsersListResponse,
  WorkspaceRole,
} from '@echojs-ecosystem/workspace-shared'

import { ordersApi } from '@entities/order/api/orders.api'
import { usersApi } from '@entities/user/api/users.api'
import { workspaceApi } from '@entities/workspace/api/workspace.api'

const invalidateUsers = (): void => {
  void getQueryProvider()?.invalidateQueries(['workspace', 'users'])
  void getQueryProvider()?.invalidateQueries(['workspace', 'dashboard-stats'])
}

const invalidateOrders = (): void => {
  void getQueryProvider()?.invalidateQueries(['workspace', 'orders'])
  void getQueryProvider()?.invalidateQueries(['workspace', 'dashboard-stats'])
}

export const apiHealthQuery = createQuery<ApiHealth>({
  name: 'api-health',
  queryKey: () => ['workspace', 'health'] as const,
  queryFn: ({ signal }) => workspaceApi.health(signal),
  refetchOnWindowFocus: true,
})

export const bootstrapQuery = createQuery<BootstrapPayload, { role: WorkspaceRole }>({
  name: 'workspace-bootstrap',
  queryKey: ({ role }) => ['workspace', 'bootstrap', role] as const,
  queryFn: ({ params, signal }) => workspaceApi.bootstrap(params.role, signal),
})

export const dashboardStatsQuery = createQuery<DashboardStats>({
  name: 'dashboard-stats',
  queryKey: () => ['workspace', 'dashboard-stats'] as const,
  queryFn: ({ signal }) => workspaceApi.dashboardStats(signal),
  refetchOnWindowFocus: true,
})

export const usersListQuery = createQuery<UsersListResponse, UsersListQuery>({
  name: 'users-list',
  queryKey: (params) => ['workspace', 'users', params] as const,
  keepPreviousData: true,
  queryFn: ({ params, signal }) => usersApi.list(params, signal),
})

export const userDetailQuery = createQuery<AdminUser, { id: string }>({
  name: 'user-detail',
  queryKey: ({ id }) => ['workspace', 'user', id] as const,
  keepPreviousData: true,
  queryFn: ({ params, signal }) => usersApi.getById(params.id, signal),
})

export const createUserMutation = createMutation<{ user: AdminUser }, CreateUserInput>({
  name: 'create-user',
  mutationFn: ({ variables, signal }) => usersApi.create(variables, signal),
  onSuccess: invalidateUsers,
})

export const updateUserMutation = createMutation<
  { user: AdminUser },
  { id: string; input: UpdateUserInput }
>({
  name: 'update-user',
  mutationFn: ({ variables, signal }) => usersApi.update(variables.id, variables.input, signal),
  onSuccess: (ctx) => {
    invalidateUsers()
    void getQueryProvider()?.invalidateQueries(['workspace', 'user', ctx.variables.id])
  },
})

export const deleteUserMutation = createMutation<{ ok: true }, { id: string }>({
  name: 'delete-user',
  mutationFn: ({ variables, signal }) => usersApi.remove(variables.id, signal),
  onSuccess: invalidateUsers,
})

export const suspendUserMutation = createMutation<{ user: AdminUser }, { id: string }>({
  name: 'suspend-user',
  mutationFn: ({ variables, signal }) => usersApi.suspend(variables.id, signal),
  onSuccess: invalidateUsers,
})

export const activateUserMutation = createMutation<{ user: AdminUser }, { id: string }>({
  name: 'activate-user',
  mutationFn: ({ variables, signal }) => usersApi.activate(variables.id, signal),
  onSuccess: invalidateUsers,
})

export const orderDetailQuery = createQuery<AdminOrder, { id: string }>({
  name: 'order-detail',
  queryKey: ({ id }) => ['workspace', 'order', id] as const,
  keepPreviousData: true,
  queryFn: ({ params, signal }) => ordersApi.getById(params.id, signal),
})

export const createOrderMutation = createMutation<{ order: AdminOrder }, CreateOrderInput>({
  name: 'create-order',
  mutationFn: ({ variables, signal }) => ordersApi.create(variables, signal),
  onSuccess: invalidateOrders,
})

export const updateOrderMutation = createMutation<
  { order: AdminOrder },
  { id: string; input: UpdateOrderInput }
>({
  name: 'update-order',
  mutationFn: ({ variables, signal }) => ordersApi.update(variables.id, variables.input, signal),
  onSuccess: (ctx) => {
    invalidateOrders()
    void getQueryProvider()?.invalidateQueries(['workspace', 'order', ctx.variables.id])
  },
})

export const deleteOrderMutation = createMutation<{ ok: true }, { id: string }>({
  name: 'delete-order',
  mutationFn: ({ variables, signal }) => ordersApi.remove(variables.id, signal),
  onSuccess: invalidateOrders,
})

export const ordersListQuery = createQuery<OrdersListResponse, OrdersListQuery>({
  name: 'orders-list',
  queryKey: (params) => ['workspace', 'orders', params] as const,
  keepPreviousData: true,
  queryFn: ({ params, signal }) => ordersApi.list(params, signal),
})

export const refundOrderMutation = createMutation<{ order: AdminOrder }, { id: string }>({
  name: 'refund-order',
  mutationFn: ({ variables, signal }) => ordersApi.refund(variables.id, signal),
  onSuccess: invalidateOrders,
})
