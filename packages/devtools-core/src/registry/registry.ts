import { captureNodeSnapshot } from './snapshot'
import { normalizeDevtoolsNode } from './node'
import type {
  DevtoolsNode,
  DevtoolsRegistryAPI,
  DevtoolsSnapshot,
  RegisterDevtoolsNodeInput,
  RegisteredNode,
} from '../types'

export class DevtoolsRegistry implements DevtoolsRegistryAPI {
  readonly #nodes = new Map<string, DevtoolsNode>()

  register(input: RegisterDevtoolsNodeInput): RegisteredNode {
    const node = normalizeDevtoolsNode(input)

    if (this.#nodes.has(node.id)) {
      throw new Error(`@echojs-ecosystem/devtools-core: node "${node.id}" is already registered`)
    }

    this.#nodes.set(node.id, node)

    return {
      unregister: () => {
        this.unregister(node.id)
      },
    }
  }

  unregister(nodeId: string): boolean {
    return this.#nodes.delete(nodeId)
  }

  get(nodeId: string): DevtoolsNode | undefined {
    return this.#nodes.get(nodeId)
  }

  getSnapshot(nodeId: string): DevtoolsSnapshot | undefined {
    const node = this.#nodes.get(nodeId)
    if (!node) return undefined
    return captureNodeSnapshot(node)
  }

  getAllSnapshots(): DevtoolsSnapshot[] {
    return [...this.#nodes.values()].map((node) => captureNodeSnapshot(node))
  }

  list(): DevtoolsNode[] {
    return [...this.#nodes.values()]
  }

  clear(): void {
    this.#nodes.clear()
  }
}
