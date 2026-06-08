import type { NormalizedRequestOptions } from "../types/internal";
import type { HttpTimings } from "../types/timings";
import { HttpClientError } from "./http-client-error";

/** Retry budget exhausted or retry policy declined to continue. */
export class RetryError extends HttpClientError {
  readonly lastError: unknown;

  constructor(
    message: string,
    opts: {
      lastError: unknown;
      request?: Readonly<NormalizedRequestOptions>;
      timings?: HttpTimings;
      retryCount?: number;
      context?: Record<string, unknown>;
      cause?: unknown;
      requestId?: string;
    },
  ) {
    super(message, { ...opts, code: "ERR_RETRY", cause: opts.cause ?? opts.lastError });
    this.lastError = opts.lastError;
  }
}
