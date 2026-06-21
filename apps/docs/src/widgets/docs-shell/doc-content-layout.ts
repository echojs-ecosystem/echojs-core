import { div, type Child } from '@echojs-ecosystem/framework/hyperdom'

import { DocAsideSponsors } from '@widgets/docs-shell/doc-aside-sponsors'
import { docContentLayoutStyles } from '@widgets/docs-shell/doc-content-layout.styles'

export type DocContentLayoutProps = {
  children: Child
  /** Right-rail TOC; aside gutter stays reserved on xl+ when omitted. */
  toc?: Child
  width?: 'prose' | 'wide'
}

export const DocContentLayout = ({
  children,
  toc,
  width = 'prose',
}: DocContentLayoutProps): Child => {
  const layout = docContentLayoutStyles({ width })

  return div({ class: layout.article() }, [
    div({ class: layout.main() }, [div({ class: layout.mainInner() }, children)]),
    div({ class: layout.tocAside() }, [
      div({ class: layout.tocSticky() }, [
        toc ?? null,
        div({ class: layout.sponsorsRail() }, [DocAsideSponsors()]),
      ]),
    ]),
  ])
}
