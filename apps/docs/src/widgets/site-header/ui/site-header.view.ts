import {
  button,
  createView,
  div,
  h,
  header,
  nav as navEl,
  p,
  type Child,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId, homePage } from '@app/router'
import { EchoBrandLogo, GitHubIcon, MenuIcon } from '@widgets/icons'
import { LocaleDropdown } from '@widgets/locale-dropdown'
import { DocsSearch } from '@widgets/search'
import { ThemeToggle } from '@widgets/theme-toggle'
import { VersionDropdown } from '@widgets/version-dropdown'

import type { SiteHeaderVM } from '../model/site-header.model'
import { HomeMobileNav } from './home-mobile-nav.view'
import { headerIconBtnStyles } from './site-header.view.styles'

export const SiteHeaderView = createView((vm: SiteHeaderVM): Child => {
  const hdr = () => vm.headerStyles()

  const headerRootClass = (): string => {
    vm.$scrolled.value()
    vm.$scrollLocked.value()
    return hdr().root()
  }

  return header({ class: headerRootClass }, [
    div({ class: () => hdr().inner() }, [
      vm.showMenu
        ? button(
            {
              type: 'button',
              class: [hdr().menuBtn(), headerIconBtnStyles()].join(' '),
              onClick: vm.openMobileNav,
              'aria-label': 'Open navigation',
            },
            [MenuIcon()]
          )
        : null,
      NavLink({
        to: homePage,
        class: hdr().brand(),
        children: [
          div({ class: hdr().logo() }, [
            EchoBrandLogo({ className: hdr().logoMark(), size: 40 }),
          ]),
          div([p({ class: hdr().brandName() }, 'EchoJS')]),
        ],
      }),
      navEl(
        { class: hdr().nav() },
        vm.navItems.map((item) =>
          NavLink({
            to:
              item.kind === 'doc'
                ? docPageByContentId[item.contentId]!
                : item.page,
            match: item.kind === 'page' ? item.match : undefined,
            class: hdr().navLink(),
            children: item.label,
          })
        )
      ),
      div({ class: hdr().searchWrap() }, [DocsSearch()]),
      div({ class: hdr().actions() }, [
        VersionDropdown(),
        LocaleDropdown(),
        h(
          'a',
          {
            href: 'https://github.com/echojs/echojs',
            target: '_blank',
            rel: 'noopener noreferrer',
            class: [hdr().githubBtn(), headerIconBtnStyles()].join(' '),
            'aria-label': 'EchoJS on GitHub',
          },
          [GitHubIcon()]
        ),
        ThemeToggle(),
      ]),
    ]),
    vm.mode === 'home' ? HomeMobileNav() : null,
  ])
}, 'SiteHeaderView')
