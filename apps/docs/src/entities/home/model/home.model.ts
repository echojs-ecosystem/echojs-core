import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import {
  defaultExpandedFolderIds,
  defaultStructureNodeId,
  structureAncestorFoldersByFileId,
  structurePanelById,
} from '@entities/home/constants/home-structure.data'
import type { HomeVM } from '@entities/home/types/home.types'

export const createHomeModel = createModel((): HomeVM => {
  const $structureNode = signal(defaultStructureNodeId)
  const $expandedFolders = signal<string[]>(Array.from(defaultExpandedFolderIds))
  const $explorerOpen = signal(false)
  const $openTabs = signal<string[]>([defaultStructureNodeId])

  const openAncestors = (nodeId: string): void => {
    const path = structureAncestorFoldersByFileId[nodeId]
    if (!path?.length) return

    const open = $expandedFolders.value()
    $expandedFolders.set(Array.from(new Set([...open, ...path])))
  }

  return {
    selectedStructureNodeId: () => $structureNode.value(),
    openStructureTabs: () => Array.from($openTabs.value()),
    openStructureFile: (id: string, options?: { closeExplorer?: boolean }) => {
      if (!structurePanelById[id]) return

      $structureNode.set(id)
      openAncestors(id)

      const tabs = $openTabs.value()
      if (!tabs.includes(id)) $openTabs.set([...tabs, id])

      if (options?.closeExplorer) $explorerOpen.set(false)
    },
    closeStructureTab: (id: string) => {
      const tabs = $openTabs.value().filter((tabId) => tabId !== id)
      if (tabs.length === 0) return

      $openTabs.set(tabs)

      if ($structureNode.value() === id) {
        $structureNode.set(tabs[tabs.length - 1]!)
      }
    },
    isFolderExpanded: (id: string) => $expandedFolders.value().includes(id),
    toggleFolder: (id: string) => {
      const open = $expandedFolders.value()
      $expandedFolders.set(
        open.includes(id) ? open.filter((folderId) => folderId !== id) : [...open, id]
      )
    },
    isExplorerOpen: () => $explorerOpen.value(),
    toggleExplorer: () => $explorerOpen.set(!$explorerOpen.value()),
    closeExplorer: () => $explorerOpen.set(false),
    activeStructurePanel: () => {
      const id = $structureNode.value()
      return (
        structurePanelById[id] ?? structurePanelById[defaultStructureNodeId]!
      )
    },
  }
}, 'HomeModel')
