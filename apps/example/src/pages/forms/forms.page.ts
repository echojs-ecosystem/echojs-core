import { createRouteView } from "@echojs/router";
import { NavLink } from "@echojs/router/hyperdom";
import { div, p, section } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
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
        "Продвинутый сценарий — ",
        NavLink({ to: formsNestedPage, children: "вложенные формы" }),
        ".",
      ]),
      div({ class: "page__body" }, MiniFormsView($miniFormsModel())),
    ]),
});

