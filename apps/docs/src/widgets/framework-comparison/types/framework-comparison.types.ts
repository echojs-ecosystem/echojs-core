import type {
  CellRating,
  FrameworkId,
  PerformanceRow,
} from '@widgets/framework-comparison/constants/framework-comparison.data'

export type RatingCellViewProps = {
  rating: CellRating
}

export type PerformanceCellViewProps = {
  row: PerformanceRow
  frameworkId: FrameworkId
}
