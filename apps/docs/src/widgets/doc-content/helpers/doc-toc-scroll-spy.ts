import type { DocTocEntry } from '@core/content/extract-toc'

/** Matches `scroll-mt-28` on doc headings plus sticky header clearance. */
const SCROLL_OFFSET = 120

const headingTop = (el: HTMLElement): number =>
  el.getBoundingClientRect().top + window.scrollY

const resolveActiveId = (entries: DocTocEntry[]): string => {
  const scrollY = window.scrollY + SCROLL_OFFSET
  let activeId = entries[0]?.id ?? ''

  for (const entry of entries) {
    const el = document.getElementById(entry.id)
    if (el && headingTop(el) <= scrollY) activeId = entry.id
  }

  return activeId
}

export const bindDocTocScrollSpy = (
  entries: DocTocEntry[],
  onActiveChange: (id: string) => void
): (() => void) => {
  if (entries.length === 0) return () => undefined

  const sync = (): void => onActiveChange(resolveActiveId(entries))

  const onHashChange = (): void => {
    const hash = location.hash.slice(1)
    if (hash && entries.some((entry) => entry.id === hash)) {
      onActiveChange(hash)
      return
    }
    sync()
  }

  const raf = requestAnimationFrame(() => {
    onHashChange()
    sync()
  })

  window.addEventListener('scroll', sync, { passive: true })
  window.addEventListener('hashchange', onHashChange)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', sync)
    window.removeEventListener('hashchange', onHashChange)
  }
}

let activePageKey: string | null = null
let activeDispose: (() => void) | null = null

/** One active spy per docs page — replaces the previous listener on navigation. */
export const attachDocTocScrollSpy = (
  pageKey: string,
  entries: DocTocEntry[],
  onActiveChange: (id: string) => void
): void => {
  if (activePageKey === pageKey && activeDispose) return

  activeDispose?.()
  activeDispose = null
  activePageKey = pageKey

  if (entries.length === 0) return

  activeDispose = bindDocTocScrollSpy(entries, onActiveChange)
}
