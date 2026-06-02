import type { InputFieldProps } from "../input-shared/field.types";

export type InputTagsProps = Omit<InputFieldProps, "value" | "defaultValue"> & {
  value?: string[];
  onValueChange?: (tags: string[]) => void;
  separators?: string[];
  allowDuplicates?: boolean;
  maxTags?: number;
};
