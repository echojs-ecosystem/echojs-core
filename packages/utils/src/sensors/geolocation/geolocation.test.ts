import { describe, expect, it, vi } from "vitest";

import { geolocation as createGeolocation } from "./geolocation";

describe("geolocation", () => {
  it("handles missing geolocation API", () => {
    const geo = createGeolocation({ immediate: false });
    expect(geo.coords()).toBeNull();
    geo.dispose();
  });

  it("starts watch when API exists", () => {
    const watchPosition = vi.fn(() => 1);
    const clearWatch = vi.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { watchPosition, clearWatch, getCurrentPosition: vi.fn() },
    });

    const geo = createGeolocation();
    expect(watchPosition).toHaveBeenCalled();
    geo.dispose();
    expect(clearWatch).toHaveBeenCalledWith(1);
  });

  it("updates coords on successful position", () => {
    const coords = {
      latitude: 55.75,
      longitude: 37.62,
      accuracy: 10,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    } as GeolocationCoordinates;

    const watchPosition = vi.fn(
      (success: PositionCallback) => {
        success({ coords, timestamp: 1_700_000_000_000 } as GeolocationPosition);
        return 2;
      },
    );
    const clearWatch = vi.fn();

    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: {
        watchPosition,
        clearWatch,
        getCurrentPosition: vi.fn(),
      },
    });

    const geo = createGeolocation({ immediate: false });
    geo.start();
    expect(geo.coords()?.latitude).toBe(55.75);
    expect(geo.loading()).toBe(false);
    geo.dispose();
  });

  it("refresh uses getCurrentPosition", () => {
    const getCurrentPosition = vi.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: {
        watchPosition: vi.fn(() => 1),
        clearWatch: vi.fn(),
        getCurrentPosition,
      },
    });

    const geo = createGeolocation({ immediate: false });
    geo.refresh();
    expect(getCurrentPosition).toHaveBeenCalled();
    expect(geo.loading()).toBe(true);
    geo.dispose();
  });
});
