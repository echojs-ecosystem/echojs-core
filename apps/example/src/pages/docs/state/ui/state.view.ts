import { button, code, div, h4, p, section, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { getDocsModule } from "@app/config/docs-modules.js";
import { i18n } from "@app/providers/i18n.js";
import { counterLabel, counterStore, themeStore } from "@pages/docs/state/state.model.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getDocsModule("state")!;

export const StateView = (): Child =>
  section({ class: "page page--feature" }, [
    ModuleHeader(meta),
    p({ class: "page__hint" }, () => i18n.t("state.hint")),
    div({ class: "demo-store__grid" }, [
      section({ class: "demo-store__card" }, [
        h4(null, () => i18n.t("state.themeTitle")),
        p(null, [
          () => i18n.t("state.themeValue"),
          " ",
          span({ class: "demo-store__badge" }, () => themeStore.value()),
        ]),
        div({ class: "demo-store__actions" }, [
          button({ type: "button", onClick: () => themeStore.toggle() }, () => i18n.t("state.toggle")),
          button(
            { type: "button", class: "secondary", onClick: () => themeStore.setDark() },
            () => i18n.t("state.dark"),
          ),
          button(
            { type: "button", class: "secondary", onClick: () => themeStore.setLight() },
            () => i18n.t("state.light"),
          ),
        ]),
      ]),
      section({ class: "demo-store__card" }, [
        h4(null, () => i18n.t("state.counterTitle")),
        p(null, [
          code(null, () => String(counterStore.value())),
          () => i18n.t("state.selectArrow"),
          code(null, () => counterLabel.value()),
        ]),
        div({ class: "demo-store__actions" }, [
          button({ type: "button", onClick: () => counterStore.decrement() }, "−"),
          button({ type: "button", onClick: () => counterStore.increment() }, "+"),
          button({ type: "button", class: "secondary", onClick: () => counterStore.add(5) }, "+5"),
        ]),
      ]),
    ]),
  ]);
