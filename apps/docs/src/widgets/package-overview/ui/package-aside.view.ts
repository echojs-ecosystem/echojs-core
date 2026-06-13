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
import { getPackageVersion } from '@core/content/ecosystem-version.generated'
import { NavIcon } from '@widgets/icons'
import { getPackageOverview } from '@widgets/package-overview/constants/package-overview.data'
import {
  ECHOJS_GITHUB_REPO,
  ECHOJS_ISSUES_URL,
  ECHOJS_LICENSE,
  ECHOJS_MIN_VERSION,
  NODE_MIN_VERSION,
  npmPackageUrl,
} from '@widgets/package-overview/constants/package-meta'
import { packageAsideStyles } from '@widgets/package-overview/ui/package-overview.view.styles'

const ui = packageAsideStyles()

export type PackageAsideViewProps = {
  packageId: string
  keywords?: string[]
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

const AsideSection = (props: {
  title: string
  children: Child
}): Child =>
  div({ class: ui.section() }, [
    p({ class: ui.title() }, props.title),
    props.children,
  ])

export const PackageAsideView = createView(
  (props: PackageAsideViewProps): Child => {
    const data = getPackageOverview(props.packageId)
    const npmPackage = props.npmPackage ?? data?.npmPackage
    const version = npmPackage ? getPackageVersion(npmPackage) : undefined
    const tags = props.keywords?.length
      ? props.keywords
      : (data?.pills ?? [])

    if (!npmPackage) return null

    return div({ class: ui.root() }, [
      AsideSection({
        title: 'Resources',
        children: div({ class: ui.linkList() }, [
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
      }),

      tags.length > 0
        ? AsideSection({
            title: 'Tags',
            children: div(
              { class: ui.tagRow() },
              tags.map((tag) => span({ class: ui.tag() }, tag))
            ),
          })
        : null,

      AsideSection({
        title: 'Details',
        children: div({ class: ui.detailList() }, [
          div({ class: ui.detailRow() }, [
            span({ class: ui.detailLabel() }, 'Version'),
            span({ class: ui.detailValue() }, version ?? '—'),
          ]),
          div({ class: ui.detailRow() }, [
            span({ class: ui.detailLabel() }, 'License'),
            span({ class: ui.detailValue() }, ECHOJS_LICENSE),
          ]),
          div({ class: ui.detailRow() }, [
            span({ class: ui.detailLabel() }, 'EchoJS'),
            span({ class: ui.detailValue() }, `>=${ECHOJS_MIN_VERSION}`),
          ]),
          div({ class: ui.detailRow() }, [
            span({ class: ui.detailLabel() }, 'Node'),
            span({ class: ui.detailValue() }, NODE_MIN_VERSION),
          ]),
        ]),
      }),
    ])
  },
  'PackageAsideView'
)
