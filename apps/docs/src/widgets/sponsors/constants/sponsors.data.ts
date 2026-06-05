export type SponsorTier = "gold" | "silver" | "bronze";

export type MockSponsor = {
  name: string;
  initials: string;
  href: string;
  tier: SponsorTier;
  /** Tailwind gradient stops for the round logo, e.g. `from-sky-500 to-blue-600` */
  logoGradient: string;
};

export type SponsorTierGroup = {
  tier: SponsorTier;
  label: string;
  icon: string;
  sponsors: MockSponsor[];
};

export const becomeSponsorUrl = "https://github.com/sponsors/echojs";

export const sponsorTierGroups: SponsorTierGroup[] = [
  {
    tier: "gold",
    label: "Gold",
    icon: "★",
    sponsors: [
      {
        name: "Nebula Cloud",
        initials: "NC",
        href: "https://example.com/nebula",
        tier: "gold",
        logoGradient: "from-violet-500 to-purple-700",
      },
      {
        name: "Signal Labs",
        initials: "SL",
        href: "https://example.com/signal-labs",
        tier: "gold",
        logoGradient: "from-sky-400 to-blue-600",
      },
      {
        name: "Hyperdom Inc",
        initials: "HI",
        href: "https://example.com/hyperdom",
        tier: "gold",
        logoGradient: "from-echo-400 to-echo-600",
      },
      {
        name: "Reactive Systems",
        initials: "RS",
        href: "https://example.com/reactive",
        tier: "gold",
        logoGradient: "from-rose-400 to-pink-600",
      },
    ],
  },
  {
    tier: "silver",
    label: "Silver",
    icon: "+",
    sponsors: [
      {
        name: "Pulse Analytics",
        initials: "PA",
        href: "https://example.com/pulse",
        tier: "silver",
        logoGradient: "from-teal-400 to-cyan-600",
      },
      {
        name: "StackForge",
        initials: "SF",
        href: "https://example.com/stackforge",
        tier: "silver",
        logoGradient: "from-indigo-400 to-violet-600",
      },
      {
        name: "Canvas UI",
        initials: "CU",
        href: "https://example.com/canvas",
        tier: "silver",
        logoGradient: "from-fuchsia-400 to-purple-600",
      },
      {
        name: "Edge Runtime",
        initials: "ER",
        href: "https://example.com/edge",
        tier: "silver",
        logoGradient: "from-lime-400 to-green-600",
      },
      {
        name: "Open Query",
        initials: "OQ",
        href: "https://example.com/open-query",
        tier: "silver",
        logoGradient: "from-orange-400 to-amber-600",
      },
      {
        name: "Echo Ventures",
        initials: "EV",
        href: "https://example.com/echo-ventures",
        tier: "silver",
        logoGradient: "from-stone-400 to-stone-600",
      },
    ],
  },
  {
    tier: "bronze",
    label: "Bronze",
    icon: "◆",
    sponsors: [
      {
        name: "Byteform",
        initials: "BF",
        href: "https://example.com/byteform",
        tier: "bronze",
        logoGradient: "from-amber-600 to-orange-800",
      },
      {
        name: "Kitstream",
        initials: "KS",
        href: "https://example.com/kitstream",
        tier: "bronze",
        logoGradient: "from-yellow-600 to-amber-800",
      },
      {
        name: "Nullhost",
        initials: "NH",
        href: "https://example.com/nullhost",
        tier: "bronze",
        logoGradient: "from-orange-500 to-red-800",
      },
      {
        name: "Patchwork",
        initials: "PW",
        href: "https://example.com/patchwork",
        tier: "bronze",
        logoGradient: "from-amber-500 to-yellow-700",
      },
      {
        name: "Querykit",
        initials: "QK",
        href: "https://example.com/querykit",
        tier: "bronze",
        logoGradient: "from-stone-500 to-amber-900",
      },
      {
        name: "Relayops",
        initials: "RO",
        href: "https://example.com/relayops",
        tier: "bronze",
        logoGradient: "from-amber-700 to-stone-800",
      },
      {
        name: "Signalware",
        initials: "SW",
        href: "https://example.com/signalware",
        tier: "bronze",
        logoGradient: "from-orange-600 to-amber-900",
      },
      {
        name: "Typeforge",
        initials: "TF",
        href: "https://example.com/typeforge",
        tier: "bronze",
        logoGradient: "from-yellow-700 to-orange-900",
      },
    ],
  },
];

export const goldTier = sponsorTierGroups.find((g) => g.tier === "gold")!;
export const silverTier = sponsorTierGroups.find((g) => g.tier === "silver")!;
export const bronzeTier = sponsorTierGroups.find((g) => g.tier === "bronze")!;
