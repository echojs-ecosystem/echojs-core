export const apiPaths = {
  health: () => '/api/health',
  bootstrap: () => '/api/bootstrap',
  dashboardStats: () => '/api/dashboard/stats',
  orders: () => '/api/orders',
  order: (id: string) => `/api/orders/${id}`,
  orderRefund: (id: string) => `/api/orders/${id}/refund`,
  users: () => '/api/users',
  user: (id: string) => `/api/users/${id}`,
  userSuspend: (id: string) => `/api/users/${id}/suspend`,
  userActivate: (id: string) => `/api/users/${id}/activate`,
} as const
