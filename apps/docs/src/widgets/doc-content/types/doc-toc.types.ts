import type { DocTocEntry } from '@core/content/extract-toc'

export type DocTocSpyProps = {
  isActive: (id: string) => boolean
  setActiveId: (id: string) => void
}

export type DocTocProps = DocTocSpyProps & {
  entries: DocTocEntry[]
}

export type DocTocVM = {
  props: DocTocProps
  navigateToEntry: (id: string) => void
  linkClass: (level: DocTocEntry['level'], id: string) => string
}
