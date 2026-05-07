import { createComponent } from "@echojs/hyperdom";
import { $nestedModel } from "./example4-nested.model";
import { Example4NestedView } from "./example4-nested.view";

export const Example4NestedComponent = createComponent(
  $nestedModel,
  Example4NestedView,
);
