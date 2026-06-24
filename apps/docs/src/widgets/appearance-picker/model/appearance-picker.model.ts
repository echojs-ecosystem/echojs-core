import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

import {
  $accentPalette,
  ACCENT_OPTIONS,
  setAccentPalette,
  type AccentOption,
  type AccentPalette,
} from '@core/providers/accent-store'
import {
  $docsFontFamily,
  DOCS_FONT_OPTIONS,
  setDocsFontFamily,
  type DocsFontFamily,
  type DocsFontOption,
} from '@core/providers/font-store'
import {
  $surfaceTheme,
  SURFACE_THEME_OPTIONS,
  setSurfaceTheme,
  type SurfaceTheme,
  type SurfaceThemeOption,
} from '@core/providers/surface-theme-store'
import {
  $themeMode,
  setThemeMode,
  type ThemeMode,
} from '@core/providers/theme-store'

export type AppearanceSection = 'mode' | 'surface' | 'accent' | 'font'

export type ThemeModeOption = {
  id: ThemeMode
  label: string
  hint: string
}

export const THEME_MODE_OPTIONS: readonly ThemeModeOption[] = [
  { id: 'light', label: 'Light', hint: 'Always light' },
  { id: 'dark', label: 'Dark', hint: 'Always dark' },
  { id: 'system', label: 'System', hint: 'Match device' },
] as const

export type AppearancePickerVM = {
  fontOptions: typeof DOCS_FONT_OPTIONS
  surfaceOptions: typeof SURFACE_THEME_OPTIONS
  accentOptions: typeof ACCENT_OPTIONS
  modeOptions: typeof THEME_MODE_OPTIONS
  activeFont: () => DocsFontFamily
  activeFontOption: () => DocsFontOption
  activeSurface: () => SurfaceTheme
  activeSurfaceOption: () => SurfaceThemeOption
  activeAccent: () => AccentPalette
  activeAccentOption: () => AccentOption
  activeMode: () => ThemeMode
  activeModeOption: () => ThemeModeOption
  isMenuOpen: () => boolean
  activeSection: () => AppearanceSection | null
  isSubmenuOpen: () => boolean
  toggleMenu: () => void
  closeMenu: () => void
  hoverSection: (section: AppearanceSection) => void
  toggleSection: (section: AppearanceSection) => void
  closeSubmenu: () => void
  selectFont: (font: DocsFontFamily) => void
  selectSurface: (theme: SurfaceTheme) => void
  selectAccent: (palette: AccentPalette) => void
  selectMode: (mode: ThemeMode) => void
  setRootRef: (el: HTMLElement | null) => void
  handleBlur: (e: FocusEvent) => void
  sectionTitle: (section: AppearanceSection) => string
}

const themeModeOption = (mode: ThemeMode): ThemeModeOption =>
  THEME_MODE_OPTIONS.find((option) => option.id === mode) ?? THEME_MODE_OPTIONS[2]!

export const createAppearancePickerModel = createModel((): AppearancePickerVM => {
  const $menuOpen = signal(false)
  const $activeSection = signal<AppearanceSection | null>(null)
  let rootEl: HTMLElement | null = null
  let removeOutsideListener: (() => void) | undefined

  const detachOutsideClose = (): void => {
    removeOutsideListener?.()
    removeOutsideListener = undefined
  }

  const closeSubmenu = (): void => {
    $activeSection.set(null)
  }

  const closeMenu = (): void => {
    $menuOpen.set(false)
    closeSubmenu()
    detachOutsideClose()
  }

  const attachOutsideClose = (): void => {
    detachOutsideClose()
    const onPointerDown = (e: PointerEvent): void => {
      const target = e.target as Node | null
      if (rootEl?.contains(target ?? null)) return
      closeMenu()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    removeOutsideListener = () =>
      document.removeEventListener('pointerdown', onPointerDown, true)
  }

  effect(() => {
    if (!$menuOpen.value()) {
      detachOutsideClose()
      return
    }
    requestAnimationFrame(() => {
      if ($menuOpen.value()) attachOutsideClose()
    })
  })

  effect(() => {
    if (!$menuOpen.value() && !$activeSection.value()) return

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return
      if ($activeSection.value()) {
        closeSubmenu()
        return
      }
      closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  const activeFontOption = (): DocsFontOption => {
    const id = $docsFontFamily.value()
    return DOCS_FONT_OPTIONS.find((option) => option.id === id) ?? DOCS_FONT_OPTIONS[0]!
  }

  const activeSurfaceOption = (): SurfaceThemeOption => {
    const id = $surfaceTheme.value()
    return SURFACE_THEME_OPTIONS.find((option) => option.id === id) ?? SURFACE_THEME_OPTIONS[0]!
  }

  const activeAccentOption = (): AccentOption => {
    const id = $accentPalette.value()
    return ACCENT_OPTIONS.find((option) => option.id === id) ?? ACCENT_OPTIONS[0]!
  }

  const sectionTitle = (section: AppearanceSection): string => {
    switch (section) {
      case 'mode':
        return 'Mode'
      case 'surface':
        return 'Surface'
      case 'accent':
        return 'Accent'
      case 'font':
        return 'Font'
    }
  }

  return {
    fontOptions: DOCS_FONT_OPTIONS,
    surfaceOptions: SURFACE_THEME_OPTIONS,
    accentOptions: ACCENT_OPTIONS,
    modeOptions: THEME_MODE_OPTIONS,
    activeFont: () => $docsFontFamily.value(),
    activeFontOption,
    activeSurface: () => $surfaceTheme.value(),
    activeSurfaceOption,
    activeAccent: () => $accentPalette.value(),
    activeAccentOption,
    activeMode: () => $themeMode.value(),
    activeModeOption: () => themeModeOption($themeMode.value()),
    isMenuOpen: () => $menuOpen.value(),
    activeSection: () => $activeSection.value(),
    isSubmenuOpen: () => $activeSection.value() !== null,
    toggleMenu: () => {
      if ($menuOpen.value()) closeMenu()
      else $menuOpen.set(true)
    },
    closeMenu,
    hoverSection: (section) => {
      if (!$menuOpen.value()) return
      $activeSection.set(section)
    },
    toggleSection: (section) => {
      $activeSection.set($activeSection.value() === section ? null : section)
    },
    closeSubmenu,
    selectFont: setDocsFontFamily,
    selectSurface: setSurfaceTheme,
    selectAccent: setAccentPalette,
    selectMode: setThemeMode,
    setRootRef: (el) => {
      rootEl = el
    },
    handleBlur: (e) => {
      const root = e.currentTarget as HTMLElement | null
      const next = e.relatedTarget as Node | null
      if (!root || (next && root.contains(next))) return
      setTimeout(closeMenu, 120)
    },
    sectionTitle,
  }
}, 'AppearancePickerModel')
