export const timestamp = (): string =>
  new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const uid = (() => {
  let n = 0;
  return () => {
    n += 1;
    return n;
  };
})();
