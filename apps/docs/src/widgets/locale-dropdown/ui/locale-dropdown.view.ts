import { createComponent, createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { createHeaderDropdownModel } from "@widgets/header-dropdown/model/header-dropdown.model.js";
import { HeaderDropdownView } from "@widgets/header-dropdown/ui/header-dropdown.view.js";
import type { LocaleDropdownVM } from "@widgets/locale-dropdown/model/locale-dropdown.model.js";

export const LocaleDropdownView = createView(
  (vm: LocaleDropdownVM): Child =>
    createComponent(createHeaderDropdownModel(vm.dropdownProps), HeaderDropdownView)(),
  "LocaleDropdownView",
);
