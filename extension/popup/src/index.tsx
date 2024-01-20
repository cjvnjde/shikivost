import { Bridge } from '@shikivost/bridge';

function init() {
  const bridge = Bridge.create();

  bridge.on('popup', (data) => {
    console.log('in popup', data);
  });

  setInterval(() => {
    console.log('popup sent');
    bridge.send('background', 'from popup');
    bridge.send('content', 'from popup');
  }, 6000);
}

init();
