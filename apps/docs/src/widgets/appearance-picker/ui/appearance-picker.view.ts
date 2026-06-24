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
import { AppearanceSubmenuView } from './appearance-picker-submenus.view'
import { appearancePickerStyles } from './appearance-picker.view.styles'

const ui = appearancePickerStyles()

type MenuRow = {
  id: AppearanceSection
  label: string
  value: (vm: AppearancePickerVM) => string
  preview: (vm: AppearancePickerVM) => Child
}

const menuRows: MenuRow[] = [
  {
    id: 'mode',
    label: 'Mode',
    value: (vm) => vm.activeModeOption().label,
    preview: (vm) => {
      const mode = vm.activeMode()
      const iconClass = ui.modePreview()
      if (mode === 'light') return span({ class: iconClass }, [SunIcon()])
      if (mode === 'dark') return span({ class: iconClass }, [MoonIcon()])
      return span({ class: iconClass }, [SystemIcon()])
    },
  },
  {
    id: 'surface',
    label: 'Surface',
    value: (vm) => vm.activeSurfaceOption().label,
    preview: (vm) =>
      span({
        class: ui.surfacePreview(),
        style: () => ({ background: vm.activeSurfaceOption().swatch }),
      }),
  },
  {
    id: 'accent',
    label: 'Accent',
    value: (vm) => vm.activeAccentOption().label,
    preview: (vm) =>
      span({
        class: ui.accentPreview(),
        style: () => ({ background: vm.activeAccentOption().swatch }),
      }),
  },
  {
    id: 'font',
    label: 'Font',
    value: (vm) => vm.activeFontOption().label,
    preview: (vm) =>
      span(
        {
          class: ui.fontPreview(),
          style: () => ({ 'font-family': vm.activeFontOption().stack }),
        },
        'Ag',
      ),
  },
]

export const AppearancePickerView = createView((vm: AppearancePickerVM): Child => {
  return div(
    { class: ui.root(), ref: vm.setRootRef, onBlur: vm.handleBlur },
    [
      button(
        {
          type: 'button',
          class: ui.trigger(),
          'aria-label': 'Theme settings',
          'aria-haspopup': 'menu',
          'aria-expanded': () => String(vm.isMenuOpen()),
          onClick: vm.toggleMenu,
        },
        [
          span({ class: ui.triggerPreview() }, [
            span({
              class: ui.triggerSurface(),
              style: () => ({ background: vm.activeSurfaceOption().swatch }),
            }),
            span({
              class: ui.triggerAccent(),
              style: () => ({ background: vm.activeAccentOption().swatch }),
            }),
          ]),
          span({ class: ui.triggerLabel() }, 'Theme'),
          span(
            {
              class: () =>
                cn(ui.chevron(), vm.isMenuOpen() ? ui.chevronOpen() : undefined),
            },
            '▾',
          ),
        ],
      ),
      () =>
        vm.isMenuOpen()
          ? div({ class: ui.flyout(), onMouseleave: vm.closeSubmenu }, [
              () => (vm.isSubmenuOpen() ? AppearanceSubmenuView(vm) : null),
              div(
                { class: ui.menu(), role: 'menu', 'aria-label': 'Theme settings' },
                  [
                    div({ class: ui.menuHeader() }, [
                      div({ class: ui.menuHeaderTitle() }, 'Appearance'),
                      div(
                        { class: ui.menuHeaderHint() },
                        'Hover or click a row to customize',
                      ),
                    ]),
                    div(
                      { class: ui.menuList() },
                      menuRows.map((row) => {
                        const active = vm.activeSection() === row.id
                        return button(
                          {
                            type: 'button',
                            role: 'menuitem',
                            'aria-expanded': () => String(active),
                            class: () =>
                              cn(
                                ui.menuItem(),
                                active ? ui.menuItemActive() : undefined,
                              ),
                            onMouseenter: () => vm.hoverSection(row.id),
                            onClick: () => vm.toggleSection(row.id),
                          },
                          [
                            span({ class: ui.menuItemIcon() }, row.preview(vm)),
                            div({ class: ui.menuItemBody() }, [
                              span({ class: ui.menuItemLabel() }, row.label),
                              span(
                                { class: ui.menuItemValue() },
                                () => row.value(vm),
                              ),
                            ]),
                            span(
                              {
                                class: () =>
                                  cn(
                                    ui.menuItemChevron(),
                                    active ? ui.menuItemChevronActive() : undefined,
                                  ),
                              },
                              '‹',
                            ),
                          ],
                        )
                      }),
                    ),
                  ],
                ),
              ])
          : null,
    ],
  )
}, 'AppearancePickerView')
