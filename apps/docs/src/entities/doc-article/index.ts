import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createDocArticleModel } from '@entities/doc-article/model/doc-article.model'
import type { DocArticleProps } from '@entities/doc-article/types/doc-article.types'
import { DocArticleView } from '@entities/doc-article/ui/doc-article.view'

export {
  createDocArticleModel,
  type DocArticleVM,
  type DocContentPayload,
} from '@entities/doc-article/model/doc-article.model'
export type { DocArticleProps } from '@entities/doc-article/types/doc-article.types'
export { DocArticleView } from '@entities/doc-article/ui/doc-article.view'

export const DocArticle = (props: DocArticleProps): Child =>
  createComponent(createDocArticleModel(props), DocArticleView, {
    name: 'DocArticle',
  })()
