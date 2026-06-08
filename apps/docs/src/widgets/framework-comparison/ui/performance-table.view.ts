import {
  type Child,
  createView,
  div,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  comparisonFrameworks,
  performanceComparisonRows,
} from '@widgets/framework-comparison/constants/framework-comparison.data'
import {
  comparisonFeatureBodyCell,
  comparisonFeatureHeadCell,
  comparisonFrameworkBodyCell,
  comparisonFrameworkHeadCell,
  comparisonGridHeader,
  comparisonGridRow,
} from '@widgets/framework-comparison/ui/comparison-grid'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles'
import { FrameworkHeadLabelView } from '@widgets/framework-comparison/ui/framework-head-label.view'
import { PerformanceCellView } from '@widgets/framework-comparison/ui/performance-cell.view'

const cmp = frameworkComparisonStyles()

export const PerformanceTableView = createView(
  (_vm: void): Child =>
    div({ class: cmp.tableWrap() }, [
      div({ class: cmp.tableInner() }, [
        div({ class: comparisonGridHeader() }, [
          div({ class: comparisonFeatureHeadCell() }, 'Benchmark'),
          ...comparisonFrameworks.map((fw) =>
            div(
              { class: comparisonFrameworkHeadCell(fw) },
              FrameworkHeadLabelView(fw)
            )
          ),
        ]),
        ...performanceComparisonRows.map((row) =>
          div({ class: comparisonGridRow() }, [
            div({ class: comparisonFeatureBodyCell() }, row.metric),
            ...comparisonFrameworks.map((fw) =>
              div({ class: comparisonFrameworkBodyCell(fw) }, [
                PerformanceCellView({ row, frameworkId: fw.id }),
              ])
            ),
          ])
        ),
      ]),
    ]),
  'PerformanceTableView'
)
