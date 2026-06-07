import {
  type Child,
  createView,
  div,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import { routerStateStyles } from '@entities/router-states/ui/router-states.view.styles.js'

const state = routerStateStyles()

export const RouterLoadingView = createView(
  (_vm: void): Child =>
    div({ class: state.center() }, [p({ class: state.message() }, 'Loading…')]),
  'RouterLoadingView'
)
