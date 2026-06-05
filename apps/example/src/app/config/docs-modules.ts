import type { TKey } from "@app/providers/i18n.js";

export type DocsModuleMeta = {
  id: string;
  titleKey: TKey;
  descriptionKey: TKey;
  package: string;
  path: string;
  requiresAuth?: boolean;
};

export const docsModules: DocsModuleMeta[] = [
  {
    id: "reactivity",
    titleKey: "modules.reactivity.title",
    descriptionKey: "modules.reactivity.description",
    package: "@echojs-ecosystem/reactivity",
    path: "/docs/reactivity",
  },
  {
    id: "forms",
    titleKey: "modules.forms.title",
    descriptionKey: "modules.forms.description",
    package: "@echojs-ecosystem/form",
    path: "/docs/forms",
  },
  {
    id: "forms-nested",
    titleKey: "modules.formsNested.title",
    descriptionKey: "modules.formsNested.description",
    package: "@echojs-ecosystem/form",
    path: "/docs/forms/nested",
  },
  {
    id: "state",
    titleKey: "modules.state.title",
    descriptionKey: "modules.state.description",
    package: "@echojs-ecosystem/store",
    path: "/docs/state",
  },
  {
    id: "persistence",
    titleKey: "modules.persistence.title",
    descriptionKey: "modules.persistence.description",
    package: "@echojs-ecosystem/persist",
    path: "/docs/persistence",
  },
  {
    id: "query",
    titleKey: "modules.query.title",
    descriptionKey: "modules.query.description",
    package: "@echojs-ecosystem/query",
    path: "/docs/query",
  },
  {
    id: "account",
    titleKey: "modules.account.title",
    descriptionKey: "modules.account.description",
    package: "@echojs-ecosystem/store + @echojs-ecosystem/persist",
    path: "/docs/account",
    requiresAuth: true,
  },
];

export const getDocsModule = (id: string): DocsModuleMeta | undefined =>
  docsModules.find((m) => m.id === id);

export const findDocsModuleByPath = (pathname: string): DocsModuleMeta | undefined => {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return [...docsModules]
    .sort((a, b) => b.path.length - a.path.length)
    .find((m) => normalized === m.path || normalized.startsWith(`${m.path}/`));
};
