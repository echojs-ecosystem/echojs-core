import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { div, h, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { becomeSponsorUrl, type SponsorTier, type SponsorTierGroup } from "@widgets/sponsors/constants/sponsors.data.js";
import { sponsorsTierStyles } from "@widgets/sponsors/sponsors-tier-panel.styles.js";
import { cn } from "@core/styles/cn.js";
import { SponsorLogo } from "@widgets/sponsors/sponsor-logo.js";

const tier = sponsorsTierStyles();

type TierUi = {
  panel: string;
  headerIcon: string;
  headerLabel: string;
  grid: string;
  cell: string;
  logoSize: "gold" | "silver" | "bronze";
  nameClass: string;
};

const tierUi = (id: SponsorTier): TierUi => {
  switch (id) {
    case "gold":
      return {
        panel: cn(tier.panel(), tier.panelGold()),
        headerIcon: tier.headerIconGold(),
        headerLabel: tier.headerLabelGold(),
        grid: cn(tier.grid(), tier.gridGold()),
        cell: cn(tier.cell(), tier.cellGold()),
        logoSize: "gold",
        nameClass: tier.cellNameVisible(),
      };
    case "silver":
      return {
        panel: cn(tier.panel(), tier.panelSilver()),
        headerIcon: tier.headerIconSilver(),
        headerLabel: tier.headerLabelSilver(),
        grid: cn(tier.grid(), tier.gridSilver()),
        cell: cn(tier.cell(), tier.cellSilver()),
        logoSize: "silver",
        nameClass: tier.cellName(),
      };
    case "bronze":
      return {
        panel: cn(tier.panel(), tier.panelBronze()),
        headerIcon: tier.headerIconBronze(),
        headerLabel: tier.headerLabelBronze(),
        grid: cn(tier.grid(), tier.gridBronze()),
        cell: cn(tier.cell(), tier.cellBronze()),
        logoSize: "bronze",
        nameClass: tier.cellName(),
      };
  }
};

type SponsorsTierPanelProps = {
  group: SponsorTierGroup;
  showPlaceholder?: boolean;
  maxSponsors?: number;
};

const SponsorCell = (sponsor: SponsorTierGroup["sponsors"][number], ui: TierUi): Child =>
  h(
    "a",
    {
      href: sponsor.href,
      target: "_blank",
      rel: "noopener noreferrer",
      class: ui.cell,
      "aria-label": sponsor.name,
    },
    [
      SponsorLogo({ sponsor, size: ui.logoSize }),
      p({ class: ui.nameClass }, sponsor.name),
    ],
  );

const PlaceholderCell = (): Child =>
  h(
    "a",
    {
      href: becomeSponsorUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      class: tier.cellPlaceholder(),
      "aria-label": "Become a sponsor",
    },
    [
      span({ class: tier.placeholderIcon() }, "+"),
      p({ class: tier.placeholderText() }, "Your logo here"),
    ],
  );

export const SponsorsTierPanel = ({
  group,
  showPlaceholder = false,
  maxSponsors,
}: SponsorsTierPanelProps): Child => {
  const ui = tierUi(group.tier);
  const sponsors = maxSponsors ? group.sponsors.slice(0, maxSponsors) : group.sponsors;
  const cells: Child[] = sponsors.map((s) => SponsorCell(s, ui));

  if (showPlaceholder && group.tier === "gold" && sponsors.length < 4) {
    cells.push(PlaceholderCell());
  }

  return div({ class: ui.panel }, [
    div({ class: tier.header() }, [
      span({ class: ui.headerIcon }, group.icon),
      span({ class: ui.headerLabel }, group.label),
    ]),
    div({ class: ui.grid }, cells),
  ]);
};
