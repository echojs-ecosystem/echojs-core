import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createDocTocMobileModel } from '@widgets/doc-content/model/doc-toc-mobile.model'
import type { DocTocSpyProps } from '@widgets/doc-content/types/doc-toc.types'
import { DocTocMobileView } from '@widgets/doc-content/ui/doc-toc-mobile.view'
import type { DocTocEntry } from '@core/content/extract-toc'

export const DocTocMobile = (
  entries: DocTocEntry[],
  spy: DocTocSpyProps
): Child | null => {
  if (entries.length === 0) return null
  return createComponent(
    createDocTocMobileModel({ entries, ...spy }),
    DocTocMobileView,
    {
      name: 'DocTocMobile',
    }
  )()
}
