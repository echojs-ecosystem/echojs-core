import { tv } from "../../theme/variants";

export const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "select-none whitespace-nowrap",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
  ].join(" "),
  variants: {
    variant: {
      primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400",
      outline:
        "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400",
      ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-400",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-5 text-base",
    },
    rounded: {
      true: "rounded-md",
      false: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: true,
  },
});

