import type { NormalizedRequestOptions } from "../types/internal";
import type { HttpResponse } from "../types/response";
import type { HttpTimings } from "../types/timings";
import { HttpClientError } from "./http-client-error";

/** Body could not be decoded as requested (JSON, text encoding, etc.). */
export class ParseError extends HttpClientError {
  declare readonly response: HttpResponse<unknown> | undefined;

  constructor(
    message: string,
    opts: {
      cause?: unknown;
      request?: Readonly<NormalizedRequestOptions>;
      response?: HttpResponse<unknown>;
      timings?: HttpTimings;
      retryCount?: number;
      context?: Record<string, unknown>;
    } = {},
  ) {
    super(message, { ...opts, code: "ERR_PARSE" });
    this.response = opts.response;
  }
}
