export type WorkspaceRole = 'admin' | 'manager' | 'viewer'

export type AdminUserRole = WorkspaceRole | 'editor'

export type AdminUserStatus = 'active' | 'invited' | 'suspended'

export type AdminUserDepartment = 'engineering' | 'sales' | 'support' | 'marketing' | 'ops'

export type AdminUser = {
  id: string
  name: string
  role: AdminUserRole
  email: string
  status: AdminUserStatus
  department: AdminUserDepartment
  country: string
  verified: boolean
  tags: string[]
  lastActiveAt: string
  createdAt: string
}

export type CreateUserInput = {
  name: string
  email: string
  role: AdminUserRole
  status: AdminUserStatus
  department: AdminUserDepartment
  country: string
  verified: boolean
  tags: string[]
}

export type UpdateUserInput = Partial<CreateUserInput>

export type UsersListQuery = {
  q?: string
  page?: number
  pageSize?: number
  role?: AdminUserRole | 'all'
  status?: AdminUserStatus | 'all'
  department?: AdminUserDepartment | 'all'
  verified?: 'all' | 'true' | 'false'
  country?: string
  tag?: string[]
  sort?: 'name' | 'email' | 'createdAt' | 'lastActiveAt'
  order?: 'asc' | 'desc'
}

export type UsersListResponse = {
  items: AdminUser[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'refunded'

export type AdminOrder = {
  id: string
  customer: string
  total: number
  status: OrderStatus
  tags: string[]
}

export type CreateOrderInput = {
  customer: string
  total: number
  status: OrderStatus
  tags: string[]
}

export type UpdateOrderInput = Partial<CreateOrderInput>

export type DashboardStats = {
  openOrders: number
  activeUsers: number
  revenue: number
  serverTime: string
}

export type OrdersListQuery = {
  q?: string
  page?: number
  status?: OrderStatus | 'all'
  priority?: boolean
  tag?: string[]
}

export type OrdersListResponse = {
  items: AdminOrder[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type BootstrapPayload = {
  stats: DashboardStats
  role: WorkspaceRole
  permissionSnapshot: {
    version: number
    ready: boolean
    rules: Record<string, Record<string, boolean>>
  }
}

export type ApiHealth = {
  ok: true
  service: 'workspace-server'
  version: string
  uptimeMs: number
}
