import {
  type Child,
  createView,
  div,
  footer,
  h,
  li,
  p,
  ul,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router/doc-pages'
import {
  homeFooterColumns,
  type FooterLink,
} from '@widgets/home-shell/constants/home-footer.links'
import { homeFooterStyles } from '@widgets/home-shell/ui/home-footer.view.styles'
import { i18n } from '@core/providers'

const ft = homeFooterStyles()

const isDocLink = (
  link: FooterLink
): link is Extract<FooterLink, { contentId: string }> => 'contentId' in link

const FooterLinkItem = (link: FooterLink): Child => {
  if (isDocLink(link)) {
    return NavLink({
      to: docPageByContentId[link.contentId]!,
      class: ft.columnLink(),
      children: () => i18n.t(link.labelKey),
    })
  }

  if (link.external) {
    return h(
      'a',
      {
        href: link.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        class: ft.columnLink(),
      },
      () => i18n.t(link.labelKey)
    )
  }

  return NavLink({
    href: link.href,
    class: ft.columnLink(),
    children: () => i18n.t(link.labelKey),
  })
}

export const HomeFooterView = createView(
  (_vm: void): Child =>
    footer({ class: ft.root() }, [
      div({ class: ft.inner() }, [
        div({ class: ft.brand() }, [
          p({ class: ft.brandName() }, 'EchoJS'),
          p({ class: ft.brandTag() }, () => i18n.t('footer.tagline')),
        ]),
        div(
          { class: ft.columns() },
          homeFooterColumns.map((column) =>
            div({ class: ft.column() }, [
              p({ class: ft.columnTitle() }, () => i18n.t(column.titleKey)),
              ul(
                { class: ft.columnList() },
                column.links.map((link) => li(null, FooterLinkItem(link)))
              ),
            ])
          )
        ),
      ]),
      div({ class: ft.bottom() }, [
        p(null, `© ${new Date().getFullYear()} EchoJS`),
        p({ class: ft.bottomNote() }, () => i18n.t('footer.builtWith')),
      ]),
    ]),
  'HomeFooterView'
)
