import type { Child } from "@echojs-ecosystem/hyperdom";

import type { ButtonOwnProps } from "../button/button.types";
import type { UIComponentProps } from "../../core/props-types";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";

export type IconButtonOwnProps = ButtonOwnProps & {
  size?: IconButtonSize;
};

export type IconButtonProps = UIComponentProps<"button", IconButtonOwnProps, "disabled" | "children"> & {
  disabled?: boolean;
  children: Child;
};

export const ICON_BUTTON_OWN_KEYS = ["size"] as const satisfies readonly (keyof Pick<IconButtonOwnProps, "size">)[];
