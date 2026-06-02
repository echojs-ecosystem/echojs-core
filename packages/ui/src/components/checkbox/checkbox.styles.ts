import { tv } from "../../theme/variants";

export const checkboxStyles = tv({
  base: [
    "shrink-0 cursor-pointer appearance-none rounded border border-zinc-400 bg-white",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500",
    "checked:border-zinc-900 checked:bg-zinc-900",
    "indeterminate:border-zinc-500 indeterminate:bg-zinc-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[invalid]:border-red-500 data-[invalid]:ring-red-500",
    "data-[indeterminate]:border-zinc-500 data-[indeterminate]:bg-zinc-500",
  ].join(" "),
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
