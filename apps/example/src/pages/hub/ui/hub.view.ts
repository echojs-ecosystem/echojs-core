import { NavLink } from "@echojs-ecosystem/router";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { button, code, div, h1, p, section } from "@echojs-ecosystem/hyperdom";
import { hubModules } from "@app/config/hub-modules.js";
import { i18n } from "@app/providers/i18n.js";
import { docsHomePage } from "@pages/docs/home/docs-home.page.js";
import { workspaceHomePage } from "@pages/workspace/home/workspace-home.page.js";

const hubPageById = {
  docs: docsHomePage,
  workspace: workspaceHomePage,
} as const;

const HubCard = (meta: (typeof hubModules)[number]): Child =>
  section({ class: "hub-card" }, [
    h1({ class: "hub-card__title" }, () => i18n.t(meta.titleKey)),
    p({ class: "hub-card__desc" }, () => i18n.t(meta.descriptionKey)),
    code({ class: "hub-card__path" }, meta.path),
    NavLink({
      to: hubPageById[meta.id],
      class: "hub-card__link",
      children: () => i18n.t("hub.openModule"),
    }),
  ]);

export const HubView = (): Child =>
  div({ class: "page hub" }, [
    section({ class: "hub-hero" }, [
      h1(null, () => i18n.t("hub.title")),
      p(null, () => i18n.t("hub.lead")),
    ]),
    div({ class: "hub-grid" }, hubModules.map(HubCard)),
    p({ class: "hub-hint" }, () => i18n.t("hub.hint")),
  ]);
