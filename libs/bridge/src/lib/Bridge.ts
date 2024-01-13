import browser from "webextension-polyfill"

export type Listener = Parameters<typeof browser.runtime.onMessage.addListener>[0]
export type ListenerCallback = (data: {
  data: {
    type: string
    payload: Parameters<Listener>[0]
  }
  respond: Parameters<Listener>[2]
}) => void

export type ListenerCallbackWithoutRespond = (data: {
  data: {
    type: string
    payload: Parameters<Listener>[0]
  }
}) => void

export class Bridge {
  private listeners = new Map<ListenerCallback, string>()

  private onEveryListener = new Set<ListenerCallbackWithoutRespond>()

  constructor() {
    browser.runtime.onMessage.addListener(this.listener)
  }

  public onEvery(listener: ListenerCallbackWithoutRespond) {
    this.onEveryListener.add(listener)
  }

  public offEvery(listener: ListenerCallbackWithoutRespond) {
    this.onEveryListener.delete(listener)
  }

  public on(eventName: string, listener: ListenerCallback) {
    this.listeners.set(listener, eventName)
  }

  public off(eventName: string, listener: ListenerCallback) {
    this.listeners.delete(listener)
  }

  public async send(eventName: string, data?: any) {
    const dataString = JSON.stringify({
      type: eventName,
      payload: data
    })

    return this.sendToRuntime(dataString)
  }

  public unsubscribe() {
    browser.runtime.onMessage.removeListener(this.listener)
    this.listeners.clear()
  }

  private listener: Listener = (data, sender, sendResponse: any) => {
    const { type, payload } = JSON.parse(data) as any

    this.listeners.forEach((event, fn: any) => {
      if (type === event) {
        fn({
          data: { type, payload },
          respond: (data: any) => {
            sendResponse({ type, payload: data })
          }
        })
      }
    })

    this.onEveryListener.forEach(fn => {
      fn({
        data: { type, payload }
      })
    })

    return true
  }

  protected async sendToRuntime(data: string) {
    return new Promise(async (resolve, reject) => {
      await browser.runtime.sendMessage(data, ( response: any ) => {
        if (response) {
          resolve({ data: response.payload })
        } else {
          reject()
        }
      })
    })
  }
}
