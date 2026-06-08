import {
  type Child,
  createView,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import { bestPerformanceIds } from '@widgets/framework-comparison/model/framework-comparison.model'
import type { PerformanceCellViewProps } from '@widgets/framework-comparison/types/framework-comparison.types'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles'
import { cn } from '@core/styles/cn'

const cmp = frameworkComparisonStyles()

export const PerformanceCellView = createView(
  (props: PerformanceCellViewProps): Child => {
    const value = props.row.values[props.frameworkId]
    const isBest = bestPerformanceIds(props.row).has(props.frameworkId)

    return span({ class: cn(cmp.perfValue(), isBest ? cmp.perfBest() : '') }, [
      String(value),
      span({ class: cmp.perfUnit() }, props.row.unit),
    ])
  },
  'PerformanceCellView'
)
