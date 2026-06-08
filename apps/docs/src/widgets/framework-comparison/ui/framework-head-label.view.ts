import {
  type Child,
  createView,
  div,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import type { FrameworkColumn } from '@widgets/framework-comparison/constants/framework-comparison.data'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles'
import { FrameworkLogo } from '@widgets/framework-comparison/ui/framework-logo'

const cmp = frameworkComparisonStyles()

export const FrameworkHeadLabelView = createView(
  (fw: FrameworkColumn): Child =>
    div({ class: cmp.gridFrameworkHeadInner() }, [
      FrameworkLogo({ id: fw.id, className: cmp.gridFrameworkHeadLogo() }),
      span(
        { class: fw.highlight ? cmp.gridEchoHeadLabel() : undefined },
        fw.label
      ),
    ]),
  'FrameworkHeadLabelView'
)
