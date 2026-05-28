import { tv } from "../../theme/variants";

export const textareaStyles = tv({
  base: [
    "w-full",
    "transition-colors",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "data-[invalid]:ring-2 data-[invalid]:ring-red-500 data-[invalid]:ring-offset-2",
  ].join(" "),
  variants: {
    variant: {
      outline: "border border-zinc-300 bg-white text-zinc-900",
      filled: "bg-zinc-100 text-zinc-900",
      ghost: "bg-transparent text-zinc-900",
    },
    size: {
      sm: "min-h-20 px-3 py-2 text-sm rounded-md",
      md: "min-h-24 px-3 py-2 text-sm rounded-md",
      lg: "min-h-28 px-4 py-3 text-base rounded-md",
    },
    resize: {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    resize: "vertical",
  },
});

