import {
  type Child,
  createView,
  div,
  h,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { changelogPage } from '@app/router'
import { NavIcon } from '@widgets/icons'
import { getPackageOverview } from '@widgets/package-overview/constants/package-overview.data'
import {
  ECHOJS_GITHUB_REPO,
  ECHOJS_ISSUES_URL,
  npmPackageUrl,
} from '@widgets/package-overview/constants/package-meta'
import { packageAsideStyles } from '@widgets/package-overview/ui/package-overview.view.styles'

const ui = packageAsideStyles()

export type PackageAsideViewProps = {
  packageId: string
  npmPackage?: string
}

const AsideLink = (props: {
  href: string
  icon: 'github' | 'external' | 'file-text' | 'package'
  label: string
  external?: boolean
}): Child =>
  h(
    'a',
    {
      href: props.href,
      class: ui.link(),
      ...(props.external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}),
    },
    [
      span({ class: ui.linkIcon() }, NavIcon(props.icon, 'h-full w-full')),
      span(null, props.label),
    ]
  )

export const PackageAsideView = createView(
  (props: PackageAsideViewProps): Child => {
    const data = getPackageOverview(props.packageId)
    const npmPackage = props.npmPackage ?? data?.npmPackage

    if (!npmPackage) return null

    return div({ class: ui.root() }, [
      div({ class: ui.section() }, [
        p({ class: ui.title() }, 'Resources'),
        div({ class: ui.linkList() }, [
          AsideLink({
            href: ECHOJS_GITHUB_REPO,
            icon: 'github',
            label: 'Repository',
            external: true,
          }),
          AsideLink({
            href: ECHOJS_ISSUES_URL,
            icon: 'external',
            label: 'Report issue',
            external: true,
          }),
          NavLink({
            to: changelogPage,
            class: ui.link(),
            children: [
              span({ class: ui.linkIcon() }, NavIcon('file-text', 'h-full w-full')),
              span(null, 'Changelog'),
            ],
          }),
          AsideLink({
            href: npmPackageUrl(npmPackage),
            icon: 'package',
            label: 'View on npm',
            external: true,
          }),
        ]),
      ]),
    ])
  },
  'PackageAsideView'
)
