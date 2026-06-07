import {
  button,
  type Child,
  createView,
  div,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { CodeBlock } from '@widgets/code-block'
import {
  architectCodePanels,
  architectureAdvantages,
  architectureLayers,
} from '@entities/home/constants/architecture-advantages.js'
import { codeDots } from '@entities/home/helpers/code-dots.js'
import type { HomeVM } from '@entities/home/types/home.types.js'
import { homeArchitectureStyles } from '@entities/home/ui/home-architecture.view.styles.js'
import { cn } from '@core/styles/cn.js'

const home = homeArchitectureStyles()

const advantageNumbers = ['01', '02', '03', '04'] as const

const ArchitectureLayerStrip = (): Child =>
  div({ class: home.layerStrip() }, [
    div({ class: home.layerStripGlow() }),
    div(
      { class: home.layerRow() },
      architectureLayers.flatMap((item, index) => [
        index > 0
          ? span({ class: home.layerArrow(), 'aria-hidden': 'true' }, '→')
          : null,
        div({ class: home.layerCell({ emphasis: item.emphasis }) }, [
          p({ class: home.layerName() }, item.name),
          p({ class: home.layerHint() }, item.hint),
        ]),
      ])
    ),
    div({ class: home.layerFooter() }, [
      p(
        { class: home.layerCaption() },
        'Imports flow right → higher layers depend on lower ones'
      ),
      NavLink({
        to: docPageByContentId['packages/architect/guides/layers']!,
        class: home.topLink(),
        children: ['Layer rules', span(null, '→')],
      }),
    ]),
  ])

const ArchitectLintEditor = (vm: HomeVM): Child =>
  div({ class: home.editor() }, [
    div(
      { class: home.editorTabs() },
      architectCodePanels.map((panel, index) =>
        button(
          {
            type: 'button',
            class: () =>
              cn(
                home.editorTab(),
                vm.isArchitectPanelActive(index) && home.editorTabActive()
              ),
            onClick: () => vm.setArchitectPanel(index),
          },
          panel.label
        )
      )
    ),
    () => {
      const panel = vm.activeArchitectPanel()
      return [
        div({ class: home.editorChrome() }, [
          div({ class: home.editorDots() }, codeDots()),
          span({ class: home.editorTitle() }, panel.file),
          span({ class: home.editorBadge() }, panel.badge),
        ]),
        div({ class: home.editorBody() }, [
          CodeBlock({ language: panel.lang, code: panel.code, bare: true }),
        ]),
        p({ class: home.editorFoot() }, panel.caption),
      ]
    },
  ])

export const HomeArchitectureView = createView(
  (vm: HomeVM): Child =>
    div({ class: home.shell() }, [
      div({ class: home.shellGlow() }),
      div({ class: home.shellGlowRight() }),
      ArchitectureLayerStrip(),
      ArchitectLintEditor(vm),
      div(
        { class: home.advantages() },
        architectureAdvantages.map((item, index) =>
          NavLink({
            to: docPageByContentId[item.docId]!,
            class: home.advantageCard(),
            children: [
              span(
                { class: home.advantageIcon() },
                advantageNumbers[index] ?? '•'
              ),
              p({ class: home.advantageTitle() }, item.title),
              p({ class: home.advantageSummary() }, item.summary),
            ],
          })
        )
      ),
    ]),
  'HomeArchitectureView'
)
