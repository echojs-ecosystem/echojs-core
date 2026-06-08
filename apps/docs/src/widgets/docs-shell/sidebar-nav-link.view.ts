import {
  type Child,
  createView,
  h,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AnyPage } from '@echojs-ecosystem/framework/router'

import {
  navLinkStyles,
  shellStyles,
} from '@widgets/docs-shell/docs-shell.styles'
import { NavIcon } from '@widgets/icons'
import type { NavIconId } from '@core/content/nav-icon-id'
import { cn } from '@core/styles/cn'

const shell = shellStyles()

export type SidebarNavLinkProps = {
  label: string
  icon?: NavIconId
  /** Optional override (e.g. framework brand colors on comparison links). */
  iconClassName?: string
  badge?: string
  external?: boolean
} & ({ page: AnyPage; match?: 'exact' | 'partial' } | { href: string })

const linkInner = (props: SidebarNavLinkProps): Child[] => [
  props.icon
    ? NavIcon(props.icon, cn(shell.sidebarNavIcon(), props.iconClassName))
    : null,
  span({ class: shell.sidebarNavLabel() }, props.label),
  props.badge ? span({ class: shell.sidebarNavBadge() }, props.badge) : null,
  props.external ? NavIcon('external', shell.sidebarNavExternal()) : null,
]

export const SidebarNavLinkView = createView(
  (props: SidebarNavLinkProps): Child => {
    const withIcon = Boolean(props.icon)

    if ('href' in props) {
      return h(
        'a',
        {
          href: props.href,
          target: props.external ? '_blank' : undefined,
          rel: props.external ? 'noopener noreferrer' : undefined,
          class: [shell.sidebarExternalLink(), 'group'].join(' '),
        },
        linkInner(props)
      )
    }

    return NavLink({
      to: props.page,
      match: props.match,
      activeClass: navLinkStyles({ active: true, withIcon }),
      class: navLinkStyles({ withIcon }),
      children: linkInner(props),
    })
  },
  'SidebarNavLinkView'
)
