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
} from '@entities/home/constants/testing-advantages.js'
import { codeDots } from '@entities/home/helpers/code-dots.js'
import type { HomeVM } from '@entities/home/types/home.types.js'
import { homeTestingStyles } from '@entities/home/ui/home-testing.view.styles.js'
import { cn } from '@core/styles/cn.js'

const home = homeTestingStyles()

const TestingPipeline = (): Child =>
  div({ class: home.pipeline() }, [
    div({ class: cn(home.pipelineNode(), home.pipelineNodePrimary()) }, [
      p({ class: home.pipelineLabel() }, 'createModel'),
      p({ class: home.pipelineHint() }, 'unit · no mount'),
    ]),
    span({ class: home.pipelineArrow(), 'aria-hidden': 'true' }, '→'),
    div({ class: home.pipelineNode() }, [
      p({ class: home.pipelineLabel() }, 'createView'),
      p({ class: home.pipelineHint() }, 'stub VM · optional'),
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
      div({ class: home.bridge() }, [
        p({ class: home.bridgeText() }, [
          'EchoJS splits ',
          span({ class: cn('font-medium text-fg') }, 'state and behavior'),
          ' from ',
          span({ class: cn('font-medium text-fg') }, 'markup'),
          ' at every layer — exercise the model as a plain object, mount the view only when the DOM matters.',
        ]),
        NavLink({
          to: docPageByContentId['architecture/models']!,
          class: home.bridgeLink(),
          children: ['Models & views', span(null, '→')],
        }),
      ]),
      div({ class: home.grid() }, [
        div({ class: home.leftCol() }, [
          div(
            { class: home.pills() },
            testingHighlights.map((label) =>
              span({ class: home.pill() }, label)
            )
          ),
          div(
            { class: home.advantages() },
            testingAdvantages.map((item) =>
              NavLink({
                to: docPageByContentId[item.docId]!,
                class: home.advantageCard(),
                children: [
                  div({ class: home.advantageTopLine() }),
                  div({ class: home.advantageHead() }, [
                    span({ class: home.advantageIcon() }, item.icon),
                    p({ class: home.advantageTitle() }, item.title),
                  ]),
                  p({ class: home.advantageSummary() }, item.summary),
                  p({ class: home.advantageHighlight() }, item.highlight),
                  span({ class: home.advantageLink() }, [
                    'Read more',
                    span(null, '→'),
                  ]),
                ],
              })
            )
          ),
        ]),
        div({ class: home.rightCol() }, [
          TestingPipeline(),
          TestingCodeEditor(vm),
        ]),
      ]),
    ]),
  'HomeTestingView'
)
