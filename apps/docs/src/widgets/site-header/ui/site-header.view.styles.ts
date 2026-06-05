import { tv } from "tailwind-variants";

export const homeHeaderStyles = tv({
  slots: {
    root: "sticky top-0 z-50 border-b border-transparent bg-transparent shadow-none",
    inner: "flex w-full items-center gap-3 px-5 py-4 sm:gap-4 sm:px-8",
    brand: "flex items-center gap-2.5",
    logo:
      "flex h-9 w-9 items-center justify-center rounded-xl bg-echo-500 text-sm font-bold text-stone-950 shadow-md shadow-echo-600/20 ring-1 ring-echo-600/30",
    brandName: "text-base font-bold tracking-tight text-fg",
    brandTag: "hidden text-xs text-fg-subtle sm:block",
    menuBtn:
      "rounded-lg border border-border px-2.5 py-1.5 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg lg:hidden",
    nav: "hidden items-center gap-1 lg:flex",
    navLink:
      "rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg",
    searchWrap: "hidden min-w-0 flex-1 md:block md:max-w-xs lg:max-w-sm",
    actions: "ml-auto flex shrink-0 items-center gap-2",
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
