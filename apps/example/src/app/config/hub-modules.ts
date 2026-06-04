import type { TKey } from "@app/providers/i18n.js";

export type HubModuleMeta = {
  id: "docs" | "workspace";
  titleKey: TKey;
  descriptionKey: TKey;
  path: string;
};

export const hubModules: HubModuleMeta[] = [
  {
    id: "docs",
    titleKey: "hub.docs.title",
    descriptionKey: "hub.docs.description",
    path: "/docs",
  },
  {
    id: "workspace",
    titleKey: "hub.workspace.title",
    descriptionKey: "hub.workspace.description",
    path: "/workspace",
  },
];
