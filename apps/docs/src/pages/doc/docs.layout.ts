import { div, main } from '@echojs-ecosystem/framework/hyperdom'
import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { docsLayoutStyles } from '@pages/doc/docs.layout.styles'
import { DocsSidebar } from '@widgets/docs-shell/docs-sidebar'
import { SiteHeader } from '@widgets/site-header'

const layout = docsLayoutStyles()

export const docsShellLayoutPage = createLayoutView({
  name: 'docs-shell-layout',
  view: ({ outlet }) =>
    div({ class: layout.shell() }, [
      DocsSidebar(),
      div({ class: layout.shellMain() }, [
        SiteHeader({ mode: 'docs' }),
        main({ class: layout.shellContent() }, () => outlet()),
      ]),
    ]),
})
