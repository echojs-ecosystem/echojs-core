import type { InputFieldOwnProps, InputFieldProps } from "../input-shared/field.types";
import { INPUT_FIELD_OWN_KEYS } from "../input-shared/field.types";

export type InputTagsOwnProps = InputFieldOwnProps & {
  value?: string[];
  onValueChange?: (tags: string[]) => void;
  separators?: string[];
  allowDuplicates?: boolean;
  maxTags?: number;
};

export type InputTagsProps = Omit<InputFieldProps, "value" | "defaultValue"> & InputTagsOwnProps;

export const INPUT_TAGS_OWN_KEYS = [
  ...INPUT_FIELD_OWN_KEYS,
  "value",
  "onValueChange",
  "separators",
  "allowDuplicates",
  "maxTags",
] as const;
