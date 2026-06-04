import type { EchoBodyAttributes } from "./types";

const toClassTokens = (value: string | string[]): string[] => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => item.split(/\s+/).filter(Boolean));
  }
  return value.split(/\s+/).filter(Boolean);
};

/** Applies {@link EchoAppOptions.body} to `document.body` before mount (browser only). */
export const applyBodyAttributes = (body: EchoBodyAttributes | undefined): void => {
  if (body === undefined || typeof document === "undefined") {
    return;
  }

  if (body.id !== undefined) {
    document.body.id = body.id;
  }

  if (body.class !== undefined) {
    document.body.classList.add(...toClassTokens(body.class));
  }
};
