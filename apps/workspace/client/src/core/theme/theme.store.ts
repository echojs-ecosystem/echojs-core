import { effect } from '@echojs-ecosystem/reactivity'
import { withLocalStorage } from '@echojs-ecosystem/persist'
import { createStore } from '@echojs-ecosystem/store'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'echojs-workspace-theme'

export const themeStore = createStore<ThemeMode>('system', { name: 'workspace-theme' }).extend(
  withLocalStorage({ key: STORAGE_KEY }),
)

const resolveEffective = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'light' || mode === 'dark') return mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyClass = (effective: 'light' | 'dark'): void => {
  document.documentElement.classList.toggle('dark', effective === 'dark')
}

export const initTheme = (): void => {
  effect(() => {
    applyClass(resolveEffective(themeStore.value()))
  })

  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', () => {
    if (themeStore.value() === 'system') applyClass(resolveEffective('system'))
  })
}

export const setThemeMode = (mode: ThemeMode): void => {
  themeStore.set(mode)
}

export const toggleTheme = (): void => {
  const next = resolveEffective(themeStore.value()) === 'dark' ? 'light' : 'dark'
  setThemeMode(next)
}
