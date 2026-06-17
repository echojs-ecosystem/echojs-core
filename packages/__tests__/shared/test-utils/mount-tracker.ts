export const createMountTracker = () => {
  const mountCounts = new Map<string, number>()
  const nodes = new Map<string, Element | null>()

  const track =
    (id: string) =>
    (el: Element | null): void => {
      if (el) {
        mountCounts.set(id, (mountCounts.get(id) ?? 0) + 1)
        nodes.set(id, el)
      } else {
        nodes.set(id, null)
      }
    }

  return { mountCounts, nodes, track }
}
