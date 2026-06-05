import type { Child } from "@echojs/hyperdom";
import { span } from "@echojs/hyperdom";
import type { MockSponsor } from "@shared/sponsors/data.js";
import { sponsorLogoStyles } from "@shared/styles/sponsors.js";
import { cn } from "@shared/styles/cn.js";

type SponsorLogoProps = {
  sponsor: Pick<MockSponsor, "initials" | "name" | "logoGradient">;
  size?: "gold" | "silver" | "bronze";
};

export const SponsorLogo = ({ sponsor, size = "silver" }: SponsorLogoProps): Child => {
  const logo = sponsorLogoStyles({ size });
  return span({ class: cn(logo.root(), `bg-gradient-to-br ${sponsor.logoGradient}`) }, [
    span({ class: logo.label() }, sponsor.name),
    sponsor.initials,
  ]);
};
