import { tv } from "../../theme/variants";

/** HeroUI v3–inspired button styles (Tailwind + CSS variables). */
export const buttonStyles = tv({
  base: [
    "relative isolate inline-flex w-fit origin-center items-center justify-center gap-2",
    "font-medium whitespace-nowrap select-none outline-none",
    "rounded-3xl",
    "transition-[transform,background-color,box-shadow,color] duration-200 ease-out",
    "motion-reduce:transition-none",
    "cursor-pointer",
    "bg-[var(--button-bg)] text-[var(--button-fg)]",
    "hover:bg-[var(--button-bg-hover)]",
    "active:scale-[0.97] active:bg-[var(--button-bg-pressed)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400",
    "disabled:opacity-50 disabled:pointer-events-none",
    "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    "data-[pending]:pointer-events-none data-[pending]:cursor-wait",
    "[&_svg:not([data-slot=spinner]_svg)]:pointer-events-none [&_svg:not([data-slot=spinner]_svg)]:shrink-0",
    "[&_[data-btn-icon]]:inline-flex [&_[data-btn-icon]]:shrink-0",
  ].join(" "),
  variants: {
    variant: {
      primary: [
        "[--button-bg:var(--color-accent)]",
        "[--button-bg-hover:var(--color-accent-hover)]",
        "[--button-bg-pressed:var(--color-accent-hover)]",
        "[--button-fg:var(--color-accent-foreground)]",
        "focus-visible:ring-zinc-900",
      ].join(" "),
      secondary: [
        "[--button-bg:var(--color-default)]",
        "[--button-bg-hover:var(--color-default-hover)]",
        "[--button-bg-pressed:var(--color-default-hover)]",
        "[--button-fg:var(--color-default-foreground)]",
      ].join(" "),
      tertiary: [
        "[--button-bg:var(--color-default)]",
        "[--button-bg-hover:var(--color-default-hover)]",
        "[--button-bg-pressed:var(--color-default-hover)]",
        "[--button-fg:var(--color-zinc-700)]",
      ].join(" "),
      outline: [
        "border border-[var(--color-border)]",
        "[--button-bg:transparent]",
        "[--button-bg-hover:color-mix(in_srgb,var(--color-default)_60%,transparent)]",
        "[--button-bg-pressed:var(--color-default)]",
        "[--button-fg:var(--color-default-foreground)]",
      ].join(" "),
      ghost: [
        "[--button-bg:transparent]",
        "[--button-bg-hover:var(--color-default)]",
        "[--button-bg-pressed:var(--color-default)]",
        "[--button-fg:var(--color-default-foreground)]",
      ].join(" "),
      danger: [
        "[--button-bg:var(--color-danger)]",
        "[--button-bg-hover:var(--color-danger-hover)]",
        "[--button-bg-pressed:var(--color-danger-hover)]",
        "[--button-fg:var(--color-danger-foreground)]",
        "focus-visible:ring-red-600",
      ].join(" "),
      dangerSoft: [
        "[--button-bg:var(--color-danger-soft)]",
        "[--button-bg-hover:var(--color-danger-soft-hover)]",
        "[--button-bg-pressed:var(--color-danger-soft-hover)]",
        "[--button-fg:var(--color-danger-soft-foreground)]",
        "focus-visible:ring-red-400",
      ].join(" "),
      /** @deprecated Use `danger`. */
      destructive: [
        "[--button-bg:var(--color-danger)]",
        "[--button-bg-hover:var(--color-danger-hover)]",
        "[--button-bg-pressed:var(--color-danger-hover)]",
        "[--button-fg:var(--color-danger-foreground)]",
        "focus-visible:ring-red-600",
      ].join(" "),
      link: [
        "h-auto min-h-0 w-auto gap-1 rounded-none px-0",
        "[--button-bg:transparent] [--button-bg-hover:transparent] [--button-bg-pressed:transparent]",
        "[--button-fg:var(--color-zinc-900)]",
        "underline-offset-4 hover:underline active:scale-100",
      ].join(" "),
    },
    size: {
      xs: "h-8 gap-1.5 px-2.5 text-xs md:h-7 [&_[data-btn-icon]]:size-3.5 active:scale-[0.98]",
      sm: "h-9 gap-2 px-3 text-sm md:h-8 [&_[data-btn-icon]]:size-4 active:scale-[0.98]",
      md: "h-10 gap-2 px-4 text-sm md:h-9 [&_[data-btn-icon]]:size-4",
      lg: "h-11 gap-2 px-4 text-base md:h-10 [&_[data-btn-icon]]:size-5 active:scale-[0.96]",
      xl: "h-12 gap-2.5 px-5 text-base [&_[data-btn-icon]]:size-5 active:scale-[0.96]",
    },
    radius: {
      none: "!rounded-none",
      sm: "!rounded-sm",
      md: "!rounded-md",
      lg: "!rounded-lg",
      full: "!rounded-full",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
    iconOnly: {
      true: "aspect-square p-0 [&_[data-btn-icon]]:mx-0",
      false: "",
    },
    pending: {
      true: "",
      false: "",
    },
    /** @deprecated Alias for `pending` (variant key resolution). */
    loading: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { iconOnly: true, size: "xs", class: "size-8 md:size-7" },
    { iconOnly: true, size: "sm", class: "size-9 md:size-8" },
    { iconOnly: true, size: "md", class: "size-10 md:size-9" },
    { iconOnly: true, size: "lg", class: "size-11 md:size-10" },
    { iconOnly: true, size: "xl", class: "size-12" },
    { variant: "link", iconOnly: true, class: "size-auto aspect-auto p-0" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    radius: "full",
    fullWidth: false,
    iconOnly: false,
    pending: false,
  },
});
