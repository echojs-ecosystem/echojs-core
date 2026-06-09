import { effect } from '@echojs-ecosystem/framework/reactivity'

import {
  $docsHeaderScrollLockActive,
  syncDocsHeaderScrolled,
} from '@app/docs-header-scroll'
import { appRouter } from '@app/router/router'
import {
  $mobileNavOpen,
  closeMobileNav,
} from '@widgets/docs-shell/model/mobile-nav'
import { $mobileSearchOpen } from '@widgets/search/model/docs-search.model'
import {
  $homeNavOpen,
  closeHomeNav,
} from '@widgets/site-header/model/home-mobile-nav'

let lockCount = 0
let savedScrollY = 0

/** `overflow-hidden` on `html`/`body` breaks `position: sticky` after scroll. */
const lockBodyScroll = (): void => {
  savedScrollY = window.scrollY
  $docsHeaderScrollLockActive.set(true)
  const { body, documentElement: html } = document

  body.style.position = 'fixed'
  body.style.top = `-${savedScrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'

  html.style.scrollBehavior = 'auto'
}

const unlockBodyScroll = (): void => {
  const { body, documentElement: html } = document

  body.style.position = ''
  body.style.top = ''
  body.style.left = ''
  body.style.right = ''
  body.style.width = ''

  html.style.scrollBehavior = ''
  $docsHeaderScrollLockActive.set(false)
  window.scrollTo(0, savedScrollY)
  syncDocsHeaderScrolled()
}

const setLocked = (locked: boolean): void => {
  if (typeof document === 'undefined') return

  if (locked) {
    lockCount += 1
    if (lockCount === 1) {
      lockBodyScroll()
    }
    return
  }

  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    unlockBodyScroll()
  }
}

/** Keeps the page from scrolling while mobile overlays are open. */
export const bindMobileScrollLock = (): void => {
  effect(() => {
    const locked =
      $mobileNavOpen.value() ||
      $homeNavOpen.value() ||
      $mobileSearchOpen.value()
    setLocked(locked)
  })
}

/** Close drawer menus after SPA navigation (NavLink uses programmatic routing). */
export const bindMobileNavCloseOnNavigate = (): void => {
  effect(() => {
    appRouter.$path.value()
    closeMobileNav()
    closeHomeNav()
  })
}
