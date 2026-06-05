import type { Child } from "@echojs/hyperdom";
import { div } from "@echojs/hyperdom";
import { goldTier, silverTier, sponsorTierGroups } from "@shared/sponsors/data.js";
import { sponsorsBoardStyles } from "@widgets/sponsors/sponsors-board.styles.js";
import { SponsorsTierPanel } from "@widgets/sponsors/sponsors-tier-panel.js";

const board = sponsorsBoardStyles();

type SponsorsBoardProps = {
  variant?: "full" | "preview";
};

export const SponsorsBoard = ({ variant = "full" }: SponsorsBoardProps): Child => {
  if (variant === "preview") {
    return div({ class: board.stack() }, [
      SponsorsTierPanel({ group: goldTier, showPlaceholder: true, maxSponsors: 3 }),
    ]);
  }

  return div({ class: board.stack() }, sponsorTierGroups.map((group) => SponsorsTierPanel({ group })));
};
