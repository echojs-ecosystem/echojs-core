import type { EcosystemPackage } from "@shared/home/ecosystem-packages.js";
import type { Child } from "@echojs/hyperdom";
import { EcosystemPackageCardView } from "@widgets/ecosystem/ui/ecosystem-package-card.view.js";

export const EcosystemPackageCard = (pkg: EcosystemPackage): Child =>
  EcosystemPackageCardView({ pkg });
