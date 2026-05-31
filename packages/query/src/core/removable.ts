export class Removable {
  protected gcTimeoutId: ReturnType<typeof setTimeout> | undefined
  protected gcTimeMs = Number.POSITIVE_INFINITY

  protected scheduleGc(onRemove: () => void): void {
    this.clearGcTimeout()
    if (!Number.isFinite(this.gcTimeMs)) return

    this.gcTimeoutId = setTimeout(() => {
      onRemove()
    }, this.gcTimeMs)
  }

  protected clearGcTimeout(): void {
    if (this.gcTimeoutId !== undefined) {
      clearTimeout(this.gcTimeoutId)
      this.gcTimeoutId = undefined
    }
  }

  updateGcTime(cacheTimeMs: number): void {
    this.gcTimeMs = cacheTimeMs
  }
}
