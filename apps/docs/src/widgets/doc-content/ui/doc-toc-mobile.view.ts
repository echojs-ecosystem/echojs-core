import {
  button,
  type Child,
  createView,
  div,
  h,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import type { DocTocMobileVM } from '@widgets/doc-content/model/doc-toc-mobile.model.js'
import { docTocMobileStyles } from '@widgets/doc-content/ui/doc-toc-mobile.view.styles.js'

const toc = docTocMobileStyles()

export const DocTocMobileView = createView((vm: DocTocMobileVM): Child => {
  const { entries, isActive } = vm.props
  if (entries.length === 0) return null

  return div({ class: toc.root() }, [
    button(
      {
        type: 'button',
        class: toc.toggle(),
        'aria-expanded': () => String(vm.$open.value()),
        onClick: vm.toggle,
      },
      [
        span({ class: toc.toggleLabel() }, 'On this page'),
        span({ class: () => vm.chevronClass() }, '▾'),
      ]
    ),
    Show(
      () => vm.$open.value(),
      () =>
        div({ class: toc.panel() }, [
          div(
            { class: toc.list() },
            entries.map((entry) =>
              h(
                'a',
                {
                  href: `#${entry.id}`,
                  class: () => vm.linkClass(entry.level, entry.id),
                  'aria-current': () =>
                    isActive(entry.id) ? 'location' : undefined,
                  onClick: (e: MouseEvent) => {
                    e.preventDefault()
                    vm.navigateToEntry(entry.id)
                  },
                },
                entry.text
              )
            )
          ),
        ])
    ),
  ])
}, 'DocTocMobileView')
