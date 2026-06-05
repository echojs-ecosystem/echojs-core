export { SponsorsBoard } from "@widgets/sponsors/sponsors-board.js";
export { SponsorsSectionView } from "@widgets/sponsors/ui/sponsors-section.view.js";

import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { SponsorsSectionView } from "@widgets/sponsors/ui/sponsors-section.view.js";

export const SponsorsSection = (): Child => SponsorsSectionView();
