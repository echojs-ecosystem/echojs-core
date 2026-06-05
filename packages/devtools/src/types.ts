export type DevtoolsNodeType =
  | 'store'
  | 'query'
  | 'mutation'
  | 'router'
  | 'persist'
  | 'url-state'
  | 'ui-provider'
  | 'signal'
  | 'custom'

export type DevtoolsEventSource =
  | 'store'
  | 'query'
  | 'mutation'
  | 'router'
  | 'persist'
  | 'url-state'
  | 'ui'
  | 'custom'

export type DevtoolsNode = {
  id: string
  type: DevtoolsNodeType
  name?: string
  getSnapshot?: () => unknown
}

export type RegisterDevtoolsNodeInput = {
  id?: string
  type: DevtoolsNodeType
  name?: string
  getSnapshot?: () => unknown
}

export type RegisteredNode = {
  unregister(): void
}

export type DevtoolsSnapshot = {
  id: string
  type: DevtoolsNodeType
  name?: string
  state: unknown
  timestamp: number
}

export type DevtoolsEvent = {
  id: string
  timestamp: number
  source: DevtoolsEventSource
  type: string
  nodeId?: string
  payload?: unknown
}

export type EmitDevtoolsEventInput = {
  id?: string
  timestamp?: number
  source: DevtoolsEventSource
  type: string
  nodeId?: string
  payload?: unknown
}

export type TimelineListener = (event: DevtoolsEvent) => void

export type DevtoolsRegistryAPI = {
  register(input: RegisterDevtoolsNodeInput): RegisteredNode
  unregister(nodeId: string): boolean
  get(nodeId: string): DevtoolsNode | undefined
  getSnapshot(nodeId: string): DevtoolsSnapshot | undefined
  getAllSnapshots(): DevtoolsSnapshot[]
  list(): DevtoolsNode[]
}

export type DevtoolsTimelineAPI = {
  emit(input: EmitDevtoolsEventInput): DevtoolsEvent | null
  getEvents(): readonly DevtoolsEvent[]
  subscribe(listener: TimelineListener): () => void
  setMaxEvents(max: number): void
  clear(): void
}

export type EchoJSDevtoolsBridge = {
  registry: DevtoolsRegistryAPI
  timeline: DevtoolsTimelineAPI
}

export const DEVTOOLS_GLOBAL_HOOK_KEY = '__ECHOJS_DEVTOOLS__' as const

declare global {
  // eslint-disable-next-line no-var
  var __ECHOJS_DEVTOOLS__: EchoJSDevtoolsBridge | undefined
}
