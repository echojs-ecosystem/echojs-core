import { createView, type Child } from "@echojs/hyperdom";
import { span } from "@echojs/hyperdom";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";
import type { RatingCellViewProps } from "@widgets/framework-comparison/types/framework-comparison.types.js";

const cmp = frameworkComparisonStyles();

export const RatingCellView = createView((props: RatingCellViewProps): Child => {
  switch (props.rating) {
    case "yes":
      return span({ class: cmp.cellYes(), "aria-label": "Yes" }, "✓");
    case "partial":
      return span({ class: cmp.cellPartial(), "aria-label": "Partial" }, "~");
    case "no":
      return span({ class: cmp.cellNo(), "aria-label": "No" }, "—");
  }
}, "RatingCellView");
