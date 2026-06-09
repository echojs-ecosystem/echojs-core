import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultNavigator, isClient } from "../../core/env";

export interface GeolocationOptions extends PositionOptions {
  /** Start watching immediately. Default `true`. */
  immediate?: boolean;
}

export const geolocation = (options: GeolocationOptions = {}) => {
  const { immediate = true, ...positionOptions } = options;
  const scope = createCleanupScope();

  const $coords = signal<GeolocationCoordinates | null>(null);
  const $timestamp = signal<number | null>(null);
  const $error = signal<GeolocationPositionError | null>(null);
  const $loading = signal(false);

  let watchId: number | undefined;

  const onSuccess = (position: GeolocationPosition) => {
    $loading.set(false);
    $error.set(null);
    $coords.set(position.coords);
    $timestamp.set(position.timestamp);
  };

  const onError = (error: GeolocationPositionError) => {
    $loading.set(false);
    $error.set(error);
  };

  const start = () => {
    if (!isClient || !defaultNavigator?.geolocation) return;
    stop();
    $loading.set(true);
    watchId = defaultNavigator.geolocation.watchPosition(
      onSuccess,
      onError,
      positionOptions,
    );
  };

  const stop = () => {
    if (watchId !== undefined && defaultNavigator?.geolocation) {
      defaultNavigator.geolocation.clearWatch(watchId);
      watchId = undefined;
    }
    $loading.set(false);
  };

  const refresh = () => {
    if (!isClient || !defaultNavigator?.geolocation) return;
    $loading.set(true);
    defaultNavigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
  };

  if (isClient && immediate && defaultNavigator?.geolocation) {
    start();
  }

  scope.add(stop);

  return {
    coords: () => $coords.peek(),
    timestamp: () => $timestamp.value(),
    error: () => $error.peek(),
    loading: () => $loading.value(),
    $coords,
    $error,
    $loading,
    start,
    stop,
    refresh,
    dispose: () => scope.dispose(),
  };
};
