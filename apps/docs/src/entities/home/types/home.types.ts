import type { StructureCodePanel } from '@entities/home/constants/home-structure.types'

export type CompareTone = 'muted' | 'accent'

export type CompareCardData = {
  title: string
  items: readonly string[]
}

export type CodeTab = {
  readonly id: string
  readonly label: string
  readonly layer: string
  readonly icon: string
  readonly code: string
  readonly lang: string
  readonly title: string
  readonly body: string
  readonly points: readonly string[]
}

export type HomeVM = {
  selectedStructureNodeId: () => string
  openStructureTabs: () => readonly string[]
  openStructureFile: (id: string, options?: { closeExplorer?: boolean }) => void
  closeStructureTab: (id: string) => void
  isFolderExpanded: (id: string) => boolean
  toggleFolder: (id: string) => void
  isExplorerOpen: () => boolean
  toggleExplorer: () => void
  closeExplorer: () => void
  activeStructurePanel: () => StructureCodePanel
}

export type CompareCardViewProps = {
  tone: CompareTone
  data: CompareCardData
}
