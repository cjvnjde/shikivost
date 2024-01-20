import { Bridge } from '@shikivost/bridge';

function init() {
  const bridge = Bridge.create();

  bridge.on('content', (data) => {
    console.log('in content', data);
  });

  setInterval(() => {
    console.log('content sent');
    bridge.send('background', 'from content');
    bridge.send('popup', 'from content');
  }, 3500);
}

init();
