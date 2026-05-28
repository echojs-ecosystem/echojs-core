import { tv } from "../../theme/variants";

export const labelStyles = tv({
  base: [
    "text-sm font-medium leading-none",
    "data-[disabled]:opacity-50",
    "data-[invalid]:text-red-700",
  ].join(" "),
});

