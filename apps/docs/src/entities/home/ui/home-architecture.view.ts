import {
  button,
  type Child,
  createView,
  div,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { CodeBlock } from '@widgets/code-block'
import { MenuIcon } from '@widgets/icons'
import {
  structurePanelById,
  structureTree,
  type StructureTreeNode,
} from '@entities/home/constants/home-structure.data'
import { codeDots } from '@entities/home/helpers/code-dots'
import type { HomeVM } from '@entities/home/types/home.types'
import { homeArchitectureStyles } from '@entities/home/ui/home-architecture.view.styles'
import { cn } from '@core/styles/cn'

const home = homeArchitectureStyles()

const fileIconVariant = (
  name: string
): 'ts' | 'test' | 'json' | 'config' | 'html' => {
  if (name.endsWith('.html')) return 'html'
  if (name.endsWith('.test.ts')) return 'test'
  if (name.endsWith('.json')) return 'json'
  if (name.includes('config')) return 'config'
  return 'ts'
}

const fileIconLabel = (name: string, variant: ReturnType<typeof fileIconVariant>): string => {
  if (variant === 'json') return '{}'
  if (variant === 'html') return '<>'
  return 'TS'
}

const FileIcon = (name: string): Child => {
  const variant = fileIconVariant(name)
  return span({ class: home.fileIcon({ variant }) }, fileIconLabel(name, variant))
}

const StructureTreeNodeView = (node: StructureTreeNode, vm: HomeVM): Child[] => {
  if (node.kind === 'file') {
    const isSelected = () => vm.selectedStructureNodeId() === node.id

    return [
      button(
        {
          type: 'button',
          class: () =>
            cn(
              home.treeRow(),
              home.treeRowFile(),
              isSelected() && home.treeRowActive()
            ),
          onClick: () =>
            vm.openStructureFile(node.id, { closeExplorer: true }),
        },
        [
          span({ class: home.treeChevronSpacer() }),
          FileIcon(node.name),
          span({ class: home.treeName() }, node.name),
        ]
      ),
    ]
  }

  const isExpanded = () => vm.isFolderExpanded(node.id)
  const isRoot = node.id === 'root'

  return [
    button(
      {
        type: 'button',
        class: () =>
          cn(
            home.treeRow(),
            home.treeRowFolder(),
            isExpanded() && home.treeRowFolderOpen()
          ),
        onClick: () => vm.toggleFolder(node.id),
      },
      [
        span(
          { class: () => home.treeChevron({ expanded: isExpanded() }) },
          () => (isExpanded() ? '⌄' : '›')
        ),
        span(
          { class: () => home.folderIcon({ open: isExpanded() }) },
          () => (isExpanded() ? '▣' : '▢')
        ),
        span({ class: home.treeName({ root: isRoot }) }, node.name),
      ]
    ),
    Show(
      () => isExpanded(),
      () =>
        div(
          { class: home.treeChildren() },
          node.children?.flatMap((child) => StructureTreeNodeView(child, vm)) ??
            null
        )
    ),
  ]
}

const IdeWindowChrome = (vm: HomeVM): Child =>
  div({ class: home.windowChrome() }, [
    div({ class: home.windowDots() }, codeDots()),
    button(
      {
        type: 'button',
        class: () =>
          cn(
            home.explorerToggle(),
            vm.isExplorerOpen() && home.explorerToggleActive()
          ),
        onClick: vm.toggleExplorer,
        'aria-expanded': () => vm.isExplorerOpen(),
        'aria-label': 'Toggle file explorer',
      },
      [MenuIcon()]
    ),
    span({ class: home.windowTitle() }, 'echojs-app'),
    () => {
      const panel = vm.activeStructurePanel()
      const dir = panel.file.includes('/')
        ? panel.file.slice(0, panel.file.lastIndexOf('/'))
        : panel.file
      return span({ class: home.windowPath() }, dir)
    },
  ])

const StructureExplorerPanel = (vm: HomeVM): Child =>
  div({ class: home.explorerPanel() }, [
    div({ class: home.explorerHead() }, [
      span({ class: home.explorerTitle() }, 'Explorer'),
      NavLink({
        to: docPageByContentId['getting-started/project-structure']!,
        class: home.explorerLink(),
        children: ['Layout guide', span(null, '→')],
      }),
    ]),
    div(
      { class: home.tree() },
      structureTree.flatMap((node) => StructureTreeNodeView(node, vm))
    ),
  ])

const StructureExplorerAccordion = (vm: HomeVM): Child =>
  div(
    {
      class: () =>
        cn(
          home.explorerAccordion(),
          vm.isExplorerOpen() && home.explorerAccordionOpen()
        ),
    },
    div({ class: home.explorerAccordionInner() }, StructureExplorerPanel(vm))
  )

const StructureExplorerDesktop = (vm: HomeVM): Child =>
  div({ class: home.explorerDesktop() }, StructureExplorerPanel(vm))

const EditorTabs = (vm: HomeVM): Child =>
  div(
    { class: home.editorTabs() },
    () =>
      vm.openStructureTabs().map((tabId) => {
        const panel = structurePanelById[tabId]
        if (!panel) return null

        const isActive = () => vm.selectedStructureNodeId() === tabId
        const shortName = panel.file.split('/').pop() ?? panel.file

        return button(
          {
            type: 'button',
            class: () =>
              cn(home.editorTab(), isActive() && home.editorTabActive()),
            onClick: () => vm.openStructureFile(tabId),
          },
          [
            FileIcon(shortName),
            span({ class: home.editorTabLabel() }, shortName),
            span(
              {
                class: home.editorTabClose(),
                onClick: (event: MouseEvent) => {
                  event.stopPropagation()
                  vm.closeStructureTab(tabId)
                },
              },
              '×'
            ),
          ]
        )
      })
  )

const Breadcrumb = (filePath: string): Child => {
  const parts = filePath.split('/').filter(Boolean)
  return div({ class: home.editorBreadcrumb() }, [
    ...parts.flatMap((part, index) => {
      const isLast = index === parts.length - 1
      return [
        isLast
          ? span({ class: home.editorBreadcrumbActive() }, part)
          : span(null, part),
        isLast ? null : span({ class: home.editorBreadcrumbSep() }, '/'),
      ]
    }),
  ])
}

const StructureCodeEditor = (vm: HomeVM): Child =>
  div({ class: home.editor() }, [
    EditorTabs(vm),
    () => {
      const panel = vm.activeStructurePanel()
      return div({ class: home.editorContent() }, [
        Breadcrumb(panel.file),
        div({ class: home.editorBody() }, [
          CodeBlock({ language: panel.lang, code: panel.code, bare: true }),
        ]),
      ])
    },
  ])

export const HomeArchitectureView = createView(
  (vm: HomeVM): Child =>
    div({ class: home.ide() }, [
      IdeWindowChrome(vm),
      div({ class: home.workspace() }, [
        StructureExplorerAccordion(vm),
        StructureExplorerDesktop(vm),
        StructureCodeEditor(vm),
      ]),
      div({ class: home.statusBar() }, [
        () => {
          const panel = vm.activeStructurePanel()
          return [
            span(null, panel.badge),
            span({ class: home.statusBarSep() }, '·'),
            span(null, 'UTF-8'),
            span({ class: home.statusBarSep() }, '·'),
            span({ class: 'hidden truncate sm:inline' }, panel.caption),
            span({ class: home.statusBarSep() }, '·'),
            span(null, 'EchoJS'),
          ]
        },
      ]),
    ]),
  'HomeArchitectureView'
)
