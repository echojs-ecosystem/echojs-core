import type { FrameworkColumn } from "@shared/home/framework-comparison.js";
import { frameworkComparisonStyles } from "@shared/styles/framework-comparison.js";
import { cn } from "@shared/styles/cn.js";

const cmp = frameworkComparisonStyles();

export const comparisonGridHeader = (): string =>
  cn(cmp.gridRow(), cmp.gridCols(), cmp.gridHeadRow());

export const comparisonGridRow = (): string =>
  cn(cmp.gridRow(), cmp.gridCols(), cmp.gridBodyRow());

export const comparisonFeatureHeadCell = (): string =>
  cn(cmp.gridCell(), cmp.gridHeadCell(), cmp.gridFeatureHead());

export const comparisonFeatureBodyCell = (): string =>
  cn(cmp.gridCell(), cmp.gridFeatureCell());

export const comparisonFrameworkHeadCell = (fw: FrameworkColumn): string =>
  cn(
    cmp.gridCell(),
    cmp.gridHeadCell(),
    cmp.gridFrameworkHead(),
    fw.highlight && cmp.gridEchoColumn(),
    fw.highlight && cmp.gridEchoHead(),
  );

export const comparisonFrameworkBodyCell = (fw: FrameworkColumn): string =>
  cn(cmp.gridCell(), cmp.gridFrameworkCell(), fw.highlight && cmp.gridEchoColumn());
