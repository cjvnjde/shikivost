import { BackgroundBridge } from '@shikivost/bridge';

const bridge = new BackgroundBridge()

function init() {
  bridge.on('log', ({ data: { payload } }) => {
    console.log(`log`)
  })
}

init()
