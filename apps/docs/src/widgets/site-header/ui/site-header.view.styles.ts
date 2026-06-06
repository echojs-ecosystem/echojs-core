import { tv } from "tailwind-variants";

export const homeHeaderStyles = tv({
  slots: {
    root: "sticky top-0 z-50 border-b border-transparent bg-transparent shadow-none",
    inner: "flex w-full min-w-0 items-center gap-2 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4",
    brand: "flex min-w-0 items-center gap-2 sm:gap-2.5",
    logo: [
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
      "bg-gradient-to-br from-echo-500/25 to-echo-600/10 ring-1 ring-echo-500/25",
      "dark:from-echo-500/20 dark:to-echo-900/40 dark:ring-echo-500/30",
    ].join(" "),
    logoMark: "h-6 w-6",
    brandName: "truncate text-base font-bold tracking-tight text-fg",
    brandTag: "hidden text-xs text-fg-subtle sm:block",
    menuBtn: "shrink-0 lg:hidden",
    nav: "hidden items-center gap-1 lg:flex",
    navLink:
      "rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg",
    searchWrap: "flex min-w-0 flex-1 items-center justify-end md:max-w-xs lg:max-w-sm",
    actions: "flex shrink-0 items-center gap-1.5 sm:gap-2",
    githubBtn: "inline-flex",
  },
  variants: {
    layout: {
      home: {
        inner: "mx-auto max-w-7xl",
      },
      docs: {},
    },
    scrolled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      layout: "docs",
      class: {
        inner: "gap-2 px-4 py-3 sm:px-8 sm:py-4",
        brandName: "max-w-[8.5rem] sm:max-w-none",
      },
    },
    {
      layout: "home",
      class: {
        root: "border-transparent bg-transparent shadow-none",
      },
    },
    {
      layout: "docs",
      scrolled: true,
      class: {
        root: [
          "border-transparent bg-surface/95 shadow-sm shadow-black/5 backdrop-blur-md",
          "dark:bg-surface/95",
        ].join(" "),
      },
    },
    {
      layout: "docs",
      scrolled: false,
      class: {
        root: "border-transparent bg-transparent shadow-none",
      },
    },
  ],
  defaultVariants: { layout: "home", scrolled: false },
});

export const headerIconBtnStyles = tv({
  base: [
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border",
    "text-fg-muted transition hover:border-echo-500/30 hover:bg-echo-50/80 hover:text-fg",
    "dark:border-white/10 dark:hover:bg-echo-950/50",
  ].join(" "),
});

export const githubLinkStyles = tv({
  base: "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg",
});
