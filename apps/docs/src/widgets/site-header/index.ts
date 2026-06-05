import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { createComponent } from "@echojs-ecosystem/framework/hyperdom";
import {
  createSiteHeaderModel,
  type SiteHeaderMode,
  type SiteHeaderOptions,
} from "@widgets/site-header/model/site-header.model.js";
import { SiteHeaderView } from "@widgets/site-header/ui/site-header.view.js";

export type { SiteHeaderMode, SiteHeaderOptions } from "@widgets/site-header/model/site-header.model.js";

export const SiteHeader = (options: SiteHeaderOptions = {}): Child =>
  createComponent(createSiteHeaderModel(options), SiteHeaderView, { name: "SiteHeader" })();

export const HomeHeader = (): Child => SiteHeader({ mode: "home" });
