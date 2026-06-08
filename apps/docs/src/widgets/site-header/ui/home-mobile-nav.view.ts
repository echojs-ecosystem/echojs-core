import {
  aside,
  button,
  type Child,
  div,
  nav as navEl,
  p,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { buildSiteHeaderNavItems, docPageByContentId } from '@app/router'

import { $homeNavOpen, closeHomeNav } from '../model/home-mobile-nav.js'
import { homeMobileNavStyles } from './home-mobile-nav.view.styles.js'

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
        div({ class: styles.header() }, [
          p({ class: styles.title() }, 'Navigation'),
          button(
            {
              type: 'button',
              class: styles.closeBtn(),
              onClick: closeHomeNav,
              'aria-label': 'Close navigation',
            },
            'Close'
          ),
        ]),
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
              children: item.label,
            })
          )
        ),
      ]),
    ]
  )
