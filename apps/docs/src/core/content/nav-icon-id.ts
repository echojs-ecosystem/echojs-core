/** Line icons for docs sidebar (Hero UI–style). */
export type NavIconId =
  | 'home'
  | 'book'
  | 'sparkles'
  | 'lightbulb'
  | 'compass'
  | 'rocket'
  | 'download'
  | 'app-window'
  | 'folder-tree'
  | 'layers'
  | 'puzzle'
  | 'plug'
  | 'box'
  | 'git-branch'
  | 'scale'
  | 'route'
  | 'database'
  | 'form'
  | 'shield'
  | 'globe'
  | 'megaphone'
  | 'layout-grid'
  | 'code'
  | 'api'
  | 'package'
  | 'zap'
  | 'link'
  | 'save'
  | 'palette'
  | 'wrench'
  | 'bot'
  | 'file-text'
  | 'terminal'
  | 'folder'
  | 'roadmap'
  | 'newspaper'
  | 'list'
  | 'play'
  | 'heart'
  | 'github'
  | 'external'
  | 'chevron-right'
  | 'store'
  | 'refresh'
  | 'toolbox'
  | 'fw-react'
  | 'fw-vue'
  | 'fw-angular'
  | 'fw-solid'
  | 'fw-svelte'

export const NAV_ICON_IDS = [
  'home',
  'book',
  'sparkles',
  'lightbulb',
  'compass',
  'rocket',
  'download',
  'app-window',
  'folder-tree',
  'layers',
  'puzzle',
  'plug',
  'box',
  'git-branch',
  'scale',
  'route',
  'database',
  'form',
  'shield',
  'globe',
  'megaphone',
  'layout-grid',
  'code',
  'api',
  'package',
  'zap',
  'link',
  'save',
  'palette',
  'wrench',
  'bot',
  'file-text',
  'terminal',
  'folder',
  'roadmap',
  'newspaper',
  'list',
  'play',
  'heart',
  'github',
  'external',
  'chevron-right',
  'store',
  'refresh',
  'toolbox',
  'fw-react',
  'fw-vue',
  'fw-angular',
  'fw-solid',
  'fw-svelte',
] as const satisfies readonly NavIconId[]

export const isNavIconId = (value: string): value is NavIconId =>
  (NAV_ICON_IDS as readonly string[]).includes(value)
