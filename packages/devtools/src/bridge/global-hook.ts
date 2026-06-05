import type { EchoJSDevtoolsBridge } from '../types'
import { DEVTOOLS_GLOBAL_HOOK_KEY } from '../types'

type GlobalHookHost = typeof globalThis & {
  [DEVTOOLS_GLOBAL_HOOK_KEY]?: EchoJSDevtoolsBridge
}

export const readGlobalDevtoolsHook = (): EchoJSDevtoolsBridge | undefined =>
  (globalThis as GlobalHookHost)[DEVTOOLS_GLOBAL_HOOK_KEY]

export const writeGlobalDevtoolsHook = (bridge: EchoJSDevtoolsBridge): void => {
  const host = globalThis as GlobalHookHost
  if (host[DEVTOOLS_GLOBAL_HOOK_KEY]) return
  host[DEVTOOLS_GLOBAL_HOOK_KEY] = bridge
}

export const clearGlobalDevtoolsHook = (): void => {
  delete (globalThis as GlobalHookHost)[DEVTOOLS_GLOBAL_HOOK_KEY]
}
