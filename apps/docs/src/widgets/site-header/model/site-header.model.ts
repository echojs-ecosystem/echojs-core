import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import type { Signal } from '@echojs-ecosystem/framework/reactivity'

import {
  $docsHeaderScrolled,
  $docsHeaderScrollLockActive,
} from '@app/docs-header-scroll'
import { buildSiteHeaderNavItems, type SiteHeaderNavItem } from '@app/router'
import { toggleMobileNav } from '@widgets/docs-shell/model/mobile-nav'

import { homeHeaderStyles } from '../ui/site-header.view.styles'
import { toggleHomeNav } from './home-mobile-nav'

export type { SiteHeaderNavItem } from '@app/router'

export type SiteHeaderMode = 'home' | 'docs'

export type SiteHeaderOptions = {
  mode?: SiteHeaderMode
}

export type SiteHeaderVM = {
  mode: SiteHeaderMode
  $scrolled: Signal<boolean>
  $scrollLocked: Signal<boolean>
  headerStyles: () => ReturnType<typeof homeHeaderStyles>
  navItems: SiteHeaderNavItem[]
  showMenu: boolean
  openMobileNav: () => void
}

export const createSiteHeaderModel = (options: SiteHeaderOptions = {}) =>
  createModel((): SiteHeaderVM => {
    const mode = options.mode ?? 'home'

    return {
      mode,
      $scrolled: $docsHeaderScrolled,
      $scrollLocked: $docsHeaderScrollLockActive,
      headerStyles: () =>
        homeHeaderStyles({
          layout: mode,
          scrolled: $docsHeaderScrolled.value(),
          scrollLocked: $docsHeaderScrollLockActive.value(),
        }),
      navItems: buildSiteHeaderNavItems(),
      showMenu: true,
      openMobileNav: mode === 'docs' ? toggleMobileNav : toggleHomeNav,
    }
  }, 'SiteHeaderModel')
