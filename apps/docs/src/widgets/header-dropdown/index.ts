import type { Child } from "@echojs-ecosystem/hyperdom";
import { createComponent } from "@echojs-ecosystem/hyperdom";
import {
  createHeaderDropdownModel,
  type HeaderDropdownProps,
} from "@widgets/header-dropdown/model/header-dropdown.model.js";
import { HeaderDropdownView } from "@widgets/header-dropdown/ui/header-dropdown.view.js";

export type { HeaderDropdownOption, HeaderDropdownProps } from "@widgets/header-dropdown/model/header-dropdown.model.js";

export const HeaderDropdown = (props: HeaderDropdownProps): Child =>
  createComponent(createHeaderDropdownModel(props), HeaderDropdownView, {
    name: "HeaderDropdown",
  })();
