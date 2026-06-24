import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

export type SurfaceTheme =
  | 'stone'
  | 'slate'
  | 'zinc'
  | 'sand'
  | 'sage'
  | 'ocean'
  | 'dusk'
  | 'graphite'
  | 'midnight'
  | 'cream'
  | 'rose-fog'

type SurfacePreview = {
  surface: string
  elevated: string
  muted: string
}

export type SurfaceThemeOption = {
  id: SurfaceTheme
  label: string
  hint: string
  light: SurfacePreview
  dark: SurfacePreview
  /** Mini card preview — light top, dark bottom. */
  swatch: string
}

const surfaceSwatch = (light: SurfacePreview, dark: SurfacePreview): string =>
  [
    `linear-gradient(180deg,`,
    `${light.surface} 0%, ${light.elevated} 22%, ${light.muted} 48%,`,
    `${dark.surface} 52%, ${dark.elevated} 76%, ${dark.muted} 100%)`,
  ].join(' ')

export const SURFACE_THEME_OPTIONS: readonly SurfaceThemeOption[] = [
  {
    id: 'stone',
    label: 'Stone',
    hint: 'Warm neutral (default)',
    light: { surface: '#f5f5f4', elevated: '#fafaf9', muted: '#eceae8' },
    dark: { surface: '#0c0a09', elevated: '#1c1917', muted: '#292524' },
    swatch: surfaceSwatch(
      { surface: '#f5f5f4', elevated: '#fafaf9', muted: '#eceae8' },
      { surface: '#0c0a09', elevated: '#1c1917', muted: '#292524' },
    ),
  },
  {
    id: 'slate',
    label: 'Slate',
    hint: 'Cool blue-gray',
    light: { surface: '#f8fafc', elevated: '#ffffff', muted: '#e2e8f0' },
    dark: { surface: '#0f172a', elevated: '#1e293b', muted: '#334155' },
    swatch: surfaceSwatch(
      { surface: '#f8fafc', elevated: '#ffffff', muted: '#e2e8f0' },
      { surface: '#0f172a', elevated: '#1e293b', muted: '#334155' },
    ),
  },
  {
    id: 'zinc',
    label: 'Zinc',
    hint: 'Modern neutral',
    light: { surface: '#fafafa', elevated: '#ffffff', muted: '#f4f4f5' },
    dark: { surface: '#09090b', elevated: '#18181b', muted: '#27272a' },
    swatch: surfaceSwatch(
      { surface: '#fafafa', elevated: '#ffffff', muted: '#f4f4f5' },
      { surface: '#09090b', elevated: '#18181b', muted: '#27272a' },
    ),
  },
  {
    id: 'sand',
    label: 'Sand',
    hint: 'Soft parchment',
    light: { surface: '#faf7f2', elevated: '#fffdf9', muted: '#f0ebe3' },
    dark: { surface: '#14110e', elevated: '#1f1b17', muted: '#2c2720' },
    swatch: surfaceSwatch(
      { surface: '#faf7f2', elevated: '#fffdf9', muted: '#f0ebe3' },
      { surface: '#14110e', elevated: '#1f1b17', muted: '#2c2720' },
    ),
  },
  {
    id: 'cream',
    label: 'Cream',
    hint: 'Warm paper',
    light: { surface: '#faf6ef', elevated: '#fffdf8', muted: '#efe8da' },
    dark: { surface: '#16130e', elevated: '#211c15', muted: '#2e271d' },
    swatch: surfaceSwatch(
      { surface: '#faf6ef', elevated: '#fffdf8', muted: '#efe8da' },
      { surface: '#16130e', elevated: '#211c15', muted: '#2e271d' },
    ),
  },
  {
    id: 'sage',
    label: 'Sage',
    hint: 'Muted green tint',
    light: { surface: '#f3f6f3', elevated: '#f9fbf9', muted: '#e4ebe4' },
    dark: { surface: '#0a0f0a', elevated: '#141a14', muted: '#1f281f' },
    swatch: surfaceSwatch(
      { surface: '#f3f6f3', elevated: '#f9fbf9', muted: '#e4ebe4' },
      { surface: '#0a0f0a', elevated: '#141a14', muted: '#1f281f' },
    ),
  },
  {
    id: 'ocean',
    label: 'Ocean',
    hint: 'Cool sky tint',
    light: { surface: '#f0f7ff', elevated: '#f8fbff', muted: '#dbeafe' },
    dark: { surface: '#0a1018', elevated: '#111827', muted: '#1e2a3f' },
    swatch: surfaceSwatch(
      { surface: '#f0f7ff', elevated: '#f8fbff', muted: '#dbeafe' },
      { surface: '#0a1018', elevated: '#111827', muted: '#1e2a3f' },
    ),
  },
  {
    id: 'dusk',
    label: 'Dusk',
    hint: 'Soft violet-gray',
    light: { surface: '#f7f5fa', elevated: '#fcfbfd', muted: '#ebe6f2' },
    dark: { surface: '#100e14', elevated: '#1a1720', muted: '#28232f' },
    swatch: surfaceSwatch(
      { surface: '#f7f5fa', elevated: '#fcfbfd', muted: '#ebe6f2' },
      { surface: '#100e14', elevated: '#1a1720', muted: '#28232f' },
    ),
  },
  {
    id: 'rose-fog',
    label: 'Rose fog',
    hint: 'Blush surfaces',
    light: { surface: '#faf5f6', elevated: '#fffbfb', muted: '#f2e6e9' },
    dark: { surface: '#140e10', elevated: '#1f1518', muted: '#2d2024' },
    swatch: surfaceSwatch(
      { surface: '#faf5f6', elevated: '#fffbfb', muted: '#f2e6e9' },
      { surface: '#140e10', elevated: '#1f1518', muted: '#2d2024' },
    ),
  },
  {
    id: 'graphite',
    label: 'Graphite',
    hint: 'High contrast',
    light: { surface: '#f4f4f4', elevated: '#ffffff', muted: '#e8e8e8' },
    dark: { surface: '#0a0a0a', elevated: '#141414', muted: '#1f1f1f' },
    swatch: surfaceSwatch(
      { surface: '#f4f4f4', elevated: '#ffffff', muted: '#e8e8e8' },
      { surface: '#0a0a0a', elevated: '#141414', muted: '#1f1f1f' },
    ),
  },
  {
    id: 'midnight',
    label: 'Midnight',
    hint: 'Deep blue-black',
    light: { surface: '#eef1f8', elevated: '#f8f9fc', muted: '#dde3f0' },
    dark: { surface: '#060912', elevated: '#0e1424', muted: '#171f33' },
    swatch: surfaceSwatch(
      { surface: '#eef1f8', elevated: '#f8f9fc', muted: '#dde3f0' },
      { surface: '#060912', elevated: '#0e1424', muted: '#171f33' },
    ),
  },
] as const

const STORAGE_KEY = 'echojs-docs-surface'

export const $surfaceTheme = signal<SurfaceTheme>('stone')

const applySurfaceTheme = (theme: SurfaceTheme): void => {
  if (theme === 'stone') {
    delete document.documentElement.dataset.surface
    return
  }
  document.documentElement.dataset.surface = theme
}

export const initSurfaceTheme = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY) as SurfaceTheme | null
  if (stored && SURFACE_THEME_OPTIONS.some((option) => option.id === stored)) {
    $surfaceTheme.set(stored)
  }

  effect(() => {
    applySurfaceTheme($surfaceTheme.value())
  })
}

export const setSurfaceTheme = (theme: SurfaceTheme): void => {
  $surfaceTheme.set(theme)
  localStorage.setItem(STORAGE_KEY, theme)
}
