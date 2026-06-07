import {
  type Child,
  createView,
  div,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  comparisonFrameworks,
  featureComparisonRows,
} from '@widgets/framework-comparison/constants/framework-comparison.data.js'
import {
  comparisonFeatureBodyCell,
  comparisonFeatureHeadCell,
  comparisonFrameworkBodyCell,
  comparisonFrameworkHeadCell,
  comparisonGridHeader,
  comparisonGridRow,
} from '@widgets/framework-comparison/ui/comparison-grid.js'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles.js'
import { FrameworkHeadLabelView } from '@widgets/framework-comparison/ui/framework-head-label.view.js'
import { RatingCellView } from '@widgets/framework-comparison/ui/rating-cell.view.js'

const cmp = frameworkComparisonStyles()

export const FeatureTableView = createView(
  (_vm: void): Child =>
    div({ class: cmp.tableWrap() }, [
      div({ class: cmp.tableInner() }, [
        div({ class: comparisonGridHeader() }, [
          div({ class: comparisonFeatureHeadCell() }, 'Capability'),
          ...comparisonFrameworks.map((fw) =>
            div(
              { class: comparisonFrameworkHeadCell(fw) },
              FrameworkHeadLabelView(fw)
            )
          ),
        ]),
        ...featureComparisonRows.map((row) =>
          div({ class: comparisonGridRow() }, [
            div({ class: comparisonFeatureBodyCell() }, [
              row.feature,
              row.hint ? span({ class: cmp.featureHint() }, row.hint) : null,
            ]),
            ...comparisonFrameworks.map((fw) =>
              div({ class: comparisonFrameworkBodyCell(fw) }, [
                RatingCellView({ rating: row.values[fw.id] }),
              ])
            ),
          ])
        ),
      ]),
    ]),
  'FeatureTableView'
)
