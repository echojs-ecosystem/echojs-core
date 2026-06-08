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
  testingAdvantages,
  testingCodePanels,
  testingHighlights,
} from '@entities/home/constants/testing-advantages'
import { codeDots } from '@entities/home/helpers/code-dots'
import type { HomeVM } from '@entities/home/types/home.types'
import { homeTestingStyles } from '@entities/home/ui/home-testing.view.styles'
import { cn } from '@core/styles/cn'

const home = homeTestingStyles()

const TestingPipelineStrip = (): Child =>
  div({ class: home.pipelineStrip() }, [
    div({ class: home.pipelineGlow() }),
    div({ class: home.pipelineRow() }, [
      div({ class: home.pipelineCell({ emphasis: 'primary' }) }, [
        p({ class: home.pipelineLabel() }, 'createModel'),
        p({ class: home.pipelineHint() }, 'unit · no mount'),
      ]),
      span({ class: home.pipelineArrow(), 'aria-hidden': 'true' }, '→'),
      div({ class: home.pipelineCell() }, [
        p({ class: home.pipelineLabel() }, 'createView'),
        p({ class: home.pipelineHint() }, 'stub VM · optional'),
      ]),
    ]),
    div({ class: home.pipelineFooter() }, [
      div([
        p(
          { class: home.pipelineCaption() },
          'State and behavior separate from markup at every layer'
        ),
        div(
          { class: home.pipelinePills() },
          testingHighlights.map((label) => span({ class: home.pill() }, label))
        ),
      ]),
      NavLink({
        to: docPageByContentId['architecture/models']!,
        class: home.topLink(),
        children: ['Models & views', span(null, '→')],
      }),
    ]),
  ])

const TestingCodeEditor = (vm: HomeVM): Child =>
  div({ class: home.editor() }, [
    div(
      { class: home.editorTabs() },
      testingCodePanels.map((panel, index) =>
        button(
          {
            type: 'button',
            class: () =>
              cn(
                home.editorTab(),
                vm.isTestingPanelActive(index) && home.editorTabActive()
              ),
            onClick: () => vm.setTestingPanel(index),
          },
          panel.label
        )
      )
    ),
    () => {
      const panel = vm.activeTestingPanel()
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

export const HomeTestingView = createView(
  (vm: HomeVM): Child =>
    div({ class: home.shell() }, [
      div({ class: home.shellGlow() }),
      div({ class: home.shellGlowRight() }),
      TestingPipelineStrip(),
      TestingCodeEditor(vm),
      div(
        { class: home.advantages() },
        testingAdvantages.map((item) =>
          NavLink({
            to: docPageByContentId[item.docId]!,
            class: home.advantageCard(),
            children: [
              div({ class: home.advantageHead() }, [
                span({ class: home.advantageIcon() }, item.icon),
                p({ class: home.advantageTitle() }, item.title),
              ]),
              p({ class: home.advantageSummary() }, item.summary),
            ],
          })
        )
      ),
    ]),
  'HomeTestingView'
)
