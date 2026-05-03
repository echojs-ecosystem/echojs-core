import { createComponent } from "@echojs/hyperdom";
import { $miniFormsModel } from "./example3-mini-forms.model";
import { Example3MiniFormsView } from "./example3-mini-forms.view";

export const Example3MiniFormsComponent = createComponent($miniFormsModel, Example3MiniFormsView);
