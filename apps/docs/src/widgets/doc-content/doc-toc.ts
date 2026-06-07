import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createDocTocModel } from '@widgets/doc-content/model/doc-toc.model.js'
import type { DocTocSpyProps } from '@widgets/doc-content/types/doc-toc.types.js'
import { DocTocView } from '@widgets/doc-content/ui/doc-toc.view.js'
import type { DocTocEntry } from '@core/content/extract-toc.js'

export const DocToc = (
  entries: DocTocEntry[],
  spy: DocTocSpyProps
): Child | null => {
  if (entries.length === 0) return null
  return createComponent(createDocTocModel({ entries, ...spy }), DocTocView, {
    name: 'DocToc',
  })()
}
