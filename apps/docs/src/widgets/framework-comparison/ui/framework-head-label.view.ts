import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { div, span } from "@echojs-ecosystem/framework/hyperdom";
import type { FrameworkColumn } from "@widgets/framework-comparison/constants/framework-comparison.data.js";
import { FrameworkLogo } from "@widgets/framework-comparison/ui/framework-logo.js";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";

const cmp = frameworkComparisonStyles();

export const FrameworkHeadLabelView = createView(
  (fw: FrameworkColumn): Child =>
    div({ class: cmp.gridFrameworkHeadInner() }, [
      FrameworkLogo({ id: fw.id, className: cmp.gridFrameworkHeadLogo() }),
      span({ class: fw.highlight ? cmp.gridEchoHeadLabel() : undefined }, fw.label),
    ]),
  "FrameworkHeadLabelView",
);
