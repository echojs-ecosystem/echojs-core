import { createComponent, createView, type Child } from "@echojs/hyperdom";
import { createHeaderDropdownModel } from "@widgets/header-dropdown/model/header-dropdown.model.js";
import { HeaderDropdownView } from "@widgets/header-dropdown/ui/header-dropdown.view.js";
import type { VersionDropdownVM } from "@widgets/version-dropdown/model/version-dropdown.model.js";

export const VersionDropdownView = createView(
  (vm: VersionDropdownVM): Child =>
    createComponent(createHeaderDropdownModel(vm.dropdownProps), HeaderDropdownView)(),
  "VersionDropdownView",
);
