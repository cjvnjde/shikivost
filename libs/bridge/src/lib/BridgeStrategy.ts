import browser from "webextension-polyfill";
import { decodeData } from "./dataUtils";

export type ListenerCallback = (...data: unknown[]) => void;

export abstract class BridgeStrategy {
  private listeners = new Map<ListenerCallback, string>();

  constructor() {
    browser.runtime.onMessage.addListener(this.listener);
  }

  abstract send(eventName: string, data?: unknown): Promise<void>;

  public on(eventName: string, listener: ListenerCallback) {
    this.listeners.set(listener, eventName);
  }

  public off(listener: ListenerCallback) {
    this.listeners.delete(listener);
  }

  private listener = (data: unknown) => {
    if (typeof data === "string") {
      const { event: eventType, payload } = decodeData(data) || {};

      this.listeners.forEach((event, fn) => {
        if (eventType === event) {
          fn(payload);
        }
      });
    }
  };
}
