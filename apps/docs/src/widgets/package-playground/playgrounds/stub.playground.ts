import { div, p } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import type { PackagePlaygroundDef, PlaygroundInstance } from '../types'
import { pg } from '../playground-ui'

export const createStubPlayground = (
  id: string,
  title: string,
  reason: string
): PackagePlaygroundDef => ({
  id,
  title,
  hint: reason,
  available: false,
  unavailableReason: reason,
  create: (): PlaygroundInstance => {
    const $snapshot = signal<Record<string, unknown>>({ available: false })
    return {
      $snapshot,
      view: () => div({ class: pg.unavailable() }, [p(null, reason)]),
    }
  },
})
