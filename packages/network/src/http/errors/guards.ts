import { AbortError } from "./abort-error";
import { HTTPStatusError } from "./http-status-error";
import { HttpClientError } from "./http-client-error";
import { NetworkError } from "./network-error";
import { TimeoutError } from "./timeout-error";

export function isHttpError(error: unknown): error is HttpClientError {
  return error instanceof HttpClientError;
}

export function isTimeoutError(error: unknown): error is TimeoutError {
  return error instanceof TimeoutError;
}

export function isAbortError(error: unknown): error is AbortError {
  return error instanceof AbortError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isStatusError(error: unknown): error is HTTPStatusError {
  return error instanceof HTTPStatusError;
}
