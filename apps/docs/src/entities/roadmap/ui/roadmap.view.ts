import {
  type Child,
  createView,
  div,
  h1,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import type { RoadmapVM } from '@entities/roadmap/types/roadmap.types.js'
import { RoadmapBoard } from '@entities/roadmap/ui/roadmap-board.js'
import { RoadmapIdeaForm } from '@entities/roadmap/ui/roadmap-idea-form.js'
import { roadmapPageStyles } from '@entities/roadmap/ui/roadmap.view.styles.js'

const page = roadmapPageStyles()

export const RoadmapView = createView(
  (vm: RoadmapVM): Child =>
    div({ class: page.page() }, [
      div({ class: page.inner() }, [
        div({ class: page.header() }, [
          h1({ class: page.title() }, 'Roadmap'),
          p({ class: page.lead() }, [
            "What we're building across the EchoJS ecosystem — from core packages to docs and tooling. Drag priorities in your head; we'll ship in code.",
          ]),
        ]),
        div({ class: page.board() }, [
          RoadmapBoard({
            columns: vm.columns,
            communityIdeas: vm.communityIdeas(),
          }),
        ]),
        div({ class: page.form() }, [RoadmapIdeaForm(vm)]),
      ]),
    ]),
  'RoadmapView'
)
