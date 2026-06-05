import { DevtoolsRegistry } from '../registry/registry'
import { DevtoolsTimeline } from '../timeline/timeline'
import {
  clearGlobalDevtoolsHook,
  readGlobalDevtoolsHook,
  writeGlobalDevtoolsHook,
} from './global-hook'
import type { EchoJSDevtoolsBridge } from '../types'

let devtoolsEnabled = true

const noopRegisteredNode = { unregister: () => {} }

export const setDevtoolsEnabled = (enabled: boolean): void => {
  devtoolsEnabled = enabled
}

export const isDevtoolsEnabled = (): boolean => devtoolsEnabled

export const createDevtoolsBridge = (): EchoJSDevtoolsBridge => ({
  registry: new DevtoolsRegistry(),
  timeline: new DevtoolsTimeline(),
})

export const getOrCreateDevtoolsBridge = (): EchoJSDevtoolsBridge => {
  const existing = readGlobalDevtoolsHook()
  if (existing) return existing

  const bridge = createDevtoolsBridge()
  writeGlobalDevtoolsHook(bridge)
  return bridge
}

export const getDevtoolsBridge = (): EchoJSDevtoolsBridge | null => {
  if (!devtoolsEnabled) return null
  return readGlobalDevtoolsHook() ?? getOrCreateDevtoolsBridge()
}

export const whenDevtoolsEnabled = <T>(run: (bridge: EchoJSDevtoolsBridge) => T): T | null => {
  if (!devtoolsEnabled) return null
  return run(getOrCreateDevtoolsBridge())
}

export const disabledRegisteredNode = (): typeof noopRegisteredNode => noopRegisteredNode

/** @internal Resets bridge state — tests only */
export const __resetDevtoolsCoreForTests = (): void => {
  devtoolsEnabled = true
  clearGlobalDevtoolsHook()
}
