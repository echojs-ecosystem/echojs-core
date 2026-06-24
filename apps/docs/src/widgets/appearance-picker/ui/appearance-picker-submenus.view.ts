import {
  button,
  createView,
  div,
  span,
  type Child,
} from '@echojs-ecosystem/framework/hyperdom'

import { cn } from '@core/styles/cn'
import { MoonIcon, SunIcon, SystemIcon } from '@widgets/icons'

import type { AppearancePickerVM, AppearanceSection } from '../model/appearance-picker.model'
import { appearancePickerStyles } from './appearance-picker.view.styles'

const ui = appearancePickerStyles()

const ModeIcon = (mode: 'light' | 'dark' | 'system'): Child => {
  const iconClass = ui.submenuOptionIcon()
  if (mode === 'light') return span({ class: iconClass }, [SunIcon()])
  if (mode === 'dark') return span({ class: iconClass }, [MoonIcon()])
  return span({ class: iconClass }, [SystemIcon()])
}

const renderSubmenu = (vm: AppearancePickerVM, section: AppearanceSection): Child => {
  switch (section) {
    case 'mode':
      return div(
        { class: ui.submenuList() },
        vm.modeOptions.map((option) => {
        const selected = vm.activeMode() === option.id
        return button(
          {
            type: 'button',
            class: () =>
              cn(
                ui.submenuOption(),
                selected ? ui.submenuOptionActive() : undefined,
              ),
            onClick: () => vm.selectMode(option.id),
          },
          [
            ModeIcon(option.id),
            div({ class: ui.submenuOptionMeta() }, [
              span(
                {
                  class: () =>
                    cn(
                      ui.submenuOptionLabel(),
                      selected ? ui.submenuOptionLabelActive() : undefined,
                    ),
                },
                option.label,
              ),
              span({ class: ui.submenuOptionHint() }, option.hint),
            ]),
            selected ? span({ class: ui.submenuCheck() }, '✓') : null,
          ],
        )
        }),
      )

    case 'surface':
      return div(
        { class: ui.submenuList() },
        vm.surfaceOptions.map((option) => {
        const selected = vm.activeSurface() === option.id
        return button(
          {
            type: 'button',
            class: () =>
              cn(
                ui.submenuOption(),
                selected ? ui.submenuOptionActive() : undefined,
              ),
            onClick: () => vm.selectSurface(option.id),
          },
          [
            span({
              class: ui.surfaceSwatchSm(),
              style: { background: option.swatch },
            }),
            div({ class: ui.submenuOptionMeta() }, [
              span(
                {
                  class: () =>
                    cn(
                      ui.submenuOptionLabel(),
                      selected ? ui.submenuOptionLabelActive() : undefined,
                    ),
                },
                option.label,
              ),
              span({ class: ui.submenuOptionHint() }, option.hint),
            ]),
            selected ? span({ class: ui.submenuCheck() }, '✓') : null,
          ],
        )
        }),
      )

    case 'accent':
      return div(
        { class: ui.accentGrid() },
        vm.accentOptions.map((option) => {
          const selected = vm.activeAccent() === option.id
          return button(
            {
              type: 'button',
              title: option.label,
              class: () =>
                cn(
                  ui.accentOption(),
                  selected ? ui.accentOptionActive() : undefined,
                ),
              onClick: () => vm.selectAccent(option.id),
            },
            [
              span({
                class: () =>
                  cn(
                    ui.accentSwatch(),
                    selected ? ui.accentSwatchActive() : undefined,
                  ),
                style: { background: option.swatch },
              }),
              span({ class: ui.accentLabel() }, option.label),
            ],
          )
        }),
      )

    case 'font':
      return div(
        { class: ui.submenuList() },
        vm.fontOptions.map((option) => {
        const selected = vm.activeFont() === option.id
        return button(
          {
            type: 'button',
            class: () =>
              cn(
                ui.submenuOption(),
                selected ? ui.submenuOptionActive() : undefined,
              ),
            onClick: () => vm.selectFont(option.id),
          },
          [
            span(
              {
                class: ui.fontAgSm(),
                style: { 'font-family': option.stack },
              },
              'Ag',
            ),
            div({ class: ui.submenuOptionMeta() }, [
              span(
                {
                  class: () =>
                    cn(
                      ui.submenuOptionLabel(),
                      selected ? ui.submenuOptionLabelActive() : undefined,
                    ),
                  style: { 'font-family': option.stack },
                },
                option.label,
              ),
            ]),
            selected ? span({ class: ui.submenuCheck() }, '✓') : null,
          ],
        )
        }),
      )
  }
}

export const AppearanceSubmenuView = createView((vm: AppearancePickerVM): Child => {
  const section = vm.activeSection()
  if (!section) return null

  return div(
    {
      class: cn(ui.submenu(), section === 'accent' ? ui.submenuWide() : undefined),
      onMouseenter: () => vm.hoverSection(section),
    },
    [
      div({ class: ui.submenuHeader() }, [
        span({ class: ui.submenuTitle() }, vm.sectionTitle(section)),
      ]),
      div({ class: ui.submenuBody() }, [renderSubmenu(vm, section)]),
    ],
  )
}, 'AppearanceSubmenuView')
