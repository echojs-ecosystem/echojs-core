import { signal } from '@echojs-ecosystem/framework/reactivity'

const SCROLL_THRESHOLD = 8

export const $docsHeaderScrolled = signal(false)

/** While mobile overlays lock body scroll, `window.scrollY` resets to 0. */
export const $docsHeaderScrollLockActive = signal(false)

let bound = false

export const syncDocsHeaderScrolled = (): void => {
  if ($docsHeaderScrollLockActive.value()) return
  $docsHeaderScrolled.set(window.scrollY > SCROLL_THRESHOLD)
}

export const bindDocsHeaderScroll = (): void => {
  if (bound || typeof window === 'undefined') return
  bound = true

  const onScroll = (): void => {
    syncDocsHeaderScrolled()
  }

  syncDocsHeaderScrolled()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scrollend', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
}
