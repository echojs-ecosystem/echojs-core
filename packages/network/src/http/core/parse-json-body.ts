import { ParseError } from "../errors/parse-error";
import type { NormalizedRequestOptions } from "../types/internal";
import type { HttpResponse } from "../types/response";

export async function parseJsonBody<T>(
  text: string,
  meta: {
    request?: Readonly<NormalizedRequestOptions>;
    response?: HttpResponse<unknown>;
    context?: Record<string, unknown>;
  },
): Promise<T> {
  try {
    return JSON.parse(text) as T;
  } catch (cause) {
    throw new ParseError("Invalid JSON body", {
      cause,
      request: meta.request,
      response: meta.response,
      context: meta.context,
    });
  }
}
