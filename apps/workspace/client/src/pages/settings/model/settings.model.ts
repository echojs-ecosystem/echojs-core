import { bootstrapQuery } from '@entities/api/index'
import { $currentRole } from '@entities/session/index'

export const workspaceBootstrap = bootstrapQuery.with(() => ({ role: $currentRole.value() }))
