export type DocsNavItem = {
  label: string;
  href: string;
};

export type DocsNavGroup = {
  label: string;
  items: DocsNavItem[];
};

export type PackageNav = {
  pkg: string;
  title: string;
  groups: DocsNavGroup[];
};

export const packageNav: Record<string, PackageNav> = {
  reactivity: {
    pkg: "@echojs/reactivity",
    title: "Reactivity",
    groups: [
      {
        label: "Начало",
        items: [
          { label: "Обзор", href: "/packages/reactivity/" },
          { label: "Getting Started", href: "/packages/reactivity/getting-started" },
        ],
      },
      {
        label: "Гайды",
        items: [
          { label: "Модель исполнения", href: "/packages/reactivity/guides/execution-model" },
          { label: "Readonly и мутации", href: "/packages/reactivity/guides/readonly-and-mutations" },
        ],
      },
      {
        label: "API",
        items: [
          { label: "signal", href: "/packages/reactivity/api/signal" },
          { label: "computed", href: "/packages/reactivity/api/computed" },
          { label: "effect", href: "/packages/reactivity/api/effect" },
          { label: "batch", href: "/packages/reactivity/api/batch" },
        ],
      },
    ],
  },
};

