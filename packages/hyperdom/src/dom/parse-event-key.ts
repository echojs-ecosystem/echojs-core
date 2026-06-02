/** Parses React-style event props (`onClick` → `click`). */
export const parseEventKey = (key: string): { event: string } | null => {
  if (!/^on[A-Z]/.test(key)) return null;

  const eventName = key.slice(2);
  const event = eventName.charAt(0).toLowerCase() + eventName.slice(1);
  return { event };
};
