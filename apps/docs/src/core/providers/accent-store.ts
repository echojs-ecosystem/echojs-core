import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

export type AccentPalette =
  | 'amber'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'violet'
  | 'purple'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'slate'
  | 'zinc'

export type AccentOption = {
  id: AccentPalette
  label: string
  /** Primary accent (500 step). */
  sample: string
  /** Multi-stop preview for picker swatches. */
  swatch: string
}

const accentSwatch = (...stops: string[]): string =>
  `linear-gradient(135deg, ${stops.join(', ')})`

export const ACCENT_OPTIONS: readonly AccentOption[] = [
  {
    id: 'amber',
    label: 'Amber',
    sample: '#f59e0b',
    swatch: accentSwatch('#fde68a', '#fbbf24', '#f59e0b', '#b45309', '#451a03'),
  },
  {
    id: 'yellow',
    label: 'Yellow',
    sample: '#eab308',
    swatch: accentSwatch('#fde047', '#facc15', '#eab308', '#a16207', '#422006'),
  },
  {
    id: 'orange',
    label: 'Orange',
    sample: '#f97316',
    swatch: accentSwatch('#fdba74', '#fb923c', '#f97316', '#c2410c', '#431407'),
  },
  {
    id: 'red',
    label: 'Red',
    sample: '#ef4444',
    swatch: accentSwatch('#fca5a5', '#f87171', '#ef4444', '#b91c1c', '#450a0a'),
  },
  {
    id: 'rose',
    label: 'Rose',
    sample: '#f43f5e',
    swatch: accentSwatch('#fda4af', '#fb7185', '#f43f5e', '#be123c', '#4c0519'),
  },
  {
    id: 'pink',
    label: 'Pink',
    sample: '#ec4899',
    swatch: accentSwatch('#f9a8d4', '#f472b6', '#ec4899', '#be185d', '#500724'),
  },
  {
    id: 'fuchsia',
    label: 'Fuchsia',
    sample: '#d946ef',
    swatch: accentSwatch('#f0abfc', '#e879f9', '#d946ef', '#a21caf', '#4a044e'),
  },
  {
    id: 'violet',
    label: 'Violet',
    sample: '#8b5cf6',
    swatch: accentSwatch('#c4b5fd', '#a78bfa', '#8b5cf6', '#6d28d9', '#2e1065'),
  },
  {
    id: 'purple',
    label: 'Purple',
    sample: '#a855f7',
    swatch: accentSwatch('#d8b4fe', '#c084fc', '#a855f7', '#7e22ce', '#3b0764'),
  },
  {
    id: 'indigo',
    label: 'Indigo',
    sample: '#6366f1',
    swatch: accentSwatch('#a5b4fc', '#818cf8', '#6366f1', '#4338ca', '#1e1b4b'),
  },
  {
    id: 'blue',
    label: 'Blue',
    sample: '#3b82f6',
    swatch: accentSwatch('#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8', '#172554'),
  },
  {
    id: 'sky',
    label: 'Sky',
    sample: '#0ea5e9',
    swatch: accentSwatch('#7dd3fc', '#38bdf8', '#0ea5e9', '#0369a1', '#082f49'),
  },
  {
    id: 'cyan',
    label: 'Cyan',
    sample: '#06b6d4',
    swatch: accentSwatch('#67e8f9', '#22d3ee', '#06b6d4', '#0e7490', '#083344'),
  },
  {
    id: 'teal',
    label: 'Teal',
    sample: '#14b8a6',
    swatch: accentSwatch('#5eead4', '#2dd4bf', '#14b8a6', '#0f766e', '#042f2e'),
  },
  {
    id: 'emerald',
    label: 'Emerald',
    sample: '#10b981',
    swatch: accentSwatch('#6ee7b7', '#34d399', '#10b981', '#047857', '#022c22'),
  },
  {
    id: 'green',
    label: 'Green',
    sample: '#22c55e',
    swatch: accentSwatch('#86efac', '#4ade80', '#22c55e', '#15803d', '#052e16'),
  },
  {
    id: 'lime',
    label: 'Lime',
    sample: '#84cc16',
    swatch: accentSwatch('#bef264', '#a3e635', '#84cc16', '#4d7c0f', '#1a2e05'),
  },
  {
    id: 'slate',
    label: 'Slate',
    sample: '#64748b',
    swatch: accentSwatch('#cbd5e1', '#94a3b8', '#64748b', '#334155', '#0f172a'),
  },
  {
    id: 'zinc',
    label: 'Zinc',
    sample: '#71717a',
    swatch: accentSwatch('#d4d4d8', '#a1a1aa', '#71717a', '#3f3f46', '#18181b'),
  },
] as const

const STORAGE_KEY = 'echojs-docs-accent'

export const $accentPalette = signal<AccentPalette>('amber')

const applyAccent = (palette: AccentPalette): void => {
  if (palette === 'amber') {
    delete document.documentElement.dataset.accent
    return
  }
  document.documentElement.dataset.accent = palette
}

export const initAccent = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY) as AccentPalette | null
  if (stored && ACCENT_OPTIONS.some((option) => option.id === stored)) {
    $accentPalette.set(stored)
  }

  effect(() => {
    applyAccent($accentPalette.value())
  })
}

export const setAccentPalette = (palette: AccentPalette): void => {
  $accentPalette.set(palette)
  localStorage.setItem(STORAGE_KEY, palette)
}
