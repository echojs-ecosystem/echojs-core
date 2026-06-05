import { createComponent } from "@echojs-ecosystem/framework/hyperdom";
import { createThemeToggleModel } from "@widgets/theme-toggle/model/theme-toggle.model.js";
import { ThemeToggleView } from "@widgets/theme-toggle/ui/theme-toggle.view.js";

export const ThemeToggle = createComponent(createThemeToggleModel, ThemeToggleView, {
  name: "ThemeToggle",
});
