import { signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";
import {
  addPackageManagers,
  projectScaffoldManagers,
  type PackageManager,
  type PackageManagerId,
} from "@shared/home/install-commands.js";
import type {
  PackageInstallMode,
  PackageInstallProps,
  PackageInstallVM,
} from "@widgets/package-install/types/package-install.types.js";

const resolveManagers = (mode: PackageInstallMode): PackageManager[] => {
  if (mode.kind === "add") return addPackageManagers(mode.packageName);
  return projectScaffoldManagers;
};

const defaultManager = (managers: PackageManager[]): PackageManagerId =>
  managers.find((m) => m.id === "npm")?.id ?? managers[0]!.id;

export const createPackageInstallModel = (props: PackageInstallProps = {}) =>
  createModel((): PackageInstallVM => {
    const mode: PackageInstallMode = props.mode ?? { kind: "scaffold" };
    const managers = resolveManagers(mode);
    const $manager = signal<PackageManagerId>(defaultManager(managers));
    const $copied = signal(false);

    const active = () => managers.find((m) => m.id === $manager.value()) ?? managers[0]!;

    const copy = async (): Promise<void> => {
      await navigator.clipboard.writeText(active().command);
      $copied.set(true);
      setTimeout(() => $copied.set(false), 2000);
    };

    return {
      $manager,
      $copied,
      managers,
      activeCommand: () => active().command,
      activeTokens: () => active().tokens,
      isManagerActive: (id) => $manager.value() === id,
      setManager: (id) => $manager.set(id),
      copy,
      copyHint: () => ($copied.value() ? "Copied" : "Copy"),
      onBodyKeydown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void copy();
        }
      },
    };
  }, "PackageInstallModel");
