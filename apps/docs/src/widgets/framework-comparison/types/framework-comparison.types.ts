import type {
  CellRating,
  FrameworkId,
  PerformanceRow,
} from "@shared/home/framework-comparison.js";

export type RatingCellViewProps = {
  rating: CellRating;
};

export type PerformanceCellViewProps = {
  row: PerformanceRow;
  frameworkId: FrameworkId;
};
