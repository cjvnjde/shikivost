import { Bridge } from './Bridge';
import browser from 'webextension-polyfill';

export class BackgroundBridge extends Bridge {
  override async send(eventName: string, data?: any, tabId?: number) {
    const dataString = JSON.stringify({
      type: eventName,
      payload: data,
    });

    const allTabIds = tabId !== undefined ? [tabId] : await this.getTabIds();

    return Promise.any([
      this.sendToRuntime(dataString),
      ...allTabIds.map((tabId) => this.sendToTab(tabId as number, dataString)),
    ]);
  }

  private async getTabIds() {
    const tabs = await browser.tabs.query({});

    return tabs.map(({ id }) => id).filter(Boolean);
  }

  private async sendToTab(tabId: number, data: string) {
    return new Promise(async (resolve, reject) => {
      await browser.tabs.sendMessage(tabId, data);
    });
  }

  protected async sendToRuntime(data: string) {
    return new Promise(async (resolve, reject) => {
      await browser.runtime.sendMessage(data, (response: any) => {
        if (response) {
          resolve({ data: response.payload });
        } else {
          reject();
        }
      });
    });
  }
}
