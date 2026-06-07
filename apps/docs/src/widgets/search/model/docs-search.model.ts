import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'
import type { Signal } from '@echojs-ecosystem/framework/reactivity'
import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { homePage } from '@app/router'
import {
  searchDocs,
  type SearchEntry,
} from '@widgets/search/helpers/search-index.js'

/** Shared with mobile scroll lock — one search instance per header. */
export const $mobileSearchOpen = signal(false)

export type DocsSearchVM = {
  $query: Signal<string>
  $open: Signal<boolean>
  $mobilePanel: Signal<boolean>
  results: () => SearchEntry[]
  pageForEntry: (entry: SearchEntry) => AnyPage | null
  onInput: (e: Event) => void
  onFocus: () => void
  onBlur: () => void
  showDropdown: () => boolean
  openMobilePanel: () => void
  closeMobilePanel: () => void
}

export const createDocsSearchModel = createModel((): DocsSearchVM => {
  const $query = signal('')
  const $open = signal(false)
  const $mobilePanel = $mobileSearchOpen

  const closeMobilePanel = (): void => {
    $mobilePanel.set(false)
    $open.set(false)
  }

  return {
    $query,
    $open,
    $mobilePanel,
    results: () => searchDocs($query.value()),
    pageForEntry: (entry) => {
      if (entry.id === 'home') return homePage
      return docPageByContentId[entry.id] ?? null
    },
    onInput: (e) => {
      const value = (e.target as HTMLInputElement).value
      $query.set(value)
      $open.set(value.length > 0)
    },
    onFocus: () => {
      if ($query.value().length > 0) $open.set(true)
    },
    onBlur: () => setTimeout(() => $open.set(false), 150),
    showDropdown: () => $open.value() && searchDocs($query.value()).length > 0,
    openMobilePanel: () => $mobilePanel.set(true),
    closeMobilePanel,
  }
}, 'DocsSearchModel')
