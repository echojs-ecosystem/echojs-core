import type { TKey } from "@app/i18n/keys.js";

export type LabModuleMeta = {
  id: string;
  titleKey: TKey;
  descriptionKey: TKey;
  package: string;
  path: string;
  requiresAuth?: boolean;
  section: "overview" | "platform" | "workspace";
};

export const labModules: LabModuleMeta[] = [
  {
    id: "dashboard",
    titleKey: "modules.dashboard.title",
    descriptionKey: "modules.dashboard.description",
    package: "echojs-core",
    path: "/",
    section: "overview",
  },
  {
    id: "reactivity",
    titleKey: "modules.reactivity.title",
    descriptionKey: "modules.reactivity.description",
    package: "@echojs/reactivity",
    path: "/reactivity",
    section: "platform",
  },
  {
    id: "forms",
    titleKey: "modules.forms.title",
    descriptionKey: "modules.forms.description",
    package: "@echojs/form",
    path: "/forms",
    section: "platform",
  },
  {
    id: "forms-nested",
    titleKey: "modules.formsNested.title",
    descriptionKey: "modules.formsNested.description",
    package: "@echojs/form",
    path: "/forms/nested",
    section: "platform",
  },
  {
    id: "state",
    titleKey: "modules.state.title",
    descriptionKey: "modules.state.description",
    package: "@echojs/store",
    path: "/state",
    section: "platform",
  },
  {
    id: "persistence",
    titleKey: "modules.persistence.title",
    descriptionKey: "modules.persistence.description",
    package: "@echojs/persist",
    path: "/persistence",
    section: "platform",
  },
  {
    id: "query",
    titleKey: "modules.query.title",
    descriptionKey: "modules.query.description",
    package: "@echojs/query",
    path: "/query",
    section: "platform",
  },
  {
    id: "workspace",
    titleKey: "modules.workspace.title",
    descriptionKey: "modules.workspace.description",
    package: "@echojs/router",
    path: "/workspace",
    section: "workspace",
  },
  {
    id: "account",
    titleKey: "modules.account.title",
    descriptionKey: "modules.account.description",
    package: "@echojs/store + @echojs/persist",
    path: "/account",
    requiresAuth: true,
    section: "overview",
  },
];

export const getModule = (id: string): LabModuleMeta | undefined =>
  labModules.find((m) => m.id === id);

export const platformModules = labModules.filter((m) => m.section === "platform");

export const findModuleByPath = (pathname: string): LabModuleMeta | undefined => {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return [...labModules].sort((a, b) => b.path.length - a.path.length).find((m) => {
    if (m.path === "/") return normalized === "/";
    return normalized === m.path || normalized.startsWith(`${m.path}/`);
  });
};
