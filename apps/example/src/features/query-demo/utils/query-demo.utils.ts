/** Respects AbortSignal — rejects when aborted before the timer finishes. */
export const delay = (ms: number, signal: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(() => resolve(), ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });

export const abortLabel = (signal: AbortSignal | null | undefined): string => {
  if (!signal) return "no signal";
  if (!signal.aborted) return "active";
  const reason = signal.reason;
  if (reason === undefined) return "aborted";
  if (typeof reason === "string") return `aborted: ${reason}`;
  if (reason instanceof Error) return `aborted: ${reason.message}`;
  return "aborted";
};

export const timestamp = (): string =>
  new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
