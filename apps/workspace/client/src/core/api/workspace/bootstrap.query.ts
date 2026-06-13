import { createQuery } from '@echojs-ecosystem/async'
import type { BootstrapPayload, WorkspaceRole } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const fetchBootstrap = (role: WorkspaceRole, signal?: AbortSignal) =>
  httpClient
    .get(apiPaths.bootstrap(), { searchParams: { role }, signal })
    .unwrapJson<BootstrapPayload>()

export const bootstrapQuery = createQuery<BootstrapPayload, { role: WorkspaceRole }>({
  name: 'workspace-bootstrap',
  queryKey: ({ role }) => apiKeys.bootstrap(role),
  queryFn: ({ params, signal }) => fetchBootstrap(params.role, signal),
})
