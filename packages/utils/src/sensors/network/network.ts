import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultNavigator, defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

type NetworkInformation = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
};

const getConnection = (nav: Navigator | undefined): NetworkInformation | undefined => {
  if (!nav) return undefined;
  return (nav as Navigator & { connection?: NetworkInformation }).connection;
};

export const network = () => {
  const scope = createCleanupScope();
  const connection = getConnection(defaultNavigator);

  const $online = signal(isClient ? (defaultNavigator?.onLine ?? true) : true);
  const $effectiveType = signal<string | undefined>(connection?.effectiveType);
  const $downlink = signal<number | undefined>(connection?.downlink);
  const $rtt = signal<number | undefined>(connection?.rtt);
  const $saveData = signal<boolean | undefined>(connection?.saveData);

  const syncConnection = () => {
    $effectiveType.set(connection?.effectiveType);
    $downlink.set(connection?.downlink);
    $rtt.set(connection?.rtt);
    $saveData.set(connection?.saveData);
  };

  if (isClient && defaultWindow) {
    const onOnline = () => {
      $online.set(true);
      syncConnection();
    };
    const onOffline = () => $online.set(false);

    scope.add(eventListener(defaultWindow, "online", onOnline).dispose);
    scope.add(eventListener(defaultWindow, "offline", onOffline).dispose);

    if (connection) {
      const onChange = () => syncConnection();
      connection.addEventListener("change", onChange);
      scope.add(() => connection.removeEventListener("change", onChange));
    }
  }

  return {
    online: () => $online.value(),
    effectiveType: () => $effectiveType.value(),
    downlink: () => $downlink.value(),
    rtt: () => $rtt.value(),
    saveData: () => $saveData.value(),
    $online,
    $effectiveType,
    $downlink,
    dispose: () => scope.dispose(),
  };
};
