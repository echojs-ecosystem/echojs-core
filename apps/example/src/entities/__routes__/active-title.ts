import { computed } from "@echojs-ecosystem/reactivity";
import { catalogVariantPage } from "@pages/workspace/catalog/variant/ui/page.js";
import { filesPage } from "@pages/workspace/files/ui/page.js";
import { slowPage } from "@pages/workspace/slow/ui/page.js";
import { settingsPage } from "@pages/workspace/settings/ui/page.js";
import { userPage } from "@pages/workspace/users/detail/ui/page.js";
import { usersListPage } from "@pages/workspace/users/list/ui/page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/ui/page.js";
import { workspaceHomePage } from "@pages/workspace/home/ui/page.js";
import { findModuleByPath } from "@app/config/lab-modules.js";

export const $activePageTitle = computed(() => {
  const path = typeof location !== "undefined" ? location.pathname : "/";

  const module = findModuleByPath(path);
  if (module && module.section !== "workspace") {
    return module.title;
  }

  if (
    workspaceHomePage.$isOpened.value() &&
    !userPage.$isOpened.value() &&
    !workspaceSprintPage.$isOpened.value() &&
    !catalogVariantPage.$isOpened.value()
  ) {
    return "Workspace";
  }
  if (usersListPage.$isOpened.value() && !userPage.$isOpened.value()) {
    return "Пользователи";
  }
  if (userPage.$isOpened.value()) {
    const tab = userPage.$query.value()?.tab;
    return `Пользователь #${userPage.$params.value()?.id ?? "?"}${tab ? ` · ${tab}` : ""}`;
  }
  if (workspaceSprintPage.$isOpened.value()) {
    const p = workspaceSprintPage.$params.value();
    const tab = workspaceSprintPage.$query.value()?.tab ?? "overview";
    return `Спринт ${p?.sprintId} · ${tab}`;
  }
  if (catalogVariantPage.$isOpened.value()) {
    const p = catalogVariantPage.$params.value();
    const tab = catalogVariantPage.$query.value()?.tab ?? "specs";
    return `${p?.productId} / ${p?.variantId} · ${tab}`;
  }
  if (slowPage.$isOpened.value()) return "Медленная загрузка";
  if (settingsPage.$isOpened.value()) return "Настройки workspace";
  if (filesPage.$isOpened.value()) {
    return `Файлы: ${filesPage.$params.value()?.["*"] ?? ""}`;
  }
  return "Workspace";
});
