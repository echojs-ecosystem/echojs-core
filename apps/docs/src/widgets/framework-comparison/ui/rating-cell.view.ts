import {
  type Child,
  createView,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import type { RatingCellViewProps } from '@widgets/framework-comparison/types/framework-comparison.types'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles'

const cmp = frameworkComparisonStyles()

export const RatingCellView = createView(
  (props: RatingCellViewProps): Child => {
    switch (props.rating) {
      case 'yes':
        return span({ class: cmp.cellYes(), 'aria-label': 'Yes' }, '✓')
      case 'partial':
        return span({ class: cmp.cellPartial(), 'aria-label': 'Partial' }, '~')
      case 'no':
        return span({ class: cmp.cellNo(), 'aria-label': 'No' }, '—')
    }
  },
  'RatingCellView'
)
