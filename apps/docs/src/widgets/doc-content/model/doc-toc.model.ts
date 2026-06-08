import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type {
  DocTocProps,
  DocTocVM,
} from '@widgets/doc-content/types/doc-toc.types'
import { docTocStyles } from '@widgets/doc-content/ui/doc-toc.view.styles'
import { cn } from '@core/styles/cn'

const toc = docTocStyles()

export const createDocTocModel = (props: DocTocProps) =>
  createModel((): DocTocVM => {
    const { isActive, setActiveId } = props

    return {
      props,
      navigateToEntry: (id) => {
        setActiveId(id)
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${id}`)
      },
      linkClass: (level, id) =>
        cn(
          toc.link(),
          level === 3 ? toc.linkDepth3() : toc.linkDepth2(),
          isActive(id) && toc.linkActive()
        ),
    }
  }, 'DocTocModel')
