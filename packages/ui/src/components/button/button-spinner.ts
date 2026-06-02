import { h, type Child } from "@echojs/hyperdom";

import type { ButtonSize } from "./button.types";

const spinnerSizeClass: Record<ButtonSize, string> = {
  xs: "size-3.5 border",
  sm: "size-4 border",
  md: "size-4 border-2",
  lg: "size-5 border-2",
  xl: "size-5 border-2",
};

/** Default spinner for {@link Button} pending state (`data-slot="spinner"`). */
export const defaultButtonSpinner = (size: ButtonSize = "md"): Child =>
  h(
    "span",
    {
      "data-slot": "spinner",
      "data-btn-icon": "",
      className: [
        "inline-block shrink-0 animate-spin rounded-full border-current border-t-transparent",
        spinnerSizeClass[size],
      ].join(" "),
      "aria-hidden": "true",
    },
  );
