import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'
import type { Signal } from '@echojs-ecosystem/framework/reactivity'

export type HeaderDropdownOption = {
  id: string
  label: string
  badge?: string
  disabled?: boolean
}

export type HeaderDropdownProps = {
  ariaLabel: string | (() => string)
  selectedId: () => string
  triggerLabel: () => string
  options: HeaderDropdownOption[] | (() => HeaderDropdownOption[])
  onSelect: (id: string) => void
}

export type HeaderDropdownVM = {
  props: HeaderDropdownProps
  $open: Signal<boolean>
  toggle: () => void
  close: () => void
  select: (id: string, disabled?: boolean) => void
  setRootRef: (el: HTMLElement | null) => void
  resolveAriaLabel: () => string
  resolveOptions: () => HeaderDropdownOption[]
  handleBlur: (e: FocusEvent) => void
}

const resolveAriaLabel = (ariaLabel: string | (() => string)): string =>
  typeof ariaLabel === 'function' ? ariaLabel() : ariaLabel

const resolveOptions = (
  options: HeaderDropdownOption[] | (() => HeaderDropdownOption[])
): HeaderDropdownOption[] =>
  typeof options === 'function' ? options() : options

export const createHeaderDropdownModel = (props: HeaderDropdownProps) =>
  createModel((): HeaderDropdownVM => {
    const $open = signal(false)
    let rootEl: HTMLElement | null = null
    let removeOutsideListener: (() => void) | undefined

    const detachOutsideClose = (): void => {
      removeOutsideListener?.()
      removeOutsideListener = undefined
    }

    const close = (): void => {
      $open.set(false)
      detachOutsideClose()
    }

    const attachOutsideClose = (): void => {
      detachOutsideClose()
      const onPointerDown = (e: PointerEvent): void => {
        const target = e.target as Node | null
        if (rootEl?.contains(target ?? null)) return
        close()
      }
      document.addEventListener('pointerdown', onPointerDown, true)
      removeOutsideListener = () =>
        document.removeEventListener('pointerdown', onPointerDown, true)
    }

    effect(() => {
      if (!$open.value()) {
        detachOutsideClose()
        return
      }
      requestAnimationFrame(() => {
        if ($open.value()) attachOutsideClose()
      })
    })

    return {
      props,
      $open,
      toggle: () => $open.set(!$open.value()),
      close,
      select: (id, disabled) => {
        if (disabled) return
        props.onSelect(id)
        close()
      },
      setRootRef: (el) => {
        rootEl = el
      },
      resolveAriaLabel: () => resolveAriaLabel(props.ariaLabel),
      resolveOptions: () => resolveOptions(props.options),
      handleBlur: (e) => {
        const root = e.currentTarget as HTMLElement | null
        const next = e.relatedTarget as Node | null
        if (!root || (next && root.contains(next))) return
        setTimeout(close, 120)
      },
    }
  }, 'HeaderDropdownModel')
