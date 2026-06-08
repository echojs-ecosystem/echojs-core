import {
  type Child,
  div,
  h3,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import { ideaCategoryOptions } from '@entities/roadmap/constants/roadmap.data'
import type {
  CommunityIdea,
  RoadmapColumn,
  RoadmapItem,
} from '@entities/roadmap/types/roadmap.types'
import { roadmapBoardStyles } from '@entities/roadmap/ui/roadmap-board.styles'

const board = roadmapBoardStyles()

const categoryLabel = (value: CommunityIdea['category']): string =>
  ideaCategoryOptions.find((opt) => opt.value === value)?.label ?? value

const RoadmapCard = (item: RoadmapItem): Child =>
  div({ class: board.card() }, [
    h3({ class: board.cardTitle() }, item.title),
    p({ class: board.cardDesc() }, item.description),
    item.tags?.length
      ? div(
          { class: board.cardTags() },
          item.tags.map((tag) => span({ class: board.tag() }, tag))
        )
      : null,
  ])

const RoadmapColumnView = (
  column: RoadmapColumn,
  extraItems: RoadmapItem[] = []
): Child => {
  const styles = roadmapBoardStyles({ status: column.status })
  const items = [...extraItems, ...column.items]

  return div({ class: styles.column() }, [
    div({ class: board.columnHeader() }, [
      h3({ class: styles.columnTitle() }, column.title),
      p({ class: board.columnDesc() }, column.description),
    ]),
    div({ class: board.columnBody() }, items.map(RoadmapCard)),
  ])
}

export type RoadmapBoardProps = {
  columns: RoadmapColumn[]
  communityIdeas?: readonly CommunityIdea[]
}

export const RoadmapBoard = ({
  columns,
  communityIdeas = [],
}: RoadmapBoardProps): Child => {
  const planned = columns.find((col) => col.status === 'planned')
  const inProgress = columns.find((col) => col.status === 'in-progress')
  const shipped = columns.find((col) => col.status === 'shipped')

  const communityAsItems: RoadmapItem[] = communityIdeas.map((idea) => ({
    id: idea.id,
    title: idea.title,
    description: idea.description,
    tags: [categoryLabel(idea.category)],
  }))

  return div({ class: board.board() }, [
    planned ? RoadmapColumnView(planned, communityAsItems) : null,
    inProgress ? RoadmapColumnView(inProgress) : null,
    shipped ? RoadmapColumnView(shipped) : null,
  ])
}
