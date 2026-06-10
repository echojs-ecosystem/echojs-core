import { structurePanelById } from '@entities/home/constants/home-structure.panels'
import { structureTree } from '@entities/home/constants/home-structure.tree'
import type { StructureTreeNode } from '@entities/home/constants/home-structure.types'

export type {
  StructureCodePanel,
  StructureTreeNode,
} from '@entities/home/constants/home-structure.types'

export { structurePanelById, structureTree }

export const structureCodePanels = Object.values(structurePanelById)

export const defaultStructureNodeId = 'app-bootstrap'

const buildAncestorMap = (
  nodes: StructureTreeNode[],
  trail: string[] = [],
  map: Record<string, readonly string[]> = {}
): Record<string, readonly string[]> => {
  for (const node of nodes) {
    if (node.kind === 'file') {
      map[node.id] = trail
    }
    if (node.children) {
      buildAncestorMap(
        node.children,
        node.kind === 'folder' ? [...trail, node.id] : trail,
        map
      )
    }
  }
  return map
}

export const structureAncestorFoldersByFileId = buildAncestorMap(structureTree)

export const defaultExpandedFolderIds = [
  'root',
  'src',
  'app',
  'pages',
  'pages-workspace',
  'widgets',
  'features',
  'entities',
]
