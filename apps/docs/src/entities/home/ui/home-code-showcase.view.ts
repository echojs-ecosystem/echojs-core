import {
  button,
  createView,
  div,
  h2,
  li,
  p,
  span,
  ul,
} from '@echojs-ecosystem/framework/hyperdom'

import { CodeBlock } from '@widgets/code-block'
import { codeTabs } from '@entities/home/constants/home.constants'
import { codeDots } from '@entities/home/helpers/code-dots'
import type { HomeVM } from '@entities/home/types/home.types'
import { homeCodeShowcaseStyles } from '@entities/home/ui/home-code-showcase.view.styles'
import { cn } from '@core/styles/cn'

const home = homeCodeShowcaseStyles()

export const HomeCodeShowcaseView = createView((vm: HomeVM) => {
  return div({ class: home.codeShowcase() }, [
    div({ class: home.codeShowcaseGlow() }),
    div({ class: home.codeShowcaseGrid() }, [
      div(null, [
        p({ class: home.sectionEyebrow() }, 'Layers'),
        div(
          { class: home.codeTabRail() },
          codeTabs.map((tab, index) =>
            button(
              {
                type: 'button',
                class: () =>
                  cn(
                    home.codeTabBtn(),
                    vm.isCodeTabActive(index) && home.codeTabBtnActive()
                  ),
                onClick: () => vm.setCodeTab(index),
              },
              [
                span({ class: home.codeTabIcon() }, tab.icon),
                span({ class: home.codeTabLayer() }, tab.layer),
                span({ class: home.codeTabLabel() }, tab.label),
              ]
            )
          )
        ),
        div({ class: home.codeDetail() }, [
          () => {
            const tab = vm.activeCodeTab()
            return [
              h2({ class: home.codeDetailTitle() }, tab.title),
              p({ class: home.codeDetailBody() }, tab.body),
              ul(
                { class: home.codeDetailList() },
                tab.points.map((point) =>
                  li({ class: home.codeDetailItem() }, [
                    span({ class: home.codeDetailBullet() }, '✓'),
                    point,
                  ])
                )
              ),
            ]
          },
        ]),
      ]),
      div({ class: home.codeEditor() }, [
        () => {
          const tab = vm.activeCodeTab()
          return [
            div({ class: home.codeEditorChrome() }, [
              div({ class: home.codeEditorDots() }, codeDots()),
              span({ class: home.codeEditorTitle() }, `src/${tab.label}`),
              span({ class: home.codeEditorBadge() }, 'TypeScript'),
            ]),
            div({ class: home.codeEditorBody() }, [
              CodeBlock({ language: tab.lang, code: tab.code, bare: true }),
            ]),
            p(
              { class: home.codeEditorFoot() },
              () => `${tab.layer} · ${tab.points[0] ?? ''}`
            ),
          ]
        },
      ]),
    ]),
    div({ class: 'mt-4 lg:hidden' }, [
      () => {
        const tab = vm.activeCodeTab()
        return [
          h2({ class: home.codeDetailTitle() }, tab.title),
          p({ class: home.codeDetailBody() }, tab.body),
          ul(
            { class: home.codeDetailList() },
            tab.points.map((point) =>
              li({ class: home.codeDetailItem() }, [
                span({ class: home.codeDetailBullet() }, '✓'),
                point,
              ])
            )
          ),
        ]
      },
    ]),
  ])
}, 'HomeCodeShowcaseView')
