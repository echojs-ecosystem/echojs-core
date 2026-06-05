import type { DevtoolsNode, DevtoolsSnapshot } from '../types'
import { safeSerialize } from '../utils/serialize'

export const captureNodeSnapshot = (node: DevtoolsNode): DevtoolsSnapshot => {
  let state: unknown = null

  if (node.getSnapshot) {
    try {
      state = safeSerialize(node.getSnapshot())
    } catch {
      state = '[SnapshotError]'
    }
  }

  return {
    id: node.id,
    type: node.type,
    name: node.name,
    state,
    timestamp: Date.now(),
  }
}
