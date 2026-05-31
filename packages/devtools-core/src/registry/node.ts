import type { DevtoolsNode, RegisterDevtoolsNodeInput } from '../types'
import { createDevtoolsId } from '../utils/id'

export const normalizeDevtoolsNode = (input: RegisterDevtoolsNodeInput): DevtoolsNode => ({
  id: input.id ?? createDevtoolsId(input.type),
  type: input.type,
  name: input.name,
  getSnapshot: input.getSnapshot,
})
