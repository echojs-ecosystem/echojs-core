import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createDocTocMobileModel } from '@widgets/doc-content/model/doc-toc-mobile.model.js'
import type { DocTocSpyProps } from '@widgets/doc-content/types/doc-toc.types.js'
import { DocTocMobileView } from '@widgets/doc-content/ui/doc-toc-mobile.view.js'
import type { DocTocEntry } from '@core/content/extract-toc.js'

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
