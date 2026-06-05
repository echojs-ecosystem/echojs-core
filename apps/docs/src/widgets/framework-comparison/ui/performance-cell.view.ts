import { createView, type Child } from "@echojs/hyperdom";
import { span } from "@echojs/hyperdom";
import { frameworkComparisonStyles } from "@shared/styles/framework-comparison.js";
import { cn } from "@shared/styles/cn.js";
import { bestPerformanceIds } from "@widgets/framework-comparison/model/framework-comparison.model.js";
import type { PerformanceCellViewProps } from "@widgets/framework-comparison/types/framework-comparison.types.js";

const cmp = frameworkComparisonStyles();

export const PerformanceCellView = createView((props: PerformanceCellViewProps): Child => {
  const value = props.row.values[props.frameworkId];
  const isBest = bestPerformanceIds(props.row).has(props.frameworkId);

  return span({ class: cn(cmp.perfValue(), isBest ? cmp.perfBest() : "") }, [
    String(value),
    span({ class: cmp.perfUnit() }, props.row.unit),
  ]);
}, "PerformanceCellView");
