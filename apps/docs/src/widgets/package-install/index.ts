import type { Child } from "@echojs/hyperdom";
import { createComponent } from "@echojs/hyperdom";
import { createPackageInstallModel } from "@widgets/package-install/model/package-install.model.js";
import type { PackageInstallProps } from "@widgets/package-install/types/package-install.types.js";
import { PackageInstallView } from "@widgets/package-install/ui/package-install.view.js";

/** Home hero — `npm create echojs@latest`. */
export const PackageInstall = (props?: PackageInstallProps): Child =>
  createComponent(createPackageInstallModel(props ?? {}), PackageInstallView, {
    name: "PackageInstall",
  })();

/** Package docs — `npm install @echojs/<pkg>`. */
export const PackageInstallAdd = (packageName: string): Child =>
  PackageInstall({ mode: { kind: "add", packageName } });
