import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { button, div, span } from "@echojs-ecosystem/hyperdom";
import { packageInstallStyles } from "@widgets/package-install/ui/package-install.view.styles.js";
import { HighlightedCommand } from "@widgets/package-install/highlighted-command.js";
import { PackageManagerIcon } from "@widgets/package-install/pm-icons.js";
import type { PackageInstallVM } from "@widgets/package-install/types/package-install.types.js";

const styles = packageInstallStyles();

export const PackageInstallView = createView((vm: PackageInstallVM): Child => {
  return div({ class: styles.root() }, [
    div({ class: styles.panel() }, [
      div({ class: styles.tabs() }, [
        ...vm.managers.map((pm) =>
          button(
            {
              type: "button",
              class: () =>
                [styles.tab(), vm.isManagerActive(pm.id) ? styles.tabActive() : ""]
                  .filter(Boolean)
                  .join(" "),
              onClick: () => vm.setManager(pm.id),
              "aria-label": `Show install command for ${pm.label}`,
            },
            [span({ class: styles.tabIcon() }, [PackageManagerIcon(pm.id)]), pm.label],
          ),
        ),
      ]),
      div(
        {
          class: styles.body(),
          role: "button",
          tabIndex: 0,
          onClick: () => void vm.copy(),
          onKeydown: vm.onBodyKeydown,
          "aria-label": "Copy install command",
        },
        [
          span(
            {
              class: () =>
                [styles.copyHint(), vm.$copied.value() ? styles.copyHintVisible() : ""]
                  .filter(Boolean)
                  .join(" "),
            },
            vm.copyHint,
          ),
          () => HighlightedCommand([...vm.activeTokens()]),
        ],
      ),
    ]),
  ]);
}, "PackageInstallView");
