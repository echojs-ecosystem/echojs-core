import { createRouteView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { div, p, section } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { i18n } from "@app/i18n/index.js";
import { $miniFormsModel, MiniFormsView } from "@features/forms-mini/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";
import { formsNestedPage } from "@pages/forms/nested/forms-nested.page.js";

const meta = getModule("forms")!;

export const formsPage = createRouteView({
  name: "forms",
  view: () =>
    section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      p({ class: "page__hint" }, [
        () => i18n.t("forms.nestedPrefix"),
        " — ",
        NavLink({ to: formsNestedPage, children: () => i18n.t("modules.formsNested.title") }),
        ".",
      ]),
      div({ class: "page__body" }, MiniFormsView($miniFormsModel())),
    ]),
});
