import { createView, type Child } from "@echojs/hyperdom";
import { div, span } from "@echojs/hyperdom";
import {
  comparisonFrameworks,
  featureComparisonRows,
} from "@widgets/framework-comparison/constants/framework-comparison.data.js";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";
import {
  comparisonFeatureBodyCell,
  comparisonFeatureHeadCell,
  comparisonFrameworkBodyCell,
  comparisonFrameworkHeadCell,
  comparisonGridHeader,
  comparisonGridRow,
} from "@widgets/framework-comparison/ui/comparison-grid.js";
import { RatingCellView } from "@widgets/framework-comparison/ui/rating-cell.view.js";

const cmp = frameworkComparisonStyles();

export const FeatureTableView = createView(
  (_vm: void): Child =>
    div({ class: cmp.tableWrap() }, [
      div({ class: cmp.tableInner() }, [
        div({ class: comparisonGridHeader() }, [
          div({ class: comparisonFeatureHeadCell() }, "Capability"),
          ...comparisonFrameworks.map((fw) =>
            div({ class: comparisonFrameworkHeadCell(fw) }, fw.label),
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
              ]),
            ),
          ]),
        ),
      ]),
    ]),
  "FeatureTableView",
);
