import { button, div, p, span } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'
import { mediaQuery } from '@echojs-ecosystem/utils/media-query'
import { toggle } from '@echojs-ecosystem/utils/toggle'
import { windowSize } from '@echojs-ecosystem/utils/window-size'

import type { PackagePlaygroundDef, PlaygroundInstance } from '../types'
import { pg } from '../playground-ui'

const create = (): PlaygroundInstance => {
  const size = windowSize()
  const dark = mediaQuery('(prefers-color-scheme: dark)')
  const panel = toggle(true)

  const $snapshot = signal<Record<string, unknown>>({})

  const refresh = () => {
    $snapshot.set({
      width: size.width(),
      height: size.height(),
      prefersDark: dark.matches(),
      panelOpen: panel.value(),
    })
  }

  refresh()
  const onResize = () => refresh()
  window.addEventListener('resize', onResize)

  return {
    $snapshot,
    dispose: () => {
      window.removeEventListener('resize', onResize)
      size.dispose()
      dark.dispose()
    },
    view: () => {
      refresh()
      return div(null, [
        p(
          { class: pg.hint() },
          'Resize the window — width/height update via windowSize.'
        ),
        div({ class: pg.metric() }, () => `${size.width()} × ${size.height()}`),
        p({ class: pg.row() }, () =>
          dark.matches() ? 'prefers-color-scheme: dark' : 'prefers-color-scheme: light'
        ),
        div({ class: pg.actions() }, [
          button(
            {
              class: pg.btnPrimary(),
              onClick: () => {
                panel.toggle()
                refresh()
              },
            },
            () => (panel.value() ? 'Panel: open' : 'Panel: closed')
          ),
          button(
            {
              class: pg.btn(),
              onClick: () => refresh(),
            },
            'Refresh snapshot'
          ),
        ]),
        p({ class: pg.row() }, [
          span(null, 'Signals: '),
          () => JSON.stringify($snapshot.value()),
        ]),
      ])
    },
  }
}

export const utilsPlayground: PackagePlaygroundDef = {
  id: 'utils',
  title: 'Utils composables',
  hint: 'Window size and media query — state panel shows live JSON.',
  available: true,
  create,
}
