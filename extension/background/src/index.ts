import { BackgroundBridge } from '@shikivost/bridge';
import browser from "webextension-polyfill"

const bridge = new BackgroundBridge()

function init() {
  bridge.on('log', ({ data: { payload } }) => {
    console.log(`log`)
  })

  bridge.on('set.access_token', ({ data: { payload } }) => {
    console.log(`access`, payload)
    browser.storage.local.set({ "access_token": payload.payload})
  })


  bridge.on('set.refresh_token', ({ data: { payload } }) => {
    console.log(`refresh`, payload)
    browser.storage.local.set({ "refresh_token": payload.payload})
  })
}

init()
