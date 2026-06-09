import { toggle } from "../toggle/toggle";

/** Preset alias for {@link toggle} with boolean semantics. */
export const boolean = (initial = false) => toggle(initial);
