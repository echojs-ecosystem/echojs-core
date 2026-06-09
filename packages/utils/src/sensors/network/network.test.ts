import { describe, expect, it, vi } from "vitest";

import { network as createNetwork } from "./network";

describe("network", () => {
  it("exposes online state", () => {
    const network = createNetwork();
    expect(network.online()).toBe(true);
    network.dispose();
  });

  it("reacts to online and offline events", () => {
    const network = createNetwork();

    window.dispatchEvent(new Event("offline"));
    expect(network.online()).toBe(false);

    window.dispatchEvent(new Event("online"));
    expect(network.online()).toBe(true);
    network.dispose();
  });

  it("syncs connection info on change", () => {
    const listeners = new Set<() => void>();
    const connection = {
      effectiveType: "4g",
      downlink: 10,
      rtt: 50,
      saveData: false,
      addEventListener: vi.fn((_type: string, listener: () => void) => {
        listeners.add(listener);
      }),
      removeEventListener: vi.fn((_type: string, listener: () => void) => {
        listeners.delete(listener);
      }),
    };

    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: connection,
    });

    const network = createNetwork();
    expect(network.effectiveType()).toBe("4g");
    expect(network.downlink()).toBe(10);

    connection.effectiveType = "3g";
    connection.downlink = 1.5;
    for (const listener of listeners) listener();
    expect(network.effectiveType()).toBe("3g");
    expect(network.downlink()).toBe(1.5);

    network.dispose();
    expect(connection.removeEventListener).toHaveBeenCalled();
  });
});
