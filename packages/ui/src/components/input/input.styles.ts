import { tv } from "../../theme/variants";

export const inputStyles = tv({
  slots: {
    wrapper: [
      "flex items-center gap-2",
      "transition-colors",
      "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-zinc-400",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
      "data-[invalid]:ring-2 data-[invalid]:ring-red-500 data-[invalid]:ring-offset-2",
    ].join(" "),
    input: [
      "w-full bg-transparent outline-none",
      "placeholder:text-zinc-400",
      "disabled:cursor-not-allowed",
    ].join(" "),
    start: "text-zinc-500",
    end: "text-zinc-500",
  },
  variants: {
    variant: {
      outline: "border border-zinc-300 bg-white text-zinc-900",
      filled: "bg-zinc-100 text-zinc-900",
      ghost: "bg-transparent text-zinc-900",
    },
    size: {
      sm: "h-8 px-3 text-sm rounded-md",
      md: "h-10 px-3 text-sm rounded-md",
      lg: "h-12 px-4 text-base rounded-md",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

