import browser from "webextension-polyfill";
import { decodeData } from "./dataUtils";

export type Listener = (data: string) => void;
export type ListenerCallback = (data: Parameters<Listener>[0]) => void;

export class BridgeStrategy {
  private listeners = new Map<ListenerCallback, string>();

  constructor() {
    browser.runtime.onMessage.addListener(
      this.listener as (data: unknown) => void,
    );
  }

  public on(eventName: string, listener: ListenerCallback) {
    this.listeners.set(listener, eventName);
  }

  public off(listener: ListenerCallback) {
    this.listeners.delete(listener);
  }

  private listener: Listener = (data: string) => {
    const { event: eventType, payload } = decodeData(data) || {};

    this.listeners.forEach((event, fn) => {
      if (eventType === event) {
        fn(payload);
      }
    });
  };
}
