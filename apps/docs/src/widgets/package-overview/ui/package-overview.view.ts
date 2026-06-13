import {
  type Child,
  createView,
  div,
  h2,
  h3,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { getPackageVersion } from '@core/content/ecosystem-version.generated'
import { isNavIconId, type NavIconId } from '@core/content/nav-icon-id'
import { resolvePackageGroupIcon } from '@core/content/resolve-nav-icon'
import { CodeBlock } from '@widgets/code-block'
import { NavIcon } from '@widgets/icons'
import {
  getPackageOverview,
  type PackageOverviewData,
} from '@widgets/package-overview/constants/package-overview.data'
import {
  ECHOJS_LICENSE,
  ECHOJS_MIN_VERSION,
  NODE_MIN_VERSION,
} from '@widgets/package-overview/constants/package-meta'
import { packageOverviewStyles } from '@widgets/package-overview/ui/package-overview.view.styles'

const ui = packageOverviewStyles()

export type PackageOverviewViewProps = { packageId: string }

const OverviewIcon = (props: {
  icon: NavIconId | string
  wrapClass?: string
  glyphClass: string
}): Child => {
  const glyph = isNavIconId(props.icon) ? (
    NavIcon(props.icon, props.glyphClass)
  ) : (
    span({ class: 'text-base font-semibold' }, props.icon)
  )
  return props.wrapClass ? span({ class: props.wrapClass }, glyph) : glyph
}

const Stat = (props: { label: string; value: string }): Child =>
  div({ class: ui.statCell() }, [
    p({ class: ui.statLabel() }, props.label),
    p({ class: ui.statValue() }, props.value),
  ])

const ListSection = (props: { title: string; items: string[] }): Child | null =>
  props.items.length === 0
    ? null
    : div({ class: ui.section() }, [
        h3({ class: ui.sectionTitle() }, props.title),
        div(
          { class: ui.list() },
          props.items.map((item) =>
            div({ class: ui.listItem() }, [
              span({ class: ui.listBullet() }),
              span(null, item),
            ])
          )
        ),
      ])

const OverviewBody = (data: PackageOverviewData): Child => {
  const version = getPackageVersion(data.npmPackage)
  const heroIconId = isNavIconId(data.icon)
    ? data.icon
    : resolvePackageGroupIcon(data.id)
  const isOfficial = data.id === 'framework'
  const seeAlso = data.learnPath.slice(0, 4)

  return div({ class: ui.root() }, [
    div({ class: ui.hero() }, [
      div({ class: ui.heroTop() }, [
        div({ class: ui.heroIconBox() }, [
          OverviewIcon({ icon: heroIconId, glyphClass: ui.heroIconGlyph() }),
        ]),
        div({ class: ui.heroMain() }, [
          div({ class: ui.badgeRow() }, [
            isOfficial
              ? span({ class: ui.badgeOfficial() }, 'Official')
              : null,
            version
              ? span({ class: ui.badgeAccent() }, `v${version}`)
              : null,
            span({ class: ui.badge() }, ECHOJS_LICENSE),
            span({ class: ui.badge() }, `echojs >=${ECHOJS_MIN_VERSION}`),
            span({ class: ui.badge() }, `node ${NODE_MIN_VERSION}`),
          ]),
          h2({ id: 'page-title', class: ui.packageName() }, data.npmPackage),
          data.heroTitle
            ? p({ class: ui.tagline() }, data.heroTitle)
            : p({ class: ui.tagline() }, data.tagline),
          p({ class: ui.description() }, data.summary),
        ]),
      ]),

      div({ class: ui.statsBar() }, [
        Stat({
          label: 'Version',
          value: version ? `v${version}` : '—',
        }),
        Stat({ label: 'License', value: ECHOJS_LICENSE }),
        Stat({ label: 'EchoJS', value: `>=${ECHOJS_MIN_VERSION}` }),
        Stat({ label: 'Node', value: NODE_MIN_VERSION }),
      ]),
    ]),

    div({ class: ui.body() }, [
      data.codeExample
        ? div({ class: ui.section() }, [
            h2({ class: ui.sectionTitle() }, 'Example'),
            p({ class: ui.sectionLead() }, data.codeExample.title),
            div({ class: ui.codeWrap() }, [
              CodeBlock({
                language: data.codeExample.language,
                code: data.codeExample.code,
              }),
            ]),
          ])
        : null,

      data.pillars.length > 0
        ? div({ class: ui.section() }, [
            h2({ class: ui.sectionTitle() }, 'Core concepts'),
            div(
              { class: ui.pillarGrid() },
              data.pillars.map((pillar) =>
                div({ class: ui.pillarCard() }, [
                  OverviewIcon({
                    icon: pillar.icon,
                    wrapClass: ui.iconWrapSm(),
                    glyphClass: ui.iconGlyphSm(),
                  }),
                  h3({ class: ui.pillarTitle() }, pillar.title),
                  p({ class: ui.pillarBody() }, pillar.body),
                ])
              )
            ),
          ])
        : null,

      data.whenToUse.length > 0 || data.whenNot.length > 0
        ? div({ class: ui.twoCol() }, [
            ListSection({ title: 'Use when', items: data.whenToUse }),
            ListSection({
              title: 'Reach for something else',
              items: data.whenNot,
            }),
          ])
        : null,

      data.dependsOn.length > 0 || data.powers.length > 0
        ? div({ class: ui.section() }, [
            data.dependsOn.length > 0
              ? div(null, [
                  h3({ class: ui.sectionTitle() }, 'Depends on'),
                  div(
                    { class: ui.metaRow() },
                    data.dependsOn.map((dep) =>
                      span({ class: ui.metaPill() }, dep)
                    )
                  ),
                ])
              : null,
            data.powers.length > 0
              ? div({ class: data.dependsOn.length > 0 ? 'mt-4' : undefined }, [
                  h3({ class: ui.sectionTitle() }, 'Often paired with'),
                  div(
                    { class: ui.metaRow() },
                    data.powers.map((pkg) =>
                      span(
                        { class: ui.metaPill() },
                        `@echojs-ecosystem/${pkg}`
                      )
                    )
                  ),
                ])
              : null,
          ])
        : null,

      seeAlso.length > 0
        ? div({ class: ui.section() }, [
            h2({ class: ui.sectionTitle() }, 'See also'),
            div(
              { class: ui.seeAlsoGrid() },
              seeAlso.map((item) =>
                NavLink({
                  to: docPageByContentId[item.contentId]!,
                  class: ui.seeAlsoCard(),
                  children: [
                    p({ class: ui.seeAlsoTitle() }, item.title),
                    p({ class: ui.seeAlsoDesc() }, item.description),
                    span({ class: ui.seeAlsoLink() }, [
                      'Open guide',
                      NavIcon('chevron-right', 'h-3.5 w-3.5'),
                    ]),
                  ],
                })
              )
            ),
          ])
        : null,
    ]),
  ])
}

export const PackageOverviewView = createView(
  (props: PackageOverviewViewProps): Child => {
    const data = getPackageOverview(props.packageId)
    if (!data) {
      return p(
        { class: 'text-sm text-fg-muted' },
        `Unknown package overview: ${props.packageId}`
      )
    }
    return OverviewBody(data)
  },
  'PackageOverviewView'
)
