import { code, div, h3, p, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import type { LabModuleMeta } from "@app/config/lab-modules.js";

export const ModuleHeader = (module: Pick<LabModuleMeta, "title" | "description" | "package">): Child =>
  div({ class: "module-header" }, [
    div({ class: "module-header__top" }, [
      h3(null, module.title),
      span({ class: "module-header__package" }, code(null, module.package)),
    ]),
    p({ class: "module-header__desc" }, module.description),
  ]);
