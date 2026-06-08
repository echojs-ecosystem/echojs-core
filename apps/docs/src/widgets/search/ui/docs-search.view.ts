import {
  button,
  type Child,
  createView,
  div,
  input,
  li,
  p,
  Show,
  ul,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { SearchIcon } from '@widgets/icons'
import type { DocsSearchVM } from '@widgets/search/model/docs-search.model'
import { searchStyles } from '@widgets/search/ui/docs-search.view.styles'

const search = searchStyles()

const SearchField = (vm: DocsSearchVM): Child =>
  div({ class: search.root() }, [
    input({
      type: 'search',
      placeholder: 'Search docs…',
      class: search.input(),
      onInput: vm.onInput,
      onFocus: vm.onFocus,
      onBlur: vm.onBlur,
    }),
    () =>
      vm.showDropdown()
        ? div({ class: search.dropdown() }, [
            ul(
              { class: search.list() },
              vm.results().map((entry) => {
                const page = vm.pageForEntry(entry)
                if (!page) return null
                return li({ onClick: vm.closeMobilePanel }, [
                  NavLink({
                    to: page,
                    class: search.item(),
                    children: [
                      p({ class: search.itemTitle() }, entry.title),
                      p(
                        { class: search.itemMeta() },
                        `${entry.section} · ${entry.kind}`
                      ),
                    ],
                  }),
                ])
              })
            ),
          ])
        : null,
  ])

export const DocsSearchView = createView((vm: DocsSearchVM): Child => {
  return [
    Show(
      () => !vm.$mobilePanel.value(),
      () =>
        button(
          {
            type: 'button',
            class: search.mobileTrigger(),
            onClick: vm.openMobilePanel,
            'aria-label': 'Search docs',
          },
          [SearchIcon()]
        )
    ),
    Show(
      () => vm.$mobilePanel.value(),
      () =>
        div({
          class: search.mobileOverlay(),
          onClick: vm.closeMobilePanel,
        })
    ),
    Show(
      () => vm.$mobilePanel.value(),
      () => div({ class: search.mobilePanel() }, [SearchField(vm)]),
      () => div({ class: 'hidden md:block' }, [SearchField(vm)])
    ),
  ]
}, 'DocsSearchView')
