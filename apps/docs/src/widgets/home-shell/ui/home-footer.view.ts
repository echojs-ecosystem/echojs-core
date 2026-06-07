import {
  type Child,
  createView,
  div,
  footer,
  h,
  p,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { sponsorsPage } from '@app/router'
import { homeFooterLinks } from '@widgets/home-shell/constants/home-footer.links.js'
import { homeFooterStyles } from '@widgets/home-shell/ui/home-footer.view.styles.js'

const ft = homeFooterStyles()

export const HomeFooterView = createView(
  (_vm: void): Child =>
    footer({ class: ft.root() }, [
      div({ class: ft.inner() }, [
        div({ class: ft.brand() }, [
          p({ class: ft.brandName() }, 'EchoJS'),
          p({ class: ft.brandTag() }, 'Signal-first framework documentation.'),
        ]),
        div({ class: ft.links() }, [
          ...homeFooterLinks.map((link) =>
            NavLink({
              to: docPageByContentId[link.contentId]!,
              class: ft.link(),
              children: link.label,
            })
          ),
          NavLink({ to: sponsorsPage, class: ft.link(), children: 'Sponsors' }),
          h(
            'a',
            {
              href: 'https://github.com/echojs/echojs',
              target: '_blank',
              rel: 'noopener noreferrer',
              class: ft.link(),
            },
            'GitHub'
          ),
        ]),
      ]),
      div({ class: ft.bottom() }, [
        p(null, `© ${new Date().getFullYear()} EchoJS. Built with EchoJS.`),
        p(
          null,
          'Documentation site — production-ready reference implementation.'
        ),
      ]),
    ]),
  'HomeFooterView'
)
