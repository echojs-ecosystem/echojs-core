import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  createCodeBlockModel,
  type CodeBlockProps,
} from '@widgets/code-block/model/code-block.model.js'
import { CodeBlockView } from '@widgets/code-block/ui/code-block.view.js'

export type { CodeBlockProps } from '@widgets/code-block/model/code-block.model.js'

export const CodeBlock = (props: CodeBlockProps): Child =>
  createComponent(createCodeBlockModel(props), CodeBlockView, {
    name: 'CodeBlock',
  })()
