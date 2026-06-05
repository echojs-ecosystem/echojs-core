export {
  setDevtoolsEnabled,
  isDevtoolsEnabled,
  getDevtoolsBridge,
  getOrCreateDevtoolsBridge,
  createDevtoolsBridge,
  __resetDevtoolsCoreForTests,
} from './bridge/bridge'

export { DEVTOOLS_GLOBAL_HOOK_KEY } from './types'

export type {
  DevtoolsNodeType,
  DevtoolsEventSource,
  DevtoolsNode,
  RegisterDevtoolsNodeInput,
  RegisteredNode,
  DevtoolsSnapshot,
  DevtoolsEvent,
  EmitDevtoolsEventInput,
  TimelineListener,
  DevtoolsRegistryAPI,
  DevtoolsTimelineAPI,
  EchoJSDevtoolsBridge,
} from './types'

export { createDevtoolsId, resetDevtoolsIds } from './utils/id'
export { safeSerialize } from './utils/serialize'

export { DevtoolsRegistry } from './registry/registry'
export { DevtoolsTimeline } from './timeline/timeline'

import {
  disabledRegisteredNode,
  getDevtoolsBridge,
  isDevtoolsEnabled,
  whenDevtoolsEnabled,
} from './bridge/bridge'
import type {
  DevtoolsSnapshot,
  DevtoolsEvent,
  EmitDevtoolsEventInput,
  RegisterDevtoolsNodeInput,
  RegisteredNode,
  TimelineListener,
} from './types'

export const registerDevtoolsNode = (input: RegisterDevtoolsNodeInput): RegisteredNode => {
  if (!isDevtoolsEnabled()) return disabledRegisteredNode()
  return whenDevtoolsEnabled((bridge) => bridge.registry.register(input))!
}

export const unregisterDevtoolsNode = (nodeId: string): boolean => {
  if (!isDevtoolsEnabled()) return false
  return whenDevtoolsEnabled((bridge) => bridge.registry.unregister(nodeId)) ?? false
}

export const emitDevtoolsEvent = (input: EmitDevtoolsEventInput): DevtoolsEvent | null => {
  if (!isDevtoolsEnabled()) return null
  return whenDevtoolsEnabled((bridge) => bridge.timeline.emit(input))
}

export const getNodeSnapshot = (nodeId: string): DevtoolsSnapshot | undefined => {
  if (!isDevtoolsEnabled()) return undefined
  return whenDevtoolsEnabled((bridge) => bridge.registry.getSnapshot(nodeId)) ?? undefined
}

export const getAllSnapshots = (): DevtoolsSnapshot[] => {
  if (!isDevtoolsEnabled()) return []
  return whenDevtoolsEnabled((bridge) => bridge.registry.getAllSnapshots()) ?? []
}

export const getTimelineEvents = (): readonly DevtoolsEvent[] => {
  if (!isDevtoolsEnabled()) return []
  return whenDevtoolsEnabled((bridge) => bridge.timeline.getEvents()) ?? []
}

export const subscribeTimeline = (listener: TimelineListener): (() => void) => {
  if (!isDevtoolsEnabled()) return () => {}
  return whenDevtoolsEnabled((bridge) => bridge.timeline.subscribe(listener)) ?? (() => {})
}
