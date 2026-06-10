export type StructureCodePanel = {
  id: string
  file: string
  badge: string
  lang: string
  code: string
  caption: string
}

export type StructureTreeNode = {
  id: string
  name: string
  kind: 'folder' | 'file'
  children?: StructureTreeNode[]
}
