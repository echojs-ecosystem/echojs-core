import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { button } from "@echojs-ecosystem/hyperdom";
import { themeToggleStyles } from "@widgets/theme-toggle/ui/theme-toggle.view.styles.js";
import { MoonIcon, SunIcon } from "@widgets/icons/theme-icons.js";
import type { ThemeToggleVM } from "@widgets/theme-toggle/model/theme-toggle.model.js";

export const ThemeToggleView = createView(
  (vm: ThemeToggleVM): Child =>
    button(
      {
        type: "button",
        class: themeToggleStyles(),
        onClick: vm.toggle,
        "aria-label": "Toggle color theme",
      },
      () => (vm.isDarkMode() ? SunIcon() : MoonIcon()),
    ),
  "ThemeToggleView",
);
