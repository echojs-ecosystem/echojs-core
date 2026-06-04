import { code, div, h3, p, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { i18n } from "@app/providers/i18n.js";
import type { DocsModuleMeta } from "@app/config/docs-modules.js";

export const ModuleHeader = (
  module: Pick<DocsModuleMeta, "titleKey" | "descriptionKey" | "package">,
): Child =>
  div({ class: "module-header" }, [
    div({ class: "module-header__top" }, [
      h3(null, () => i18n.t(module.titleKey)),
      span({ class: "module-header__package" }, code(null, module.package)),
    ]),
    p({ class: "module-header__desc" }, () => i18n.t(module.descriptionKey)),
  ]);
