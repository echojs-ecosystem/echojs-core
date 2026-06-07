import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import { architectCodePanels } from '@entities/home/constants/architecture-advantages.js'
import { codeTabs } from '@entities/home/constants/home.constants.js'
import { testingCodePanels } from '@entities/home/constants/testing-advantages.js'
import type { CodeTab, HomeVM } from '@entities/home/types/home.types.js'

export const createHomeModel = createModel((): HomeVM => {
  const $codeTab = signal(0)
  const $testingPanel = signal(0)
  const $architectPanel = signal(0)

  return {
    activeCodeTab: (): CodeTab => codeTabs[$codeTab.value()] ?? codeTabs[0]!,
    setCodeTab: (index: number) => $codeTab.set(index),
    isCodeTabActive: (index: number) => $codeTab.value() === index,
    activeTestingPanel: () =>
      testingCodePanels[$testingPanel.value()] ?? testingCodePanels[0]!,
    setTestingPanel: (index: number) => $testingPanel.set(index),
    isTestingPanelActive: (index: number) => $testingPanel.value() === index,
    activeArchitectPanel: () =>
      architectCodePanels[$architectPanel.value()] ?? architectCodePanels[0]!,
    setArchitectPanel: (index: number) => $architectPanel.set(index),
    isArchitectPanelActive: (index: number) =>
      $architectPanel.value() === index,
  }
}, 'HomeModel')
