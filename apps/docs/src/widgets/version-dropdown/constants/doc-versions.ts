import { signal } from '@echojs-ecosystem/framework/reactivity'

import { DOC_VERSION_HISTORY } from '@core/content/doc-version-history.generated'
import { ECOSYSTEM_VERSION } from '@core/content/ecosystem-version.generated'

export type DocVersionEntry = {
  id: string
  label: string
  badge?: string
  /** When set, selecting navigates (versioned docs host or path prefix). */
  href?: string
  current?: boolean
  disabled?: boolean
}

const docVersionId = (() => {
  const [major = '0', minor = '0'] = ECOSYSTEM_VERSION.split('.')
  return `${major}.${minor}`
})()

export const DOC_VERSIONS: DocVersionEntry[] = [
  ...DOC_VERSION_HISTORY.map(
    (entry): DocVersionEntry => ({
      id: entry.id,
      label: entry.label,
      href: entry.href,
      disabled: entry.disabled,
      current: false,
    })
  ),
  {
    id: docVersionId,
    label: `v${ECOSYSTEM_VERSION}`,
    badge: 'Latest',
    current: true,
  },
]

const STORAGE_KEY = 'echojs-docs-version'

const initialVersion = (): string => {
  if (typeof window === 'undefined') return docVersionId
  const stored = localStorage.getItem(STORAGE_KEY)
  const valid = DOC_VERSIONS.find((v) => v.id === stored && !v.disabled)
  return valid?.id ?? DOC_VERSIONS.find((v) => v.current)?.id ?? docVersionId
}

export const $docVersionId = signal(initialVersion())

export const setDocVersionId = (id: string): void => {
  const entry = DOC_VERSIONS.find((v) => v.id === id)
  if (!entry || entry.disabled) return
  if (entry.href) {
    window.location.assign(entry.href)
    return
  }
  $docVersionId.set(id)
  localStorage.setItem(STORAGE_KEY, id)
}

export const currentDocVersion = (): DocVersionEntry =>
  DOC_VERSIONS.find((v) => v.id === $docVersionId.value()) ??
  DOC_VERSIONS.find((v) => v.current)!
