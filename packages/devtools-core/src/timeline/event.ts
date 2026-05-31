import type { DevtoolsEvent, EmitDevtoolsEventInput } from '../types'
import { createDevtoolsId } from '../utils/id'
import { safeSerialize } from '../utils/serialize'

export const createDevtoolsEvent = (input: EmitDevtoolsEventInput): DevtoolsEvent => ({
  id: input.id ?? createDevtoolsId('event'),
  timestamp: input.timestamp ?? Date.now(),
  source: input.source,
  type: input.type,
  nodeId: input.nodeId,
  payload:
    input.payload === undefined ? undefined : safeSerialize(input.payload),
})
