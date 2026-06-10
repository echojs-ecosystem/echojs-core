import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

export const createEcosystemModel = createModel(() => {
  const $showAllModules = signal(false)

  return {
    showAllModules: () => $showAllModules.value(),
    toggleAllModules: () => $showAllModules.update((open) => !open),
  }
}, 'EcosystemModel')

export type EcosystemVM = ReturnType<typeof createEcosystemModel>
