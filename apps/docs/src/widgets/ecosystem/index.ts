import type { EcosystemPackage } from "@widgets/ecosystem/constants/ecosystem-packages.js";
import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { EcosystemPackageCardView } from "@widgets/ecosystem/ui/ecosystem-package-card.view.js";
import { EcosystemSectionView } from "@widgets/ecosystem/ui/ecosystem-section.view.js";

export const EcosystemPackageCard = (pkg: EcosystemPackage): Child =>
  EcosystemPackageCardView({ pkg });

export const EcosystemSection = (): Child => EcosystemSectionView();
