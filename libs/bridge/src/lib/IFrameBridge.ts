import { ListenerCallbackWithoutRespond } from './Bridge';
import { BackgroundBridge } from './BackgroundBridge';

export class IFrameBridge extends BackgroundBridge {
  private windowListeners = new Map<ListenerCallbackWithoutRespond, string>()

  constructor() {
    super()

    window.addEventListener('message', ({ data }) => {
      try {
        this.windowListener(data)
      } catch (e) {
        // TODO: fix strange errors with JSON format error
        // console.error(e)
      }
    })
  }

  public onWindow(eventName: string, listener: ListenerCallbackWithoutRespond) {
    this.windowListeners.set(listener, eventName)
  }

  public offWindow(eventName: string, listener: ListenerCallbackWithoutRespond) {
    this.windowListeners.delete(listener)
  }

  private windowListener = (data: string) => {
    const { type, payload } = JSON.parse(data) as any

    this.windowListeners.forEach((event, fn) => {
      if (type === event) {
        fn({
          data: { type, payload }
        })
      }
    })
  }
}
