import type { Child } from "@echojs-ecosystem/hyperdom";
import { PackageOverviewView } from "./ui/package-overview.view.js";

export type PackageOverviewProps = { packageId: string };

/** Dynamic child — same mount-context fix as {@link PackagePlayground}. */
export const PackageOverview = (props: PackageOverviewProps): Child =>
  () => PackageOverviewView(props);
