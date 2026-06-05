import type { Child } from "@echojs-ecosystem/hyperdom";
import { createComponent } from "@echojs-ecosystem/hyperdom";
import {
  createPackagePlaygroundModel,
  type PackagePlaygroundModelProps,
} from "./model/package-playground.model.js";
import { PackagePlaygroundView } from "./ui/package-playground.view.js";

/**
 * Dynamic child — tree builds inside hyperdom mount (not while DocRenderer assembles blocks).
 */
export const PackagePlayground = (props: PackagePlaygroundModelProps): Child =>
  createComponent(createPackagePlaygroundModel(props), PackagePlaygroundView, {
    name: "PackagePlayground",
  });
