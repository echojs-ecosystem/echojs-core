import { createComponent } from "@echojs-ecosystem/hyperdom";
import { createVersionDropdownModel } from "@widgets/version-dropdown/model/version-dropdown.model.js";
import { VersionDropdownView } from "@widgets/version-dropdown/ui/version-dropdown.view.js";

export const VersionDropdown = createComponent(createVersionDropdownModel, VersionDropdownView, {
  name: "VersionDropdown",
});
