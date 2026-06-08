// Client
export { createHttpClient } from "./client/create-http-client";
export type { HttpClient, HttpClientBuilder, HttpRequestPromise } from "./client/client";

// Types (public API)
export type {
  BodyInitLike,
  HeadersInitLike,
  HttpClientDefaults,
  HttpMethod,
  HttpMethodInput,
  RequestOptions,
  RetryContext,
  SearchParamsInitLike,
  HttpHooks,
  ResponseLike,
  AfterResponseRetryDirective,
  AdapterCapabilities,
  AdapterContext,
  AdapterResponse,
  AdapterTimings,
  HttpAdapter,
  HttpResponse,
  HttpHeaders,
  HttpTimings,
  HttpErrorCode,
  // Internal (use with caution)
  NormalizedRequestOptions,
} from "./types/index";

// Options
export {
  mergeRequestOptions,
  normalizeRequestOptions,
  mergeAndNormalize,
  validateRequestOptions,
} from "./options/index";

// Adapters
export { fetchAdapter } from "./adapters/fetch-adapter";

// Errors
export {
  HttpClientError,
  RequestError,
  NetworkError,
  TimeoutError,
  AbortError,
  HTTPStatusError,
  ParseError,
  RetryError,
  RedirectError,
  isAbortError,
  isHttpError,
  isNetworkError,
  isStatusError,
  isTimeoutError,
  type TimeoutPhase,
} from "./errors/index";

// Core (advanced usage)
export {
  // Response
  buildBodyValue,
  HttpResponseImpl,
  // Hooks
  runInitHooks,
  runBeforeRequestHooks,
  runBeforeRedirectHooks,
  runBeforeRetryHooks,
  runAfterResponseHooks,
  runBeforeErrorHooks,
  // Retry
  defaultCalculateDelay,
  shouldRetryAttempt,
  // Timeout
  createTimeoutSignal,
  mergeAbortSignals,
  throwIfAborted,
} from "./core/index";

// Utils (advanced usage)
export {
  mergeHeaders,
  invariant,
  isObject,
  mergeRecord,
  defaultGenerateRequestId,
  readStreamToBytes,
  mergeTimings,
  nowMs,
} from "./utils/index";

// Intentionally not exporting:
// - Internal retry control error types
// - executeRequest (internal implementation detail)
// - Redirect utilities (internal)
