import { createComponent } from "@echojs-ecosystem/framework/hyperdom";
import { createRoadmapModel } from "@entities/roadmap/model/roadmap.model.js";
import { RoadmapView } from "@entities/roadmap/ui/roadmap.view.js";

export { createRoadmapModel } from "@entities/roadmap/model/roadmap.model.js";
export type { RoadmapVM } from "@entities/roadmap/types/roadmap.types.js";
export { RoadmapView } from "@entities/roadmap/ui/roadmap.view.js";

export const Roadmap = createComponent(createRoadmapModel, RoadmapView, {
  name: "Roadmap",
});
