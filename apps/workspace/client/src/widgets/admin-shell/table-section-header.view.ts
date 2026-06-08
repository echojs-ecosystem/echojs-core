import { div, p, Show } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { adminLayoutStyles } from './admin-shell.styles'

const layout = adminLayoutStyles()

export type TableSectionHeaderProps = {
  title: Child
  count?: () => number
  createTo: AnyPage
  createLabel: () => string
  canCreate: () => boolean
}

export const TableSectionHeader = (props: TableSectionHeaderProps): Child =>
  div({ class: layout.tableCardHeader() }, [
    div([
      p({ class: layout.tableCardTitle() }, props.title),
      props.count
        ? p({ class: layout.muted() }, () => `${props.count?.() ?? 0} rows`)
        : null,
    ]),
    Show(
      props.canCreate,
      () =>
        NavLink({
          to: props.createTo,
          class: layout.btnPrimary(),
          children: props.createLabel,
        }),
    ),
  ])
