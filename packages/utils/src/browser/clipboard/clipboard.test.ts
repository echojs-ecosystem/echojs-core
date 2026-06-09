import { describe, expect, it, vi } from "vitest";

import { clipboard as createClipboard } from "./clipboard";

describe("clipboard", () => {
  it("copies text successfully", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const clipboard = createClipboard();
    await clipboard.copy("hello");
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(clipboard.text()).toBe("hello");
    expect(clipboard.copied()).toBe(true);
    clipboard.dispose();
  });

  it("captures clipboard errors", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const clipboard = createClipboard();
    await expect(clipboard.copy("fail")).rejects.toThrow("denied");
    expect(clipboard.error()).toBeInstanceOf(Error);
    clipboard.dispose();
  });
});
