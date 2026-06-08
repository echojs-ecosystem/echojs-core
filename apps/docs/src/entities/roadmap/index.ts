import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createRoadmapModel } from '@entities/roadmap/model/roadmap.model'
import { RoadmapView } from '@entities/roadmap/ui/roadmap.view'

export { createRoadmapModel } from '@entities/roadmap/model/roadmap.model'
export type { RoadmapVM } from '@entities/roadmap/types/roadmap.types'
export { RoadmapView } from '@entities/roadmap/ui/roadmap.view'

export const Roadmap = createComponent(createRoadmapModel, RoadmapView, {
  name: 'Roadmap',
})
