import {
  button,
  type Child,
  createView,
  div,
  p,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'

import { DocRenderer } from '@widgets/doc-content/doc-renderer'
import { DocTocMobile } from '@widgets/doc-content/doc-toc-mobile'
import { DocToc } from '@widgets/doc-content/doc-toc'
import { DocPager } from '@widgets/doc-pager'
import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import type { DocArticleVM } from '@entities/doc-article/model/doc-article.model'
import {
  docArticlePageStyles,
  skeletonStyles,
} from '@entities/doc-article/ui/doc-article.view.styles'
import { routerStateStyles } from '@entities/router-states/ui/router-states.view.styles'
import { extractDocToc } from '@core/content/extract-toc'

const page = docContentPageStyles()
const articleChrome = docArticlePageStyles()
const skeleton = skeletonStyles()
const state = routerStateStyles()

const tocSpy = (vm: DocArticleVM) => ({
  isActive: vm.isTocActive,
  setActiveId: vm.setTocActiveId,
})

export const DocArticleView = createView((vm: DocArticleVM): Child => {
  const { query } = vm

  return div({ class: page.page() }, [
    Show(
      () => query.isPending(),
      () =>
        div({ class: skeleton.root() }, [
          div({ class: skeleton.title() }),
          div({ class: skeleton.line() }),
          div({ class: skeleton.lineShort() }),
        ]),
      () =>
        Show(
          () => query.isError(),
          () =>
            p({ class: state.error() }, () =>
              String(query.error() ?? 'Failed to load content')
            ),
          () => {
            const content = query.data()
            if (!content) return null
            const doc = content.document
            const toc = extractDocToc(doc)
            return DocContentLayout({
              toc: DocToc(toc, tocSpy(vm)),
              children: [
                div({ class: articleChrome.toolbar() }, [
                  button(
                    {
                      type: 'button',
                      class: articleChrome.copyPageBtn(),
                      onClick: () => void vm.copyPage(),
                      'aria-label': 'Copy page as markdown',
                    },
                    vm.copyPageLabel
                  ),
                ]),
                DocTocMobile(toc, tocSpy(vm)),
                DocRenderer(doc),
                DocPager(vm.props.contentId),
              ],
            })
          }
        )
    ),
  ])
}, 'DocArticleView')
