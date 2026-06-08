import { httpClient } from '@core/http/index'
import type {
  ApiHealth,
  BootstrapPayload,
  DashboardStats,
  WorkspaceRole,
} from '@echojs-ecosystem/workspace-shared'

export const workspaceApi = {
  health: (signal?: AbortSignal) =>
    httpClient.get('/api/health', { signal }).unwrapJson<ApiHealth>(),

  bootstrap: (role: WorkspaceRole, signal?: AbortSignal) =>
    httpClient
      .get('/api/bootstrap', { searchParams: { role }, signal })
      .unwrapJson<BootstrapPayload>(),

  dashboardStats: (signal?: AbortSignal) =>
    httpClient.get('/api/dashboard/stats', { signal }).unwrapJson<DashboardStats>(),
}
