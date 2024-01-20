import browser from 'webextension-polyfill';
import { BridgeStrategy } from './BridgeStrategy';
import { encodeData } from './dataUtils';

export class BackgroundBridgeStrategy extends BridgeStrategy {
  async send(eventName: string, data?: any) {
    const encodedData = encodeData({
      event: eventName,
      data,
    });

    const allTabIds = await this.getTabIds();

    return Promise.allSettled([
      browser.runtime.sendMessage(encodedData.data),
      ...allTabIds.map((tabId) => this.sendToTab(tabId, encodedData.data)),
    ]);
  }

  private async getTabIds() {
    const tabs = await browser.tabs.query({});

    return tabs.map(({ id }) => id).filter(Boolean);
  }

  private async sendToTab(tabId: number, data: string) {
    await browser.tabs.sendMessage(tabId, data);
  }
}
