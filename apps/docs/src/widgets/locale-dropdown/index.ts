import { createComponent } from "@echojs/hyperdom";
import { createLocaleDropdownModel } from "@widgets/locale-dropdown/model/locale-dropdown.model.js";
import { LocaleDropdownView } from "@widgets/locale-dropdown/ui/locale-dropdown.view.js";

export const LocaleDropdown = createComponent(createLocaleDropdownModel, LocaleDropdownView, {
  name: "LocaleDropdown",
});
