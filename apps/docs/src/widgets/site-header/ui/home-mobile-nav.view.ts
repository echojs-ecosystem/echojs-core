import {
  aside,
  type Child,
  div,
  nav as navEl,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { buildSiteHeaderNavItems, docPageByContentId } from '@app/router'
import { i18n } from '@core/providers'

import { $homeNavOpen, closeHomeNav } from '../model/home-mobile-nav'
import { homeMobileNavStyles } from './home-mobile-nav.view.styles'

const styles = homeMobileNavStyles()

const closeOnLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (target?.closest('a')) closeHomeNav()
}

export const HomeMobileNav = (): Child =>
  Show(
    () => $homeNavOpen.value(),
    () => [
      div({
        class: styles.overlay(),
        onClick: closeHomeNav,
      }),
      aside({ class: styles.panel() }, [
        navEl(
          { class: styles.links(), onClick: closeOnLinkClick },
          buildSiteHeaderNavItems().map((item) =>
            NavLink({
              to:
                item.kind === 'doc'
                  ? docPageByContentId[item.contentId]!
                  : item.page,
              match: item.kind === 'page' ? item.match : undefined,
              class: styles.link(),
              children: () => i18n.t(item.labelKey),
            })
          )
        ),
      ]),
    ]
  )
