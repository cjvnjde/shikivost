import browser from 'webextension-polyfill';
import { nanoid } from 'nanoid';

export type Listener = Parameters<
  typeof browser.runtime.onMessage.addListener
>[0];
export type ListenerCallback = (data: {
  data: {
    type: string;
    payload: Parameters<Listener>[0];
  };
  respond: Parameters<Listener>[2];
}) => void;

export type ListenerCallbackWithoutRespond = (data: {
  data: {
    type: string;
    payload: Parameters<Listener>[0];
  };
}) => void;

export type Options = {
  rejectTime: number;
};

function decodeData(data: string) {
  try {
    const { type, payload, id, direction } = JSON.parse(data);

    return {
      type,
      payload,
      direction,
      id,
    };
  } catch (e: unknown) {
    console.log(e);
  }
}

function encodeData(eventName: string, data: unknown | null = null) {
  const id = nanoid();
  return {
    id,
    data: JSON.stringify({
      id,
      direction: 'send',
      payload: data,
      type: eventName,
    }),
  };
}

export class Bridge {
  private listeners = new Map<ListenerCallback, string>();
  private responseWaiters = new Map<string, { timeout: any; callback: any }>();
  private options: Options;

  constructor(options: Options = { rejectTime: 5000 }) {
    browser.runtime.onMessage.addListener(this.listener);
    this.options = options;
  }

  public on(eventName: string, listener: ListenerCallback) {
    this.listeners.set(listener, eventName);
  }

  public off(eventName: string, listener: ListenerCallback) {
    this.listeners.delete(listener);
  }

  public async send(eventName: string, data?: unknown) {
    return new Promise(async (resolve, reject) => {
      const encodedData = encodeData(eventName, data);

      const timeout = setTimeout(() => {
        this.responseWaiters.delete(encodedData.id);
        reject();
      }, this.options.rejectTime);
      this.responseWaiters.set(encodedData.id, { timeout, callback: resolve });

      await browser.runtime.sendMessage(encodedData.data);
    });
  }

  public unsubscribe() {
    browser.runtime.onMessage.removeListener(this.listener);
    this.listeners.clear();
  }

  private listener: Listener = (data) => {
    const { type, payload, id, direction } = decodeData(data);

    if (direction === 'response' && this.responseWaiters.has(id)) {
      const { timeout, callback } = this.responseWaiters.get(id);

      clearTimeout(timeout);
      callback(payload);
      this.responseWaiters.delete(id);
    } else {
      this.listeners.forEach((event, fn: any) => {
        if (type === event) {
          fn({
            data: { type, payload },
            respond: async (data: any) => {
              await browser.runtime.sendMessage(
                JSON.stringify({
                  id,
                  direction: 'response',
                  payload: data,
                  type,
                })
              );
            },
          });
        }
      });
    }

    return true;
  };
}
