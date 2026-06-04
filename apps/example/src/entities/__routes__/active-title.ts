import { computed } from "@echojs-ecosystem/reactivity";
import { i18n } from "@app/providers/i18n.js";
import { findDocsModuleByPath } from "@app/config/docs-modules.js";
import { catalogVariantPage } from "@pages/workspace/catalog/catalog-variant.page.js";
import { filesPage } from "@pages/workspace/files/workspace-files.page.js";
import { slowPage } from "@pages/workspace/slow/workspace-slow.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";
import { userPage } from "@pages/workspace/users/user-detail.page.js";
import { usersListPage } from "@pages/workspace/users/users-list.page.js";
import { workspaceSprintPage } from "@pages/workspace/sprint/workspace-sprint.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";

export const $activePageTitle = computed(() => {
  const path = typeof location !== "undefined" ? location.pathname : "/";

  if (path === "/" || path.startsWith("/auth")) {
    return i18n.t("hub.title");
  }

  const docsModule = findDocsModuleByPath(path);
  if (docsModule) {
    return i18n.t(docsModule.titleKey);
  }

  if (
    workspaceHomePage.$isOpened.value() &&
    !userPage.$isOpened.value() &&
    !workspaceSprintPage.$isOpened.value() &&
    !catalogVariantPage.$isOpened.value()
  ) {
    return i18n.t("workspace.title");
  }
  if (usersListPage.$isOpened.value() && !userPage.$isOpened.value()) {
    return i18n.t("workspace.pages.users");
  }
  if (userPage.$isOpened.value()) {
    const tab = userPage.$query.value()?.tab;
    const id = userPage.$params.value()?.id ?? "?";
    return i18n.t("workspace.userProfile", {
      id,
      tab: tab ? i18n.t("workspace.userTabSuffix", { tab }) : "",
    });
  }
  if (workspaceSprintPage.$isOpened.value()) {
    const p = workspaceSprintPage.$params.value();
    const tab = workspaceSprintPage.$query.value()?.tab ?? "overview";
    return i18n.t("workspace.pages.sprint", { sprintId: p?.sprintId ?? "?", tab });
  }
  if (catalogVariantPage.$isOpened.value()) {
    const p = catalogVariantPage.$params.value();
    const tab = catalogVariantPage.$query.value()?.tab ?? "specs";
    return i18n.t("workspace.pages.catalog", {
      productId: p?.productId ?? "?",
      variantId: p?.variantId ?? "?",
      tab,
    });
  }
  if (slowPage.$isOpened.value()) return i18n.t("workspace.pages.slow");
  if (settingsPage.$isOpened.value()) return i18n.t("workspace.pages.settings");
  if (filesPage.$isOpened.value()) {
    return i18n.t("workspace.pages.files", {
      path: filesPage.$params.value()?.["*"] ?? "",
    });
  }
  return i18n.t("workspace.title");
});
