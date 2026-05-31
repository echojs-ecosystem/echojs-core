export type LabModuleMeta = {
  id: string;
  title: string;
  description: string;
  package: string;
  path: string;
  requiresAuth?: boolean;
  section: "overview" | "platform" | "workspace";
};

export const labModules: LabModuleMeta[] = [
  {
    id: "dashboard",
    title: "Обзор",
    description: "Карта модулей платформы EchoJS и статус сессии.",
    package: "echojs-core",
    path: "/",
    section: "overview",
  },
  {
    id: "reactivity",
    title: "Реактивность",
    description: "signal, computed, batch, effect, scope/cleanup и интеграция с hyperdom.",
    package: "@echojs/reactivity",
    path: "/reactivity",
    section: "platform",
  },
  {
    id: "forms",
    title: "Формы",
    description: "Поля, Zod-схемы, submit и wireFormModel.",
    package: "@echojs/form",
    path: "/forms",
    section: "platform",
  },
  {
    id: "forms-nested",
    title: "Вложенные формы",
    description: "Динамические массивы полей и вложенные структуры каталога.",
    package: "@echojs/form",
    path: "/forms/nested",
    section: "platform",
  },
  {
    id: "state",
    title: "Состояние",
    description: "Store, производные значения и типизированные actions.",
    package: "@echojs/store",
    path: "/state",
    section: "platform",
  },
  {
    id: "persistence",
    title: "Сохранение",
    description: "Адаптеры storage, hydrate и persist для полей формы.",
    package: "@echojs/persist",
    path: "/persistence",
    section: "platform",
  },
  {
    id: "query",
    title: "Query",
    description: "Кэш, fetch, retry и mutations на JSONPlaceholder API.",
    package: "@echojs/query",
    path: "/query",
    section: "platform",
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Продуктовый сценарий: пользователи, спринты, каталог и guards.",
    package: "@echojs/router",
    path: "/workspace",
    section: "workspace",
  },
  {
    id: "account",
    title: "Аккаунт",
    description: "Профиль, mock-сессия и персональные настройки.",
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
