import browser from "webextension-polyfill";
import { BridgeStrategy } from "./BridgeStrategy";
import { encodeData } from "./dataUtils";

export class ContentBridgeStrategy extends BridgeStrategy {
  public async send(eventName: string, data?: unknown) {
    const encodedData = encodeData({
      event: eventName,
      data,
    });

    await browser.runtime.sendMessage(encodedData.data);
  }
}
