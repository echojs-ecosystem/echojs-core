import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import {
  button,
  div,
  h1,
  h2,
  h3,
  h4,
  hr,
  li,
  ol,
  p,
  span,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
  ul,
} from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/framework/reactivity'

import { CodeBlock } from '@widgets/code-block'
import {
  calloutStyles,
  docHeadingStyles,
  docStyles,
  tabButtonStyles,
} from '@widgets/doc-content/doc-renderer.styles.js'
import { PackageInstallAdd } from '@widgets/package-install'
import { PackageOverview } from '@widgets/package-overview'
import { PackagePlayground } from '@widgets/package-playground'
import {
  calloutDefaultTitle,
  calloutIcon,
  type CalloutVariant,
} from '@core/content/callout-variants.js'
import { getPackageVersion } from '@core/content/ecosystem-version.generated.js'
import { renderInlineMarkdown } from '@core/content/inline-markdown.js'
import type { DocBlock, DocDocument } from '@core/content/types.js'

const docUi = docStyles()

const inlineOpts = () => ({
  linkClass: docUi.proseLink(),
  codeClass: docUi.inlineCode(),
})

const inline = (text: string): Child[] =>
  renderInlineMarkdown(text, inlineOpts())

const COMPACT_CALLOUT_VARIANTS = new Set<CalloutVariant>([
  'tip',
  'warning',
  'danger',
  'recommendation',
])

const Callout = (block: Extract<DocBlock, { type: 'callout' }>): Child => {
  const variant = block.variant as CalloutVariant
  const isCompact = !block.title && COMPACT_CALLOUT_VARIANTS.has(variant)
  const callout = calloutStyles({ variant, compact: isCompact })
  const title = block.title ?? calloutDefaultTitle[variant]
  const bodyChunks = block.body
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  if (isCompact) {
    return div(
      { class: callout.root() },
      bodyChunks.map((chunk) => p({ class: callout.body() }, inline(chunk)))
    )
  }

  return div({ class: callout.root() }, [
    div({ class: callout.header() }, [
      span({ class: callout.icon() }, calloutIcon[variant]),
      div({ class: callout.headerText() }, [
        p({ class: callout.title() }, inline(title)),
      ]),
    ]),
    ...bodyChunks.map((chunk) => p({ class: callout.body() }, inline(chunk))),
  ])
}

const DocTabs = (block: Extract<DocBlock, { type: 'tabs' }>): Child => {
  const $active = signal(0)
  return div({ class: docUi.tabs() }, [
    div(
      { class: docUi.tabsList() },
      block.items.map((tab, index) =>
        button(
          {
            type: 'button',
            class: () => tabButtonStyles({ active: $active.value() === index }),
            onClick: () => $active.set(index),
          },
          tab.label
        )
      )
    ),
    div({ class: docUi.tabsPanel() }, () =>
      renderBlocks(block.items[$active.value()]?.blocks ?? [])
    ),
  ])
}

const renderBlock = (block: DocBlock): Child => {
  switch (block.type) {
    case 'heading': {
      const Tag =
        block.level === 1
          ? h1
          : block.level === 2
            ? h2
            : block.level === 3
              ? h3
              : h4
      return Tag(
        { id: block.id, class: docHeadingStyles({ level: block.level }) },
        inline(block.text)
      )
    }
    case 'paragraph':
      return p({ class: docUi.paragraph() }, inline(block.text))
    case 'hr':
      return hr({ class: docUi.hr() })
    case 'code':
      return CodeBlock({ language: block.language, code: block.value })
    case 'callout':
      return Callout(block)
    case 'tabs':
      return DocTabs(block)
    case 'package-badge': {
      const version = getPackageVersion(block.name)
      const label = version ? `${block.name}@${version}` : block.name
      return div({ class: docUi.badge() }, label)
    }
    case 'package-install':
      return div(
        { class: docUi.packageInstall() },
        PackageInstallAdd(block.packageName)
      )
    case 'playground':
      return PackagePlayground({ packageId: block.packageId })
    case 'package-overview':
      return PackageOverview({ packageId: block.packageId })
    case 'table':
      return div({ class: docUi.tableWrap() }, [
        table({ class: docUi.table() }, [
          thead({ class: docUi.tableHead() }, [
            tr(
              null,
              block.headers.map((h) => th({ class: docUi.th() }, inline(h)))
            ),
          ]),
          tbody(
            null,
            block.rows.map((row) =>
              tr(
                { class: docUi.tr() },
                row.map((cell) => td({ class: docUi.td() }, inline(cell)))
              )
            )
          ),
        ]),
      ])
    case 'list': {
      const Tag = block.ordered ? ol : ul
      return Tag(
        { class: block.ordered ? docUi.orderedList() : docUi.list() },
        block.items.map((item) => li(null, inline(item)))
      )
    }
    default:
      return null
  }
}

export const renderBlocks = (blocks: DocBlock[]): Child[] =>
  blocks.map(renderBlock)

export const DocRenderer = (document: DocDocument): Child => {
  const hasPackageOverview = document.blocks.some(
    (b) => b.type === 'package-overview'
  )

  return div({ class: docUi.prose() }, [
    hasPackageOverview
      ? null
      : h1(
          { id: 'page-title', class: docUi.title() },
          document.frontmatter.title
        ),
    document.frontmatter.description
      ? p({ class: docUi.lead() }, inline(document.frontmatter.description))
      : null,
    ...renderBlocks(document.blocks),
  ])
}
