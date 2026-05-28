import { tv } from "../../theme/variants";

export const iconButtonStyles = tv({
  base: "shrink-0 p-0",
  variants: {
    size: {
      xs: "h-7 w-7",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

