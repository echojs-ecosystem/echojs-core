import { NavLink } from "@echojs-ecosystem/router";
import { div, p, section } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { getDocsModule } from "@app/config/docs-modules.js";
import { i18n } from "@app/providers/i18n.js";
import { $miniFormsModel, MiniFormsView } from "@features/forms-mini/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";
import { formsNestedPage } from "@pages/docs/forms/nested/forms-nested.page.js";

const meta = getDocsModule("forms")!;

export const FormsView = (): Child =>
  section({ class: "page page--feature" }, [
    ModuleHeader(meta),
    p({ class: "page__hint" }, [
      () => i18n.t("forms.nestedPrefix"),
      " — ",
      NavLink({ to: formsNestedPage, children: () => i18n.t("modules.formsNested.title") }),
      ".",
    ]),
    div({ class: "page__body" }, MiniFormsView($miniFormsModel())),
  ]);
