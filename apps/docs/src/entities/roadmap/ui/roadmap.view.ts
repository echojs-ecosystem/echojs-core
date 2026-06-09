import {
  type Child,
  createView,
  div,
  h1,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import type { RoadmapVM } from '@entities/roadmap/types/roadmap.types'
import { RoadmapBoard } from '@entities/roadmap/ui/roadmap-board'
import { RoadmapIdeaForm } from '@entities/roadmap/ui/roadmap-idea-form'
import { roadmapPageStyles } from '@entities/roadmap/ui/roadmap.view.styles'

const page = docContentPageStyles()
const roadmap = roadmapPageStyles()

export const RoadmapView = createView(
  (vm: RoadmapVM): Child =>
    div({ class: page.page() }, [
      DocContentLayout({
        width: 'wide',
        children: [
          div({ class: roadmap.header() }, [
            h1({ class: roadmap.title() }, 'Roadmap'),
            p({ class: roadmap.lead() }, [
              "What we're building across the EchoJS ecosystem — from core packages to docs and tooling. Drag priorities in your head; we'll ship in code.",
            ]),
          ]),
          div({ class: roadmap.board() }, [
            RoadmapBoard({
              columns: vm.columns,
              communityIdeas: vm.communityIdeas(),
            }),
          ]),
          div({ class: roadmap.form() }, [RoadmapIdeaForm(vm)]),
        ],
      }),
    ]),
  'RoadmapView'
)
