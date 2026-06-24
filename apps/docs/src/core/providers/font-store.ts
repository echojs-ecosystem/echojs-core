import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

export type DocsFontFamily =
  | 'inter'
  | 'dm-sans'
  | 'plus-jakarta'
  | 'manrope'
  | 'outfit'
  | 'ibm-plex'
  | 'source-sans'
  | 'space-grotesk'
  | 'sora'
  | 'nunito-sans'
  | 'figtree'
  | 'lexend'
  | 'rubik'
  | 'work-sans'
  | 'public-sans'
  | 'urbanist'
  | 'onest'
  | 'instrument-sans'
  | 'albert-sans'
  | 'geologica'

export type DocsFontOption = {
  id: DocsFontFamily
  label: string
  /** Value for inline `font-family` previews. */
  stack: string
}

export const DOCS_FONT_OPTIONS: readonly DocsFontOption[] = [
  {
    id: 'inter',
    label: 'Inter',
    stack: "'Inter', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'dm-sans',
    label: 'DM Sans',
    stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'plus-jakarta',
    label: 'Plus Jakarta Sans',
    stack: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'manrope',
    label: 'Manrope',
    stack: "'Manrope', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'outfit',
    label: 'Outfit',
    stack: "'Outfit', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'ibm-plex',
    label: 'IBM Plex Sans',
    stack: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'source-sans',
    label: 'Source Sans 3',
    stack: "'Source Sans 3', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'space-grotesk',
    label: 'Space Grotesk',
    stack: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'sora',
    label: 'Sora',
    stack: "'Sora', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'nunito-sans',
    label: 'Nunito Sans',
    stack: "'Nunito Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'figtree',
    label: 'Figtree',
    stack: "'Figtree', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'lexend',
    label: 'Lexend',
    stack: "'Lexend', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'rubik',
    label: 'Rubik',
    stack: "'Rubik', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'work-sans',
    label: 'Work Sans',
    stack: "'Work Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'public-sans',
    label: 'Public Sans',
    stack: "'Public Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'urbanist',
    label: 'Urbanist',
    stack: "'Urbanist', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'onest',
    label: 'Onest',
    stack: "'Onest', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'instrument-sans',
    label: 'Instrument Sans',
    stack: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'albert-sans',
    label: 'Albert Sans',
    stack: "'Albert Sans', ui-sans-serif, system-ui, sans-serif",
  },
  {
    id: 'geologica',
    label: 'Geologica',
    stack: "'Geologica', ui-sans-serif, system-ui, sans-serif",
  },
] as const

const STORAGE_KEY = 'echojs-docs-font'

export const $docsFontFamily = signal<DocsFontFamily>('inter')

const applyFont = (font: DocsFontFamily): void => {
  if (font === 'inter') {
    delete document.documentElement.dataset.font
    return
  }
  document.documentElement.dataset.font = font
}

export const initDocsFont = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY) as DocsFontFamily | null
  if (stored && DOCS_FONT_OPTIONS.some((option) => option.id === stored)) {
    $docsFontFamily.set(stored)
  }

  effect(() => {
    applyFont($docsFontFamily.value())
  })
}

export const setDocsFontFamily = (font: DocsFontFamily): void => {
  $docsFontFamily.set(font)
  localStorage.setItem(STORAGE_KEY, font)
}

export const docsFontStack = (font: DocsFontFamily): string =>
  DOCS_FONT_OPTIONS.find((option) => option.id === font)?.stack ??
  DOCS_FONT_OPTIONS[0]!.stack
