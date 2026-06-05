import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { div } from "@echojs-ecosystem/framework/hyperdom";
import {
  comparisonFrameworks,
  performanceComparisonRows,
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
import { PerformanceCellView } from "@widgets/framework-comparison/ui/performance-cell.view.js";

const cmp = frameworkComparisonStyles();

export const PerformanceTableView = createView(
  (_vm: void): Child =>
    div({ class: cmp.tableWrap() }, [
      div({ class: cmp.tableInner() }, [
        div({ class: comparisonGridHeader() }, [
          div({ class: comparisonFeatureHeadCell() }, "Benchmark"),
          ...comparisonFrameworks.map((fw) =>
            div({ class: comparisonFrameworkHeadCell(fw) }, fw.label),
          ),
        ]),
        ...performanceComparisonRows.map((row) =>
          div({ class: comparisonGridRow() }, [
            div({ class: comparisonFeatureBodyCell() }, row.metric),
            ...comparisonFrameworks.map((fw) =>
              div({ class: comparisonFrameworkBodyCell(fw) }, [
                PerformanceCellView({ row, frameworkId: fw.id }),
              ]),
            ),
          ]),
        ),
      ]),
    ]),
  "PerformanceTableView",
);
