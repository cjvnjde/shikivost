import { Bridge } from '@shikivost/bridge';

function init() {
  const bridge = Bridge.create();

  bridge.on('background', (data) => {
    console.log('in background', data);
  });

  setInterval(() => {
    console.log('background sent');
    bridge.send('content', 'from background');
    bridge.send('popup', 'from background');
  }, 5000);
}

init();
